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

@Module({
  imports: [
    StockModule,
    ClientsModule.register([
      {
        name: 'MESSAGE_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: 'message_queue',
          queueOptions: {
            durable: true,
          },
        },
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
