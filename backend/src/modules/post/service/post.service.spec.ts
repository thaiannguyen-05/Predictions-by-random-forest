import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';
import { BatchInsertService } from './batchInsert.service';
import { UnauthorizedException } from '@nestjs/common';
import { PostNotFoundException } from '../exceptions/post.exception';
import { UserNotFoundOrNotActiveException } from '../../user/exceptions/user.exception';

describe('PostService', () => {
  let service: PostService;
  let prismaService: jest.Mocked<PrismaService>;
  let redisService: jest.Mocked<RedisService>;
  let batchInsertService: jest.Mocked<BatchInsertService>;

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

  const mockPost = {
    id: 'post-123',
    title: 'Test Post',
    content: 'This is a test post content',
    file: [],
    userId: mockUser.id,
    viewCount: 100,
    likeCount: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    user: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
    },
    post: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    likePost: {
      findUnique: jest.fn(),
    },
  };

  const mockRedisService = {
    get: jest.fn(),
    set: jest.fn(),
    increase: jest.fn(),
    getCurrentScore: jest.fn(),
  };

  const mockBatchInsertService = {
    insertBatch: jest.fn(),
    deInsertBatch: jest.fn(),
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
        PostService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: RedisService, useValue: mockRedisService },
        { provide: BatchInsertService, useValue: mockBatchInsertService },
        { provide: MyLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prismaService = module.get(PrismaService);
    redisService = module.get(RedisService);
    batchInsertService = module.get(BatchInsertService);
  });

  describe('createPost', () => {
    const createPostDto = {
      title: 'New Post',
      content: 'New post content',
      file: [],
    };

    it('should create a post successfully', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.create.mockResolvedValue({
        ...mockPost,
        title: createPostDto.title,
        content: createPostDto.content,
      });

      const result = await service.createPost(mockUser.id, createPostDto);

      expect(result.status).toBe(true);
      expect(result.data.post).toBeDefined();
      expect(mockPrismaService.post.create).toHaveBeenCalledWith({
        data: {
          title: createPostDto.title,
          content: createPostDto.content,
          file: createPostDto.file,
          userId: mockUser.id,
        },
      });
    });

    it('should throw UnauthorizedException when userId is empty', async () => {
      await expect(service.createPost('', createPostDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UserNotFoundOrNotActiveException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.findFirst.mockResolvedValue(null);

      await expect(
        service.createPost('non-existent-id', createPostDto),
      ).rejects.toThrow(UserNotFoundOrNotActiveException);
    });
  });

  describe('updatePost', () => {
    const updatePostDto = {
      title: 'Updated Post',
      content: 'Updated content',
    };

    it('should update a post successfully', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);
      mockPrismaService.post.update.mockResolvedValue({
        ...mockPost,
        ...updatePostDto,
      });

      const result = await service.updatePost(
        mockUser.id,
        mockPost.id,
        updatePostDto,
      );

      expect(result.status).toBe(true);
      expect(result.data.post).toBeDefined();
    });

    it('should throw PostNotFoundException when post not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      await expect(
        service.updatePost(mockUser.id, 'non-existent-post', updatePostDto),
      ).rejects.toThrow(PostNotFoundException);
    });
  });

  describe('deletePost', () => {
    it('should delete a post successfully', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);
      mockPrismaService.post.delete.mockResolvedValue(mockPost);

      const result = await service.deletePost(mockUser.id, mockPost.id);

      expect(result.status).toBe(true);
      expect(result.data.post).toBeDefined();
    });

    it('should throw PostNotFoundException when post not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      await expect(
        service.deletePost(mockUser.id, 'non-existent-post'),
      ).rejects.toThrow(PostNotFoundException);
    });
  });

  describe('loadingPostById', () => {
    it('should return post with view count from Redis', async () => {
      mockRedisService.get.mockResolvedValue('150');
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);

      const result = await service.loadingPostById(mockPost.id);

      expect(result.status).toBe(true);
      expect(result.data.post).toBeDefined();
    });

    it('should throw PostNotFoundException when post not found', async () => {
      mockRedisService.get.mockResolvedValue(null);
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      await expect(
        service.loadingPostById('non-existent-post'),
      ).rejects.toThrow(PostNotFoundException);
    });
  });

  describe('loadingPosts', () => {
    const loadingPostDto = {
      page: 1,
      limit: 10,
    };

    it('should return paginated posts', async () => {
      const mockPosts = [mockPost, { ...mockPost, id: 'post-456' }];
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findMany.mockResolvedValue(mockPosts);

      const result = await service.loadingPosts(mockUser.id, loadingPostDto);

      expect(result.status).toBe(true);
      expect(result.data.post).toHaveLength(2);
      expect(result.data.hasMore).toBe(false);
    });

    it('should handle cursor-based pagination', async () => {
      const loadingPostDtoWithCursor = {
        page: 1,
        limit: 10,
        cursor: mockPost.id,
      };
      const mockPosts = [{ ...mockPost, id: 'post-456' }];
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findMany.mockResolvedValue(mockPosts);

      const result = await service.loadingPosts(
        mockUser.id,
        loadingPostDtoWithCursor,
      );

      expect(result.status).toBe(true);
      expect(mockPrismaService.post.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          cursor: { id: mockPost.id },
        }),
      );
    });
  });

  describe('loadingFeed', () => {
    const loadingFeedDto = {
      page: 1,
      limit: 10,
    };

    it('should return feed posts with user info', async () => {
      const mockFeedPosts = [
        {
          ...mockPost,
          user: { id: mockUser.id, username: mockUser.username, avtUrl: null },
          _count: { comments: 5 },
        },
      ];
      mockPrismaService.post.findMany.mockResolvedValue(mockFeedPosts);

      const result = await service.loadingFeed(loadingFeedDto);

      expect(result.status).toBe(true);
      expect(result.data.post).toBeDefined();
    });
  });

  describe('likePost', () => {
    it('should like a post when not already liked', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);
      mockPrismaService.likePost.findUnique.mockResolvedValue(null); // Not liked yet -> isLike is falsy

      const result = await service.likePost(mockUser.id, mockPost.id);

      expect(result.status).toBe(true);
      expect(mockBatchInsertService.insertBatch).toHaveBeenCalled();
    });

    it('should unlike a post when already liked', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);
      mockPrismaService.likePost.findUnique.mockResolvedValue({
        id: mockPost.id,
        userId: mockUser.id,
        isLike: true, // Already liked
      });

      const result = await service.likePost(mockUser.id, mockPost.id);

      expect(result.status).toBe(true);
      expect(mockBatchInsertService.deInsertBatch).toHaveBeenCalled();
    });

    it('should throw PostNotFoundException when post not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.user.findFirst.mockResolvedValue(mockUser);
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      await expect(
        service.likePost(mockUser.id, 'non-existent-post'),
      ).rejects.toThrow(PostNotFoundException);
    });
  });
});
