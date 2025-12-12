import { HttpStatus } from '@nestjs/common';
import {
  BaseApplicationException,
  ExceptionMetadata,
} from '../../../common/exceptions/base.exception';

/**
 * Exception khi không tìm thấy User hoặc User không active
 */
export class UserNotFoundOrNotActiveException extends BaseApplicationException {
  constructor(userId?: string, metadata?: ExceptionMetadata) {
    const message = userId
      ? `User '${userId}' not found or not active`
      : 'User not found or not active';
    super(message, HttpStatus.NOT_FOUND, {
      ...metadata,
      userId,
    });
  }
}
