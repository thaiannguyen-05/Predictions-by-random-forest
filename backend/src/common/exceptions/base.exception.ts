import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Exception metadata interface
 */
export interface ExceptionMetadata {
  userId?: string;
  action?: string;
  params?: Record<string, unknown>;
}

/**
 * Base exception class với metadata support
 * @class BaseApplicationException
 */
export abstract class BaseApplicationException extends HttpException {
  public readonly metadata?: ExceptionMetadata;

  constructor(
    message: string,
    status: HttpStatus,
    metadata?: ExceptionMetadata,
  ) {
    super(message, status);
    this.metadata = metadata;
  }

  /**
   * Lấy thông tin lỗi chi tiết kèm metadata
   */
  public getDetailedError(): Record<string, unknown> {
    return {
      message: this.message,
      statusCode: this.getStatus(),
      metadata: this.metadata,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Exception khi không tìm thấy resource
 */
export class ResourceNotFoundException extends BaseApplicationException {
  constructor(
    resource: string,
    identifier?: string,
    metadata?: ExceptionMetadata,
  ) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' not found`
      : `${resource} not found`;
    super(message, HttpStatus.NOT_FOUND, metadata);
  }
}

/**
 * Exception khi user không có quyền
 */
export class UnauthorizedAccessException extends BaseApplicationException {
  constructor(message = 'Unauthorized access', metadata?: ExceptionMetadata) {
    super(message, HttpStatus.UNAUTHORIZED, metadata);
  }
}

/**
 * Exception khi user không cho phép thực hiện action
 */
export class ForbiddenActionException extends BaseApplicationException {
  constructor(action: string, metadata?: ExceptionMetadata) {
    super(
      `You are not allowed to perform action: ${action}`,
      HttpStatus.FORBIDDEN,
      metadata,
    );
  }
}

/**
 * Exception khi validation thất bại
 */
export class ValidationFailedException extends BaseApplicationException {
  constructor(field: string, reason: string, metadata?: ExceptionMetadata) {
    super(
      `Validation failed for '${field}': ${reason}`,
      HttpStatus.BAD_REQUEST,
      metadata,
    );
  }
}

/**
 * Exception khi resource đã tồn tại (conflict)
 */
export class ResourceConflictException extends BaseApplicationException {
  constructor(
    resource: string,
    identifier?: string,
    metadata?: ExceptionMetadata,
  ) {
    const message = identifier
      ? `${resource} with identifier '${identifier}' already exists`
      : `${resource} already exists`;
    super(message, HttpStatus.CONFLICT, metadata);
  }
}
