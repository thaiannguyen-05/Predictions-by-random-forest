import { Controller, Logger } from '@nestjs/common';
import { StockCompareCacheService } from './stock-compare-cache.service';
import { EventPattern } from '@nestjs/microservices';
import { TRAIN_EVENT } from './constants';

@Controller()
export class StockTrainningEvent {
  private readonly logger = new Logger(StockTrainningEvent.name);

  constructor(
    private readonly stockCompareCacheService: StockCompareCacheService,
  ) {}

  @EventPattern(TRAIN_EVENT)
  async handleTrainEvent(payload?: Record<string, unknown>) {
    this.logger.log(
      `Received ${TRAIN_EVENT} event${payload ? `: ${JSON.stringify(payload)}` : ''}`,
    );

    const payloadRecentDays = Number(payload?.recent_days);
    const recentDays = Number.isFinite(payloadRecentDays)
      ? payloadRecentDays
      : undefined;

    await this.stockCompareCacheService.refreshAllTickersCompare(recentDays);
    this.logger.log(`Handled ${TRAIN_EVENT} event`);
  }
}
