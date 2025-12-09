import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import type { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { LoadingPostCommentsDto } from './dto/loading-post-comments.dto';
import { IsAuthorCommentGuard } from './isAuthorComment.guard';
import { Throttle } from '@nestjs/throttler';
import { TIME_LIMIT_POST } from '../../common/type/common.type';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  create(@Req() req: Request, @Body() dto: CreateCommentDto) {
    return this.commentService.create(req, dto);
  }

  @Get(':id')
  findOne(@Param('commentId') commentId: string) {
    return this.commentService.findOne(commentId);
  }

  @UseGuards(IsAuthorCommentGuard)
  @Patch(':id')
  update(@Req() req: Request, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(req, dto);
  }

  @UseGuards(IsAuthorCommentGuard)
  @Delete('delete')
  delete(@Req() req: Request, @Query('commentId') commentId: string) {
    return this.commentService.remove(req, commentId);
  }

  @Post('loadingPostComments')
  @Throttle({ default: { limit: 10, ttl: TIME_LIMIT_POST } })
  loadingPostComments(
    @Query('postId') postId: string,
    @Body() dto: LoadingPostCommentsDto,
  ) {
    return this.commentService.loadingPostComments(postId, dto);
  }
}
