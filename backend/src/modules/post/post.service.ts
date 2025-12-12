import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { LoadingPostDto } from './dto/loadingPosts.dto';
import { isUUID } from '../../common/utils/uuid.utils';
import { PostNotFoundException } from './exceptions/post.exception';
import { UserNotFoundOrNotActiveException } from '../user/exceptions/user.exception';

/**
 * Post response interface
 */
export interface PostResponse<T> {
  status: boolean;
  data: T;
}

/**
 * Paginated response interface
 */
export interface PaginatedPostResponse {
  status: boolean;
  data: {
    post: unknown[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}

/**
 * Service xử lý các nghiệp vụ liên quan đến Post
 * @class PostService
 */
@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

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
   * @param req - Request object chứa thông tin user
   * @param data - Dữ liệu bài post
   * @returns Post được tạo
   */
  async createPost(
    req: Request,
    data: CreatePostDto,
  ): Promise<PostResponse<{ post: unknown }>> {
    const userId = req.user?.id;
    const availableUser = await this.getAvailableUser(userId as string);

    const post = await this.prismaService.post.create({
      data: {
        title: data.title,
        content: data.content,
        file: data.file || [],
        userId: availableUser.id,
      },
    });

    return {
      status: true,
      data: { post },
    };
  }

  /**
   * Cập nhật bài post
   * @param req - Request object
   * @param postId - ID của post cần update
   * @param data - Dữ liệu cập nhật
   * @returns Post sau khi update
   */
  async updatePost(
    req: Request,
    postId: string,
    data: CreatePostDto,
  ): Promise<PostResponse<{ post: unknown }>> {
    const userId = req.user?.id;
    const availableUser = await this.getAvailableUser(userId as string);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
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

    return {
      status: true,
      data: { post },
    };
  }

  /**
   * Xóa bài post
   * @param req - Request object
   * @param postId - ID của post cần xóa
   * @returns Post đã xóa
   */
  async deletePost(
    req: Request,
    postId: string,
  ): Promise<PostResponse<{ post: unknown }>> {
    const userId = req.user?.id;
    const availableUser = await this.getAvailableUser(userId as string);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      throw new PostNotFoundException(postId);
    }

    const post = await this.prismaService.post.delete({
      where: { id_userId: { id: postId, userId: availableUser.id } },
    });

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
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new PostNotFoundException(postId);
    }

    return {
      status: true,
      data: { post },
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
}
