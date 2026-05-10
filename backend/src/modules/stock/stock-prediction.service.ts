import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as net from 'net';

import { PrismaService } from '../../prisma/prisma.service';
import {
  ML_SERVICE_CONFIG,
  ML_COMMANDS,
  HISTORY_SEARCH_CONFIG,
  MODEL_TRAINING_CONFIG,
  PREDICTION_CONFIG,
  getFallbackPriceUrl,
} from '.';
import { MLServiceResponse, FinancialData, HistorySearchRecord } from '.';
import {
  MLServiceConnectionException,
  MLServiceTimeoutException,
} from './exceptions/stock.exception';

@Injectable()
export class StockPredictionService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(StockPredictionService.name);
  private readonly mlHost: string;
  private readonly mlPort: number;
  private readonly timeout: number;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const configuredPort = Number(this.configService.get('ML_SERVICE_PORT'));

    this.mlHost =
      this.configService.get<string>('ML_SERVICE_HOST') ||
      ML_SERVICE_CONFIG.DEFAULT_HOST;
    this.mlPort = Number.isFinite(configuredPort) && configuredPort > 0
      ? configuredPort
      : ML_SERVICE_CONFIG.DEFAULT_PORT;
    this.timeout = ML_SERVICE_CONFIG.TIMEOUT_MS;
  }

  onModuleInit(): Promise<void> {
    this.logger.log(`ML Service configured at ${this.mlHost}:${this.mlPort}`);
    this.testConnection();
    return Promise.resolve();
  }

  onModuleDestroy(): void {
    this.logger.log('Shutting down ML Service connection');
  }

  private testConnection() {
    setInterval(async () => {
      const status = await this.ping();
      if (status.success) {
        this.logger.log('✅ ML Service is responsive');
      }
    }, ML_SERVICE_CONFIG.TIMEOUT_MS);
  }

  private async sendCommand(
    command: string,
    params: Record<string, unknown> = {},
  ): Promise<MLServiceResponse> {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';

      const timeoutHandler = setTimeout(() => {
        client.destroy();
        this.logger.error(`Request timed out for command: ${command}`);
        reject(new MLServiceTimeoutException(command));
      }, this.timeout);

      client.connect(this.mlPort, this.mlHost, () => {
        const request = JSON.stringify({ command, ...params });
        this.logger.log(`Sending command: ${request}`);
        client.write(request);
        client.end();
      });

      client.on('data', (data) => {
        responseData += data.toString();
        this.logger.log(`Received data chunk for command: ${command}`);
      });

      client.on('end', () => {
        clearTimeout(timeoutHandler);
        this.logger.log(
          `Connection ended for command: ${command}. Full response: ${responseData}`,
        );
        try {
          const response: MLServiceResponse = JSON.parse(responseData);
          resolve(response);
        } catch (parseError) {
          const errorMessage =
            parseError instanceof Error ? parseError.message : 'Unknown error';
          this.logger.error(
            `Failed to parse ML response: ${errorMessage}. Raw response: ${responseData}`,
          );
          reject(new Error(`Failed to parse ML response: ${errorMessage}`));
        }
      });

      client.on('close', () => {
        this.logger.log(`Connection closed for command: ${command}.`);
      });

      client.on('error', (error) => {
        clearTimeout(timeoutHandler);
        this.logger.error(
          `ML Service connection error for command ${command}: ${error.message}`,
        );
        reject(new MLServiceConnectionException());
      });
    });
  }

  async ping(): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand(ML_COMMANDS.PING);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private normalizeTickerForFallback(ticker: string): string {
    return ticker.replace(/\.VN$/i, '').toUpperCase();
  }

  private parseChangePercent(change: unknown): number | null {
    if (typeof change === 'number' && Number.isFinite(change)) {
      return change;
    }

    if (typeof change === 'string') {
      const parsed = parseFloat(change.replace('%', '').trim());
      return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
  }

  async getCurrentPrice(ticker: string): Promise<MLServiceResponse> {
    const fallbackTicker = this.normalizeTickerForFallback(ticker);

    const fetchFallback = async (): Promise<{
      price: number;
      change: number;
    } | null> => {
      const data = await fetch(getFallbackPriceUrl(fallbackTicker));
      const json = await data.json();

      if (json && json.length > 0 && json[0].lastPrice) {
        return {
          price: Number(json[0].lastPrice) * 1000,
          change: this.parseChangePercent(json[0].changePc) ?? 0,
        };
      }

      return null;
    };

    try {
      let response: MLServiceResponse | null = null;
      try {
        response = await this.sendCommand(ML_COMMANDS.GET_CURRENT_PRICE, {
          ticker,
        });
      } catch (_err) {
        this.logger.warn(
          `ML Service unavailable or failed for ${ticker}, using fallback.`,
        );
      }

      if (!response || !response.success) {
        const fallbackData = await fetchFallback();
        if (fallbackData) {
          return {
            success: true,
            ticker,
            price: fallbackData.price,
            change: fallbackData.change,
          };
        }

        throw new Error('Fallback API returned empty or invalid data');
      }

      const normalizedChange = this.parseChangePercent(response.change);
      if (normalizedChange !== null) {
        return {
          ...response,
          change: normalizedChange,
        };
      }

      const fallbackData = await fetchFallback();
      if (fallbackData) {
        return {
          ...response,
          ticker: response.ticker || ticker,
          price:
            Number(response.price ?? response.current_price) ||
            fallbackData.price,
          change: fallbackData.change,
        };
      }

      return {
        ...response,
        change: 0,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error calling ML service for current price of ${ticker}: ${errorMessage}`,
      );
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getCurrentPrices(
    tickers: string[],
  ): Promise<Record<string, { price: number; change: number }>> {
    try {
      if (!tickers || tickers.length === 0) return {};

      const normalizedToRequested: Record<string, string[]> = {};
      const normalizedTickers = tickers.map((ticker) => {
        const normalized = this.normalizeTickerForFallback(ticker);
        if (!normalizedToRequested[normalized]) {
          normalizedToRequested[normalized] = [];
        }
        normalizedToRequested[normalized].push(ticker.toUpperCase());
        return normalized;
      });

      const tickersString = normalizedTickers.join(',');
      const data = await fetch(getFallbackPriceUrl(tickersString));
      const json = await data.json();

      const results: Record<string, { price: number; change: number }> = {};

      if (Array.isArray(json)) {
        json.forEach((item) => {
          if (item.sym && item.lastPrice) {
            const normalizedSymbol = String(item.sym).toUpperCase();
            const stockData = {
              price: Number(item.lastPrice) * 1000,
              change: this.parseChangePercent(item.changePc) ?? 0,
            };

            const requestedSymbols = normalizedToRequested[normalizedSymbol];
            if (requestedSymbols?.length) {
              requestedSymbols.forEach((requestedSymbol) => {
                results[requestedSymbol] = stockData;
              });
            } else {
              results[normalizedSymbol] = stockData;
            }
          }
        });
      }

      return results;
    } catch (error) {
      this.logger.error(`Error fetching batch prices: ${error}`);
      return {};
    }
  }

  async getFinancialData(ticker: string): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand(ML_COMMANDS.GET_FINANCIAL_DATA, {
        ticker,
      });

      if (response.success && response.data) {
        await this.saveHistorySearch(ticker, response.data as FinancialData);
      }

      if (!response.success) {
        this.logger.error(
          `ML service failed to get financial data for ${ticker}: ${response.error}`,
        );
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error calling ML service for financial data of ${ticker}: ${errorMessage}`,
      );
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  private async saveHistorySearch(
    ticker: string,
    data: FinancialData,
  ): Promise<void> {
    try {
      const latestRecord = await this.prismaService.history_searching.findFirst(
        {
          where: {
            symbol: ticker,
            createdAt: {
              gt: new Date(
                Date.now() - HISTORY_SEARCH_CONFIG.DUPLICATE_WINDOW_MS,
              ),
            },
          },
        },
      );

      if (!latestRecord) {
        await this.prismaService.history_searching.create({
          data: {
            symbol: ticker,
            currentPrice: BigInt(Math.round(Number(data.yahoo_price || 0))),
            previousClose: BigInt(Math.round(Number(data.previous_close || 0))),
            open: BigInt(Math.round(Number(data.open || 0))),
            high: BigInt(Math.round(Number(data.high || 0))),
            low: BigInt(Math.round(Number(data.low || 0))),
            volume: BigInt(Math.round(Number(data.volume || 0))),
            marketCap: BigInt(Math.round(Number(data.market_cap || 0))),
            peRatio: Number(data.pe_ratio || 0),
            eps: Number(data.eps || 0),
            beta: Number(data.beta || 0),
            yahooPrice: Number(data.yahoo_price || 0),
          },
        });
      }
    } catch (dbError) {
      const errorMessage =
        dbError instanceof Error ? dbError.message : 'Unknown error';
      this.logger.error(
        `Failed to save history search for ${ticker}: ${errorMessage}`,
      );
    }
  }

  async getPredictionSingle(ticker: string): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand(ML_COMMANDS.PREDICT, { ticker });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error predicting for ${ticker}: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getPredictionsMultiHours(ticker: string): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand(ML_COMMANDS.PREDICT_MULTI_HOURS, {
        ticker,
      });

      if (!response.success) {
        this.logger.error(
          `ML service failed to get multi-hour predictions for ${ticker}: ${response.error}`,
        );
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Error getting predictions for ${ticker}: ${errorMessage}`,
      );
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getPredictionsAll(
    topN: number = PREDICTION_CONFIG.DEFAULT_TOP_N,
  ): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand(ML_COMMANDS.PREDICT_ALL, { top_n: topN });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error predicting all tickers: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async trainModel(
    ticker: string,
    testSize: number = MODEL_TRAINING_CONFIG.DEFAULT_TEST_SIZE,
    nEstimators: number = MODEL_TRAINING_CONFIG.DEFAULT_N_ESTIMATORS,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log(`Training model for ${ticker}...`);
      const response = await this.sendCommand(ML_COMMANDS.TRAIN_SINGLE, {
        ticker,
        test_size: testSize,
        n_estimators: nEstimators,
      });

      if (response.success) {
        this.logger.log(`✅ Model trained successfully for ${ticker}`);
      }

      return {
        ...response,
        message: response.success
          ? `Model trained successfully for ${ticker}`
          : response.error,
        features_count:
          response.features_count ?? response.metrics?.features_count ?? 0,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error training model for ${ticker}: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async trainAllModels(
    testSize: number = MODEL_TRAINING_CONFIG.DEFAULT_TEST_SIZE,
    nEstimators: number = MODEL_TRAINING_CONFIG.DEFAULT_N_ESTIMATORS,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log('Training all models...');
      const response = await this.sendCommand(ML_COMMANDS.TRAIN_ALL, {
        test_size: testSize,
        n_estimators: nEstimators,
      });

      if (response.success) {
        this.logger.log(
          `✅ Trained ${response.trained_models} models successfully`,
        );
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error training all models: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async trainAllModelsRecent(
    recentWeeks: 1 | 2,
    tickers?: string[],
    modelTypes?: string[],
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log(
        `Training all models for recent ${recentWeeks} week(s)...`,
      );
      const response = await this.sendCommand(
        ML_COMMANDS.TRAIN_ALL_MODELS_RECENT,
        {
          recent_weeks: recentWeeks,
          tickers,
          model_types: modelTypes,
        },
      );

      if (response.success) {
        this.logger.log(
          `✅ Trained ${response.trained_jobs ?? 0}/${response.total_jobs ?? 0} model jobs`,
        );
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error training all recent models: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async updateData(
    tickers?: string[],
    forceUpdate: boolean = true,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log('Updating data...');
      const response = await this.sendCommand(ML_COMMANDS.UPDATE_DATA, {
        tickers,
        force_update: forceUpdate,
      });

      if (response.success) {
        this.logger.log(
          `✅ Updated data for ${response.updated_tickers} tickers`,
        );
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error updating data: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getTickerList(): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand(ML_COMMANDS.GET_TICKER_LIST);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error getting ticker list: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async getModelStatus(tickers?: string[]): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand(ML_COMMANDS.GET_MODEL_STATUS, { tickers });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error getting model status: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async runFullPipeline(
    tickers?: string[],
    forceUpdate: boolean = true,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log('Running full pipeline...');
      const response = await this.sendCommand(ML_COMMANDS.FULL_PIPELINE, {
        tickers,
        force_update: forceUpdate,
      });

      if (response.success) {
        this.logger.log('✅ Full pipeline completed successfully');
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error running full pipeline: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async loadingHistorySearch(): Promise<MLServiceResponse> {
    try {
      const response = await this.prismaService.history_searching.findMany({
        take: HISTORY_SEARCH_CONFIG.DEFAULT_LIMIT,
        orderBy: {
          createdAt: 'desc',
        },
      });

      const serializedResponse: HistorySearchRecord[] = response.map(
        (item) => ({
          id: item.id,
          symbol: item.symbol,
          currentPrice: item.currentPrice.toString(),
          previousClose: item.previousClose.toString(),
          open: item.open.toString(),
          high: item.high.toString(),
          low: item.low.toString(),
          volume: item.volume.toString(),
          marketCap: item.marketCap.toString(),
          peRatio: item.peRatio,
          eps: item.eps,
          beta: item.beta,
          yahooPrice: item.yahooPrice,
          createdAt: item.createdAt,
        }),
      );

      return {
        success: true,
        data: serializedResponse,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error loading history search: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async compareModels(
    ticker: string,
    recentDays: number = 30,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log(`Comparing models for ${ticker}...`);
      const response = await this.sendCommand(ML_COMMANDS.COMPARE_MODELS, {
        ticker,
        recent_days: recentDays,
      });

      if (!response.success && response.error) {
        this.logger.error(`Error from ML compare models: ${response.error}`);
      }

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error comparing models: ${errorMessage}`);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
