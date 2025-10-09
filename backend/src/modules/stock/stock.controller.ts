import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { StockPredictionService } from './stock-prediction.service';
import { Public } from 'src/common/decorator/public.decorator';
@ApiTags('stock')
@Public()
@Controller('api/stock')
export class StockController {
	constructor(private readonly stockService: StockPredictionService) { }

	@Get('health')
	@ApiOperation({
		summary: 'Health check for ML service',
		description: 'Check the connection status to the machine learning prediction service'
	})
	@ApiResponse({
		status: 200,
		description: 'ML service is connected and operational',
		schema: {
			type: 'object',
			properties: {
				status: { type: 'string', example: 'ok' },
				ml_service: { type: 'string', example: 'connected' }
			}
		}
	})
	@ApiResponse({
		status: 503,
		description: 'ML service is unavailable or connection failed'
	})
	async health() {
		try {
			const result = await this.stockService.ping();
			if (!result.success) {
				throw new HttpException(
					{ message: 'ML service is not available', error: result.error },
					HttpStatus.SERVICE_UNAVAILABLE
				);
			}
			return { status: 'ok', ml_service: 'connected' };
		} catch (error) {
			throw new HttpException(
				{ message: 'ML service connection failed' },
				HttpStatus.SERVICE_UNAVAILABLE
			);
		}
	}

	@Get('current-price/:ticker')
	@ApiOperation({
		summary: 'Get current stock price',
		description: 'Retrieve the current price for a specific stock ticker symbol'
	})
	@ApiParam({
		name: 'ticker',
		description: 'Stock ticker symbol (e.g., AAPL, GOOGL, TSLA)',
		type: 'string',
		example: 'AAPL'
	})
	@ApiResponse({
		status: 200,
		description: 'Current stock price retrieved successfully',
		schema: {
			type: 'object',
			properties: {
				ticker: { type: 'string', example: 'AAPL' },
				price: { type: 'number', example: 150.25 },
				time: { type: 'string', example: '2023-10-09 14:30:00' },
				timestamp: { type: 'number', example: 1696858200 }
			}
		}
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request - invalid ticker or price retrieval failed'
	})
	async getCurrentPrice(@Param('ticker') ticker: string) {
		const result = await this.stockService.getCurrentPrice(ticker);

		if (!result.success) {
			throw new HttpException(
				{ message: 'Failed to get current price', error: result.error },
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			ticker: (result as any).ticker,
			price: (result as any).price,
			time: (result as any).time,
			timestamp: (result as any).timestamp
		};
	}

	@Get('predictions/:ticker')
	@ApiOperation({
		summary: 'Get stock price predictions',
		description: 'Get multi-hour stock price predictions using Random Forest ML model'
	})
	@ApiParam({
		name: 'ticker',
		description: 'Stock ticker symbol for predictions',
		type: 'string',
		example: 'AAPL'
	})
	@ApiResponse({
		status: 200,
		description: 'Stock predictions retrieved successfully',
		schema: {
			type: 'object',
			properties: {
				ticker: { type: 'string', example: 'AAPL' },
				current_price: { type: 'number', example: 150.25 },
				current_time: { type: 'string', example: '2023-10-09 14:30:00' },
				predictions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							hour: { type: 'number', example: 1 },
							predicted_price: { type: 'number', example: 151.50 },
							confidence: { type: 'number', example: 0.85 }
						}
					}
				},
				timestamp: { type: 'number', example: 1696858200 }
			}
		}
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request - prediction failed or invalid ticker'
	})
	async getPredictions(@Param('ticker') ticker: string) {
		const result = await this.stockService.getPredictionsMultiHours(ticker);

		if (!result.success) {
			throw new HttpException(
				{ message: 'Failed to get predictions', error: result.error },
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			ticker: (result as any).ticker,
			current_price: (result as any).current_price,
			current_time: (result as any).current_time,
			predictions: (result as any).predictions,
			timestamp: (result as any).timestamp
		};
	}

	@Get('analysis/:ticker')
	@ApiOperation({
		summary: 'Get complete stock analysis',
		description: 'Get comprehensive analysis including current price and predictions for a stock'
	})
	@ApiParam({
		name: 'ticker',
		description: 'Stock ticker symbol for complete analysis',
		type: 'string',
		example: 'AAPL'
	})
	@ApiResponse({
		status: 200,
		description: 'Complete stock analysis retrieved successfully',
		schema: {
			type: 'object',
			properties: {
				ticker: { type: 'string', example: 'AAPL' },
				current_price: { type: 'number', example: 150.25 },
				current_time: { type: 'string', example: '2023-10-09 14:30:00' },
				predictions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							hour: { type: 'number' },
							predicted_price: { type: 'number' },
							confidence: { type: 'number' }
						}
					}
				},
				price_success: { type: 'boolean', example: true },
				prediction_success: { type: 'boolean', example: true },
				errors: {
					type: 'object',
					properties: {
						price_error: { type: 'string', nullable: true },
						prediction_error: { type: 'string', nullable: true }
					}
				}
			}
		}
	})
	async getCompleteAnalysis(@Param('ticker') ticker: string) {
		// Get both current price and predictions
		const [priceResult, predictionResult] = await Promise.all([
			this.stockService.getCurrentPrice(ticker),
			this.stockService.getPredictionsMultiHours(ticker)
		]);

		return {
			ticker: ticker,
			current_price: priceResult.success ? (priceResult as any).price : (predictionResult as any).current_price,
			current_time: priceResult.success ? (priceResult as any).time : (predictionResult as any).current_time,
			predictions: predictionResult.success ? (predictionResult as any).predictions : [],
			price_success: priceResult.success,
			prediction_success: predictionResult.success,
			errors: {
				price_error: priceResult.success ? null : priceResult.error,
				prediction_error: predictionResult.success ? null : predictionResult.error
			}
		};
	}

	@Post('train')
	@ApiOperation({
		summary: 'Train ML model for stock',
		description: 'Train a Random Forest model for a specific stock ticker'
	})
	@ApiBody({
		description: 'Stock ticker to train model for',
		schema: {
			type: 'object',
			properties: {
				ticker: {
					type: 'string',
					description: 'Stock ticker symbol',
					example: 'AAPL'
				}
			},
			required: ['ticker']
		}
	})
	@ApiResponse({
		status: 200,
		description: 'Model training completed successfully',
		schema: {
			type: 'object',
			properties: {
				message: { type: 'string', example: 'Model trained successfully' },
				ticker: { type: 'string', example: 'AAPL' },
				features_count: { type: 'number', example: 1000 },
				timestamp: { type: 'number', example: 1696858200 }
			}
		}
	})
	@ApiResponse({
		status: 400,
		description: 'Bad request - ticker required or training failed'
	})
	async trainModel(@Body() body: { ticker: string }) {
		if (!body.ticker) {
			throw new HttpException(
				{ message: 'Ticker is required' },
				HttpStatus.BAD_REQUEST
			);
		}

		const result = await this.stockService.trainModel(body.ticker);

		if (!result.success) {
			throw new HttpException(
				{ message: 'Failed to train model', error: result.error },
				HttpStatus.BAD_REQUEST
			);
		}

		return {
			message: (result as any).message,
			ticker: (result as any).ticker,
			features_count: (result as any).features_count,
			timestamp: (result as any).timestamp
		};
	}
}