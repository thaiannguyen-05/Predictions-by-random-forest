import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '../../../prisma/generated/prisma';
import { MyLogger } from '../../logger/logger.service';
import { CreatePostDto } from './dto/createPost.dto';
@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaClient,
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
}
