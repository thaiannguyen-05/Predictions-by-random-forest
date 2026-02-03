/**
 * Comment response interface
 */
export interface CommentResponse<T> {
  status: boolean;
  data: T;
}

/**
 * Paginated comments response interface
 */
export interface PaginatedCommentsResponse {
  status: boolean;
  data: {
    comments: unknown[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}
