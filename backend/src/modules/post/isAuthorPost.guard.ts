import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class IsAuthorPostGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const postId = request.params.id;
    const user = request.user;

    if (!postId || !user) return false;

    const post = await this.prismaService.post.findUnique({
      where: { id_userId: { id: postId, userId: user.id } },
    });

    if (!post) {
      return false;
    }

    return post.userId === user.id;
  }
}
