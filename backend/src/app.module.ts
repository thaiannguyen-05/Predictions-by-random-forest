import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from './stock.controller';
import { StockPredictionService } from './stock-prediction.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, StockController],
  providers: [AppService, StockPredictionService],
})
export class AppModule { }
