import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  access: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPass123!',
    format: 'password',
  })
  password: string;
}
