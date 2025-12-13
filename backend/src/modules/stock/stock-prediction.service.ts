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
} from './stock.constants';
import {
  MLServiceResponse,
  FinancialData,
  HistorySearchRecord,
} from './interfaces/stock.interface';
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

  /**
   * Test connection to ML Service on startup.
   */
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

  /**
   * Send command to ML TCP server and get response.
   * @param command - Command to send
   * @param params - Additional parameters
   * @returns ML Service response
   */
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

  /**
   * Ping ML service to check if it's alive.
   */
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

  /**
   * Get current price for a ticker.
   */
  async getCurrentPrice(ticker: string): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand(ML_COMMANDS.GET_CURRENT_PRICE, {
        ticker,
      });

      if (!response.success) {
        // Fallback to external API
        const data = await fetch(getFallbackPriceUrl(ticker));
        const json = await data.json();
        return {
          success: true,
          data: json.taggedSymbols[0].price,
        };
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

  /**
   * Get financial data for a ticker.
   */
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

  /**
   * Save financial data to history search table.
   * Implements duplicate prevention within a time window.
   */
  private async saveHistorySearch(
    ticker: string,
    data: FinancialData,
  ): Promise<void> {
    try {
      // Check for duplicate within time window
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

      // Only save if no recent record exists
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
      // Don't fail the request if saving history fails
    }
  }

  /**
   * Get predictions for a single ticker.
   */
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

  /**
   * Get predictions for multiple hours (1,2,3,4 hours).
   */
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

  /**
   * Get predictions for all tickers.
   */
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

  /**
   * Train model for a single ticker.
   */
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

  /**
   * Train models for all tickers.
   */
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

  /**
   * Update data for tickers.
   */
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

  /**
   * Get list of all available tickers.
   */
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

  /**
   * Get model status for all tickers.
   */
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

  /**
   * Run full pipeline: update data -> train models -> make predictions.
   */
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

  /**
   * Load history search records.
   */
  async loadingHistorySearch(): Promise<MLServiceResponse> {
    try {
      const response = await this.prismaService.history_searching.findMany({
        take: HISTORY_SEARCH_CONFIG.DEFAULT_LIMIT,
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Convert BigInt to string for JSON serialization
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
