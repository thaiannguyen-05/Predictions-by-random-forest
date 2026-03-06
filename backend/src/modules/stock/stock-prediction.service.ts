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
    this.mlHost =
      this.configService.get<string>('ML_SERVICE_HOST') ||
      ML_SERVICE_CONFIG.DEFAULT_HOST;
    this.mlPort =
      this.configService.get<number>('ML_SERVICE_PORT') ||
      ML_SERVICE_CONFIG.DEFAULT_PORT;
    this.timeout = ML_SERVICE_CONFIG.TIMEOUT_MS;
  }

  async onModuleInit(): Promise<void> {
    this.logger.log(`ML Service configured at ${this.mlHost}:${this.mlPort}`);
    await this.testConnection();
  }

  onModuleDestroy(): void {
    this.logger.log('Shutting down ML Service connection');
  }

  private async testConnection(): Promise<void> {
    try {
      const result = await this.ping();
      if (result.success) {
        this.logger.log('✅ ML Service connection successful');
      } else {
        this.logger.warn('⚠️ ML Service connection failed on startup');
      }
    } catch (_error) {
      this.logger.error('❌ Failed to connect to ML Service on startup');
    }
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

  async getCurrentPrice(ticker: string): Promise<MLServiceResponse> {
    try {
      let response: MLServiceResponse | null = null;
      try {
        response = await this.sendCommand(ML_COMMANDS.GET_CURRENT_PRICE, {
          ticker,
        });
      } catch (err) {
        this.logger.warn(`ML Service unavailable or failed for ${ticker}, using fallback.`);
      }

      if (!response || !response.success) {
        const data = await fetch(getFallbackPriceUrl(ticker));
        const json = await data.json();
        if (json && json.length > 0 && json[0].lastPrice) {
          return {
            success: true,
            price: json[0].lastPrice * 1000,
            change: json[0].changePc,
          };
        }
        throw new Error('Fallback API returned empty or invalid data');
      }

      return response;
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
  ): Promise<Record<string, { price: number; change: string }>> {
    try {
      if (!tickers || tickers.length === 0) return {};

      const tickersString = tickers.join(',');
      const data = await fetch(getFallbackPriceUrl(tickersString));
      const json = await data.json();

      const results: Record<string, { price: number; change: string }> = {};

      if (Array.isArray(json)) {
        json.forEach((item) => {
          if (item.sym && item.lastPrice) {
            results[item.sym] = {
              price: item.lastPrice * 1000,
              change: item.changePc || '0',
            };
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
        features_count: response.metrics?.features_count || 0,
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
}
