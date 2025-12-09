import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CreatePostDto } from './dto/createPost.dto';
import { PostService } from './post.service';
import { Throttle } from '@nestjs/throttler';
import { TIME_LIMIT_POST } from '../../common/type/common.type';
import { IsAuthorPostGuard } from './isAuthorPost.guard';
import { LoadingPostDto } from './dto/loadingPosts.dto';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('create')
  async createPost(@Req() req: Request, @Body() dto: CreatePostDto) {
    return this.postService.createPost(req, dto);
  }

  @UseGuards(IsAuthorPostGuard)
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('update')
  async updatePost(
    @Req() req: Request,
    @Query('postId') postId: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postService.updatePost(req, postId, dto);
  }

  @UseGuards(IsAuthorPostGuard)
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('delete')
  async deletePost(@Req() req: Request, @Query('postId') postId: string) {
    return this.postService.deletePost(req, postId);
  }

  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('loading')
  async loadingPosts(
    @Query('userId') userId: string,
    @Body() dto: LoadingPostDto,
  ) {
    return this.postService.loadingPosts(userId, dto);
  }

  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('loadingById')
  async loadingPostById(@Query('postId') postId: string) {
    return this.postService.loadingPostById(postId);
  }

  @Throttle({ default: { limit: 20, ttl: TIME_LIMIT_POST } })
  @Post('feed')
  async loadingFeed(@Body() dto: LoadingPostDto) {
    return this.postService.loadingFeed(dto);
  }
}
