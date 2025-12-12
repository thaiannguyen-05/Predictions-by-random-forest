import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * DTO cho việc tạo bài post mới
 */
export class CreatePostDto {
  @ApiProperty({
    description: 'Tiêu đề bài post',
    example: 'Dự đoán giá cổ phiếu VNM',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    description: 'Nội dung bài post',
    example: 'Phân tích kỹ thuật cho thấy...',
    minLength: 1,
    maxLength: 10000,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10000)
  content: string;

  @ApiPropertyOptional({
    description: 'Danh sách URL files đính kèm',
    example: ['https://example.com/chart.png'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  file?: string[];
}
