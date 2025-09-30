import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/email/email.module';
import { AuthOtherService } from './service/auth.other.service';
import { AuthTokenSerivec } from './service/auth.token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CookieStrategy } from 'src/common/strategy/auth-cookie.strategy';
@Module({
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: { expiresIn: '1d' }
      })
    })
  ],
  providers: [AuthService, AuthOtherService, AuthTokenSerivec, CookieStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}