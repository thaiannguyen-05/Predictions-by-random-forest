import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO cho việc tạo comment mới
 */
export class CreateCommentDto {
  @ApiProperty({
    description: 'Nội dung comment',
    example: 'Bài viết rất hữu ích, cảm ơn bạn!',
    minLength: 1,
    maxLength: 5000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5000)
  content: string;

  @ApiProperty({
    description: 'ID của post cần comment',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  postId: string;
}
