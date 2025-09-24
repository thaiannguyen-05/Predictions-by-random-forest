import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { StockPredictionService } from './stock-prediction.service';

@Controller('api/stock')
export class StockController {
	constructor(private readonly stockService: StockPredictionService) { }

	@Get('health')
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