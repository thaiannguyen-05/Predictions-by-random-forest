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
    await this.stockCompareCacheService.refreshAllTickersCompare();
    this.logger.log(`Handled ${TRAIN_EVENT} event`);
  }
}
