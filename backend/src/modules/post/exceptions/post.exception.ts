import {
  ExceptionMetadata,
  ResourceNotFoundException,
} from '../../../common/exceptions/base.exception';

/**
 * Exception khi không tìm thấy Post
 */
export class PostNotFoundException extends ResourceNotFoundException {
  constructor(postId?: string, metadata?: ExceptionMetadata) {
    super('Post', postId, metadata);
  }
}
