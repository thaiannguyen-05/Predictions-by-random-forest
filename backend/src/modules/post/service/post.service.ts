import { Injectable, UnauthorizedException } from '@nestjs/common';
import { isUUID } from '../../../common/utils/uuid.utils';
import { MyLogger } from '../../../logger/logger.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { UserNotFoundOrNotActiveException } from '../../user/exceptions/user.exception';
import { CreatePostDto } from '../dto/createPost.dto';
import { LoadingPostDto } from '../dto/loadingPosts.dto';
import { PostNotFoundException } from '../exceptions/post.exception';
import {
  DisLikePost,
  LikePost,
  PaginatedPostResponse,
  PostResponse,
  likeCount,
  viewCountTotalKey,
} from '..';
import { BatchInsertService } from './batchInsert.service';

const CONTEXT = 'PostService';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly batchInsertService: BatchInsertService,
    private readonly redisService: RedisService,
    private readonly logger: MyLogger,
  ) {}

  private async findUserByAccessor(accessor: string) {
    if (isUUID(accessor)) {
      return await this.prismaService.user.findUnique({
        where: { id: accessor },
        omit: { hashedPassword: false },
      });
    }

    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: accessor }, { username: accessor }],
      },
      omit: { hashedPassword: false },
    });
  }

  private async getAvailableUser(userId: string) {
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const availableUser = await this.findUserByAccessor(userId);

    if (!availableUser) {
      throw new UserNotFoundOrNotActiveException(userId);
    }

    return availableUser;
  }

  async createPost(
    userId: string,
    data: CreatePostDto,
  ): Promise<PostResponse<{ post: unknown }>> {
    this.logger.log(`Creating post for userId: ${userId}`, CONTEXT);
    const availableUser = await this.getAvailableUser(userId);

    const post = await this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content,
        file: data.file || [],
        userId: availableUser.id,
      },
    });

    this.logger.debug(`Post created successfully: ${post.id}`, CONTEXT);
    return {
      status: true,
      data: { post },
    };
  }

  async updatePost(
    userId: string,
    postId: string,
    data: CreatePostDto,
  ): Promise<PostResponse<{ post: unknown }>> {
    this.logger.log(`Updating post: ${postId} by userId: ${userId}`, CONTEXT);
    const availableUser = await this.getAvailableUser(userId);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      this.logger.warn(`Post not found: ${postId}`, CONTEXT);
      throw new PostNotFoundException(postId);
    }

    const post = await this.prismaService.post.update({
      where: { id_userId: { id: postId, userId: availableUser.id } },
      data: {
        title: data.title,
        content: data.content,
        file: data.file || [],
      },
    });

    this.logger.debug(`Post updated successfully: ${postId}`, CONTEXT);
    return {
      status: true,
      data: { post },
    };
  }

  async deletePost(
    userId: string,
    postId: string,
  ): Promise<PostResponse<{ post: unknown }>> {
    this.logger.log(`Deleting post: ${postId} by userId: ${userId}`, CONTEXT);
    const availableUser = await this.getAvailableUser(userId);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      this.logger.warn(`Post not found for deletion: ${postId}`, CONTEXT);
      throw new PostNotFoundException(postId);
    }

    const post = await this.prismaService.post.delete({
      where: { id_userId: { id: postId, userId: availableUser.id } },
    });

    this.logger.debug(`Post deleted successfully: ${postId}`, CONTEXT);
    return {
      status: true,
      data: { post },
    };
  }

  async loadingPosts(
    userId: string,
    dto: LoadingPostDto,
  ): Promise<PaginatedPostResponse> {
    const availableUser = await this.getAvailableUser(userId);
    const skip = (dto.page - 1) * dto.limit;

    if (dto.cursor) {
      const posts = await this.prismaService.post.findMany({
        where: { userId: availableUser.id },
        cursor: { id: dto.cursor },
        take: dto.limit + 1,
        skip: 1,
        orderBy: { createdAt: 'desc' },
      });

      const hasMore = posts.length > dto.limit;
      const resultPosts = hasMore ? posts.slice(0, dto.limit) : posts;
      const newCursor =
        resultPosts.length > 0 ? resultPosts[resultPosts.length - 1].id : null;

      return {
        status: true,
        data: {
          post: resultPosts,
          cursor: newCursor,
          page: dto.page + 1,
          hasMore,
        },
      };
    }

    const posts = await this.prismaService.post.findMany({
      where: { userId: availableUser.id },
      take: dto.limit + 1,
      skip,
      orderBy: { createdAt: 'desc' },
    });

    const hasMore = posts.length > dto.limit;
    const resultPosts = hasMore ? posts.slice(0, dto.limit) : posts;
    const newCursor =
      resultPosts.length > 0 ? resultPosts[resultPosts.length - 1].id : null;

    return {
      status: true,
      data: {
        post: resultPosts,
        cursor: newCursor,
        page: dto.page + 1,
        hasMore,
      },
    };
  }

  async loadingPostById(
    postId: string,
  ): Promise<PostResponse<{ post: unknown }>> {
    const viewCountKey = viewCountTotalKey(postId);
    const viewCountInRedis = await this.redisService.get(viewCountKey);

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    const { viewCount, ...postWithoutViewCount } = post;

    const responseData = {
      ...postWithoutViewCount,
      viewCount: viewCountInRedis,
    };

    return {
      status: true,
      data: { post: responseData },
    };
  }

  async loadingFeed(dto: LoadingPostDto): Promise<PaginatedPostResponse> {
    const skip = (dto.page - 1) * dto.limit;

    const baseQuery = {
      take: dto.limit + 1,
      skip,
      orderBy: { createdAt: 'desc' } as const,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avtUrl: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
    };

    if (dto.cursor) {
      Object.assign(baseQuery, {
        cursor: { id: dto.cursor },
        skip: 1,
      });
    }

    const posts = await this.prismaService.post.findMany(baseQuery);

    const hasMore = posts.length > dto.limit;
    const resultPosts = hasMore ? posts.slice(0, dto.limit) : posts;
    const newCursor =
      resultPosts.length > 0 ? resultPosts[resultPosts.length - 1].id : null;

    return {
      status: true,
      data: {
        post: resultPosts,
        cursor: newCursor,
        page: dto.page + 1,
        hasMore,
      },
    };
  }

  async likePost(userId: string, postId: string) {
    this.logger.log(
      `Like/Unlike post: ${postId} by userId: ${userId}`,
      CONTEXT,
    );
    const availableUser = await this.getAvailableUser(userId);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      this.logger.warn(`Post not found for like action: ${postId}`, CONTEXT);
      throw new PostNotFoundException(postId);
    }

    const likePost = await this.prismaService.likePost.findUnique({
      where: { id_userId: { id: postId, userId: availableUser.id } },
    });

    if (!likePost?.isLike) {
      const likePostData: LikePost = {
        postId,
        userId: availableUser.id,
        isLike: true,
      };
      await this.batchInsertService.insertBatch(postId, likePostData);
      const key = likeCount(postId);
      const currentScore = availablePost.likeCount;
      await this.redisService.set(key, currentScore + 1);
      this.logger.debug(
        `Post ${postId} liked by user ${availableUser.id}`,
        CONTEXT,
      );
    } else {
      const dislikePostData: DisLikePost = {
        postId,
        userId: availableUser.id,
        isLike: false,
      };
      await this.batchInsertService.deInsertBatch(postId, dislikePostData);
      const key = likeCount(postId);
      const currentScore = availablePost.likeCount;
      await this.redisService.set(key, currentScore - 1);
      this.logger.debug(
        `Post ${postId} unliked by user ${availableUser.id}`,
        CONTEXT,
      );
    }

    return {
      status: true,
      data: { post: availablePost },
    };
  }
}
