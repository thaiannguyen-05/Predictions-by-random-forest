import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'User unique identifier',
    example: 'uuid-123-456',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
  })
  username: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'Full name',
    example: 'John Doe',
    required: false,
  })
  fullname?: string;

  @ApiProperty({
    description: 'Avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avtUrl?: string;

  @ApiProperty({
    description: 'Account active status',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Authentication provider',
    example: 'EMAIL',
    enum: ['EMAIL', 'GOOGLE', 'FACEBOOK'],
    required: false,
  })
  provider?: string;
}

export class SessionResponseDto {
  @ApiProperty({
    description: 'Session unique identifier',
    example: 'session-uuid-789',
  })
  id: string;

  @ApiProperty({
    description: 'User agent string',
    example: 'Mozilla/5.0...',
  })
  userAgent: string;

  @ApiProperty({
    description: 'User IP address',
    example: '192.168.1.1',
  })
  userIp: string;

  @ApiProperty({
    description: 'Login timestamp',
    example: '2025-11-30T07:00:00Z',
  })
  loginedAt: Date;
}

export class TokensResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Access token expiration time in milliseconds',
    example: 3600000,
  })
  expiresIn: number;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'User data without sensitive information',
    type: UserResponseDto,
  })
  data: UserResponseDto;

  @ApiProperty({
    description: 'Session information',
    type: SessionResponseDto,
  })
  session: SessionResponseDto;

  @ApiProperty({
    description: 'Authentication tokens',
    type: TokensResponseDto,
  })
  tokens: TokensResponseDto;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'Operation status',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: 'Registered user data',
    type: 'object',
    properties: {
      newUser: {
        type: 'object',
        description: 'Newly created user information',
        additionalProperties: true,
      },
    },
  })
  data: {
    newUser: UserResponseDto;
  };
}

export class VerifyAccountResponseDto {
  @ApiProperty({
    description: 'Verification status',
    example: true,
  })
  status: boolean;
}

export class LogoutResponseDto {
  @ApiProperty({
    description: 'Logout status',
    example: true,
  })
  status: boolean;
}

export class ChangePasswordResponseDto {
  @ApiProperty({
    description: 'Password change status',
    example: true,
  })
  status: boolean;
}

export class GetMeResponseDto {
  @ApiProperty({
    description: 'Login status',
    example: true,
  })
  loggedIn: boolean;

  @ApiProperty({
    description: 'Current user information',
    type: 'object',
    properties: {
      id: { type: 'string', example: 'uuid-123' },
      email: { type: 'string', example: 'user@example.com' },
      username: { type: 'string', example: 'john_doe' },
      name: { type: 'string', example: 'John Doe' },
      avatar: { type: 'string', example: 'https://example.com/avatar.jpg' },
      provider: { type: 'string', example: 'EMAIL' },
      isActive: { type: 'boolean', example: true },
    },
  })
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
    avatar?: string;
    provider?: string;
    isActive: boolean;
  };
}
