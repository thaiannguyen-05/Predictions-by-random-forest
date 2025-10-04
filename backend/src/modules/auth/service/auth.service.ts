import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { Request, Response } from 'express';
import { DateUtils } from 'src/common/utils/string-to-date.utils';
import { EmailProducer } from 'src/email/emai.producer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyAccount } from '../dto/verify-account.dto';
import { AuthOtherService } from './auth.other.service';
import { AuthTokenSerivec } from './auth.token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailProducer: EmailProducer,
    private readonly authOtherService: AuthOtherService,
    private readonly tokenService: AuthTokenSerivec,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // check available account
  private async getAccountWithId(email: string) {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  // generate code
  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // check available user and active user
  private async getActiveAccount(access: string) {
    // return full user (including hashedPassword) so verify() can use it
    return await this.prismaService.user.findFirst({
      where: {
        AND: [
          {
            OR: [{ email: access }, { username: access }],
          },
          { isActive: true },
        ],
      },
    });
  }

  // verify account with accesstoken
  public async validate(accessToken: string) {
    try {
      // get id in payload
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      // find user
      const exitingUser = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      });

      if (!exitingUser) throw new NotFoundException('User not found');

      return exitingUser;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  // detect other device
  async detectOtherDevice(userDevice: string, userId: string) {
    const device = await this.prismaService.userDevice.findUnique({
      where: { nameDevice_userId: { userId: userId, nameDevice: userDevice } },
    });

    return !!device;
  }

  // register
  async register(dto: CreateAccountDto) {
    // checking available account
    const account = await this.getAccountWithId(dto.email);
    if (account) throw new ConflictException('Account is available');

    // hashing password
    const hashedPassword = await hash(dto.password);

    // trans string to date type
    const dateOfBirth = DateUtils.stringToBirthday(dto.dateOfBirth);

    // create new record
    const newAccount = await this.prismaService.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        firstName: dto.firstName,
        lastName: dto.lastName,
        hashedPassword: hashedPassword,
        ...(dto.phoneNumber && { phoneNumber: dto.phoneNumber }),
        dateOfBirth,
      },
    });

    // create code object
    const code = await this.generateVerificationCode();
    await this.prismaService.code.create({
      data: {
        code,
        userId: newAccount.id,
      },
    });

    // emit event send verify
    await this.emailProducer.sendVerifyCodeRegister({ to: dto.email, code });

    return {
      status: true,
      data: newAccount,
    };
  }

  // verify account
  async verifyAccount(dto: VerifyAccount) {
    // check available account
    const account = await this.prismaService.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        isActive: true,
        codes: true,
      },
    });
    if (!account) throw new NotFoundException('Account not found');

    // get list codeuser
    const listcodeuser = account.codes.map((c) => c.code);

    // check status account
    if (account.isActive) {
      throw new ConflictException('Account is already active');
    }

    // checking code
    const code = await this.prismaService.code.findUnique({
      where: { code_userId: { code: dto.code, userId: account.id } },
    });
    if (!code) throw new BadRequestException('Code is not existed or expried');

    // check valid code
    const isValied = listcodeuser.some((value) => value === code.code);
    if (isValied) {
      await this.prismaService.$transaction([
        // change status account
        this.prismaService.user.update({
          where: { id: account.id },
          data: { isActive: true },
        }),
        // delete code verify
        this.prismaService.code.delete({
          where: { id: code.id },
        }),
      ]);

      return {
        status: true,
      };
    }

    return {
      status: false,
    };
  }

  // login
  async login(dto: LoginDto, res: Response) {
    // check available user
    const user = await this.getActiveAccount(dto.access);
    if (!user) throw new NotFoundException('User not found');

    // check valid password — IMPORTANT: await verify (argon2)
    const isValidPassword = await verify(user.hashedPassword, dto.password);
    if (!isValidPassword) throw new ForbiddenException('Password is not corrected');

    // get present device
  const hardware = await this.authOtherService.getClientInfo(res.req as Request);

    // remove hashedPassword before gán vào req.user (nếu có middleware sử dụng)
    const { hashedPassword, ...userWithoutPassword } = user as any;
    // Nếu có middleware hoặc controller gán req.user, hãy dùng:
    // req.user = userWithoutPassword as UserWithoutPassword;

    // create session
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

  // logout
  async logout(res: Response, sessionId?: string) {
    // get session id (priority parameter then cookie)
    const sid = sessionId || (res.req.cookies?.session_id as string | undefined);

    if (!sid) throw new BadRequestException('Session id required');

    // clear refresh token — use sid (not sessionId variable which might be undefined)
    const newSession = await this.prismaService.session.update({
      where: { id: sid },
      data: { hashedRefreshToken: null },
    });

    // clear cookies (use consistent cookie name 'session_id')
    res
      .clearCookie('access_token', { path: '/' })
      .clearCookie('refresh_token', { path: '/' })
      .clearCookie('session_id', { path: '/' });

    return {
      status: true,
      newSession,
    };
  }

  // change password
  async changePassword(req: Request, dto: ChangePasswordDto) {
    // ensure req.user has an id (safe casting)
    const requestId = (req.user as { id?: string } | undefined)?.id;
    if (!requestId) throw new UnauthorizedException('Unauthorized');

    // check available account (by accessor)
    const account = await this.getActiveAccount(dto.accessor);
    if (!account) throw new NotFoundException('User not found');

    // check permission
    if (account.id !== requestId) throw new BadRequestException('You are not author');

    // check valid password (await verify)
    const isValied = await verify(account.hashedPassword, dto.password);
    if (!isValied) throw new ForbiddenException('Password is not corrected');

    // hashing new password
    const newHashedpassword = await hash(dto.newPassword);

    // change password
    await this.prismaService.user.update({
      where: { id: account.id },
      data: { hashedPassword: newHashedpassword },
    });

    // sending email
    await this.emailProducer.sendNotifiCaitonChangePassword({
      to: account.email,
      username: account.username,
    });

    return {
      status: true,
    };
  }

  // refresh token
  async refreshToken(sessionId: string | undefined, refreshToken: string, res: Response) {
    // get sid — prefer passed sessionId, else cookie
    const sid = sessionId || (res.req.cookies?.session_id as string | undefined);

    // get user hardware
  const hardware = await this.authOtherService.getClientInfo(res.req as Request);
    return await this.tokenService.refreshToken(sid as string, refreshToken, hardware.ip, hardware.userAgent, res);
  }
}
