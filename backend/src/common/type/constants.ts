export const QUEUE_EMAIL = 'email_queue';
export const QUEUE_STOCK_MODEL_TRAINING = 'stock_model_training_queue';
export const TIME_LIMIT_POST = 60 * 60 * 1000;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const RESPONSE_MESSAGES = {
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
} as const;

export const UPLOAD_CONFIG = {
  UPLOAD_DIR: './upload',
  TEMP_DIR: './upload/temp',
  BASE_URL: 'http://localhost:4000/upload',
} as const;
