import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PostNotFoundException } from '../exceptions/post.exception';
import {
  DisLikePost,
  INTERVAL,
  LikePost,
  MAX_BATCH_INSERT,
} from '../post.constant';
import { MyLogger } from '../../../logger/logger.service';

const CONTEXT = 'BatchInsertService';

@Injectable()
export class BatchInsertService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: MyLogger,
  ) {}

  private likePostData: LikePost[] = [];
  private dislikePostData: DisLikePost[] = [];

  onModuleInit(): void {
    this.logger.log(
      `Batch insert interval initialized (${INTERVAL}ms)`,
      CONTEXT,
    );
    setInterval(async () => {
      const likesToProcess = [...this.likePostData];
      this.likePostData = [];

      const dislikesToProcess = [...this.dislikePostData];
      this.dislikePostData = [];

      if (likesToProcess.length > 0 || dislikesToProcess.length > 0) {
        this.logger.debug(
          `Processing batch: ${likesToProcess.length} likes, ${dislikesToProcess.length} dislikes`,
          CONTEXT,
        );
      }

      for (const value of likesToProcess) {
        await this.insertBatch(value.postId, value);
      }

      for (const value of dislikesToProcess) {
        await this.deInsertBatch(value.postId, value);
      }
    }, INTERVAL);
  }

  async insertBatch(postId: string, likePost: LikePost): Promise<void> {
    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    if (!availablePost) {
      this.logger.warn(`Post not found for batch insert: ${postId}`, CONTEXT);
      throw new PostNotFoundException(postId);
    }

    const sizeBatch = this.likePostData.length;

    if (sizeBatch >= MAX_BATCH_INSERT) {
      this.logger.log(
        `Flushing like batch: ${sizeBatch} items for post ${postId}`,
        CONTEXT,
      );
      await this.prismaService.likePost.createMany({
        data: this.likePostData,
      });

      await this.prismaService.post.update({
        where: { id: postId },
        data: { likeCount: availablePost.likeCount + sizeBatch },
      });

      this.likePostData = [];
      this.logger.debug(`Like batch flushed successfully`, CONTEXT);
    } else {
      this.likePostData.push(likePost);
    }
  }

  async deInsertBatch(postId: string, dislikePost: DisLikePost): Promise<void> {
    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    if (!availablePost) {
      this.logger.warn(`Post not found for batch dislike: ${postId}`, CONTEXT);
      throw new PostNotFoundException(postId);
    }

    const sizeBatch = this.dislikePostData.length;
    const dislikeCount = availablePost.likeCount - sizeBatch;

    if (sizeBatch >= MAX_BATCH_INSERT) {
      this.logger.log(
        `Flushing dislike batch: ${sizeBatch} items for post ${postId}`,
        CONTEXT,
      );

      // Use Promise.all for proper async handling
      await Promise.all(
        this.dislikePostData.map((value) =>
          this.prismaService.likePost.delete({
            where: { id_userId: { id: value.postId, userId: value.userId } },
          }),
        ),
      );

      await this.prismaService.post.update({
        where: { id: postId },
        data: { likeCount: dislikeCount },
      });

      this.dislikePostData = [];
      this.logger.debug(`Dislike batch flushed successfully`, CONTEXT);
    } else {
      this.dislikePostData.push(dislikePost);
    }
  }
}
