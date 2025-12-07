import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class UploadAvatarChunkDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ description: 'Unique identifier for the upload session' })
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @ApiProperty({ description: 'Original filename' })
  @IsString()
  @IsNotEmpty()
  originalName: string;

  @ApiProperty({ description: 'Current chunk index (0-based)' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  index: number;

  @ApiProperty({ description: 'Total number of chunks' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalChunks: number;
}
