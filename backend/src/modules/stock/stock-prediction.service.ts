import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'net';

interface TCPResponse {
	success: boolean;
	error?: string;
	[key: string]: any;
}

@Injectable()
export class StockPredictionService {
	private readonly logger = new Logger(StockPredictionService.name);
	private readonly host = process.env.ML_SERVICE_HOST || 'localhost';
	private readonly port = parseInt(process.env.ML_SERVICE_PORT || '9999');
	private readonly timeout = 10000; // 10 seconds

	private async sendTCPCommand(command: any): Promise<TCPResponse> {
		return new Promise((resolve, reject) => {
			const client = new Socket();
			let responseData = '';
			let timeoutId: NodeJS.Timeout;

			// Set timeout
			timeoutId = setTimeout(() => {
				client.destroy();
				reject(new Error('Request timeout'));
			}, this.timeout);

			client.connect(this.port, this.host, () => {
				this.logger.debug(`Connected to ML service at ${this.host}:${this.port}`);
				client.write(JSON.stringify(command));
			});

			client.on('data', (data: Buffer) => {
				responseData += data.toString();

				// Try to parse JSON to see if we have complete response
				try {
					const response = JSON.parse(responseData);
					clearTimeout(timeoutId);
					client.destroy(); // Close connection immediately
					resolve(response);
				} catch (error) {
					// Not complete JSON yet, continue receiving
				}
			});

			client.on('close', () => {
				clearTimeout(timeoutId);
				if (responseData) {
					try {
						const response = JSON.parse(responseData);
						resolve(response);
					} catch (error) {
						reject(new Error('Invalid JSON response from ML service'));
					}
				}
			});

			client.on('error', (error: Error) => {
				clearTimeout(timeoutId);
				this.logger.error(`TCP Client Error: ${error.message}`);
				reject(error);
			});
		});
	}

	async getCurrentPrice(ticker: string) {
		try {
			this.logger.log(`Getting current price for ${ticker}`);

			const response = await this.sendTCPCommand({
				command: 'get_current_price',
				ticker: ticker
			});

			return response;
		} catch (error: any) {
			this.logger.error(`Error getting current price: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}

	async getPredictionsMultiHours(ticker: string) {
		try {
			this.logger.log(`Getting multi-hour predictions for ${ticker}`);

			const response = await this.sendTCPCommand({
				command: 'predict_multi_hours',
				ticker: ticker
			});

			return response;
		} catch (error: any) {
			this.logger.error(`Error getting predictions: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}

	async trainModel(ticker: string) {
		try {
			this.logger.log(`Training model for ${ticker}`);

			const response = await this.sendTCPCommand({
				command: 'train',
				ticker: ticker
			});

			return response;
		} catch (error: any) {
			this.logger.error(`Error training model: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}

	async ping() {
		try {
			const response = await this.sendTCPCommand({
				command: 'ping'
			});
			return response;
		} catch (error: any) {
			this.logger.error(`ML service ping failed: ${error.message}`);
			return {
				success: false,
				error: error.message
			};
		}
	}

	
}