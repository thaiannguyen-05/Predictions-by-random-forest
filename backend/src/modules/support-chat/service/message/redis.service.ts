import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { MessageQueue } from '../../interfaces/support-chat.interface';

const REDIS_MESSAGE_TTL = 86400; // 24 hours
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

  /**
   * Lưu message vào Redis cho realtime access
   * Key: room:messages:{roomId}
   * Value: Sorted Set với score là timestamp
   */
  async saveMessageToRedis(message: MessageQueue): Promise<void> {
    try {
      const key = `${REDIS_ROOM_PREFIX}${message.roomId}`;
      const timestamp = Date.now();

      // Lưu message dạng JSON với score là timestamp
      await this.redisClient.zadd(
        key,
        timestamp,
        JSON.stringify({ ...message, timestamp }),
      );

      // Set TTL cho key
      await this.redisClient.expire(key, REDIS_MESSAGE_TTL);

      this.logger.debug(`💾 Saved message to Redis: room=${message.roomId}`);
    } catch (error) {
      this.logger.error('❌ Error saving message to Redis', error);
      throw error;
    }
  }

  /**
   * Lấy messages gần nhất của room từ Redis
   */
  async getRecentMessages(roomId: string, limit = 50): Promise<MessageQueue[]> {
    try {
      const key = `${REDIS_ROOM_PREFIX}${roomId}`;

      // Lấy messages mới nhất (ZREVRANGE: từ cao xuống thấp)
      const messages = await this.redisClient.zrevrange(key, 0, limit - 1);

      return messages.map((msg) => JSON.parse(msg));
    } catch (error) {
      this.logger.error('❌ Error getting messages from Redis', error);
      return [];
    }
  }

  /**
   * Xóa cache của room khi cần
   */
  async clearRoomCache(roomId: string): Promise<void> {
    const key = `${REDIS_ROOM_PREFIX}${roomId}`;
    await this.redisClient.del(key);
    this.logger.debug(`🗑️ Cleared Redis cache for room=${roomId}`);
  }

  /**
   * Publish message qua Redis Pub/Sub (cho WebSocket Gateway)
   */
  async publishMessage(channel: string, message: MessageQueue): Promise<void> {
    await this.redisClient.publish(channel, JSON.stringify(message));
    this.logger.debug(`📡 Published message to channel=${channel}`);
  }
}
