import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_STOCK_MODEL_TRAINING } from '../../common/type/constants';
import { StockCompareCacheService } from './stock-compare-cache.service';
import { StockModelTrainingController } from './stock-model-training.controller';
import { StockModelTrainingService } from './stock-model-training.service';
import { StockPredictionService } from './stock-prediction.service';
import { StockController } from './stock.controller';
import { StockTrainningEvent } from './stock-trainning-event';

function buildRabbitMqUrl(configService: ConfigService): string {
  const user = configService.getOrThrow<string>('RABBITMQ_USER');
  const pass = configService.getOrThrow<string>('RABBITMQ_PASS');
  const host = configService.get<string>('RABBITMQ_HOST') || 'localhost';
  const port = configService.get<string>('RABBITMQ_PORT') || '5672';
  const vhost = configService.get<string>('RABBITMQ_VHOST');
  const normalizedVhost = vhost?.replace(/^\/+/, '');
  const vhostPath = normalizedVhost
    ? `/${encodeURIComponent(normalizedVhost)}`
    : '';

  return `amqp://${user}:${pass}@${host}:${port}${vhostPath}`;
}

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: QUEUE_STOCK_MODEL_TRAINING,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [buildRabbitMqUrl(configService)],
            queue: QUEUE_STOCK_MODEL_TRAINING,
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    StockPredictionService,
    StockModelTrainingService,
    StockCompareCacheService,
  ],
  controllers: [
    StockController,
    StockModelTrainingController,
    StockTrainningEvent,
  ],
  exports: [
    StockPredictionService,
    StockModelTrainingService,
    StockCompareCacheService,
  ],
})
export class StockModule {}
