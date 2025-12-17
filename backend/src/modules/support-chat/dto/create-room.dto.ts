import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * DTO cho việc tạo phòng chat hỗ trợ
 */
export class CreateRoomDto {
  @ApiPropertyOptional({
    description: 'ID của nhân viên hỗ trợ',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Employee ID must be a string' })
  @IsUUID('4', { message: 'Employee ID must be a valid UUID' })
  employeeId?: string;

  @ApiProperty({
    description: 'ID của khách hàng',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsString({ message: 'Customer ID must be a string' })
  @IsNotEmpty({ message: 'Customer ID is required' })
  @IsUUID('4', { message: 'Customer ID must be a valid UUID' })
  customerId: string;

  @ApiProperty({
    description: 'ID của phiên chat',
    example: 'session-550e8400-e29b-41d4',
  })
  @IsString({ message: 'Session ID must be a string' })
  @IsNotEmpty({ message: 'Session ID is required' })
  sessionId: string;
}
