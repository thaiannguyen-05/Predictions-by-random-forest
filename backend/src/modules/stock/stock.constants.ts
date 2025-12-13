/**
 * Constants cho Stock module.
 */

/**
 * ML Service configuration defaults.
 */
export const ML_SERVICE_CONFIG = {
  DEFAULT_HOST: '127.0.0.1',
  DEFAULT_PORT: 9999,
  TIMEOUT_MS: 30000, // 30 seconds
  RETRY_COUNT: 3,
} as const;

/**
 * History search configuration.
 */
export const HISTORY_SEARCH_CONFIG = {
  DUPLICATE_WINDOW_MS: 30000, // 30 seconds - thời gian tối thiểu giữa các record
  DEFAULT_LIMIT: 10,
} as const;

/**
 * Model training defaults.
 */
export const MODEL_TRAINING_CONFIG = {
  DEFAULT_TEST_SIZE: 0.2,
  DEFAULT_N_ESTIMATORS: 100,
} as const;

/**
 * Prediction configuration.
 */
export const PREDICTION_CONFIG = {
  DEFAULT_TOP_N: 5,
  MULTI_HOUR_INTERVALS: [1, 2, 3, 4] as const,
} as const;

/**
 * ML Service commands.
 */
export const ML_COMMANDS = {
  PING: 'ping',
  GET_CURRENT_PRICE: 'get_current_price',
  GET_FINANCIAL_DATA: 'get_financial_data',
  PREDICT: 'predict',
  PREDICT_MULTI_HOURS: 'predict_multi_hours',
  PREDICT_ALL: 'predict_all',
  TRAIN_SINGLE: 'train_single',
  TRAIN_ALL: 'train_all',
  UPDATE_DATA: 'update_data',
  GET_TICKER_LIST: 'get_ticker_list',
  GET_MODEL_STATUS: 'get_model_status',
  FULL_PIPELINE: 'full_pipeline',
} as const;

/**
 * Fallback API URL for price data.
 * @param symbol - Mã cổ phiếu
 * @returns URL để lấy giá fallback
 */
export function getFallbackPriceUrl(symbol: string): string {
  return `https://restv2.fireant.vn/posts?symbol=${symbol}`;
}

/**
 * @deprecated Use getFallbackPriceUrl instead
 */
export const fallBackPrice = getFallbackPriceUrl;
