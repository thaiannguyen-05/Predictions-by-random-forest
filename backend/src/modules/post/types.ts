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

export interface ViewCountData {
  postId: string;
  viewCount: number;
}

export interface PostResponse<T> {
  status: boolean;
  data: T;
}

export interface PaginatedPostResponse {
  status: boolean;
  data: {
    post: unknown[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}
