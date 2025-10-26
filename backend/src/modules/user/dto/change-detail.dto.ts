import { ApiPropertyOptional } from '@nestjs/swagger';

export class ChangeDetailDto {
  @ApiPropertyOptional({
    description: 'Username for the user account',
    example: 'john_doe123',
  })
  username?: string;

  @ApiPropertyOptional({
    description: 'User first name',
    example: 'John',
  })
  firstName?: string;

  @ApiPropertyOptional({
    description: 'User last name',
    example: 'Doe',
  })
  lastName?: string;

  @ApiPropertyOptional({
    description: 'User phone number',
    example: '+1234567890',
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    description: 'User date of birth in YYYY-MM-DD format',
    example: '1990-01-15',
    format: 'date',
  })
  dateOfBirth?: string;

  @ApiPropertyOptional({
    description: 'Avatar URL for user profile picture',
    example: 'https://example.com/avatar.jpg',
    format: 'url',
  })
  avtUrl?: string;
}
