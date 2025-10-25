import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailConsumer } from './email.consumer';
import { EmailProducer } from './emai.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'email_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    EmailModule,
  ],
  providers: [EmailService, EmailProducer],
  controllers: [EmailConsumer],
  exports: [EmailService, EmailProducer],
})
export class EmailModule {}
