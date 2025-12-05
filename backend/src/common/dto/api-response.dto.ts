import { ApiProperty } from '@nestjs/swagger';

/**
 * Standard success response wrapper
 * Sử dụng cho tất cả API responses để đảm bảo consistency
 */
export class ApiSuccessResponse<T = unknown> {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  status: boolean;

  @ApiProperty({
    description: 'Response data payload',
    type: 'object',
    additionalProperties: true,
  })
  data?: T;

  @ApiProperty({
    description: 'Optional success message',
    example: 'Operation completed successfully',
    required: false,
  })
  message?: string;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2025-11-30T07:00:00Z',
    required: false,
  })
  timestamp?: string;
}

/**
 * Standard error response
 * Sử dụng cho tất cả error responses
 */
export class ApiErrorResponse {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message or array of validation errors',
    oneOf: [
      { type: 'string', example: 'Bad Request' },
      {
        type: 'array',
        items: { type: 'string' },
        example: [
          'Email is required',
          'Password must be at least 8 characters',
        ],
      },
    ],
  })
  message: string | string[];

  @ApiProperty({
    description: 'Error type/name',
    example: 'BadRequestException',
  })
  error: string;

  @ApiProperty({
    description: 'Request timestamp',
    example: '2025-11-30T07:00:00Z',
    required: false,
  })
  timestamp?: string;

  @ApiProperty({
    description: 'Request path that caused the error',
    example: '/api/auth/login',
    required: false,
  })
  path?: string;
}

/**
 * Paginated response wrapper
 * Sử dụng cho các API trả về danh sách có phân trang
 */
export class ApiPaginatedResponse<T = unknown> {
  @ApiProperty({
    description: 'Array of items for current page',
    type: 'array',
  })
  data: T[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: 'object',
    properties: {
      total: { type: 'number', example: 100, description: 'Total items' },
      page: { type: 'number', example: 1, description: 'Current page' },
      pageSize: {
        type: 'number',
        example: 10,
        description: 'Items per page',
      },
      totalPages: {
        type: 'number',
        example: 10,
        description: 'Total pages',
      },
      hasNext: {
        type: 'boolean',
        example: true,
        description: 'Has next page',
      },
      hasPrevious: {
        type: 'boolean',
        example: false,
        description: 'Has previous page',
      },
    },
  })
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
