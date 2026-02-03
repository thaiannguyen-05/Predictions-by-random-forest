import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { MessageQueue } from '../../interfaces';

const REDIS_MESSAGE_TTL = 86400;
const REDIS_ROOM_PREFIX = 'room:messages:';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly logger = new Logger(RedisService.name);
  private redisClient: Redis;

  onModuleInit() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    this.redisClient.on('connect', () => {
      this.logger.log('✅ Connected to Redis');
    });

    this.redisClient.on('error', (err) => {
      this.logger.error('❌ Redis connection error', err);
    });
  }

  async saveMessageToRedis(message: MessageQueue): Promise<void> {
    try {
      const key = `${REDIS_ROOM_PREFIX}${message.roomId}`;
      const timestamp = Date.now();

      await this.redisClient.zadd(
        key,
        timestamp,
        JSON.stringify({ ...message, timestamp }),
      );

      await this.redisClient.expire(key, REDIS_MESSAGE_TTL);

      this.logger.debug(`💾 Saved message to Redis: room=${message.roomId}`);
    } catch (error) {
      this.logger.error('❌ Error saving message to Redis', error);
      throw error;
    }
  }

  async getRecentMessages(roomId: string, limit = 50): Promise<MessageQueue[]> {
    try {
      const key = `${REDIS_ROOM_PREFIX}${roomId}`;

      const messages = await this.redisClient.zrevrange(key, 0, limit - 1);

      return messages.map((msg) => JSON.parse(msg));
    } catch (error) {
      this.logger.error('❌ Error getting messages from Redis', error);
      return [];
    }
  }

  async clearRoomCache(roomId: string): Promise<void> {
    const key = `${REDIS_ROOM_PREFIX}${roomId}`;
    await this.redisClient.del(key);
    this.logger.debug(`🗑️ Cleared Redis cache for room=${roomId}`);
  }

  async publishMessage(channel: string, message: MessageQueue): Promise<void> {
    await this.redisClient.publish(channel, JSON.stringify(message));
    this.logger.debug(`📡 Published message to channel=${channel}`);
  }
}
