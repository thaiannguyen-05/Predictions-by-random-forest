import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StockPredictionService } from './stock-prediction.service';
import { StockController } from './stock.controller';
import { StockModelTrainingController } from './stock-model-training.controller';
import { StockModelTrainingService } from './stock-model-training.service';

@Module({
  imports: [ConfigModule],
  providers: [StockPredictionService, StockModelTrainingService],
  controllers: [StockController, StockModelTrainingController],
  exports: [StockPredictionService, StockModelTrainingService],
})
export class StockModule {}
