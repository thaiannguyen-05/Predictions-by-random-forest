import { Module } from '@nestjs/common';
import { SupportChatService } from './support-chat.service';
import { StockModule } from '../stock/stock.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageService } from './service/message/message.service';
import { MessageProducer } from './service/message/queue_service/message.producer';
import { MessageConsumer } from './service/message/queue_service/message.consumer';
import { BatchInsertService } from './service/message/queue_service/batchInsert.service';
import { RedisService } from './service/message/redis.service';
import { TestController } from './service/message/test.controller';
import { RoomService } from './service/room/room.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SupportChatController } from './suport-chat.controller';
import { FaqService } from './service/FAQ-service/Faq.service';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';

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
    StockModule,
    UserModule,
    ClientsModule.registerAsync([
      {
        name: 'MESSAGE_QUEUE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [buildRabbitMqUrl(configService)],
            queue: 'message_queue',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [
    SupportChatService,
    MessageService,
    MessageProducer,
    BatchInsertService,
    RedisService,
    PrismaService,
    RoomService,
    FaqService,
  ],
  controllers: [MessageConsumer, TestController, SupportChatController],
  exports: [MessageService, RedisService],
})
export class SupportChatModule {}
