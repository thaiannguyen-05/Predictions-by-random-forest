import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './post.controller';
import { BatchInsertService } from './service/batchInsert.service';
import { ViewCountService } from './service/viewCount.service';

@Module({
  providers: [PostService, BatchInsertService, ViewCountService],
  controllers: [PostController],
})
export class PostModule {}
