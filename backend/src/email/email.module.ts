import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_EMAIL } from '../common/type/common.type';
import { EmailController } from './email.controller';

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
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService],
})
export class EmailModule {}
