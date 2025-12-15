import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { User } from '../../common/decorator/user.decorator';
import { TIME_LIMIT_POST } from '../../common/type/common.type';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LoadingPostCommentsDto } from './dto/loading-post-comments.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IsAuthorCommentGuard } from './isAuthorComment.guard';

/**
 * Controller xử lý các request liên quan đến Comment
 * @class CommentController
 */
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Tạo comment mới cho một post
   */
  @Post('create')
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  create(@User('id') userId: string, @Body() dto: CreateCommentDto) {
    return this.commentService.create(userId, dto);
  }

  /**
   * Lấy thông tin một comment theo ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get comment by ID' })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  @ApiResponse({ status: 200, description: 'Comment retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  findOne(@Query('commentId') commentId: string) {
    return this.commentService.findOne(commentId);
  }

  /**
   * Cập nhật comment (chỉ author mới được phép)
   */
  @UseGuards(IsAuthorCommentGuard)
  @Post('update')
  @ApiOperation({ summary: 'Update a comment (author only)' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'Comment updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the author' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  update(@User('id') userId: string, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(userId, dto);
  }

  /**
   * Xóa comment (chỉ author mới được phép)
   */
  @UseGuards(IsAuthorCommentGuard)
  @Delete('delete')
  @ApiOperation({ summary: 'Delete a comment (author only)' })
  @ApiQuery({ name: 'commentId', description: 'Comment ID to delete' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the author' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  delete(@User('id') userId: string, @Query('commentId') commentId: string) {
    return this.commentService.remove(userId, commentId);
  }

  /**
   * Load danh sách comments của một post với pagination
   */
  @Post('loadingPostComments')
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  @ApiOperation({ summary: 'Load comments for a post with pagination' })
  @ApiQuery({ name: 'postId', description: 'Post ID to load comments for' })
  @ApiBody({ type: LoadingPostCommentsDto })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  loadingPostComments(
    @Query('postId') postId: string,
    @Body() dto: LoadingPostCommentsDto,
  ) {
    return this.commentService.loadingPostComments(postId, dto);
  }
}
