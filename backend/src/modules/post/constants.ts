export const MAX_BATCH_INSERT = 100;

export const MAX_PENDING_VIEW_COUNT = 1000;

export const likeCount = (postId: string): string => `likeCount:${postId}`;

export const viewCountTotalKey = (postId: string): string =>
  `viewCount:total:${postId}`;

export const viewCountPendingKey = (postId: string): string =>
  `viewCount:pending:${postId}`;

export const VIEW_COUNT_INTERVAL = 1000 * 60 * 5;

export const INTERVAL = 1000 * 60 * 5;
