/**
 * Standard API Response Interfaces
 * Được sử dụng bởi ResponseInterceptor để chuẩn hóa response format
 */

/**
 * Standard success response format
 */
export interface StandardResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

/**
 * Standard error response format
 */
export interface StandardErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

/**
 * Paginated data wrapper
 */
export interface PaginatedData<T> {
  items: T[];
  cursor: string | null;
  page: number;
  hasMore: boolean;
  total?: number;
}

/**
 * Standard paginated response
 */
export type StandardPaginatedResponse<T> = StandardResponse<PaginatedData<T>>;
