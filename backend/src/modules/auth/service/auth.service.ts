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
import { useStyleRegistry } from 'styled-jsx';

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
  // SOCIAL LOGIN (Facebook / Google / etc.)
  // ===============================
  public async socialLogin(profile: any) {
    console.log('=== SOCIAL LOGIN START ===');
    console.log('INCOMING PROFILE:', profile);

    const provider = profile.provider || (profile.id && profile.id.length < 20 ? 'facebook' : 'google');

    // KHÔNG SET accountType TRỰC TIẾP - ĐỂ PRISMA TỰ ĐỘNG HOẶC DÙNG DEFAULT
    let email = '';
    if (provider === 'facebook') {
      email = profile.email ? `${profile.email.split('@')[0]}.fb@${profile.email.split('@')[1]}` : `fb_${profile.id}@facebook.com`;
      console.log('🔒 Facebook using separate email:', email);
    } else {
      email = profile.email || profile.emails?.[0]?.value || `${profile.id}@google.com`;
    }

    console.log('🔍 Processing:', {
      originalEmail: profile.email,
      finalEmail: email,
      provider
    });

    // XỬ LÝ TÊN - GIỮ NGUYÊN TỪ PROVIDER
    let firstName = profile.firstName || profile.name?.givenName || '';
    let lastName = profile.lastName || profile.name?.familyName || '';
    let fullName = profile.displayName || profile.name || profile.fullName || '';

    if (!fullName) fullName = provider === 'facebook' ? 'Facebook User' : 'Google User';
    if (!firstName) firstName = fullName.split(' ')[0] || (provider === 'facebook' ? 'Facebook' : 'Google');
    if (!lastName) lastName = fullName.split(' ').slice(1).join(' ') || 'User';

    // XỬ LÝ AVATAR
    let picture = profile.picture || profile.photos?.[0]?.value || '';

    if (provider === 'facebook' && profile.id && profile.accessToken) {
      picture = `https://graph.facebook.com/${profile.id}/picture?width=400&height=400&access_token=${profile.accessToken}`;
    }

    console.log('🎯 Final data:', {
      provider,
      email,
      fullName,
      hasPicture: !!picture
    });

    // TÌM HOẶC TẠO USER
    let user = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (!user) {
      // TẠO USERNAME DUY NHẤT
      const baseUsername = provider === 'facebook' ? `fb_${profile.id}` : `gg_${profile.id}`;
      let username = baseUsername;
      let counter = 1;

      while (true) {
        const existingUser = await this.prismaService.user.findUnique({
          where: { username }
        });
        if (!existingUser) break;
        username = `${baseUsername}_${counter}`;
        counter++;
        if (counter > 10) break;
      }

      console.log('🆕 Creating user with username:', username);

      // TẠO USER - KHÔNG SET accountType, ĐỂ DEFAULT VALUE TRONG SCHEMA HOẠT ĐỘNG
      user = await this.prismaService.user.create({
        data: {
          email,
          firstName,
          lastName,
          username,
          fullname: fullName,
          avtUrl: picture,
          picture: picture,
          hashedPassword: '',
          dateOfBirth: new Date('1900-01-01'),
          isActive: true,
          state: 'active',
          provider: provider,
          // KHÔNG SET accountType - để schema tự động dùng default value
        },
      });
      console.log('✅ NEW USER CREATED for', provider);
    } else {
      console.log('🔄 UPDATING existing user:', user.id);

      const updates: any = {};

      // CHỈ CẬP NHẬT NẾU CÙNG PROVIDER
      if (user.provider === provider) {
        // Cập nhật avatar
        if (picture) {
          updates.picture = picture;
          updates.avtUrl = picture;
        }

        // Cập nhật tên nếu cần
        const currentName = user.fullname || '';
        const isDefaultName = currentName.includes('User') || currentName === '' || currentName.includes('@');

        if (isDefaultName && fullName) {
          updates.fullname = fullName;
          updates.firstName = firstName;
          updates.lastName = lastName;
        }
      } else {
        console.log('⚠️ Skipping update - user has different provider');
      }

      console.log('📝 Updates to apply:', updates);

      if (Object.keys(updates).length > 0) {
        user = await this.prismaService.user.update({
          where: { id: user.id },
          data: updates,
        });
        console.log('✅ USER UPDATED');
      } else {
        console.log('ℹ️ NO UPDATES NEEDED');
      }
    }

    // FACEBOOK TRẢ VỀ EMAIL ẢO
    let displayEmail = user.email;
    if (provider === 'facebook') {
      displayEmail = `user_${profile.id}@facebook.com`;
    }

    console.log('🎯 FINAL USER:', {
      id: user.id,
      name: user.fullname,
      email: displayEmail,
      provider: user.provider,
      accountType: user.accountType, // Log để xem giá trị thực tế
      avatar: user.picture ? '✅ Has avatar' : '❌ No avatar'
    });

    const accessToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '7d' },
    );

    return {
      user: {
        id: user.id,
        name: user.fullname || fullName,
        email: displayEmail,
        avatar: user.picture || picture,
        provider: user.provider || provider,
      },
      token: {
        accessToken,
        refreshToken,
      },
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

    const name = user.fullname ||
      `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
      user.username ||
      user.email;

    const avatar = user.picture || user.avtUrl || undefined;

    // SỬA QUAN TRỌNG: CHỈ ẨN EMAIL NẾU THẬT SỰ LÀ FACEBOOK USER
    let displayEmail = user.email;

    // Chỉ ẩn email nếu:
    // 1. Provider là facebook VÀ 
    // 2. Email có chứa ".fb@" hoặc "@facebook.com"
    if (user.provider === 'facebook' &&
      (user.email.includes('.fb@') || user.email.includes('@facebook.com'))) {
      // Tạo email ảo từ username
      displayEmail = `${user.username || user.id}@facebook.com`;
    }
    // Các trường hợp khác (Google, local) hiển thị email thật

    console.log('getMe - Final user data:', {
      id: user.id,
      name,
      originalEmail: user.email,
      displayEmail,
      provider: user.provider,
      avatar: avatar ? '✅ Has avatar' : '❌ No avatar'
    });

    return {
      id: user.id,
      email: displayEmail,
      username: user.username,
      name,
      avatar,
      isActive: user.isActive,
      provider: user.provider
    };
  }
}