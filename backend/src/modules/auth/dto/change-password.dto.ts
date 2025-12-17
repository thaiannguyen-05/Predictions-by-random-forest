import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

/**
 * DTO cho việc thay đổi mật khẩu
 */
export class ChangePasswordDto {
  @ApiProperty({
    description: 'Email, username hoặc ID người dùng',
    example: 'user@example.com',
  })
  @IsString({ message: 'Accessor must be a string' })
  @IsNotEmpty({ message: 'Accessor is required' })
  accessor: string;

  @ApiProperty({
    description: 'Mật khẩu hiện tại',
    example: 'OldPassword123!',
    format: 'password',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    description:
      'Mật khẩu mới với ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt',
    example: 'NewStrongPass123!',
    format: 'password',
    minLength: 8,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'New password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'New password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  newPassword: string;
}
