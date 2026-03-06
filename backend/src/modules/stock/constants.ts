export const ML_SERVICE_CONFIG = {
  DEFAULT_HOST: '127.0.0.1',
  DEFAULT_PORT: 9999,
  TIMEOUT_MS: 30000,
  RETRY_COUNT: 3,
} as const;

export const HISTORY_SEARCH_CONFIG = {
  DUPLICATE_WINDOW_MS: 30000,
  DEFAULT_LIMIT: 10,
} as const;

export const MODEL_TRAINING_CONFIG = {
  DEFAULT_TEST_SIZE: 0.2,
  DEFAULT_N_ESTIMATORS: 100,
} as const;

export const PREDICTION_CONFIG = {
  DEFAULT_TOP_N: 5,
  MULTI_HOUR_INTERVALS: [1, 2, 3, 4] as const,
} as const;

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

export function getFallbackPriceUrl(symbol: string): string {
  return `https://bgapidatafeed.vps.com.vn/getliststockdata/${symbol}`;
}

export const fallBackPrice = getFallbackPriceUrl;
