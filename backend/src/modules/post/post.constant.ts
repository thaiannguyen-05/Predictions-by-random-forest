export const MAX_BATCH_INSERT = 100;

/**
 * Giới hạn số lượng pending views trước khi flush vào DB
 * Khi pending views đạt 1000, sẽ tự động sync vào database
 */
export const MAX_PENDING_VIEW_COUNT = 1000;

export const likeCount = (postId: string): string => `likeCount:${postId}`;

/**
 * Redis key lưu tổng số view của bài viết (dùng để hiển thị)
 */
export const viewCountTotalKey = (postId: string): string =>
  `viewCount:total:${postId}`;

/**
 * Redis key lưu số view chờ sync vào database
 * Sẽ reset về 0 sau mỗi lần batch insert
 */
export const viewCountPendingKey = (postId: string): string =>
  `viewCount:pending:${postId}`;

/**
 * Interval để batch sync viewCount vào database (5 phút)
 */
export const VIEW_COUNT_INTERVAL = 1000 * 60 * 5;
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
