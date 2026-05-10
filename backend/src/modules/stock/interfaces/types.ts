export interface MLServiceResponse {
  success: boolean;
  error?: string;
  data?: unknown;
  message?: string;
  ticker?: string;
  current_price?: number;
  current_time?: string;
  predicted_price?: number;
  price?: number;
  time?: string;
  prediction?: PredictionData;
  predictions?: PredictionItem[];
  is_hourly_model?: boolean;
  model_horizon?: string;
  direction_source?: string;
  price_estimate_method?: string;
  model_note?: string;
  timestamp?: string;
  metrics?: ModelMetrics;
  trained_models?: number;
  updated_tickers?: number;
  features_count?: number;
  change?: number | string;
  recent_weeks?: number;
  model_types?: string[];
  status?: 'completed' | 'completed_with_errors' | 'failed';
  started_at?: string;
  finished_at?: string;
  duration_seconds?: number;
  tickers_total?: number;
  total_jobs?: number;
  trained_jobs?: number;
  failed_jobs?: number;
  success_rate?: number;
  model_summary?: Record<string, { trained_jobs: number; failed_jobs: number }>;
  results?: unknown[];
  supported_model_types?: string[];
  command?: string;
  requested_recent_weeks?: number;
  requested_tickers?: string[] | null;
  requested_model_types?: string[] | null;
}

export interface PredictionData {
  current_price?: number;
  prediction?: string;
  probability?: number;
  confidence?: number;
  predicted_price?: number;
  hours_ahead?: number;
  is_hourly_model?: boolean;
  model_horizon?: string;
  direction_source?: string;
  price_estimate_method?: string;
  model_note?: string;
}

export interface PredictionItem {
  hour: number;
  hours_ahead: number;
  predicted_price?: number;
  prediction: string;
  probability: number;
  confidence: number;
  prediction_time: string;
  is_hourly_model?: boolean;
  model_horizon?: string;
  direction_source?: string;
  price_estimate_method?: string;
  model_note?: string;
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
