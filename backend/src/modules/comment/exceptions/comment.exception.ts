import {
  ExceptionMetadata,
  ResourceNotFoundException,
} from '../../../common/exceptions/base.exception';

/**
 * Exception khi không tìm thấy Comment
 */
export class CommentNotFoundException extends ResourceNotFoundException {
  constructor(commentId?: string, metadata?: ExceptionMetadata) {
    super('Comment', commentId, metadata);
  }
}
