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
  FacebookOAuth2User,
  GoogleOAuth2User,
  Payload,
} from '../auth.interface';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyAccount } from '../dto/verify-account.dto';
import { AuthOtherService } from './auth.other.service';
import { AuthTokenService } from './auth.token.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { DateUtils } from '../../../common/utils/string-to-date.utils';
import { isUUID } from '../../../common/utils/uuid.utils';
import { Provider } from '../../../../prisma/generated/prisma';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';
import { AUTH_CONSTANT } from '../auth.constants';
import { EmailProducer } from '../../../email/emai.producer';

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
  ) {}

  private async findUserByAccessor(accessor: string) {
    if (isUUID(accessor)) {
      const availableUser = await this.prismaService.user.findUnique({
        where: { id: accessor },
        omit: { hashedPassword: false },
      });

      return availableUser;
    }

    const userLoginWithoutUuid = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: accessor }, { username: accessor }],
      },
      omit: { hashedPassword: false },
    });

    return userLoginWithoutUuid;
  }

  async register(dto: CreateAccountDto) {
    // check available user
    const availableUser = await this.findUserByAccessor(dto.email);
    if (availableUser) throw new ConflictException('Account is available');

    // hash password
    const hashedPassword = await hash(dto.password);

    // trans dto
    const dateOfBirth = DateUtils.stringToBirthday(dto.dateOfBirth);

    // create new record
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

    // send verification code to email
    this.emailProducer.sendVerifyCodeRegister({ to: newAccount.email });
    this.logger.debug(`Verification code sent to ${newAccount.email}`);

    return {
      status: true,
      data: {
        newUser: newAccount,
      },
    };
  }

  // ===============================
  // VERIFY ACCOUNT
  // ===============================
  async verifyAccount(dto: VerifyAccount) {
    if (!dto.code) {
      throw new BadRequestException('Verification code is required');
    }

    const availableUser = await this.findUserByAccessor(dto.to);
    if (!availableUser) throw new NotFoundException('User not found');

    // check isActive
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

    // validate code
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

  // ===============================
  // LOGIN
  // ===============================
  async login(dto: LoginDto, res: Response) {
    const user = await this.findUserByAccessor(dto.access);
    if (!user) throw new NotFoundException('User not found');

    if (!user.hashedPassword) {
      throw new ForbiddenException('Invalid login credentials or method.');
    }

    // check valid password
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

    const account = await this.findUserByAccessor(userId);
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

    this.emailProducer.sendNotifiCaitonChangePassword({
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
    // check user exitsing
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    let _userOauth2;

    // check if user doesnt exitsing
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
      // Update existing OAuth2 user data
      _userOauth2 = await this.prismaService.oauth2User.update({
        where: { id: oauth2User?.id ?? '' },
        // where: { id: user?.id },
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

    // get hardware
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
      // 1. Verify the token using the secret key
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      // 2. Fetch the user from the database
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
        omit: { hashedPassword: false },
      });

      // 3. Return the user if found, otherwise return null/throw
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid or inactive user');
      }

      // The returned value is what NestJS Passport injects into the request object (req.user)
      return user;
    } catch (_error) {
      // Handle common JWT errors (e.g., expiration, invalid signature)
      throw new UnauthorizedException('Token validation failed');
    }
  }

  async getMe(token: string) {
    const payload: Payload = this.jwtService.verify(token, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });

    const user = await this.findUserByAccessor(payload.sub);

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
