import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as net from 'net';

interface MLServiceResponse {
	success: boolean;
	error?: string;
	[key: string]: any;
}

@Injectable()
export class StockPredictionService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(StockPredictionService.name);
	private readonly ML_HOST = process.env.ML_SERVICE_HOST || '127.0.0.1';
	private readonly ML_PORT = parseInt(process.env.ML_SERVICE_PORT || '9999');
	private readonly TIMEOUT = 30000; // 30 seconds

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
		} catch (error) {
			this.logger.error('❌ Failed to connect to ML Service on startup');
		}
	}

	async onModuleDestroy() {
		this.logger.log('Shutting down ML Service connection');
	}

	/**
	 * Send command to ML TCP server and get response
	 */
	private async sendCommand(command: string, params: any = {}): Promise<MLServiceResponse> {
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
				this.logger.log(`Connection ended for command: ${command}. Full response: ${responseData}`);
				try {
					const response = JSON.parse(responseData);
					resolve(response);
				} catch (error) {
					this.logger.error(`Failed to parse ML response: ${error.message}. Raw response: ${responseData}`);
					reject(new Error(`Failed to parse ML response: ${error.message}`));
				}
			});

			client.on('close', () => {
				this.logger.log(`Connection closed for command: ${command}.`);
			});

			client.on('error', (error) => {
				clearTimeout(timeout);
				this.logger.error(`ML Service connection error for command ${command}: ${error.message}`);
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
				error: error.message
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
				this.logger.error(`ML service failed to get current price for ${ticker}: ${response.error}`);
			}
			return response;
		} catch (error) {
			this.logger.error(`Error calling ML service for current price of ${ticker}: ${error.message}`);
			return {
				success: false,
				error: error.message
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
				error: error.message
			};
		}
	}

	/**
	 * Get predictions for multiple hours (using single prediction)
	 */
	async getPredictionsMultiHours(ticker: string): Promise<MLServiceResponse> {
		try {
			// Get current price and prediction
			const [currentPrice, prediction] = await Promise.all([
				this.getCurrentPrice(ticker),
				this.getPredictionSingle(ticker)
			]);

			if (!prediction.success) {
				return prediction;
			}

			// Format response to match expected structure
			return {
				success: true,
				ticker: ticker,
				current_price: currentPrice.success ? currentPrice.close : prediction.prediction?.current_price,
				current_time: currentPrice.success ? currentPrice.date : new Date().toISOString(),
				predictions: prediction.prediction ? [prediction.prediction] : [],
				timestamp: new Date().toISOString()
			};
		} catch (error) {
			this.logger.error(`Error getting predictions for ${ticker}: ${error.message}`);
			return {
				success: false,
				error: error.message
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
				error: error.message
			};
		}
	}

	/**
	 * Train model for a single ticker
	 */
	async trainModel(ticker: string, testSize: number = 0.2, nEstimators: number = 100): Promise<MLServiceResponse> {
		try {
			this.logger.log(`Training model for ${ticker}...`);
			const response = await this.sendCommand('train_single', {
				ticker,
				test_size: testSize,
				n_estimators: nEstimators
			});

			if (response.success) {
				this.logger.log(`✅ Model trained successfully for ${ticker}`);
			}

			return {
				...response,
				message: response.success ? `Model trained successfully for ${ticker}` : response.error,
				features_count: response.metrics?.features_count || 0
			};
		} catch (error) {
			this.logger.error(`Error training model for ${ticker}: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}

	/**
	 * Train models for all tickers
	 */
	async trainAllModels(testSize: number = 0.2, nEstimators: number = 100): Promise<MLServiceResponse> {
		try {
			this.logger.log('Training all models...');
			const response = await this.sendCommand('train_all', {
				test_size: testSize,
				n_estimators: nEstimators
			});

			if (response.success) {
				this.logger.log(`✅ Trained ${response.trained_models} models successfully`);
			}

			return response;
		} catch (error) {
			this.logger.error(`Error training all models: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}

	/**
	 * Update data for tickers
	 */
	async updateData(tickers?: string[], forceUpdate: boolean = true): Promise<MLServiceResponse> {
		try {
			this.logger.log('Updating data...');
			const response = await this.sendCommand('update_data', {
				tickers,
				force_update: forceUpdate
			});

			if (response.success) {
				this.logger.log(`✅ Updated data for ${response.updated_tickers} tickers`);
			}

			return response;
		} catch (error) {
			this.logger.error(`Error updating data: ${error.message}`);
			return {
				success: false,
				error: error.message
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
				error: error.message
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
				error: error.message
			};
		}
	}

	/**
	 * Run full pipeline: update data -> train models -> make predictions
	 */
	async runFullPipeline(tickers?: string[], forceUpdate: boolean = true): Promise<MLServiceResponse> {
		try {
			this.logger.log('Running full pipeline...');
			const response = await this.sendCommand('full_pipeline', {
				tickers,
				force_update: forceUpdate
			});

			if (response.success) {
				this.logger.log('✅ Full pipeline completed successfully');
			}

			return response;
		} catch (error) {
			this.logger.error(`Error running full pipeline: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}
}