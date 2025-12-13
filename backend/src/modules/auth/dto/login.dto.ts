import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * DTO cho request đăng nhập.
 */
export class LoginDto {
  @ApiProperty({
    description: 'Email, username hoặc ID người dùng',
    example: 'user@example.com',
  })
  @IsString({ message: 'Access must be a string' })
  @IsNotEmpty({ message: 'Access field is required' })
  access: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPass123!',
    format: 'password',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
