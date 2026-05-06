import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QUEUE_EMAIL } from '../common/type';
import { EmailConsumer } from './email.consumer';
import { EmailProducer } from './emai.producer';
import { EmailController } from './email.controller';
import { RedisModule } from '../modules/redis/redis.module';

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
    ClientsModule.registerAsync([
      {
        name: 'EMAIL_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [buildRabbitMqUrl(configService)],
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
