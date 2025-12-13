import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CONSTANTS } from './redis.constaints';
import { MyLogger } from '../../logger/logger.service';

const CONTEXT = 'RedisService';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly logger: MyLogger,
  ) {}

  async get<T = string>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    try {
      return value ? (JSON.parse(value) as T) : null;
    } catch (_error) {
      return value as T;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    const serialized =
      typeof value === 'string' ? value : JSON.stringify(value);
    await this.redis.set(
      key,
      serialized,
      'EX',
      REDIS_CONSTANTS.TIME_FILE_CACHE.CACHE_LARGE_DATA,
    );
    this.logger.debug(`Redis SET: ${key}`, CONTEXT);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
    this.logger.debug(`Redis DEL: ${key}`, CONTEXT);
  }

  async incr(key: string): Promise<number> {
    return this.redis.incr(key);
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.redis.expire(key, ttlSeconds);
  }

  async flushAll(): Promise<void> {
    this.logger.warn('Redis FLUSHALL called - clearing all data', CONTEXT);
    await this.redis.flushall();
  }

  async increase(key: string): Promise<number> {
    const newCount = await this.incr(key);
    return newCount;
  }

  async getCurrentScore(key: string): Promise<number> {
    const currentScore = await this.redis.get(key);
    return currentScore ? Number(currentScore) : 0;
  }

  async decrease(key: string): Promise<number> {
    const newCount = await this.redis.decr(key);
    return newCount;
  }
}
