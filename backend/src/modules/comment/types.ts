export interface CommentResponse<T> {
  status: boolean;
  data: T;
}

export interface PaginatedCommentsResponse {
  status: boolean;
  data: {
    comments: unknown[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}
