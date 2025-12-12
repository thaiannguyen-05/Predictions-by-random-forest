/**
 * Queue name cho email service
 */
export const QUEUE_EMAIL = 'email_queue';

/**
 * Rate limit time window cho post operations (1 hour in ms)
 */
export const TIME_LIMIT_POST = 60 * 60 * 1000;

/**
 * Default pagination values
 */
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * API response status messages
 */
export const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
} as const;

/**
 * Upload configuration
 */
export const UPLOAD_CONFIG = {
  UPLOAD_DIR: './upload',
  TEMP_DIR: './upload/temp',
  BASE_URL: 'http://localhost:4000/upload',
} as const;
