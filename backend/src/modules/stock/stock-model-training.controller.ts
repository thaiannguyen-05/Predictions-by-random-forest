import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorator';
import { StockModelTrainingService } from './stock-model-training.service';

@ApiTags('Stock Training')
@Public()
@Controller('api/stock/training')
export class StockModelTrainingController {
  constructor(
    private readonly stockModelTrainingService: StockModelTrainingService,
  ) {}

  @Post('train-all-models-recent')
  @ApiOperation({
    summary: 'Train all model types on 40 tickers using recent 1 or 2 weeks',
    description:
      'Train Random Forest, Extra Trees, Decision Tree, and Bagging models for all tickers using data from the most recent 1 or 2 weeks',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        recent_weeks: {
          type: 'number',
          enum: [1, 2],
          example: 1,
        },
      },
      required: ['recent_weeks'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Train-all recent models request processed',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid recent_weeks or training failed',
  })
  async trainAllModelsRecent(@Body() body: { recent_weeks: 1 | 2 }) {
    const recentWeeks = Number(body?.recent_weeks);
    if (recentWeeks !== 1 && recentWeeks !== 2) {
      throw new HttpException(
        { message: 'recent_weeks must be 1 or 2' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.stockModelTrainingService.trainAllModelsRecent(
      recentWeeks as 1 | 2,
    );

    if (!result.success) {
      throw new HttpException(
        { message: 'Failed to train recent models', error: result.error },
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Train all recent models completed',
      recent_weeks: result.recent_weeks ?? recentWeeks,
      model_types: result.model_types || [],
      tickers_total: result.tickers_total || 0,
      total_jobs: result.total_jobs || 0,
      trained_jobs: result.trained_jobs || 0,
      failed_jobs: result.failed_jobs || 0,
      results: result.results || [],
      timestamp: Date.now(),
    };
  }
}
