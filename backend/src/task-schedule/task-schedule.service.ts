import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StockPredictionService } from 'src/modules/stock/stock-prediction.service';

@Injectable()
export class TaskScheduleService {
  private readonly logger = new Logger(TaskScheduleService.name);

  constructor(private readonly stockService: StockPredictionService) {}

  // running when time in server get the new day
  @Cron('0 0 0 * * *')
  async trainAllModel() {
    await this.stockService.trainAllModels();
  }
}
