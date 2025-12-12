import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { QUEUE_EMAIL } from './common/type/common.type';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Stock Prediction API')
    .setDescription(
      'Stock price prediction platform API documentation using Random Forest ML model',
    )
    .setVersion('1.0')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('User', 'User management endpoints')
    .addTag('Stock', 'Stock prediction endpoints')
    .addTag('App', 'General application endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Configure Helmet - allow images from self and disable CORP for static files
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: [
            "'self'",
            'data:',
            'blob:',
            'http://localhost:4000',
            'https://ui-avatars.com',
          ],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );
  app.use('/upload', express.static(join(__dirname, '..', 'upload')));
  app.use('/payment/webhook', bodyParser.raw({ type: 'application/json' }));
  app.getHttpAdapter().getInstance().set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.connectMicroservice<MicroserviceOptions>({
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
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
