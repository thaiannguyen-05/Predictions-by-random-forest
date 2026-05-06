import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Prisma } from '../../../prisma/generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { MLServiceResponse } from './interfaces';
import { STOCK_COMPARE_CONFIG } from './constants';
import { StockPredictionService } from './stock-prediction.service';

type PredictionType = 'tomorrow' | 'multi_hours';

@Injectable()
export class StockPredictionCacheService {
  private readonly logger = new Logger(StockPredictionCacheService.name);
  private isRefreshing = false;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly stockPredictionService: StockPredictionService,
  ) {}

  async getTomorrowPrediction(ticker: string): Promise<MLServiceResponse> {
    return this.getOrCreatePrediction(ticker, 'tomorrow');
  }

  async getMultiHoursPrediction(ticker: string): Promise<MLServiceResponse> {
    return this.getOrCreatePrediction(ticker, 'multi_hours');
  }

  @Cron(STOCK_COMPARE_CONFIG.PREDICTION_CRON_EXPRESSION)
  async refreshPredictionsByCron() {
    if (this.isRefreshing) {
      this.logger.warn('Prediction cache refresh is already running, skip');
      return;
    }

    this.isRefreshing = true;

    try {
      for (const ticker of STOCK_COMPARE_CONFIG.TICKERS) {
        await this.computeAndSavePrediction(ticker, 'tomorrow');
        await this.computeAndSavePrediction(ticker, 'multi_hours');
      }
    } finally {
      this.isRefreshing = false;
    }
  }

  private async getOrCreatePrediction(
    ticker: string,
    predictionType: PredictionType,
  ): Promise<MLServiceResponse> {
    const normalizedTicker = this.normalizeTicker(ticker);
    const cached = await this.getLatestFromDb(normalizedTicker, predictionType);

    if (cached) {
      return cached;
    }

    return this.computeAndSavePrediction(normalizedTicker, predictionType);
  }

  private async computeAndSavePrediction(
    ticker: string,
    predictionType: PredictionType,
  ): Promise<MLServiceResponse> {
    const response =
      predictionType === 'tomorrow'
        ? await this.stockPredictionService.getPredictionSingle(ticker)
        : await this.stockPredictionService.getPredictionsMultiHours(ticker);

    if (!response.success) {
      return response;
    }

    await this.prismaService.stock_prediction_cache.create({
      data: {
        ticker,
        predictionType,
        payload: response as unknown as Prisma.InputJsonValue,
        generatedAt: new Date(),
      },
    });

    return response;
  }

  private async getLatestFromDb(
    ticker: string,
    predictionType: PredictionType,
  ): Promise<MLServiceResponse | null> {
    const latest = await this.prismaService.stock_prediction_cache.findFirst({
      where: {
        ticker,
        predictionType,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!latest || !latest.payload || typeof latest.payload !== 'object') {
      return null;
    }

    const payload = latest.payload as Record<string, unknown>;

    return {
      ...(payload as unknown as MLServiceResponse),
      success: true,
    };
  }

  private normalizeTicker(ticker: string): string {
    return ticker.trim().toUpperCase();
  }
}
