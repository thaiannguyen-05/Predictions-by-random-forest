import {
  ExceptionMetadata,
  ResourceNotFoundException,
} from '../../../common/exceptions';

export class CommentNotFoundException extends ResourceNotFoundException {
  constructor(commentId?: string, metadata?: ExceptionMetadata) {
    super('Comment', commentId, metadata);
  }
}
