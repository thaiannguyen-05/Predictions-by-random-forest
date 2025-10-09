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
  ) { }

  // ===============================
  // REGISTER
  // ===============================
  public async register(dto: CreateAccountDto) {
    const account = await this.prismaService.user.findUnique({ where: { email: dto.email } });
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
    await this.prismaService.code.create({ data: { code, userId: newAccount.id } });
    await this.emailProducer.sendVerifyCodeRegister({ to: dto.email, code });

    return { status: true, data: newAccount };
  }

  // ===============================
  // VERIFY ACCOUNT
  // ===============================
  public async verifyAccount(dto: VerifyAccount) {
    const account = await this.prismaService.user.findUnique({
      where: { email: dto.email },
      select: { id: true, isActive: true, codes: true },
    });
    if (!account) throw new NotFoundException('Account not found');
    if (account.isActive) throw new ConflictException('Account is already active');

    const code = await this.prismaService.code.findUnique({
      where: { code_userId: { code: dto.code, userId: account.id } },
    });
    if (!code) throw new BadRequestException('Code is not existed or expired');

    await this.prismaService.$transaction([
      this.prismaService.user.update({ where: { id: account.id }, data: { isActive: true } }),
      this.prismaService.code.delete({ where: { id: code.id } }),
    ]);

    return { status: true };
  }

  // ===============================
  // LOGIN
  // ===============================
  public async login(dto: LoginDto, res: Response) {
    const user = await this.prismaService.user.findFirst({
      where: { OR: [{ email: dto.access }, { username: dto.access }], isActive: true },
    });
    if (!user) throw new NotFoundException('User not found');

    // FIX 1: Handle nullable hashedPassword
    if (!user.hashedPassword) {
      throw new ForbiddenException('Invalid login credentials or method.');
    }

    const valid = await verify(user.hashedPassword, dto.password);
    if (!valid) throw new ForbiddenException('Password is not correct');

    const { hashedPassword, ...userWithoutPassword } = user;
    const hardware = await this.authOtherService.getClientInfo(res.req as Request);
    const { session, tokens } = await this.tokenService.createSession(
      user,
      hardware.ip,
      hardware.userAgent,
      res,
    );

    return { data: userWithoutPassword, session: { id: session.id, userAgent: hardware.userAgent, userIp: session.userIp, loginedAt: session.createdAt }, tokens };
  }

  // ===============================
  // LOGOUT
  // ===============================
  public async logout(res: Response, sessionId?: string) {
    const sid = sessionId || (res.req.cookies?.session_id as string | undefined);
    if (!sid) throw new BadRequestException('Session id required');

    await this.prismaService.session.update({ where: { id: sid }, data: { hashedRefreshToken: null } });
    res.clearCookie('access_token', { path: '/' }).clearCookie('refresh_token', { path: '/' }).clearCookie('session_id', { path: '/' });

    return { status: true };
  }

  // ===============================
  // CHANGE PASSWORD
  // ===============================
  public async changePassword(req: Request, dto: ChangePasswordDto) {
    const requestId = req.user?.id;
    if (!requestId) throw new UnauthorizedException('Unauthorized');

    const account = await this.prismaService.user.findFirst({
      where: { OR: [{ email: dto.accessor }, { username: dto.accessor }], isActive: true },
    });
    if (!account) throw new NotFoundException('User not found');
    if (account.id !== requestId) throw new BadRequestException('You are not author');

    // FIX 2: Handle nullable hashedPassword
    if (!account.hashedPassword) {
      throw new ForbiddenException('Account does not have a locally set password.');
    }

    const valid = await verify(account.hashedPassword, dto.password);
    if (!valid) throw new ForbiddenException('Password is not correct');

    const newHashedPassword = await hash(dto.newPassword);
    await this.prismaService.user.update({ where: { id: account.id }, data: { hashedPassword: newHashedPassword } });

    await this.emailProducer.sendNotifiCaitonChangePassword({ to: account.email, username: account.username });

    return { status: true };
  }

  // ===============================
  // REFRESH TOKEN
  // ===============================
  public async refreshToken(sessionId: string | undefined, refreshToken: string, res: Response) {
    const sid = sessionId || (res.req.cookies?.session_id as string | undefined);
    const hardware = await this.authOtherService.getClientInfo(res.req as Request);
    return await this.tokenService.refreshToken(sid as string, refreshToken, hardware.ip, hardware.userAgent, res);
  }

  // ===============================
  // SOCIAL LOGIN
  // ===============================
  public async socialLogin(profile: any) {
    const email = profile.email;
    if (!email) throw new BadRequestException('Email not provided by social provider');

    let user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      // FIX 3: Add dateOfBirth (required field) with a placeholder value.
      // NOTE: You MUST run 'npx prisma generate' after adding 'picture' and if you make 'dateOfBirth' nullable.
      user = await this.prismaService.user.create({
        data: {
          email,
          firstName: profile.firstName || profile.name?.givenName || '',
          lastName: profile.lastName || profile.name?.familyName || '',
          username: profile.username || email.split('@')[0],
          isActive: true,
          picture: profile.picture || profile.photos?.[0]?.value || '',
          hashedPassword: '', // Set to empty string if nullable, or null if schema allows.
          dateOfBirth: new Date('1900-01-01'), // Placeholder date if required
          fullname: `${profile.firstName || profile.name?.givenName || ''} ${profile.lastName || profile.name?.familyName || ''}`,
          state: 'active',
        },
      });
    }

    // 2️⃣ Tạo token
    const accessToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );

    const token = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { secret: this.configService.getOrThrow<string>('JWT_SECRET'), expiresIn: '1d' },
    );

    return { user, token: {
      accessToken, refreshToken, },
     };
  }

  // ===============================
  // VALIDATE
  // ===============================
  public async validate(accessToken: string): Promise<any> {
    try {
      // 1. Verify the token using the secret key
      const payload = this.jwtService.verify(accessToken, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      // 2. Fetch the user from the database
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
        select: { id: true, email: true, username: true, isActive: true }, // Select necessary fields
      });

      // 3. Return the user if found, otherwise return null/throw
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Invalid or inactive user');
      }

      // The returned value is what NestJS Passport injects into the request object (req.user)
      return user;

    } catch (error) {
      // Handle common JWT errors (e.g., expiration, invalid signature)
      throw new UnauthorizedException('Token validation failed');
    }
  }
  // ===============================
  // FETCH CURRENT USER
  // ===============================
  public async getMe(token: string) {
    try {
      if (!token) throw new BadRequestException('Token required');

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
          isActive: true,
        },
      });

      if (!user) throw new UnauthorizedException('User not found');
      if (!user.isActive) throw new UnauthorizedException('User inactive');

      return user;
    } catch (err) {
      throw new UnauthorizedException('Token không hợp lệ');
    }
  }

}