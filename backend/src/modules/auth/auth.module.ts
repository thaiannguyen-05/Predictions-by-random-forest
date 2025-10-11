import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from '../../email/email.module';
import { AuthOtherService } from './service/auth.other.service';
import { AuthTokenSerivec } from './service/auth.token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CookieStrategy } from '../../common/strategy/auth-cookie.strategy';
import { GoogleStrategy } from '../../common/strategy/google.strategy';
import { FacebookStrategy } from '../../common/strategy/facebook.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../../common/strategy/session.serializer'; // THÊM DÒNG NÀY

@Module({
  imports: [
    PassportModule.register({ 
      session: true, // ĐÃ CÓ
      defaultStrategy: 'jwt'
    }),
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
  providers: [
    AuthService, 
    AuthOtherService, 
    AuthTokenSerivec, 
    CookieStrategy, 
    GoogleStrategy, 
    FacebookStrategy,
    SessionSerializer // THÊM DÒNG NÀY
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }