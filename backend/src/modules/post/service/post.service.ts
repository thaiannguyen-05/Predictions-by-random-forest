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
} from '../post.constant';
import { BatchInsertService } from './batchInsert.service';

const CONTEXT = 'PostService';

/**
 * Service xử lý các nghiệp vụ liên quan đến Post
 * @class PostService
 */
@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly batchInsertService: BatchInsertService,
    private readonly redisService: RedisService,
    private readonly logger: MyLogger,
  ) {}

  /**
   * Tìm user theo các accessor khác nhau (id, email, username)
   * @param accessor - ID, email hoặc username của user
   * @returns User nếu tìm thấy, null nếu không
   */
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

  /**
   * Lấy user và validate
   * @param userId - ID của user
   * @returns User active
   * @throws UnauthorizedException nếu không có userId
   * @throws UserNotFoundOrNotActiveException nếu user không tồn tại
   */
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

  /**
   * Tạo bài post mới
   * @param userId - ID của user đang đăng nhập
   * @param data - Dữ liệu bài post
   * @returns Post được tạo
   */
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

  /**
   * Cập nhật bài post
   * @param userId - ID của user đang đăng nhập
   * @param postId - ID của post cần update
   * @param data - Dữ liệu cập nhật
   * @returns Post sau khi update
   */
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

  /**
   * Xóa bài post
   * @param userId - ID của user đang đăng nhập
   * @param postId - ID của post cần xóa
   * @returns Post đã xóa
   */
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

  /**
   * Load danh sách posts của một user với pagination
   * @param userId - ID của user
   * @param dto - DTO chứa thông tin pagination
   * @returns Danh sách posts với metadata pagination
   */
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

  /**
   * Load một post theo ID
   * @param postId - ID của post
   * @returns Post data
   */
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  /**
   * Load feed với pagination
   * @param dto - DTO chứa thông tin pagination
   * @returns Danh sách posts cho feed
   */
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

    if (likePost?.isLike) {
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
