/**
 * Interfaces cho Stock module.
 * Định nghĩa types cho ML Service responses và internal data.
 */

/**
 * Response từ ML Service.
 */
export interface MLServiceResponse {
  success: boolean;
  error?: string;
  data?: unknown;
  message?: string;
  ticker?: string;
  current_price?: number;
  current_time?: string;
  price?: number;
  time?: string;
  prediction?: PredictionData;
  predictions?: PredictionItem[];
  timestamp?: string;
  metrics?: ModelMetrics;
  trained_models?: number;
  updated_tickers?: number;
  features_count?: number;
}

/**
 * Dữ liệu prediction.
 */
export interface PredictionData {
  current_price?: number;
  prediction?: string;
  probability?: number;
  confidence?: number;
  predicted_price?: number;
  hours_ahead?: number;
}

/**
 * Item trong danh sách predictions.
 */
export interface PredictionItem {
  hour: number;
  hours_ahead: number;
  predicted_price?: number;
  prediction: string;
  probability: number;
  confidence: number;
  prediction_time: string;
}

/**
 * Metrics của model.
 */
export interface ModelMetrics {
  features_count?: number;
  accuracy?: number;
  precision?: number;
  recall?: number;
}

/**
 * Dữ liệu tài chính từ ML Service.
 */
export interface FinancialData {
  ticker: string;
  previous_close: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  market_cap: number | null;
  pe_ratio: number | null;
  eps: number | null;
  beta: number | null;
  yahoo_price: number | null;
}

/**
 * History search record.
 */
export interface HistorySearchRecord {
  id: string;
  symbol: string;
  currentPrice: string;
  previousClose: string;
  open: string;
  high: string;
  low: string;
  volume: string;
  marketCap: string;
  peRatio: number;
  eps: number;
  beta: number;
  yahooPrice: number;
  createdAt: Date;
}

/**
 * Config cho Stock Prediction Service.
 */
export interface StockServiceConfig {
  mlHost: string;
  mlPort: number;
  timeout: number;
}
