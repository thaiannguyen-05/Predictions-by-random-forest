import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IsAuthorCommentGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const commentId = request.params.id;
    const user = request.user;

    if (!commentId || !user) return false;

    const comment = await this.prismaService.comment.findUnique({
      where: { id_userId: { id: commentId, userId: user.id } },
    });

    if (!comment) {
      return false;
    }

    return comment.userId === user.id;
  }
}
