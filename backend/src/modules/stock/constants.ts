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
  MULTI_HOUR_INTERVALS: [1, 2, 3] as const,
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
  TRAIN_ALL_MODELS_RECENT: 'train_all_models_recent',
  UPDATE_DATA: 'update_data',
  GET_TICKER_LIST: 'get_ticker_list',
  GET_MODEL_STATUS: 'get_model_status',
  FULL_PIPELINE: 'full_pipeline',
  COMPARE_MODELS: 'compare',
} as const;

export function getFallbackPriceUrl(symbol: string): string {
  return `https://bgapidatafeed.vps.com.vn/getliststockdata/${symbol}`;
}

export const fallBackPrice = getFallbackPriceUrl;

export const TRAIN_EVENT = 'train_event';

export const TIME_CHECK_INTERVAL_MS = 60 * 1000;

export const STOCK_COMPARE_CONFIG = {
  RECENT_DAYS: 365,
  CRON_EXPRESSION: '0 0 0 * * *',
  RF_TARGET_THRESHOLD: 0.7,
  RF_MIN_ELIGIBLE_TICKERS: 30,
  TICKERS: [
    'FPT.VN',
    'VNM.VN',
    'VCB.VN',
    'VHM.VN',
    'VIC.VN',
    'HPG.VN',
    'TCB.VN',
    'VPB.VN',
    'MSN.VN',
    'MWG.VN',
    'GAS.VN',
    'PLX.VN',
    'SAB.VN',
    'BID.VN',
    'CTG.VN',
    'POW.VN',
    'VRE.VN',
    'SSI.VN',
    'HDB.VN',
    'MBB.VN',
    'STB.VN',
    'VJC.VN',
    'GVR.VN',
    'PDR.VN',
    'VCG.VN',
    'ACB.VN',
    'TPB.VN',
    'KDH.VN',
    'NVL.VN',
    'VCI.VN',
    'BCM.VN',
    'DPM.VN',
    'DGC.VN',
    'BAF.VN',
    'PNJ.VN',
    'REE.VN',
    'SBT.VN',
    'VGC.VN',
    'VHC.VN',
    'BVH.VN',
  ] as const,
} as const;
