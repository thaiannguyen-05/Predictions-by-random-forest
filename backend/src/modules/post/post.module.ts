import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './post.controller';
import { BatchInsertService } from './service/batchInsert.service';

@Module({
  providers: [PostService, BatchInsertService],
  controllers: [PostController],
})
export class PostModule {}
