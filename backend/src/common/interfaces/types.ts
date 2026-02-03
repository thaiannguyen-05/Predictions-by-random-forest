export interface StandardResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface StandardErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface PaginatedData<T> {
  items: T[];
  cursor: string | null;
  page: number;
  hasMore: boolean;
  total?: number;
}

export type StandardPaginatedResponse<T> = StandardResponse<PaginatedData<T>>;
