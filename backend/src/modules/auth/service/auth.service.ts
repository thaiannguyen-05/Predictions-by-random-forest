import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import {
  AUTH_CONSTANT,
  FacebookOAuth2User,
  GoogleOAuth2User,
  Payload,
} from '..';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyAccount } from '../dto/verify-account.dto';
import { AuthOtherService } from './auth.other.service';
import { AuthTokenService } from './auth.token.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { DateUtils } from '../../../common/utils/string-to-date.utils';
import { Provider } from '../../../../prisma/generated/prisma';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';
import { EmailProducer } from '../../../email/emai.producer';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authOtherService: AuthOtherService,
    private readonly tokenService: AuthTokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly logger: MyLogger,
    private readonly emailProducer: EmailProducer,
    private readonly userService: UserService,
  ) {}

  async register(dto: CreateAccountDto) {
    const availableUser = await this.userService.findUserByEmail(dto.email);
    if (availableUser) throw new ConflictException('Account is available');

    const hashedPassword = await hash(dto.password);

    const dateOfBirth = DateUtils.stringToBirthday(dto.dateOfBirth);

    const newAccount = await this.prismaService.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        firstName: dto.firstName,
        lastName: dto.lastName,
        hashedPassword,
        dateOfBirth,
        fullname: `${dto.firstName} ${dto.lastName}`,
      },
    });

    this.emailProducer.sendVerifyCodeRegister({ to: newAccount.email });
    this.logger.debug(`Verification code sent to ${newAccount.email}`);

    return {
      status: true,
      data: {
        newUser: newAccount,
      },
    };
  }

  async verifyAccount(dto: VerifyAccount) {
    if (!dto.code) {
      throw new BadRequestException('Verification code is required');
    }

    const availableUser = await this.userService.findUserByEmail(dto.to);
    if (!availableUser) throw new NotFoundException('User not found');

    if (availableUser.isActive) {
      throw new ConflictException('Account is already verified');
    }

    const key = AUTH_CONSTANT.KEY_VERIFY_CODE(availableUser.email);
    const storedCode = await this.redisService.get(key);

    this.logger.debug(
      `Verification code for ${availableUser.email}: ${storedCode}`,
    );

    if (!storedCode) {
      throw new BadRequestException('Verification code expired or not found');
    }

    if (dto.code.localeCompare(storedCode) !== 0) {
      throw new BadRequestException('Invalid verification code');
    }

    try {
      await this.prismaService.user.update({
        where: { id: availableUser.id },
        data: { isActive: true },
      });

      this.logger.debug(
        `Account verified successfully for ${availableUser.email}`,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Error verifying account: ${errorMessage}`,
        'AuthService.verifyAccount',
      );
      throw new BadRequestException('Failed to verify account');
    }

    await this.redisService.del(key);
    this.logger.debug(`Verification code for ${availableUser.email} deleted`);

    return {
      status: true,
      message: 'Account verified successfully',
    };
  }

  async login(dto: LoginDto, res: Response) {
    const user = await this.userService.findUserByEmail(dto.access);
    if (!user) throw new NotFoundException('User not found');

    if (!user.hashedPassword) {
      throw new ForbiddenException('Invalid login credentials or method.');
    }

    const valid = await verify(user.hashedPassword, dto.password);
    if (!valid) throw new ForbiddenException('Password is not correct');

    const { hashedPassword: _hashedPassword, ...userWithoutPassword } = user;
    const hardware = this.authOtherService.getClientInfo(res.req as Request);
    const { tokens } = await this.tokenService.createSession(
      user,
      hardware.ip,
      hardware.userAgent,
      res,
    );

    return {
      data: userWithoutPassword,
      tokens,
    };
  }

  async logout(res: Response, sessionId?: string) {
    const sid =
      sessionId || (res.req.cookies?.session_id as string | undefined);
    if (!sid) throw new BadRequestException('Session id required');

    await this.prismaService.session.update({
      where: { id: sid },
      data: { hashedRefreshToken: null },
    });
    res
      .clearCookie('access_token', { path: '/' })
      .clearCookie('refresh_token', { path: '/' })
      .clearCookie('session_id', { path: '/' });

    return { status: true };
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    if (!userId) throw new UnauthorizedException('Unauthorized');

    const account = await this.userService.findUserById(userId);
    if (!account) throw new NotFoundException('User not found');

    if (!account.hashedPassword) {
      throw new ForbiddenException(
        'Account does not have a locally set password.',
      );
    }

    const valid = await verify(account.hashedPassword, dto.password);
    if (!valid) throw new ForbiddenException('Password is not correct');

    const newHashedPassword = await hash(dto.newPassword);
    await this.prismaService.user.update({
      where: { id: account.id },
      data: { hashedPassword: newHashedPassword },
    });

    this.emailProducer.sendNotificationChangePassword({
      to: account.email,
      username: account.username,
    });

    return { status: true };
  }

  public async refreshToken(
    sessionId: string | undefined,
    refreshToken: string,
    res: Response,
  ) {
    const sid =
      sessionId || (res.req.cookies?.session_id as string | undefined);
    const hardware = this.authOtherService.getClientInfo(res.req as Request);
    return await this.tokenService.refreshToken(
      sid as string,
      refreshToken,
      hardware.ip,
      hardware.userAgent,
      res,
    );
  }

  async validateOauth2({
    providerUserId,
    email,
    fullname,
    firstname,
    lastname,
    avatarUrl,
    username,
    provider,
  }: {
    providerUserId: string;
    email: string;
    fullname: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
    username?: string;
    provider: Provider;
  }) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    let _userOauth2;

    if (!user) {
      const newUserId = randomUUID();
      const [user, _userOauth2] = await this.prismaService.$transaction([
        this.prismaService.user.create({
          data: {
            id: newUserId,
            fullname,
            username: username ?? `user_${newUserId}`,
            email,
            accountType: 'OAUTH2',
            isActive: true,
            hashedPassword: null,
            avtUrl: avatarUrl,
          },
        }),
        this.prismaService.oauth2User.create({
          data: {
            provider,
            providerUserId,
            email,
            firstname,
            lastname,
            fullname,
            avatarUrl,
            username,
            userId: newUserId,
          },
        }),
      ]);

      return user;
    }

    const oauth2User = await this.prismaService.oauth2User.findFirst({
      where: {
        email,
        providerUserId,
        userId: user?.id,
      },
    });

    if (!oauth2User && user) {
      _userOauth2 = await this.prismaService.oauth2User.create({
        data: {
          provider,
          providerUserId,
          email,
          fullname,
          firstname,
          lastname,
          avatarUrl,
          username,
          userId: user?.id,
        },
      });
    } else if (oauth2User && user) {
      _userOauth2 = await this.prismaService.oauth2User.update({
        where: { id: oauth2User?.id ?? '' },

        data: {
          providerUserId,
          fullname,
          firstname,
          lastname,
          avatarUrl,
          username,
        },
      });
    }

    return user;
  }

  async oauth2Login(
    user: FacebookOAuth2User | GoogleOAuth2User,
    res: Response,
  ) {
    const provider = user.provider;
    const {
      providerUserId,
      email,
      fullname,
      firstname,
      lastname,
      avatarUrl,
      username,
    } = user;

    this.logger.debug(`OAuth2 user login: ${JSON.stringify(user)}`);

    const validateUser = await this.validateOauth2({
      providerUserId,
      email,
      fullname,
      firstname,
      lastname,
      avatarUrl,
      username,
      provider,
    });

    const _userOauth2 = {
      id: validateUser,
    };

    const hardware = this.authOtherService.getClientInfo(res.req as Request);

    const oauth2User = {
      id: validateUser.id,
      email: validateUser.email,
      username: validateUser.username,
      createdAt: new Date(),
    };

    const { tokens } = await this.tokenService.createSession(
      oauth2User,
      hardware.ip,
      hardware.userAgent,
      res,
    );

    return {
      data: oauth2User,
      tokens,
    };
  }

  public async validate(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
        omit: { hashedPassword: false },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid or inactive user');
      }

      return user;
    } catch (_error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }

  async getMe(token: string) {
    const payload: Payload = this.jwtService.verify(token, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });

    const user = await this.userService.findUserById(payload.sub);

    if (!user) throw new UnauthorizedException('User not found');
    if (!user.isActive) throw new UnauthorizedException('User inactive');

    const name =
      user.fullname ||
      `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
      user.username ||
      user.email;

    const avatar = user.picture || user.avtUrl || undefined;
    let displayEmail = user.email;
    if (
      user.provider === 'facebook' &&
      (user.email.includes('.fb@') || user.email.includes('@facebook.com'))
    ) {
      displayEmail = `${user.username || user.id}@facebook.com`;
    }

    this.logger.debug(`user has been get ${JSON.stringify(user)}`);

    return {
      id: user.id,
      email: displayEmail,
      username: user.username,
      name,
      avatar,
      isActive: user.isActive,
      provider: user.provider,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };
  }
}
