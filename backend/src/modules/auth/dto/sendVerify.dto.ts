import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

/**
 * DTO cho việc gửi mã xác thực
 */
export class SendVerifyDto {
  @ApiProperty({
    description: 'Email address để gửi mã xác thực',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Mã xác thực gồm 6 chữ số',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Code is required' })
  @Length(6, 6, { message: 'Code must be exactly 6 characters' })
  code: string;
}
