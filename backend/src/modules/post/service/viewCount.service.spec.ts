import { Test, TestingModule } from '@nestjs/testing';
import { ViewCountService } from './viewCount.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';

describe('ViewCountService', () => {
  let service: ViewCountService;

  const mockPrismaService = {
    post: {
      update: jest.fn(),
    },
  };

  const mockRedisService = {
    increase: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    getCurrentScore: jest.fn(),
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
    jest.useFakeTimers();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewCountService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: RedisService, useValue: mockRedisService },
        { provide: MyLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<ViewCountService>(ViewCountService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('increaseViewCount', () => {
    const postId = 'post-123';

    it('should increment both total and pending keys', async () => {
      mockRedisService.increase.mockResolvedValueOnce(101); // total
      mockRedisService.increase.mockResolvedValueOnce(1); // pending

      const result = await service.increaseViewCount(postId);

      expect(result.postId).toBe(postId);
      expect(result.viewCount).toBe(101);
      expect(mockRedisService.increase).toHaveBeenCalledTimes(2);
    });

    it('should not sync when pending is below threshold', async () => {
      mockRedisService.increase.mockResolvedValueOnce(50); // total
      mockRedisService.increase.mockResolvedValueOnce(5); // pending = below threshold

      await service.increaseViewCount(postId);

      expect(mockPrismaService.post.update).not.toHaveBeenCalled();
    });

    it('should return correct ViewCountData structure', async () => {
      mockRedisService.increase.mockResolvedValueOnce(200);
      mockRedisService.increase.mockResolvedValueOnce(20);

      const result = await service.increaseViewCount(postId);

      expect(result).toEqual({
        postId: postId,
        viewCount: 200,
      });
    });
  });

  describe('getCurrentViewCount', () => {
    it('should return current view count from Redis', async () => {
      mockRedisService.getCurrentScore.mockResolvedValue(150);

      const result = await service.getCurrentViewCount('post-123');

      expect(result).toBe(150);
      expect(mockRedisService.getCurrentScore).toHaveBeenCalled();
    });

    it('should return 0 when no view count exists', async () => {
      mockRedisService.getCurrentScore.mockResolvedValue(0);

      const result = await service.getCurrentViewCount('new-post');

      expect(result).toBe(0);
    });
  });

  describe('initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});
