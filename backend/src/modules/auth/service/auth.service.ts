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
import { Provider } from 'prisma/generated/prisma';
import { DateUtils } from 'src/common/utils/string-to-date.utils';
import { EmailProducer } from 'src/email/emai.producer';
import { PrismaService } from 'src/prisma/prisma.service';
import { FacebookOAuth2User, GoogleOAuth2User } from '../auth.interface';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateAccountDto } from '../dto/create-account.dto';
import { LoginDto } from '../dto/login.dto';
import { VerifyAccount } from '../dto/verify-account.dto';
import { AuthOtherService } from './auth.other.service';
import { AuthTokenSerivec } from './auth.token.service';

interface SocialProfile {
  id: string;
  provider?: string;
  email?: string;
  emails?: Array<{ value: string }>;
  firstName?: string;
  lastName?: string;
  name?: {
    givenName?: string;
    familyName?: string;
  };
  displayName?: string;
  fullName?: string;
  picture?: string;
  photos?: Array<{ value: string }>;
  accessToken?: string;
  [key: string]: unknown;
}

interface UserUpdates {
  picture?: string;
  avtUrl?: string;
  fullname?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

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
      where: {
        AND: [
          {
            OR: [{ email: dto.access }, { username: dto.access }]
          },
          { isActive: true }
        ]
      },
      omit: { hashedPassword: false }
    })

    
    if (!user) throw new NotFoundException('User not found')

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

  async validateOauth2({
    providerUserId, email, fullname, firstname, lastname, avatarUrl, username, provider }: {
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
    let user = await this.prismaService.user.findUnique({
      where: { email }
    })

    let userOauth2

    // check if user doesnt exitsing 
    if (!user) {
      const newUserId = randomUUID()
      const [user, userOauth2] = await this.prismaService.$transaction([
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
            // Lưu provider dạng lowercase để FE xử lý điều kiện (facebook/google)
            provider: (provider as unknown as string).toLowerCase(),
          }
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
            userId: newUserId
          }
        })
      ])

      return user
    }

    // Ensure a single oauth2 record per email using the unique constraint on `email`.
    // This prevents duplicate entries when the same email logs in via different providers (e.g., Google then Facebook).
    const oauth2ByEmail = await this.prismaService.oauth2User.findUnique({ where: { email } });

    if (!oauth2ByEmail) {
      await this.prismaService.oauth2User.create({
        data: {
          provider,
          providerUserId,
          email,
          fullname,
          firstname,
          lastname,
          avatarUrl,
          username,
          userId: user.id,
        },
      });
    } else {
      await this.prismaService.oauth2User.update({
        where: { email },
        data: {
          provider,
          providerUserId,
          fullname,
          firstname,
          lastname,
          avatarUrl,
          username,
          userId: user.id,
        },
      });
    }

    // Đồng bộ provider trên bảng User để phản ánh nhà cung cấp hiện tại
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        provider: (provider as unknown as string).toLowerCase(),
        ...(avatarUrl ? { avtUrl: avatarUrl } : {}),
        accountType: 'OAUTH2',
        isActive: true,
      },
    });

    return user
  }


  async oauth2Login(user: FacebookOAuth2User | GoogleOAuth2User, res: Response) {
    const provider = user.provider
    const {
      providerUserId,
      email,
      fullname,
      firstname,
      lastname,
      avatarUrl,
      username
    } = user;

    
    const validateUser = await this.validateOauth2({
      providerUserId,
      email,
      fullname,
      firstname,
      lastname,
      avatarUrl,
      username,
      provider
    })

    const userOauth2 = {
      id: validateUser
    }

    // get hardware
    const hardware = await this.authOtherService.getClientInfo(res.req as Request)

    const oauth2User = {
      id: validateUser.id,
      email: validateUser.email,
      username: validateUser.username,
      createdAt: new Date()
    }

    const { session, tokens } = await this.tokenService.createSession(
      oauth2User,
      hardware.ip,
      hardware.userAgent,
      res)

    return { data: oauth2User, session: { id: session.id, userAgent: hardware.userAgent, userIp: session.userIp, loginedAt: session.createdAt }, tokens };
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
        omit: { hashedPassword: false }
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

    // Mặc định tên/ảnh từ bảng users
    let name = user.fullname ||
      `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
      user.username ||
      user.email;
    let avatar = user.picture || user.avtUrl || undefined;

    // Với tài khoản Facebook: dùng tên Facebook, ẩn email và trả về link trang cá nhân
    let emailToReturn: string | undefined = user.email;
    let profileUrl: string | undefined;

    if (user.provider === 'facebook') {
      // Lấy dữ liệu từ oauth2_user để có providerUserId, fullname, avatarUrl
      const fbOauth = await this.prismaService.oauth2User.findFirst({
        where: { userId: user.id, provider: 'FACEBOOK' },
        select: { providerUserId: true, fullname: true, username: true, avatarUrl: true },
      });

      if (fbOauth) {
        name = fbOauth.fullname || fbOauth.username || name;
        profileUrl = `https://facebook.com/${fbOauth.providerUserId}`;
        // Ưu tiên avatar từ oauth2 nếu user chưa có
        if (!avatar) avatar = fbOauth.avatarUrl || avatar;
      }

      // Ẩn email cho tài khoản Facebook
      emailToReturn = undefined;
    }

    return {
      id: user.id,
      email: emailToReturn,
      username: user.username,
      name,
      avatar,
      isActive: user.isActive,
      provider: user.provider,
      profileUrl,
    };
  }
}