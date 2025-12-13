import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StockPredictionService } from './stock-prediction.service';
import { StockController } from './stock.controller';

@Module({
  imports: [ConfigModule],
  providers: [StockPredictionService],
  controllers: [StockController],
  exports: [StockPredictionService],
})
export class StockModule {}
