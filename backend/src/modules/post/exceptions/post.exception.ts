import {
  ExceptionMetadata,
  ResourceNotFoundException,
} from '../../../common/exceptions';

export class PostNotFoundException extends ResourceNotFoundException {
  constructor(postId?: string, metadata?: ExceptionMetadata) {
    super('Post', postId, metadata);
  }
}
