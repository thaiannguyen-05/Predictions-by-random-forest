import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageQueue } from '../../../interfaces/support-chat.interface';

const MAX_INSERT = 1000;
const FLUSH_INTERVAL_MS = 5000;

@Injectable()
export class BatchInsertService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(BatchInsertService.name);
  private readonly messageQueue: MessageQueue[] = [];
  private isFlushing = false;
  private flushTimer: NodeJS.Timeout;

  constructor(private readonly prismaService: PrismaService) { }

  onModuleInit() {
    // Định kỳ flush để tránh message bị kẹt
    this.flushTimer = setInterval(() => {
      if (this.messageQueue.length > 0) {
        this.flushSafely();
      }
    }, FLUSH_INTERVAL_MS);
  }

  onModuleDestroy() {
    if (this.flushTimer) clearInterval(this.flushTimer);
  }

  // ✅ Thêm message an toàn
  async insertMessageInQueue(message: MessageQueue) {
    console.debug({ message: `Adding ${message} in queue` })
    this.messageQueue.push(message);

    if (this.messageQueue.length >= MAX_INSERT) {
      await this.flushSafely();
    }
  }

  // ✅ Hàm flush có lock để tránh race condition
  private async flushSafely() {
    if (this.isFlushing) return; // tránh chạy song song

    this.isFlushing = true;

    const batch = this.messageQueue.splice(0, MAX_INSERT); // lấy tối đa 1000 phần tử đầu

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

      // Nếu lỗi, đưa batch trở lại đầu hàng đợi
      this.messageQueue.unshift(...batch);
    } finally {
      this.isFlushing = false;
    }
  }
}
