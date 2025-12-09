import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import type { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  create(@Req() req: Request, @Body() dto: CreateCommentDto) {
    return this.commentService.create(req, dto);
  }

  @Get(':id')
  findOne(@Param('commentId') commentId: string) {
    return this.commentService.findOne(commentId);
  }

  @Patch(':id')
  update(@Req() req: Request, @Body() dto: UpdateCommentDto) {
    return this.commentService.update(req, dto);
  }
}
