export interface ExceptionMetadata {
  userId?: string;
  action?: string;
  params?: Record<string, unknown>;
}
