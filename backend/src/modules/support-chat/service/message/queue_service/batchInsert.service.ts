import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { MessageQueue } from '../../../interfaces';
import { PrismaService } from '../../../../../prisma/prisma.service';

const MAX_INSERT = 1000;
const FLUSH_INTERVAL_MS = 5000;

@Injectable()
export class BatchInsertService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BatchInsertService.name);
  private readonly messageQueue: MessageQueue[] = [];
  private isFlushing = false;
  private flushTimer: NodeJS.Timeout;

  constructor(private readonly prismaService: PrismaService) {}

  onModuleInit() {
    this.flushTimer = setInterval(() => {
      if (this.messageQueue.length > 0) {
        this.flushSafely();
      }
    }, FLUSH_INTERVAL_MS);
  }
  onModuleDestroy() {
    if (this.flushTimer) clearInterval(this.flushTimer);
  }

  async insertMessageInQueue(message: MessageQueue) {
    console.debug({ message: `Adding ${message} in queue` });
    this.messageQueue.push(message);

    if (this.messageQueue.length >= MAX_INSERT) {
      await this.flushSafely();
    }
  }

  private async flushSafely() {
    if (this.isFlushing) return;

    this.isFlushing = true;

    const batch = this.messageQueue.splice(0, MAX_INSERT);

    if (batch.length === 0) {
      this.isFlushing = false;
      return;
    }

    try {
      this.logger.debug(`🧾 Flushing ${batch.length} messages...`);
      await this.prismaService.message.createMany({ data: batch });
      this.logger.log(`✅ Inserted ${batch.length} messages`);
    } catch (err) {
      this.logger.error('❌ Error batch insert, retrying later', err);

      this.messageQueue.unshift(...batch);
    } finally {
      this.isFlushing = false;
    }
  }
}
