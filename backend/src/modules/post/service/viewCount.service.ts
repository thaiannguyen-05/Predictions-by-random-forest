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
} from '..';

const CONTEXT = 'ViewCountService';

@Injectable()
export class ViewCountService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
    private readonly logger: MyLogger,
  ) {}

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

  private async flushAllPendingViews(): Promise<void> {
    const postIds = Array.from(this.pendingPostIds);

    if (postIds.length === 0) {
      return;
    }

    this.logger.debug(
      `Flushing ${postIds.length} posts with pending views`,
      CONTEXT,
    );

    this.pendingPostIds.clear();

    await Promise.all(
      postIds.map(async (postId) => {
        await this.syncViewCountToDb(postId);
      }),
    );

    this.logger.debug(`View count batch flush completed`, CONTEXT);
  }

  private async syncViewCountToDb(postId: string): Promise<void> {
    const pendingKey = viewCountPendingKey(postId);
    const totalKey = viewCountTotalKey(postId);

    try {
      const pendingViews = await this.redisService.getCurrentScore(pendingKey);

      if (pendingViews === 0) {
        return;
      }

      const totalViews = await this.redisService.getCurrentScore(totalKey);

      await this.prismaService.post.update({
        where: { id: postId },
        data: {
          viewCount: totalViews,
        },
      });

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

      this.pendingPostIds.add(postId);
    }
  }

  async increaseViewCount(postId: string): Promise<ViewCountData> {
    const totalKey = viewCountTotalKey(postId);
    const pendingKey = viewCountPendingKey(postId);

    const [newTotalView, newPendingView] = await Promise.all([
      this.redisService.increase(totalKey),
      this.redisService.increase(pendingKey),
    ]);

    this.pendingPostIds.add(postId);

    this.logger.debug(
      `View count increased for post ${postId}: total=${newTotalView}, pending=${newPendingView}`,
      CONTEXT,
    );

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

  async getCurrentViewCount(postId: string): Promise<number> {
    const totalKey = viewCountTotalKey(postId);
    return this.redisService.getCurrentScore(totalKey);
  }
}
