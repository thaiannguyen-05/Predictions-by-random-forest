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
  change?: number | string;
  recent_weeks?: number;
  model_types?: string[];
  tickers_total?: number;
  total_jobs?: number;
  trained_jobs?: number;
  failed_jobs?: number;
  results?: unknown[];
  supported_model_types?: string[];
}

export interface PredictionData {
  current_price?: number;
  prediction?: string;
  probability?: number;
  confidence?: number;
  predicted_price?: number;
  hours_ahead?: number;
}

export interface PredictionItem {
  hour: number;
  hours_ahead: number;
  predicted_price?: number;
  prediction: string;
  probability: number;
  confidence: number;
  prediction_time: string;
}

export interface ModelMetrics {
  features_count?: number;
  accuracy?: number;
  precision?: number;
  recall?: number;
}

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

export interface StockServiceConfig {
  mlHost: string;
  mlPort: number;
  timeout: number;
}
