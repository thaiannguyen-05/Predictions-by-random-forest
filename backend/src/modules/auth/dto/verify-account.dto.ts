import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VerifyAccount {
  @ApiProperty({
    description: 'Email address to send verification code to',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  to: string;

  @ApiProperty({
    description: 'Verification code sent to email',
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Code must be a string' })
  code?: string;
}
