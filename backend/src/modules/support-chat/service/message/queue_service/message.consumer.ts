import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type { MessageQueue } from '../../../interfaces';
import { BatchInsertService } from './batchInsert.service';
import { RedisService } from '../redis.service';

@Controller()
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);

  constructor(
    private readonly batchInSertService: BatchInsertService,
    private readonly redisService: RedisService,
  ) {}

  @EventPattern('send-message')
  async handleSendMessage(@Payload() data: MessageQueue) {
    try {
      await this.redisService.saveMessageToRedis(data);

      await this.redisService.publishMessage(`room:${data.roomId}`, data);

      await this.batchInSertService.insertMessageInQueue(data);

      this.logger.debug(`✅ Processed message: room=${data.roomId}`);
    } catch (error) {
      this.logger.error('❌ Error handling message', error);
    }
  }
}
