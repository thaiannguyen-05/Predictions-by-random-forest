import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { MyLogger } from '../../logger/logger.service';
import { LoadingPostCommentsDto } from './dto/loading-post-comments.dto';
import { isUUID } from '../../common/utils/uuid.utils';
import { CommentNotFoundException } from './exceptions/comment.exception';
import { PostNotFoundException } from '../post/exceptions/post.exception';
import { UserNotFoundOrNotActiveException } from '../user/exceptions/user.exception';

/**
 * Comment response interface
 */
export interface CommentResponse<T> {
  status: boolean;
  data: T;
}

/**
 * Paginated comments response interface
 */
export interface PaginatedCommentsResponse {
  status: boolean;
  data: {
    comments: unknown[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}

/**
 * Service xử lý các nghiệp vụ liên quan đến Comment
 * @class CommentService
 */
@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
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
   * Tạo comment mới cho một post
   * @param userId - ID của user
   * @param dto - DTO chứa content và postId
   * @returns Comment được tạo
   */
  async create(
    userId: string,
    dto: CreateCommentDto,
  ): Promise<CommentResponse<{ newComment: unknown }>> {
    const availableUser = await this.getAvailableUser(userId);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: dto.postId },
    });

    if (!availablePost) {
      throw new PostNotFoundException(dto.postId);
    }

    const newComment = await this.prismaService.comment.create({
      data: {
        content: dto.content,
        postId: dto.postId,
        userId: availableUser.id,
      },
    });

    this.logger.debug(
      `create comment successfully: ${JSON.stringify(newComment)}`,
    );

    return {
      status: true,
      data: { newComment },
    };
  }

  /**
   * Lấy một comment theo ID
   * @param commentId - ID của comment
   * @returns Comment data
   */
  async findOne(
    commentId: string,
  ): Promise<CommentResponse<{ availableComment: unknown }>> {
    const availableComment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });

    if (!availableComment) {
      throw new CommentNotFoundException(commentId);
    }

    return {
      status: true,
      data: { availableComment },
    };
  }

  /**
   * Cập nhật comment
   * @param userId - ID của user
   * @param updateCommentDto - DTO chứa thông tin cập nhật
   * @returns Comment sau khi update
   */
  async update(
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentResponse<{ updatedComment: unknown }>> {
    const availableUser = await this.getAvailableUser(userId);

    const availableComment = await this.prismaService.comment.findUnique({
      where: { id: updateCommentDto.id },
    });

    if (!availableComment) {
      throw new CommentNotFoundException(updateCommentDto.id);
    }

    const updatedComment = await this.prismaService.comment.update({
      where: { id: updateCommentDto.id },
      data: {
        content: updateCommentDto.content,
        postId: updateCommentDto.postId,
        userId: availableUser.id,
      },
    });

    this.logger.debug(
      `update comment successfully: ${JSON.stringify(updatedComment)}`,
    );

    return {
      status: true,
      data: { updatedComment },
    };
  }

  /**
   * Xóa comment
   * @param userId - ID của user
   * @param commentId - ID của comment cần xóa
   * @returns Comment đã xóa
   */
  async remove(
    userId: string,
    commentId: string,
  ): Promise<CommentResponse<{ deletedComment: unknown }>> {
    await this.getAvailableUser(userId);

    const availableComment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });

    if (!availableComment) {
      throw new CommentNotFoundException(commentId);
    }

    const deletedComment = await this.prismaService.comment.delete({
      where: { id: commentId },
    });

    this.logger.debug(
      `delete comment successfully: ${JSON.stringify(deletedComment)}`,
    );

    return {
      status: true,
      data: { deletedComment },
    };
  }

  /**
   * Load danh sách comments của một post với pagination
   * @param postId - ID của post
   * @param dto - DTO chứa thông tin pagination
   * @returns Danh sách comments với metadata pagination
   */
  async loadingPostComments(
    postId: string,
    dto: LoadingPostCommentsDto,
  ): Promise<PaginatedCommentsResponse> {
    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      throw new PostNotFoundException(postId);
    }

    const skip = (dto.page - 1) * dto.limit;

    const commentQueryOptions = {
      where: { postId },
      orderBy: { createdAt: 'desc' as const },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avtUrl: true,
          },
        },
      },
    };

    if (dto.cursor) {
      const comments = await this.prismaService.comment.findMany({
        ...commentQueryOptions,
        cursor: { id: dto.cursor },
        take: dto.limit + 1,
        skip: 1,
      });

      const hasMore = comments.length > dto.limit;
      const resultComments = hasMore ? comments.slice(0, dto.limit) : comments;
      const newCursor =
        resultComments.length > 0
          ? resultComments[resultComments.length - 1].id
          : null;

      return {
        status: true,
        data: {
          comments: resultComments,
          cursor: newCursor,
          page: dto.page + 1,
          hasMore,
        },
      };
    }

    const comments = await this.prismaService.comment.findMany({
      ...commentQueryOptions,
      take: dto.limit + 1,
      skip,
    });

    const hasMore = comments.length > dto.limit;
    const resultComments = hasMore ? comments.slice(0, dto.limit) : comments;
    const newCursor =
      resultComments.length > 0
        ? resultComments[resultComments.length - 1].id
        : null;

    return {
      status: true,
      data: {
        comments: resultComments,
        cursor: newCursor,
        page: dto.page + 1,
        hasMore,
      },
    };
  }
}
