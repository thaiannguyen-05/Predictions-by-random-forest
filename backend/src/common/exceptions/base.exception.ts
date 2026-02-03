import { HttpException, HttpStatus } from '@nestjs/common';
import type { ExceptionMetadata } from './types';

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

  public getDetailedError(): Record<string, unknown> {
    return {
      message: this.message,
      statusCode: this.getStatus(),
      metadata: this.metadata,
      timestamp: new Date().toISOString(),
    };
  }
}

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

export class UnauthorizedAccessException extends BaseApplicationException {
  constructor(message = 'Unauthorized access', metadata?: ExceptionMetadata) {
    super(message, HttpStatus.UNAUTHORIZED, metadata);
  }
}

export class ForbiddenActionException extends BaseApplicationException {
  constructor(action: string, metadata?: ExceptionMetadata) {
    super(
      `You are not allowed to perform action: ${action}`,
      HttpStatus.FORBIDDEN,
      metadata,
    );
  }
}

export class ValidationFailedException extends BaseApplicationException {
  constructor(field: string, reason: string, metadata?: ExceptionMetadata) {
    super(
      `Validation failed for '${field}': ${reason}`,
      HttpStatus.BAD_REQUEST,
      metadata,
    );
  }
}

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
