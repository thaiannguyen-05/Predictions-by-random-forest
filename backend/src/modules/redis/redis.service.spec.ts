import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { MyLogger } from '../../logger/logger.service';
import Redis from 'ioredis';

describe('RedisService', () => {
  let service: RedisService;
  let mockRedis: jest.Mocked<Redis>;

  const mockRedisClient = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    incr: jest.fn(),
    decr: jest.fn(),
    expire: jest.fn(),
    flushall: jest.fn(),
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
        RedisService,
        { provide: 'REDIS_CLIENT', useValue: mockRedisClient },
        { provide: MyLogger, useValue: mockLogger },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
    mockRedis = module.get('REDIS_CLIENT');
  });

  describe('get', () => {
    it('should return parsed JSON value', async () => {
      const testData = { name: 'test', value: 123 };
      mockRedisClient.get.mockResolvedValue(JSON.stringify(testData));

      const result = await service.get<typeof testData>('test-key');

      expect(result).toEqual(testData);
      expect(mockRedisClient.get).toHaveBeenCalledWith('test-key');
    });

    it('should return string value when not valid JSON', async () => {
      mockRedisClient.get.mockResolvedValue('plain-string');

      const result = await service.get('test-key');

      expect(result).toBe('plain-string');
    });

    it('should return null when key does not exist', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      const result = await service.get('non-existent-key');

      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set string value with expiration', async () => {
      await service.set('test-key', 'test-value');

      expect(mockRedisClient.set).toHaveBeenCalledWith(
        'test-key',
        'test-value',
        'EX',
        expect.any(Number),
      );
    });

    it('should serialize object to JSON', async () => {
      const testData = { name: 'test', value: 123 };

      await service.set('test-key', testData);

      expect(mockRedisClient.set).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(testData),
        'EX',
        expect.any(Number),
      );
    });
  });

  describe('del', () => {
    it('should delete key', async () => {
      await service.del('test-key');

      expect(mockRedisClient.del).toHaveBeenCalledWith('test-key');
    });
  });

  describe('incr', () => {
    it('should increment key value', async () => {
      mockRedisClient.incr.mockResolvedValue(5);

      const result = await service.incr('counter-key');

      expect(result).toBe(5);
      expect(mockRedisClient.incr).toHaveBeenCalledWith('counter-key');
    });
  });

  describe('increase', () => {
    it('should increase and return new count', async () => {
      mockRedisClient.incr.mockResolvedValue(10);

      const result = await service.increase('view-count');

      expect(result).toBe(10);
    });
  });

  describe('decrease', () => {
    it('should decrease and return new count', async () => {
      mockRedisClient.decr.mockResolvedValue(5);

      const result = await service.decrease('counter-key');

      expect(result).toBe(5);
      expect(mockRedisClient.decr).toHaveBeenCalledWith('counter-key');
    });
  });

  describe('getCurrentScore', () => {
    it('should return numeric score', async () => {
      mockRedisClient.get.mockResolvedValue('42');

      const result = await service.getCurrentScore('score-key');

      expect(result).toBe(42);
    });

    it('should return 0 when key does not exist', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      const result = await service.getCurrentScore('non-existent-key');

      expect(result).toBe(0);
    });
  });

  describe('expire', () => {
    it('should set expiration on key', async () => {
      await service.expire('test-key', 3600);

      expect(mockRedisClient.expire).toHaveBeenCalledWith('test-key', 3600);
    });
  });

  describe('flushAll', () => {
    it('should flush all data and log warning', async () => {
      await service.flushAll();

      expect(mockRedisClient.flushall).toHaveBeenCalled();
      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Redis FLUSHALL called - clearing all data',
        expect.any(String),
      );
    });
  });
});
