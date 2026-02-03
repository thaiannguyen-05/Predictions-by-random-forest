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

/**
 * Interface cho dữ liệu view count response
 */
export interface ViewCountData {
  postId: string;
  viewCount: number;
}

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
