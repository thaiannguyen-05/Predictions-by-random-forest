import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { StockPredictionService } from './stock-prediction.service';
import { Public } from '../../common/decorator/public.decorator';

@ApiTags('Stock')
@Public()
@Controller('api/stock')
export class StockController {
  constructor(private readonly stockService: StockPredictionService) { }

  @Get('health')
  @ApiOperation({
    summary: 'Health check for ML service',
    description:
      'Check the connection status to the machine learning prediction service',
  })
  @ApiResponse({
    status: 200,
    description: 'ML service is connected and operational',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        ml_service: { type: 'string', example: 'connected' },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'ML service is unavailable or connection failed',
  })
  async health() {
    try {
      const result = await this.stockService.ping();
      if (!result.success) {
        throw new HttpException(
          { message: 'ML service is not available', error: result.error },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }
      return { status: 'ok', ml_service: 'connected' };
    } catch (_error) {
      throw new HttpException(
        { message: 'ML service connection failed' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Get('current-price/:ticker')
  @ApiOperation({
    summary: 'Get current stock price',
    description:
      'Retrieve the current price for a specific stock ticker symbol',
  })
  @ApiParam({
    name: 'ticker',
    description: 'Stock ticker symbol (e.g., AAPL, GOOGL, TSLA)',
    type: 'string',
    example: 'AAPL',
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
        timestamp: { type: 'number', example: 1696858200 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid ticker or price retrieval failed',
  })
  async getCurrentPrice(@Param('ticker') ticker: string) {
    const result = await this.stockService.getCurrentPrice(ticker);

    if (!result.success) {
      throw new HttpException(
        { message: 'Failed to get current price', error: result.error },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      ticker: result.ticker || ticker,
      price: result.price || 0,
      time: result.time || new Date().toISOString(),
      timestamp: Date.now(),
    };
  }

  @Get('financial/:ticker')
  @ApiOperation({
    summary: 'Get financial data for stock',
    description:
      'Retrieve comprehensive financial information including open, high, low, volume, market cap, P/E ratio, EPS, and beta',
  })
  @ApiParam({
    name: 'ticker',
    description: 'Stock ticker symbol',
    type: 'string',
    example: 'FPT',
  })
  @ApiResponse({
    status: 200,
    description: 'Financial data retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        ticker: { type: 'string', example: 'FPT.VN' },
        previousClose: { type: 'number', example: 98500, nullable: true },
        open: { type: 'number', example: 98000, nullable: true },
        high: { type: 'number', example: 99500, nullable: true },
        low: { type: 'number', example: 97500, nullable: true },
        volume: { type: 'number', example: 1000000, nullable: true },
        marketCap: { type: 'number', example: 50000000000, nullable: true },
        peRatio: { type: 'number', example: 15.5, nullable: true },
        eps: { type: 'number', example: 6500, nullable: true },
        beta: { type: 'number', example: 1.2, nullable: true },
        yahooPrice: { type: 'number', example: 98500, nullable: true },
        timestamp: { type: 'string', example: '2023-10-09T14:30:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - failed to retrieve financial data',
  })
  async getFinancialData(@Param('ticker') ticker: string) {
    const result = await this.stockService.getFinancialData(ticker);

    if (!result.success) {
      throw new HttpException(
        { message: 'Failed to get financial data', error: result.error },
        HttpStatus.BAD_REQUEST,
      );
    }

    const data = result.data || {};
    return {
      ticker: data['ticker'] || ticker,
      previousClose: data['previous_close'] ?? null,
      open: data['open'] ?? null,
      high: data['high'] ?? null,
      low: data['low'] ?? null,
      volume: data['volume'] ?? null,
      marketCap: data['market_cap'] ?? null,
      peRatio: data['pe_ratio'] ?? null,
      eps: data['eps'] ?? null,
      beta: data['beta'] ?? null,
      yahooPrice: data['yahoo_price'] ?? null,
      timestamp: result.timestamp || new Date().toISOString(),
    };
  }

  @Get('predictions/:ticker')
  @ApiOperation({
    summary: 'Get stock price predictions',
    description:
      'Get multi-hour stock price predictions using Random Forest ML model',
  })
  @ApiParam({
    name: 'ticker',
    description: 'Stock ticker symbol for predictions',
    type: 'string',
    example: 'AAPL',
  })
  @ApiResponse({
    status: 200,
    description: 'Stock predictions retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        ticker: { type: 'string', example: 'AAPL' },
        prediction: { type: 'string', example: 'AAPL' },
        current_price: { type: 'number', example: 150.25 },
        current_time: { type: 'string', example: '2023-10-09 14:30:00' },
        predictions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              hour: { type: 'number', example: 1 },
              predicted_price: { type: 'number', example: 151.5 },
              confidence: { type: 'number', example: 0.85 },
            },
          },
        },
        timestamp: { type: 'number', example: 1696858200 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - prediction failed or invalid ticker',
  })
  async getPredictions(@Param('ticker') ticker: string) {
    const result = await this.stockService.getPredictionsMultiHours(ticker);

    if (!result.success) {
      throw new HttpException(
        { message: 'Failed to get predictions', error: result.error },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      ticker: result.ticker || ticker,
      prediction: ticker,
      current_price: result.current_price || 0,
      current_time: result.current_time || new Date().toISOString(),
      predictions: result.predictions || [],
      timestamp: result.timestamp || Date.now(),
    };
  }

  @Get('analysis/:ticker')
  @ApiOperation({
    summary: 'Get complete stock analysis',
    description:
      'Get comprehensive analysis including current price and predictions for a stock',
  })
  @ApiParam({
    name: 'ticker',
    description: 'Stock ticker symbol for complete analysis',
    type: 'string',
    example: 'AAPL',
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
              confidence: { type: 'number' },
            },
          },
        },
        price_success: { type: 'boolean', example: true },
        prediction_success: { type: 'boolean', example: true },
        errors: {
          type: 'object',
          properties: {
            price_error: { type: 'string', nullable: true },
            prediction_error: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  async getCompleteAnalysis(@Param('ticker') ticker: string) {
    // Get both current price and predictions
    const [priceResult, predictionResult] = await Promise.all([
      this.stockService.getCurrentPrice(ticker),
      this.stockService.getPredictionsMultiHours(ticker),
    ]);

    return {
      ticker: ticker,
      current_price: priceResult.success
        ? priceResult.price
        : predictionResult.current_price,
      current_time: priceResult.success
        ? priceResult.time
        : predictionResult.current_time,
      predictions: predictionResult.success ? predictionResult.predictions : [],
      price_success: priceResult.success,
      prediction_success: predictionResult.success,
      errors: {
        price_error: priceResult.success ? null : priceResult.error,
        prediction_error: predictionResult.success
          ? null
          : predictionResult.error,
      },
    };
  }

  @Post('train')
  @ApiOperation({
    summary: 'Train ML model for stock',
    description: 'Train a Random Forest model for a specific stock ticker',
  })
  @ApiBody({
    description: 'Stock ticker to train model for',
    schema: {
      type: 'object',
      properties: {
        ticker: {
          type: 'string',
          description: 'Stock ticker symbol',
          example: 'AAPL',
        },
      },
      required: ['ticker'],
    },
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
        timestamp: { type: 'number', example: 1696858200 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - ticker required or training failed',
  })
  async trainModel(@Body() body: { ticker: string }) {
    if (!body.ticker) {
      throw new HttpException(
        { message: 'Ticker is required' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.stockService.trainModel(body.ticker);

    if (!result.success) {
      throw new HttpException(
        { message: 'Failed to train model', error: result.error },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: result.message || 'Training completed',
      ticker: body.ticker,
      features_count: result.features_count || 0,
      timestamp: Date.now(),
    };
  }
}
