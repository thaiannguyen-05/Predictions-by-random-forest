import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthOtherService } from './auth.other.service';
import { AuthTokenService } from './auth.token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';
import { EmailProducer } from '../../../email/emai.producer';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { hash } from 'argon2';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: jest.Mocked<PrismaService>;
  let tokenService: jest.Mocked<AuthTokenService>;
  let jwtService: jest.Mocked<JwtService>;
  let redisService: jest.Mocked<RedisService>;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    username: 'testuser',
    fullname: 'Test User',
    firstName: 'Test',
    lastName: 'User',
    hashedPassword: null as string | null,
    isActive: true,
    phone: null,
    dateOfBirth: null,
    avtUrl: null,
    accountType: 'EMAIL' as const,
    address: null,
    city: null,
    searchCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    visible: 'PUBLIC' as const,
    numberIdentity: null,
    isBanned: false,
    isLocked: false,
    lastActived: null,
    picture: null,
    provider: null,
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    session: {
      update: jest.fn(),
    },
    oauth2User: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockAuthOtherService = {
    getClientInfo: jest.fn().mockReturnValue({
      ip: '127.0.0.1',
      userAgent: 'test-agent',
    }),
  };

  const mockTokenService = {
    createSession: jest.fn(),
    refreshToken: jest.fn(),
  };

  const mockJwtService = {
    verify: jest.fn(),
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
    getOrThrow: jest.fn().mockReturnValue('test-secret'),
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    fatal: jest.fn(),
  };

  const mockEmailProducer = {
    sendVerifyCodeRegister: jest.fn(),
    sendNotifiCaitonChangePassword: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: AuthOtherService, useValue: mockAuthOtherService },
        { provide: AuthTokenService, useValue: mockTokenService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: RedisService, useValue: mockRedisService },
        { provide: MyLogger, useValue: mockLogger },
        { provide: EmailProducer, useValue: mockEmailProducer },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get(PrismaService);
    tokenService = module.get(AuthTokenService);
    jwtService = module.get(JwtService);
    redisService = module.get(RedisService);
  });

  describe('register', () => {
    const registerDto = {
      email: 'newuser@example.com',
      password: 'Password123!',
      username: 'newuser',
      firstName: 'New',
      lastName: 'User',
      dateOfBirth: '1990-01-01',
    };

    it('should create a new user successfully', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        ...mockUser,
        email: registerDto.email,
        username: registerDto.username,
      });

      const result = await service.register(registerDto);

      expect(result.status).toBe(true);
      expect(result.data.newUser.email).toBe(registerDto.email);
      expect(mockEmailProducer.sendVerifyCodeRegister).toHaveBeenCalledWith({
        to: registerDto.email,
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('verifyAccount', () => {
    const verifyDto = {
      to: 'test@example.com',
      code: '123456',
    };

    it('should verify account successfully', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });
      mockRedisService.get.mockResolvedValue('123456');
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        isActive: true,
      });

      const result = await service.verifyAccount(verifyDto);

      expect(result.status).toBe(true);
      expect(result.message).toBe('Account verified successfully');
      expect(mockRedisService.del).toHaveBeenCalled();
    });

    it('should throw BadRequestException when code is missing', async () => {
      await expect(
        service.verifyAccount({ to: 'test@example.com', code: '' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.verifyAccount(verifyDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ConflictException when account already verified', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        isActive: true,
      });

      await expect(service.verifyAccount(verifyDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw BadRequestException when verification code is wrong', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });
      mockRedisService.get.mockResolvedValue('654321'); // Different code

      await expect(service.verifyAccount(verifyDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('login', () => {
    const loginDto = {
      access: 'test@example.com',
      password: 'Password123!',
    };

    const mockResponse = {
      req: {
        ip: '127.0.0.1',
        headers: { 'user-agent': 'test-agent' },
      },
      clearCookie: jest.fn().mockReturnThis(),
    } as unknown as import('express').Response;

    it('should login successfully with correct credentials', async () => {
      const hashedPassword = await hash(loginDto.password);
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        hashedPassword,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        hashedPassword,
      });
      mockTokenService.createSession.mockResolvedValue({
        tokens: {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      });

      const result = await service.login(loginDto, mockResponse);

      expect(result.tokens).toBeDefined();
      expect(result.data).toBeDefined();
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException when password is incorrect', async () => {
      const hashedPassword = await hash('differentpassword');
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        hashedPassword,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        hashedPassword,
      });

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when user has no password (OAuth only)', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        hashedPassword: null,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        hashedPassword: null,
      });

      await expect(service.login(loginDto, mockResponse)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('changePassword', () => {
    const changePasswordDto = {
      password: 'OldPassword123!',
      newPassword: 'NewPassword456!',
    };

    it('should change password successfully', async () => {
      const hashedOldPassword = await hash(changePasswordDto.password);
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        hashedPassword: hashedOldPassword,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        hashedPassword: hashedOldPassword,
      });
      mockPrismaService.user.update.mockResolvedValue(mockUser);

      const result = await service.changePassword(
        mockUser.id,
        changePasswordDto,
      );

      expect(result.status).toBe(true);
      expect(
        mockEmailProducer.sendNotifiCaitonChangePassword,
      ).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when userId is empty', async () => {
      await expect(
        service.changePassword('', changePasswordDto),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.changePassword('non-existent-id', changePasswordDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException when old password is incorrect', async () => {
      const hashedPassword = await hash('differentpassword');
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        hashedPassword,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        hashedPassword,
      });

      await expect(
        service.changePassword(mockUser.id, changePasswordDto),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getMe', () => {
    it('should return user info when token is valid', async () => {
      mockJwtService.verify.mockReturnValue({ sub: mockUser.id });
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.getMe('valid-token');

      expect(result.id).toBe(mockUser.id);
      expect(result.email).toBe(mockUser.email);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'non-existent-id' });
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getMe('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when user is inactive', async () => {
      mockJwtService.verify.mockReturnValue({ sub: mockUser.id });
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      await expect(service.getMe('valid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    const mockResponse = {
      req: {
        cookies: { session_id: 'session-123' },
      },
      clearCookie: jest.fn().mockReturnThis(),
    } as unknown as import('express').Response;

    it('should logout successfully', async () => {
      mockPrismaService.session.update.mockResolvedValue({});

      const result = await service.logout(mockResponse, 'session-123');

      expect(result.status).toBe(true);
      expect(mockPrismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'session-123' },
        data: { hashedRefreshToken: null },
      });
    });

    it('should throw BadRequestException when no session id', async () => {
      const responseNoSession = {
        req: { cookies: {} },
        clearCookie: jest.fn().mockReturnThis(),
      } as unknown as import('express').Response;

      await expect(
        service.logout(responseNoSession, undefined),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
