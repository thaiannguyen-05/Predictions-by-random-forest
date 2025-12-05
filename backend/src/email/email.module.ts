import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';
import { EmailProducer } from './emai.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_EMAIL } from '../common/type/common.type';

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
              `amqp://${configService.getOrThrow<string>('ACCOUNT_RABBIT')}:${configService.getOrThrow<string>('PASSWORD_RABBIT')}@localhost:5672`,
            ],
            queue: QUEUE_EMAIL,
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [EmailService, EmailProducer],
  controllers: [EmailConsumer],
  exports: [EmailService, EmailProducer],
})
export class EmailModule {}
