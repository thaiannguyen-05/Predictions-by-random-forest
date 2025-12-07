import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import * as net from 'net';
import { fallBackPrice } from './stock.constants';
import { PrismaService } from '../../prisma/prisma.service';

interface MLServiceResponse {
  success: boolean;
  error?: string;
  data?: unknown;
  message?: string;
  ticker?: string;
  current_price?: number;
  current_time?: string;
  price?: number;
  time?: string;
  prediction?: {
    current_price?: number;
    [key: string]: unknown;
  };
  predictions?: unknown[];
  timestamp?: string;
  metrics?: {
    features_count?: number;
    [key: string]: unknown;
  };
  trained_models?: number;
  updated_tickers?: number;
  [key: string]: unknown;
}

@Injectable()
export class StockPredictionService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(StockPredictionService.name);
  private readonly ML_HOST = process.env.ML_SERVICE_HOST || '127.0.0.1';
  private readonly ML_PORT = parseInt(process.env.ML_SERVICE_PORT || '9999');
  private readonly TIMEOUT = 30000; // 30 seconds

  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    this.logger.log(`ML Service configured at ${this.ML_HOST}:${this.ML_PORT}`);
    // Test connection on startup
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

  onModuleDestroy() {
    this.logger.log('Shutting down ML Service connection');
  }

  /**
   * Send command to ML TCP server and get response
   */
  private async sendCommand(
    command: string,
    params: Record<string, unknown> = {},
  ): Promise<MLServiceResponse> {
    return new Promise((resolve, reject) => {
      const client = new net.Socket();
      let responseData = '';

      const timeout = setTimeout(() => {
        client.destroy();
        this.logger.error(`Request timed out for command: ${command}`);
        reject(new Error('Request timeout'));
      }, this.TIMEOUT);

      client.connect(this.ML_PORT, this.ML_HOST, () => {
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
        clearTimeout(timeout);
        this.logger.log(
          `Connection ended for command: ${command}. Full response: ${responseData}`,
        );
        try {
          const response = JSON.parse(responseData);
          resolve(response);
        } catch (error) {
          this.logger.error(
            `Failed to parse ML response: ${error.message}. Raw response: ${responseData}`,
          );
          reject(new Error(`Failed to parse ML response: ${error.message}`));
        }
      });

      client.on('close', () => {
        this.logger.log(`Connection closed for command: ${command}.`);
      });

      client.on('error', (error) => {
        clearTimeout(timeout);
        this.logger.error(
          `ML Service connection error for command ${command}: ${error.message}`,
        );
        reject(error);
      });
    });
  }

  /**
   * Ping ML service to check if it's alive
   */
  async ping(): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand('ping');
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get current price for a ticker
   */
  async getCurrentPrice(ticker: string): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand('get_current_price', { ticker });
      if (!response.success) {
        const data = await fetch(fallBackPrice(ticker));
        const json = await data.json();
        return {
          success: true,
          data: json.taggedSymbols[0].price,
        };
      }
      return response;
    } catch (error) {
      this.logger.error(
        `Error calling ML service for current price of ${ticker}: ${error.message}`,
      );
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get financial data for a ticker
   */
  async getFinancialData(ticker: string): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand('get_financial_data', { ticker });

      if (response.success && response.data) {
        try {
          const data: any = response.data; // Cast to any to access properties dynamically

          // ✅ FIX DUPLICATE: Kiểm tra xem đã lưu record cho symbol này trong 30s chưa?
          const latestRecord =
            await this.prismaService.history_searching.findFirst({
              where: {
                symbol: ticker,
                createdAt: {
                  gt: new Date(Date.now() - 30 * 1000), // Lớn hơn (hiện tại - 30s)
                },
              },
            });

          // Nếu chưa có record nào trong 30s gần đây -> Mới lưu
          if (!latestRecord) {
            await this.prismaService.history_searching.create({
              data: {
                symbol: ticker,
                currentPrice: BigInt(Math.round(Number(data.yahoo_price || 0))),
                previousClose: BigInt(
                  Math.round(Number(data.previous_close || 0)),
                ),
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
        } catch (dbError: any) {
          // Catch error as any to access message property
          this.logger.error(
            `Failed to save history search for ${ticker}: ${dbError.message}`,
          );
          // Don't fail the request if saving history fails
        }
      }

      if (!response.success) {
        this.logger.error(
          `ML service failed to get financial data for ${ticker}: ${response.error}`,
        );
      }
      return response;
    } catch (error) {
      this.logger.error(
        `Error calling ML service for financial data of ${ticker}: ${error.message}`,
      );
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get predictions for a single ticker
   */
  async getPredictionSingle(ticker: string): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand('predict', { ticker });
      return response;
    } catch (error) {
      this.logger.error(`Error predicting for ${ticker}: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get predictions for multiple hours (using single prediction)
   */
  async getPredictionsMultiHours(ticker: string): Promise<MLServiceResponse> {
    try {
      // Use predict_multi_hours command to get predictions for 1,2,3,4 hours
      const response = await this.sendCommand('predict_multi_hours', {
        ticker,
      });

      if (!response.success) {
        this.logger.error(
          `ML service failed to get multi-hour predictions for ${ticker}: ${response.error}`,
        );
        return response;
      }

      // Response already has the correct format from ML service
      return response;
    } catch (error) {
      this.logger.error(
        `Error getting predictions for ${ticker}: ${error.message}`,
      );
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get predictions for all tickers
   */
  async getPredictionsAll(topN: number = 5): Promise<MLServiceResponse> {
    try {
      const response = await this.sendCommand('predict_all', { top_n: topN });
      return response;
    } catch (error) {
      this.logger.error(`Error predicting all tickers: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Train model for a single ticker
   */
  async trainModel(
    ticker: string,
    testSize: number = 0.2,
    nEstimators: number = 100,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log(`Training model for ${ticker}...`);
      const response = await this.sendCommand('train_single', {
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
      this.logger.error(`Error training model for ${ticker}: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Train models for all tickers
   */
  async trainAllModels(
    testSize: number = 0.2,
    nEstimators: number = 100,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log('Training all models...');
      const response = await this.sendCommand('train_all', {
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
      this.logger.error(`Error training all models: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Update data for tickers
   */
  async updateData(
    tickers?: string[],
    forceUpdate: boolean = true,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log('Updating data...');
      const response = await this.sendCommand('update_data', {
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
      this.logger.error(`Error updating data: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get list of all available tickers
   */
  async getTickerList(): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand('get_ticker_list');
    } catch (error) {
      this.logger.error(`Error getting ticker list: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get model status for all tickers
   */
  async getModelStatus(tickers?: string[]): Promise<MLServiceResponse> {
    try {
      return await this.sendCommand('get_model_status', { tickers });
    } catch (error) {
      this.logger.error(`Error getting model status: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Run full pipeline: update data -> train models -> make predictions
   */
  async runFullPipeline(
    tickers?: string[],
    forceUpdate: boolean = true,
  ): Promise<MLServiceResponse> {
    try {
      this.logger.log('Running full pipeline...');
      const response = await this.sendCommand('full_pipeline', {
        tickers,
        force_update: forceUpdate,
      });

      if (response.success) {
        this.logger.log('✅ Full pipeline completed successfully');
      }

      return response;
    } catch (error) {
      this.logger.error(`Error running full pipeline: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async loadingHisorySearch(): Promise<MLServiceResponse> {
    try {
      const response = await this.prismaService.history_searching.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Convert BigInt to string for JSON serialization
      const serializedResponse = response.map((item) => ({
        ...item,
        currentPrice: item.currentPrice.toString(),
        previousClose: item.previousClose.toString(),
        open: item.open.toString(),
        high: item.high.toString(),
        low: item.low.toString(),
        volume: item.volume.toString(),
        marketCap: item.marketCap.toString(),
      }));

      return {
        success: true,
        data: serializedResponse,
      };
    } catch (error) {
      this.logger.error(`Error loading history search: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
