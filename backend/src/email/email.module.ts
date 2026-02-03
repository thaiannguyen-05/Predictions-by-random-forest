import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_EMAIL } from '../common/type';
import { EmailConsumer } from './email.consumer';
import { EmailProducer } from './emai.producer';
import { EmailController } from './email.controller';
import { RedisModule } from '../modules/redis/redis.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'EMAIL_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${configService.getOrThrow<string>('RABBITMQ_USER')}:${configService.getOrThrow<string>('RABBITMQ_PASS')}@localhost:5672`,
            ],
            queue: QUEUE_EMAIL,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
    RedisModule,
  ],
  providers: [EmailService, EmailProducer],
  controllers: [EmailConsumer, EmailController],
  exports: [EmailService, EmailProducer],
})
export class EmailModule {}
