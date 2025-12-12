/**
 * Generic API response interface
 */
export interface ApiResponse<T> {
  status: boolean;
  data: T;
}

/**
 * Paginated response interface
 */
export interface PaginatedResponse<T> {
  status: boolean;
  data: {
    items: T[];
    cursor: string | null;
    page: number;
    hasMore: boolean;
  };
}
