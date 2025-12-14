import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { MyLogger } from '../../../logger/logger.service';
import {
  VIEW_COUNT_INTERVAL,
  MAX_PENDING_VIEW_COUNT,
  viewCountTotalKey,
  viewCountPendingKey,
  ViewCountData,
} from '../post.constant';

const CONTEXT = 'ViewCountService';

/**
 * Service xử lý batch sync viewCount từ Redis → Database
 *
 * Design:
 * - Key 1 (total): Lưu tổng số view hiện tại → dùng để hiển thị
 * - Key 2 (pending): Lưu số view chờ sync → reset về 0 sau mỗi batch insert
 *
 * Logic:
 * - Khi user view: cả 2 key đều INCR +1
 * - Khi đọc view count: chỉ đọc key total
 * - Batch insert: Đọc pending → SET vào DB → Reset pending về 0
 */
@Injectable()
export class ViewCountService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
    private readonly logger: MyLogger,
  ) {}

  /**
   * Set lưu trữ các postId có pending views
   * Chỉ dùng để track postIds, không lưu số lượng
   */
  private pendingPostIds: Set<string> = new Set();

  onModuleInit(): void {
    this.logger.log(
      `ViewCount batch sync initialized (interval: ${VIEW_COUNT_INTERVAL}ms, maxPending: ${MAX_PENDING_VIEW_COUNT})`,
      CONTEXT,
    );

    setInterval(() => {
      void this.flushAllPendingViews();
    }, VIEW_COUNT_INTERVAL);
  }

  /**
   * Flush tất cả pending views vào database
   * Logic: Đọc pending từ Redis → UPDATE database → Reset pending về 0
   */
  private async flushAllPendingViews(): Promise<void> {
    const postIds = Array.from(this.pendingPostIds);

    if (postIds.length === 0) {
      return;
    }

    this.logger.debug(
      `Flushing ${postIds.length} posts with pending views`,
      CONTEXT,
    );

    // Clear set trước khi xử lý
    this.pendingPostIds.clear();

    // Process batch
    await Promise.all(
      postIds.map(async (postId) => {
        await this.syncViewCountToDb(postId);
      }),
    );

    this.logger.debug(`View count batch flush completed`, CONTEXT);
  }

  /**
   * Sync viewCount từ Redis vào Database
   * Logic: Đọc total view từ Redis → SET vào database → Reset pending về 0
   * @param postId - ID của post
   */
  private async syncViewCountToDb(postId: string): Promise<void> {
    const pendingKey = viewCountPendingKey(postId);
    const totalKey = viewCountTotalKey(postId);

    try {
      // Đọc pending views
      const pendingViews = await this.redisService.getCurrentScore(pendingKey);

      if (pendingViews === 0) {
        return;
      }

      // Đọc total views để SET vào database
      const totalViews = await this.redisService.getCurrentScore(totalKey);

      // SET viewCount trong database (không increment, set trực tiếp)
      await this.prismaService.post.update({
        where: { id: postId },
        data: {
          viewCount: totalViews,
        },
      });

      // Reset pending về 0
      await this.redisService.set(pendingKey, 0);

      this.logger.debug(
        `Synced viewCount for post ${postId}: total=${totalViews}, pending reset to 0`,
        CONTEXT,
      );
    } catch (error) {
      this.logger.error(
        `Failed to sync view count for post ${postId}: ${error}`,
        CONTEXT,
      );
      // Thêm lại vào pending set để retry
      this.pendingPostIds.add(postId);
    }
  }

  /**
   * Tăng view count cho một post
   * Logic: Cả 2 key (total và pending) đều INCR +1
   * @param postId - ID của post
   * @returns ViewCountData chứa postId và viewCount mới
   */
  async increaseViewCount(postId: string): Promise<ViewCountData> {
    const totalKey = viewCountTotalKey(postId);
    const pendingKey = viewCountPendingKey(postId);

    // Tăng cả 2 key đồng thời
    const [newTotalView, newPendingView] = await Promise.all([
      this.redisService.increase(totalKey),
      this.redisService.increase(pendingKey),
    ]);

    // Track postId này có pending views
    this.pendingPostIds.add(postId);

    this.logger.debug(
      `View count increased for post ${postId}: total=${newTotalView}, pending=${newPendingView}`,
      CONTEXT,
    );

    // Nếu pending đạt giới hạn, flush ngay lập tức
    if (newPendingView >= MAX_PENDING_VIEW_COUNT) {
      this.logger.log(
        `Immediate flush triggered: pending=${newPendingView} for post ${postId}`,
        CONTEXT,
      );

      this.pendingPostIds.delete(postId);
      await this.syncViewCountToDb(postId);
    }

    return {
      postId,
      viewCount: newTotalView,
    };
  }

  /**
   * Lấy view count hiện tại từ Redis (key total)
   * @param postId - ID của post
   * @returns Số lượng view count
   */
  async getCurrentViewCount(postId: string): Promise<number> {
    const totalKey = viewCountTotalKey(postId);
    return this.redisService.getCurrentScore(totalKey);
  }
}
