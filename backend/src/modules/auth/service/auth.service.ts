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
import { FacebookOAuth2User, GoogleOAuth2User } from '../auth.interface';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyAccount } from '../dto/verify-account.dto';
import { AuthOtherService } from './auth.other.service';
import { AuthTokenService } from './auth.token.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailProducer } from '../../../email/emai.producer';
import { DateUtils } from '../../../common/utils/string-to-date.utils';
import { Provider } from '../../../../prisma/generated/prisma';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';
import { AUTH_CONSTANT } from '../auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailProducer: EmailProducer,
    private readonly authOtherService: AuthOtherService,
    private readonly tokenService: AuthTokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly logger: MyLogger,
  ) {}

  public async register(dto: CreateAccountDto) {
    const account = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (account) throw new ConflictException('Account is available');

    const hashedPassword = await hash(dto.password);
    const dateOfBirth = DateUtils.stringToBirthday(dto.dateOfBirth);

    const newAccount = await this.prismaService.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        firstName: dto.firstName,
        lastName: dto.lastName,
        hashedPassword,
        ...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
        dateOfBirth,
        fullname: `${dto.firstName} ${dto.lastName}`,
        state: 'pending',
      },
    });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const key = AUTH_CONSTANT.KEY_VERIFY_CODE(newAccount.id);
    await this.redisService.set(key, code);
    this.logger.debug(`${key} have value: ${code} has been saved `);
    this.emailProducer.sendVerifyCodeRegister({ to: dto.email, code });
    return { status: true, data: newAccount };
  }

  // ===============================
  // VERIFY ACCOUNT
  // ===============================
  public async verifyAccount(dto: VerifyAccount) {
    const account = await this.prismaService.user.findUnique({
      where: { email: dto.email },
      select: { id: true, isActive: true },
    });
    if (!account) throw new NotFoundException('Account not found');
    if (account.isActive)
      throw new ConflictException('Account is already active');

    const key = AUTH_CONSTANT.KEY_VERIFY_CODE(account.id);
    const code = await this.redisService.get(key);
    if (!code) throw new BadRequestException('Code is not existed or expired');

    await this.prismaService.$transaction([
      this.prismaService.user.update({
        where: { id: account.id },
        data: { isActive: true },
      }),
    ]);
    await this.redisService.del(key);
    return { status: true };
  }

  // ===============================
  // LOGIN
  // ===============================
  public async login(dto: LoginDto, res: Response) {
    const user = await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            OR: [{ email: dto.access }, { username: dto.access }],
          },
          { isActive: true },
        ],
      },
      omit: { hashedPassword: false },
    });

    console.log(user?.hashedPassword);

    if (!user) throw new NotFoundException('User not found');

    // FIX 1: Handle nullable hashedPassword
    if (!user.hashedPassword) {
      throw new ForbiddenException('Invalid login credentials or method.');
    }

    const valid = await verify(user.hashedPassword, dto.password);
    if (!valid) throw new ForbiddenException('Password is not correct');

    const { hashedPassword: _hashedPassword, ...userWithoutPassword } = user;
    const hardware = this.authOtherService.getClientInfo(res.req as Request);
    const { session, tokens } = await this.tokenService.createSession(
      user,
      hardware.ip,
      hardware.userAgent,
      res,
    );

    return {
      data: userWithoutPassword,
      session: {
        id: session.id,
        userAgent: hardware.userAgent,
        userIp: session.userIp,
        loginedAt: session.createdAt,
      },
      tokens,
    };
  }

  // ===============================
  // LOGOUT
  // ===============================
  public async logout(res: Response, sessionId?: string) {
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

  // ===============================
  // CHANGE PASSWORD
  // ===============================
  public async changePassword(req: Request, dto: ChangePasswordDto) {
    const requestId = req.user?.id;
    if (!requestId) throw new UnauthorizedException('Unauthorized');

    const account = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: dto.accessor }, { username: dto.accessor }],
        isActive: true,
      },
    });
    if (!account) throw new NotFoundException('User not found');
    if (account.id !== requestId)
      throw new BadRequestException('You are not author');

    // FIX 2: Handle nullable hashedPassword
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

  // ===============================
  // REFRESH TOKEN
  // ===============================
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
            state: 'active',
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

    console.log(user);

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

    const { session, tokens } = await this.tokenService.createSession(
      oauth2User,
      hardware.ip,
      hardware.userAgent,
      res,
    );

    return {
      data: oauth2User,
      session: {
        id: session.id,
        userAgent: hardware.userAgent,
        userIp: session.userIp,
        loginedAt: session.createdAt,
      },
      tokens,
    };
  }

  // ===============================
  // VALIDATE
  // ===============================
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
  // ===============================
  // FETCH CURRENT USER
  // ===============================
  public async getMe(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.getOrThrow<string>('JWT_SECRET'),
    });

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        fullname: true,
        picture: true,
        avtUrl: true,
        isActive: true,
        provider: true,
      },
    });

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

    console.log('getMe - Final user data:', {
      id: user.id,
      name,
      originalEmail: user.email,
      displayEmail,
      provider: user.provider,
      avatar: avatar,
    });

    return {
      id: user.id,
      email: displayEmail,
      username: user.username,
      name,
      avatar,
      isActive: user.isActive,
      provider: user.provider,
    };
  }
}
