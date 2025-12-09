import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { LoadingPostDto } from './dto/loadingPosts.dto';
@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) { }

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

  async createPost(req: Request, data: CreatePostDto) {
    const userId = req.user?.id;
    const availableUser = await this.getAvailableUser(userId as string);

    if (!availableUser) {
      throw new Error('User not found');
    }

    const post = await this.prismaService.post.create({
      data: {
        ...data,
        userId: availableUser.id,
      },
    });
    return {
      status: true,
      data: {
        post,
      },
    };
  }

  async updatePost(req: Request, postId: string, data: CreatePostDto) {
    const userId = req.user?.id;
    const availableUser = await this.getAvailableUser(userId as string);

    if (!availableUser) {
      throw new Error('User not found');
    }

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      throw new Error('Post not found');
    }

    const post = await this.prismaService.post.update({
      where: { id_userId: { id: postId, userId: availableUser.id } },
      data: {
        ...data,
      },
    });

    return {
      status: true,
      data: {
        post,
      },
    };
  }

  async deletePost(req: Request, postId: string) {
    const userId = req.user?.id;
    const availableUser = await this.getAvailableUser(userId as string);

    if (!availableUser) {
      throw new Error('User not found');
    }

    const availablePost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!availablePost) {
      throw new Error('Post not found');
    }

    const post = await this.prismaService.post.delete({
      where: { id_userId: { id: postId, userId: availableUser.id } },
    });

    return {
      status: true,
      data: {
        post,
      },
    };
  }

  async loadingPosts(userId: string, dto: LoadingPostDto) {
    const availableUser = await this.getAvailableUser(userId);

    if (!availableUser) {
      throw new Error('User not found');
    }

    // calculate cursor
    const numberGet = (dto.page - 1) * dto.limit;

    if (dto.cursor) {
      const cursorPost = await this.prismaService.post.findMany({
        where: { userId: availableUser.id },
        cursor: { id: dto.cursor },
        take: numberGet,
        orderBy: {
          createdAt: 'asc',
        },
      });

      const newCursor = cursorPost[cursorPost.length - 1].id;
      const nextPage = dto.page + 1;
      const hasMore = cursorPost.length > dto.limit;

      return {
        status: true,
        data: {
          post: cursorPost,
          cursor: newCursor,
          page: nextPage,
          hasMore,
        },
      };
    }

    const post = await this.prismaService.post.findMany({
      where: { userId: availableUser.id },
      take: dto.limit,
      skip: numberGet,
      orderBy: {
        createdAt: 'asc',
      },
    });

    const newCursor = post[post.length - 1].id;
    const nextPage = dto.page + 1;
    const hasMore = post.length > dto.limit;

    return {
      status: true,
      data: {
        post,
        cursor: newCursor,
        page: nextPage,
        hasMore,
      },
    };
  }

  async loadingPostById(postId: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return {
      status: true,
      data: {
        post,
      },
    };
  }
  async loadingFeed(dto: LoadingPostDto) {
    const numberGet = (dto.page - 1) * dto.limit;

    const baseQuery = {
      take: dto.limit,
      skip: numberGet,
      orderBy: {
        createdAt: 'desc',
      } as const,
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    };

    if (dto.cursor) {
      Object.assign(baseQuery, {
        cursor: { id: dto.cursor },
        skip: 1 // Skip the cursor itself when using cursor-based pagination
      });
    }

    const posts = await this.prismaService.post.findMany(baseQuery);

    const hasMore = posts.length === dto.limit;
    const newCursor = hasMore ? posts[posts.length - 1].id : null;
    const nextPage = dto.page + 1;

    return {
      status: true,
      data: {
        post: posts,
        cursor: newCursor,
        page: nextPage,
        hasMore,
      },
    };
  }
}
