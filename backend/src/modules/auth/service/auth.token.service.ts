import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AUTH_CONSTANT, Payload } from '..';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailProducer } from '../../../email/emai.producer';
@Injectable()
export class AuthTokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailProducer: EmailProducer,
  ) {}

  async generateTokens(user: { id: string; email: string; createdAt: Date }) {
    const payload: Payload = {
      sub: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: this.configService.getOrThrow<string>(
          'TIME_LIFE_ACCESS_TOKEN',
        ),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        expiresIn: this.configService.getOrThrow<string>(
          'TIME_LIFE_REFRESH_TOKEN',
        ),
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async storeSession(
    user: { id: string; email: string; username: string },
    userIp: string,
    userDevice: string,
    hashedRefreshToken: string,
  ) {
    const device = await this.prismaService.userDevice.findUnique({
      where: { nameDevice_userId: { nameDevice: userDevice, userId: user.id } },
    });

    const session = device
      ? await this.prismaService.session.findUnique({
          where: {
            userId_userDeviceId: { userDeviceId: device.id, userId: user.id },
          },
        })
      : null;

    if (!session) {
      this.emailProducer.sendDetectOtherDevice({
        to: user.email,
        username: user.username,
      });
      const newUserDevice = await this.prismaService.userDevice.create({
        data: {
          nameDevice: userDevice,
          userId: user.id,
          deviceId: uuidv4(),
        },
      });

      const session = await this.prismaService.session.create({
        data: {
          hashedRefreshToken,
          userIp,
          userDeviceId: newUserDevice.id,
          userId: user.id,
        },
      });

      return session;
    }

    return await this.prismaService.session.update({
      where: { id: session.id },
      data: {
        hashedRefreshToken,
        userIp,
      },
    });
  }

  async createSession(
    user: { id: string; email: string; username: string; createdAt: Date },
    ip: string,
    userAgent: string,
    res: Response,
  ) {
    const tokens = await this.generateTokens(user);
    const hashedRefreshToken = await hash(tokens.refreshToken);
    const session = await this.storeSession(
      user,
      ip,
      userAgent,
      hashedRefreshToken,
    );

    console.log('hera');

    res
      .cookie('session_id', session.id, {
        maxAge: AUTH_CONSTANT.TIME_LIFE_SESSION,
        ...AUTH_CONSTANT.COOKIE_CONFIG.SESSION,
      })
      .cookie('access_token', tokens.accessToken, {
        maxAge: AUTH_CONSTANT.TIME_LIFE_ACCESS_TOKEN,
        ...AUTH_CONSTANT.COOKIE_CONFIG.ACCESS_TOKEN,
      })
      .cookie('refresh_token', tokens.refreshToken, {
        maxAge: AUTH_CONSTANT.TIME_LIFE_REFRESH_TOKEN,
        ...AUTH_CONSTANT.COOKIE_CONFIG.REFRESH_TOKEN,
      });

    return { session, tokens };
  }

  async refreshToken(
    sessionId: string,
    refreshToken: string,
    ip: string,
    userAgent: string,
    res: Response,
  ) {
    try {
      const session = await this.prismaService.session.findUnique({
        where: { id: sessionId },
        include: {
          user: true,
        },
      });
      if (!session) throw new UnauthorizedException('Invalid session');

      if (!session.hashedRefreshToken)
        throw new UnauthorizedException('Invalid session');
      const isValidToken = await verify(
        session.hashedRefreshToken,
        refreshToken,
      );
      if (!isValidToken)
        throw new UnauthorizedException('Invalid refreshtoken');

      let payload: Payload;
      try {
        payload = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.configService.getOrThrow<string>('JWT_SECRET'),
        });
      } catch (_error) {
        await this.prismaService.session.delete({ where: { id: sessionId } });
        throw new UnauthorizedException('Refresh token expired or invalid');
      }

      if (payload.sub !== session.userId) {
        await this.prismaService.session.delete({ where: { id: sessionId } });
        throw new UnauthorizedException('Token user mismatch');
      }

      const user = await this.prismaService.user.findUnique({
        where: { id: session.userId, isActive: true },
      });
      if (!user) throw new NotFoundException('User not found or active');

      await this.storeSession(user, ip, userAgent, session.hashedRefreshToken);

      const newTokens = await this.generateTokens(user);
      const newHashedRefreshToken = await hash(newTokens.refreshToken);

      const newSesison = await this.prismaService.session.update({
        where: { id: sessionId },
        data: {
          hashedRefreshToken: newHashedRefreshToken,
          userIp: ip,
        },
      });

      res
        .cookie('session_id', session.id, {
          maxAge: AUTH_CONSTANT.TIME_LIFE_SESSION,
          ...AUTH_CONSTANT.COOKIE_CONFIG.SESSION,
        })
        .cookie('access_token', newTokens.accessToken, {
          maxAge: AUTH_CONSTANT.TIME_LIFE_ACCESS_TOKEN,
          ...AUTH_CONSTANT.COOKIE_CONFIG.ACCESS_TOKEN,
        })
        .cookie('refresh_token', newTokens.refreshToken, {
          maxAge: AUTH_CONSTANT.TIME_LIFE_REFRESH_TOKEN,
          ...AUTH_CONSTANT.COOKIE_CONFIG.REFRESH_TOKEN,
        });

      return {
        session: newSesison,
        tokens: newTokens,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      console.error('Refresh token error:', {
        sessionId,
        ip,
        userAgent,
        error: error.message,
        timestamp: new Date(),
      });

      throw error;
    }
  }
}
