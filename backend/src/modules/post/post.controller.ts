import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { CreatePostDto } from './dto/createPost.dto';
import { LoadingPostDto } from './dto/loadingPosts.dto';
import { PostService } from './post.service';
import { IsAuthorPostGuard } from './isAuthorPost.guard';
import { TIME_LIMIT_POST } from '../../common/type/common.type';

/**
 * Controller xử lý các request liên quan đến Post
 * @class PostController
 */
@ApiTags('Post')
@ApiBearerAuth('JWT-auth')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Tạo bài post mới
   */
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('create')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createPost(@Req() req: Request, @Body() dto: CreatePostDto) {
    return this.postService.createPost(req, dto);
  }

  /**
   * Cập nhật bài post (chỉ author mới được phép)
   */
  @UseGuards(IsAuthorPostGuard)
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('update')
  @ApiOperation({ summary: 'Update a post (author only)' })
  @ApiQuery({ name: 'postId', description: 'Post ID to update' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the author' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async updatePost(
    @Req() req: Request,
    @Query('postId') postId: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postService.updatePost(req, postId, dto);
  }

  /**
   * Xóa bài post (chỉ author mới được phép)
   */
  @UseGuards(IsAuthorPostGuard)
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Delete('delete')
  @ApiOperation({ summary: 'Delete a post (author only)' })
  @ApiQuery({ name: 'postId', description: 'Post ID to delete' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the author' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async deletePost(@Req() req: Request, @Query('postId') postId: string) {
    return this.postService.deletePost(req, postId);
  }

  /**
   * Load danh sách posts của một user với pagination
   */
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Post('loading')
  @ApiOperation({ summary: 'Load posts for a specific user with pagination' })
  @ApiQuery({ name: 'userId', description: 'User ID to load posts for' })
  @ApiBody({ type: LoadingPostDto })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async loadingPosts(
    @Query('userId') userId: string,
    @Body() dto: LoadingPostDto,
  ) {
    return this.postService.loadingPosts(userId, dto);
  }

  /**
   * Load một post theo ID
   */
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @Get('loadingById')
  @ApiOperation({ summary: 'Load a single post by ID' })
  @ApiQuery({ name: 'postId', description: 'Post ID to load' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async loadingPostById(@Query('postId') postId: string) {
    return this.postService.loadingPostById(postId);
  }

  /**
   * Load feed posts với pagination
   */
  @Throttle({ default: { limit: 20, ttl: TIME_LIMIT_POST } })
  @Post('feed')
  @ApiOperation({ summary: 'Load feed posts with pagination' })
  @ApiBody({ type: LoadingPostDto })
  @ApiResponse({
    status: 200,
    description: 'Feed posts retrieved successfully',
  })
  async loadingFeed(@Body() dto: LoadingPostDto) {
    return this.postService.loadingFeed(dto);
  }
}
