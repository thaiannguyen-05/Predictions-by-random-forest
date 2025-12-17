import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MyLogger } from '../../logger/logger.service';
import { UserNotFoundOrNotActiveException } from './exceptions/user.exception';
import { ChangeDetailDto } from './dto/change-detail.dto';

describe('UserService', () => {
  let service: UserService;
  let prismaService: jest.Mocked<PrismaService>;
  let logger: jest.Mocked<MyLogger>;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    username: 'testuser',
    fullname: 'Test User',
    firstName: 'Test',
    lastName: 'User',
    hashedPassword: 'hashed_password',
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
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
    fatal: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: MyLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);
    logger = module.get(MyLogger);
  });

  describe('me', () => {
    it('should return user data when user exists and is active', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);

      const result = await service.me(mockUser.id);

      expect(result.status).toBe(true);
      expect(result.data.id).toBe(mockUser.id);
      expect(result.data.email).toBe(mockUser.email);
      expect(result.data).not.toHaveProperty('hashedPassword');
    });

    it('should throw UserNotFoundOrNotActiveException when userId is empty', async () => {
      await expect(service.me('')).rejects.toThrow(
        UserNotFoundOrNotActiveException,
      );
    });

    it('should throw UserNotFoundOrNotActiveException when user not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);

      await expect(service.me('non-existent-id')).rejects.toThrow(
        UserNotFoundOrNotActiveException,
      );
    });

    it('should throw UserNotFoundOrNotActiveException when user is not active', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      // findFirst with isActive: true filter will return null
      mockPrismaService.user.findFirst.mockResolvedValue(null);

      await expect(service.me(mockUser.id)).rejects.toThrow(
        UserNotFoundOrNotActiveException,
      );
    });
  });

  describe('changeDetail', () => {
    const changeDetailDto: ChangeDetailDto = {
      username: 'newusername',
      firstName: 'NewFirst',
      lastName: 'NewLast',
    };

    it('should update user details successfully', async () => {
      const updatedUser = {
        ...mockUser,
        username: changeDetailDto.username,
        firstName: changeDetailDto.firstName,
        lastName: changeDetailDto.lastName,
        fullname: `${changeDetailDto.firstName} ${changeDetailDto.lastName}`,
      };

      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.changeDetail(mockUser.id, changeDetailDto);

      expect(result.status).toBe(true);
      expect(result.data.username).toBe(changeDetailDto.username);
      expect(result.data.firstName).toBe(changeDetailDto.firstName);
      expect(result.data.lastName).toBe(changeDetailDto.lastName);
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: expect.objectContaining({
          username: changeDetailDto.username,
          firstName: changeDetailDto.firstName,
          lastName: changeDetailDto.lastName,
        }),
      });
    });

    it('should throw UserNotFoundOrNotActiveException when userId is empty', async () => {
      await expect(service.changeDetail('', changeDetailDto)).rejects.toThrow(
        UserNotFoundOrNotActiveException,
      );
    });

    it('should throw UserNotFoundOrNotActiveException when user not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);

      await expect(
        service.changeDetail('non-existent-id', changeDetailDto),
      ).rejects.toThrow(UserNotFoundOrNotActiveException);
    });

    it('should update only provided fields', async () => {
      const partialDto: ChangeDetailDto = {
        username: 'onlyusername',
      };

      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        username: partialDto.username,
      });

      await service.changeDetail(mockUser.id, partialDto);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: expect.objectContaining({
          username: partialDto.username,
        }),
      });
    });

    it('should update dateOfBirth when provided', async () => {
      const dtoWithDate: ChangeDetailDto = {
        dateOfBirth: '1990-01-15',
      };

      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.user.update.mockResolvedValue({
        ...mockUser,
        dateOfBirth: new Date('1990-01-15'),
      });

      await service.changeDetail(mockUser.id, dtoWithDate);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: expect.objectContaining({
          dateOfBirth: expect.any(Date),
        }),
      });
    });
  });
});
