/**
 * Response wrapper types
 * Cho phép service trả về các format khác nhau
 */
export interface LegacyResponse {
  status: boolean;
  data?: unknown;
  message?: string;
}
