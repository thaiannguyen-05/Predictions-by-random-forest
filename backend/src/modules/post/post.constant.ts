export const MAX_BATCH_INSERT = 100;
export const likeCount = (postId: string) => `likeCount:${postId}`;
export interface LikePost {
  postId: string;
  userId: string;
  isLike: true;
}

export interface DisLikePost {
  postId: string;
  userId: string;
  isLike: false;
}

export const INTERVAL = 1000 * 60 * 5; // 5 minutes

/**
 * Post response interface
 */
export interface PostResponse<T> {
  status: boolean;
  data: T;
}

/**
 * Paginated response interface
 */
export interface PaginatedPostResponse {
  status: boolean;
  data: {
    post: unknown[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}
