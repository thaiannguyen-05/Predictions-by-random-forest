import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';
import { EmailProducer } from './emai.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_EMAIL } from '../common/type/common.type';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://blog:Andev2005%40@localhost:5672'],
          queue: QUEUE_EMAIL,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [EmailService, EmailProducer],
  controllers: [EmailConsumer],
  exports: [EmailService, EmailProducer],
})
export class EmailModule {}
