import { Module } from '@nestjs/common';
import { TaskScheduleService } from './task-schedule.service';
import { StockModule } from '../modules/stock/stock.module';

@Module({
  imports: [StockModule],
  providers: [TaskScheduleService],
})
export class TaslScheduleModule {}
