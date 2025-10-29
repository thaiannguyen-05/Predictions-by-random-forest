// types/stock.ts
export interface StockTicker {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  isPinned: boolean;
  lastUpdated: string;
}

export interface BackendStockResponse {
  currentPrice: {
    price: number;
    time: string;
  };
  historicalData: HistoricalDataItem[];
  additionalInfo: {
    summaryProfile?: {
      longName?: string;
    };
    summaryDetail?: {
      previousClose?: { raw: number };
      open?: { raw: number };
    };
    keyStatistics?: {
      marketCap?: { raw: number };
      forwardPE?: { raw: number };
      trailingEps?: { raw: number };
      beta?: { raw: number };
      fiftyTwoWeekHigh?: { raw: number };
      fiftyTwoWeekLow?: { raw: number };
    };
  };
}

export interface HistoricalDataItem {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change?: number;
}

export interface FrontendStockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  peRatio: string;
  eps: string;
  beta: string;
  openPrice: number;
  high52Week: number;
  low52Week: number;
  lastUpdated: string;
  chartData: HistoricalDataItem[];
  tradingHistory: HistoricalDataItem[];
  prediction?: StockPrediction;
}

export interface StockPrediction {
  prediction: string;
  probability: number;
  confidence: number;
  predictionTime: string;
  hoursAhead: number;
}

export interface FormattedKeyStatistics {
  [key: string]: string | number;
}

export interface SearchSuggestion {
  symbol: string;
  name: string;
  exchange: string;
}
