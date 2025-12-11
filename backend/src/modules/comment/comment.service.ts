import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { MyLogger } from '../../logger/logger.service';
import { LoadingPostCommentsDto } from './dto/loading-post-comments.dto';
@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: MyLogger,
  ) { }

  private isUUID(value: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  private async findUserByAccessor(accessor: string) {
    if (this.isUUID(accessor)) {
      const availableUser = await this.prismaService.user.findUnique({
        where: { id: accessor },
        omit: { hashedPassword: false },
      });

      return availableUser;
    }

    const userLoginWithoutUuid = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: accessor }, { username: accessor }],
      },
      omit: { hashedPassword: false },
    });

    return userLoginWithoutUuid;
  }

  private async getAvailableUser(userId: string) {
    if (!userId) throw new UnauthorizedException('User not found');

    const availableUser = await this.findUserByAccessor(userId);
    if (!availableUser) throw new NotFoundException('User not found');

    return availableUser;
  }

  async create(req: Request, dto: CreateCommentDto) {
    const userId = req.user?.id as string;
    const availableUser = await this.getAvailableUser(userId);

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: dto.postId },
    });
    if (!availablePost) throw new NotFoundException('Post not found');

    const newComment = await this.prismaService.comment.create({
      data: {
        content: dto.content,
        postId: dto.postId,
        userId: availableUser.id,
      },
    });

    this.logger.debug(
      `create comment successfully + ${JSON.stringify(newComment)}`,
    );

    return {
      status: true,
      data: {
        newComment,
      },
    };
  }

  async findOne(commentId: string) {
    const availableComment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    if (!availableComment) throw new NotFoundException('Comment not found');

    return {
      status: true,
      data: {
        availableComment,
      },
    };
  }

  async update(req: Request, updateCommentDto: UpdateCommentDto) {
    const userId = req.user?.id as string;
    const availableUser = await this.getAvailableUser(userId);

    const availableComment = await this.prismaService.comment.findUnique({
      where: { id: updateCommentDto.id },
    });
    if (!availableComment) throw new NotFoundException('Comment not found');

    const updatedComment = await this.prismaService.comment.update({
      where: { id: updateCommentDto.id },
      data: {
        content: updateCommentDto.content,
        postId: updateCommentDto.postId,
        userId: availableUser.id,
      },
    });

    this.logger.debug(
      `update comment successfully + ${JSON.stringify(updatedComment)}`,
    );

    return {
      status: true,
      data: {
        updatedComment,
      },
    };
  }

  async remove(req: Request, commentId: string) {
    const userId = req.user?.id as string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const availableUser = await this.getAvailableUser(userId);

    const availableComment = await this.prismaService.comment.findUnique({
      where: { id: commentId },
    });
    if (!availableComment) throw new NotFoundException('Comment not found');

    const deletedComment = await this.prismaService.comment.delete({
      where: { id: commentId },
    });

    this.logger.debug(
      `delete comment successfully + ${JSON.stringify(deletedComment)}`,
    );

    return {
      status: true,
      data: {
        deletedComment,
      },
    };
  }

  async loadingPostComments(postId: string, dto: LoadingPostCommentsDto) {
    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    if (!availablePost) throw new NotFoundException('Post not found');

    const currentPage = dto.page;
    const skip = (currentPage - 1) * dto.limit;

    if (dto.cursor) {
      const comments = await this.prismaService.comment.findMany({
        where: { postId },
        cursor: { id: dto.cursor },
        take: dto.limit + 1, // Lấy thêm 1 để check hasMore
        skip: 1, // Bỏ qua chính cursor
        orderBy: {
          createdAt: 'desc', // Mới nhất trước
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avtUrl: true,
            },
          },
        },
      });

      const hasMore = comments.length > dto.limit;
      // Chỉ trả về đúng limit record
      const resultComments = hasMore ? comments.slice(0, dto.limit) : comments;
      const newCursor =
        resultComments.length > 0
          ? resultComments[resultComments.length - 1].id
          : null;
      const nextPage = dto.page + 1;

      return {
        status: true,
        data: {
          comments: resultComments,
          cursor: newCursor,
          page: nextPage,
          hasMore,
        },
      };
    }

    const comments = await this.prismaService.comment.findMany({
      where: { postId },
      take: dto.limit + 1, // Lấy thêm 1 để check hasMore
      skip,
      orderBy: {
        createdAt: 'desc', // Mới nhất trước
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avtUrl: true,
          },
        },
      },
    });

    const hasMore = comments.length > dto.limit;
    // Chỉ trả về đúng limit record
    const resultComments = hasMore ? comments.slice(0, dto.limit) : comments;
    const newCursor =
      resultComments.length > 0
        ? resultComments[resultComments.length - 1].id
        : null;
    const nextPage = dto.page + 1;

    return {
      status: true,
      data: {
        comments: resultComments,
        cursor: newCursor,
        page: nextPage,
        hasMore,
      },
    };
  }
}
