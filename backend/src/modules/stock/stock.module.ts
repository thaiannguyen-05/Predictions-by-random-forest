import { Module } from '@nestjs/common';
import { StockPredictionService } from './stock-prediction.service';
import { StockController } from './stock.controller';

@Module({
  imports: [],
  providers: [StockPredictionService],
  controllers: [StockController],
  exports: [StockPredictionService],
})
export class StockModule {}
