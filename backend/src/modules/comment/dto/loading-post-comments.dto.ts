import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { PAGINATION_DEFAULTS } from '../../../common/type/common.type';

/**
 * DTO cho việc load danh sách comments của một post với pagination
 */
export class LoadingPostCommentsDto {
  @ApiPropertyOptional({
    description: 'Cursor ID cho cursor-based pagination',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString()
  @IsUUID()
  cursor?: string;

  @ApiProperty({
    description: 'Số lượng items mỗi trang',
    example: 10,
    minimum: 1,
    maximum: PAGINATION_DEFAULTS.MAX_LIMIT,
    default: PAGINATION_DEFAULTS.LIMIT,
  })
  @Transform(
    ({ value }) => parseInt(value as string, 10) || PAGINATION_DEFAULTS.LIMIT,
  )
  @IsInt()
  @Min(1)
  @Max(PAGINATION_DEFAULTS.MAX_LIMIT)
  limit: number = PAGINATION_DEFAULTS.LIMIT;

  @ApiProperty({
    description: 'Số trang hiện tại',
    example: 1,
    minimum: 1,
    default: PAGINATION_DEFAULTS.PAGE,
  })
  @Transform(
    ({ value }) => parseInt(value as string, 10) || PAGINATION_DEFAULTS.PAGE,
  )
  @IsInt()
  @Min(1)
  page: number = PAGINATION_DEFAULTS.PAGE;
}
