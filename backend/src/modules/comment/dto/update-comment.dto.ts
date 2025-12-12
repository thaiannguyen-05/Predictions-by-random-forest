import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

/**
 * DTO cho việc cập nhật comment
 */
export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: 'ID của comment cần cập nhật',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nội dung mới của comment',
    example: 'Nội dung đã được cập nhật',
    minLength: 1,
    maxLength: 5000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5000)
  content: string;
}
