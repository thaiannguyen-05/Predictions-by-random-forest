import { Injectable } from '@nestjs/common';
import { StockPredictionService } from './stock-prediction.service';
import { MLServiceResponse } from './interfaces';

@Injectable()
export class StockModelTrainingService {
  constructor(
    private readonly stockPredictionService: StockPredictionService,
  ) {}

  async trainAllModelsRecent(
    recentWeeks: 1 | 2,
    tickers?: string[],
    modelTypes?: string[],
  ): Promise<MLServiceResponse> {
    return this.stockPredictionService.trainAllModelsRecent(
      recentWeeks,
      tickers,
      modelTypes,
    );
  }
}
