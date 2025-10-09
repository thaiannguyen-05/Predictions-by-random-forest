import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import * as express from 'express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true, // nếu gửi cookie
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'email_queue',
      queueOptions: {
        durable: false,
      },
    }
  })
  app.getHttpAdapter().getInstance().set('trust proxy', 1)
  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
