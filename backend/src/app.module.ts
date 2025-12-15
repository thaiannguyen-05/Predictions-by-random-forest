import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './modules/stock/stock.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { CookieGuard } from './modules/auth/guard/cookie.guard';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from './modules/redis/redis.module';
import { SupportChatModule } from './modules/support-chat/support-chat.module';
import { LoggerModule } from './logger/logger.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommentModule } from './modules/comment/comment.module';
import { PostModule } from './modules/post/post.module';
import { ContactModule } from './modules/contact/contact.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    StockModule,
    PrismaModule,
    EmailModule,
    AuthModule,
    UserModule,
    RedisModule,
    SupportChatModule,
    LoggerModule,
    CommentModule,
    PostModule,
    ContactModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_GUARD,
      inject: [Reflector],
      useFactory: (reflector: Reflector) => new CookieGuard(reflector),
    },
  ],
})
export class AppModule {}
