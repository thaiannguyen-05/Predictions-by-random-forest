import { Body, Controller, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Req() req: Request, @Body() dto: CreatePostDto) {
    return this.postService.createPost(req, dto);
  }
}
