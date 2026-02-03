




export interface HistoricalDataItem {
  date: string; 
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}


export interface CurrentPriceData {
  symbol: string;
  price: number;
  currency: string;
  
}


export interface KeyStatistics {
  
  forwardPE?: { raw: number };
  pegRatio?: { raw: number };
  trailingEps?: { raw: number };
  beta?: { raw: number };
  fiftyTwoWeekHigh?: { raw: number };
  fiftyTwoWeekLow?: { raw: number };
  marketCap?: { raw: number };
  
}

export interface SummaryDetail {
  previousClose?: { raw: number };
  open?: { raw: number };
  dayHigh?: { raw: number };
  dayLow?: { raw: number };
  
}


export interface BackendStockResponse {
  historicalData: HistoricalDataItem[];
  currentPrice: CurrentPriceData;
  additionalInfo: {
    keyStatistics: KeyStatistics;
    summaryProfile: SummaryProfile;
    summaryDetail: SummaryDetail;
  };
}

export interface SummaryProfile {
  longBusinessSummary?: string;
  industry?: string;
  sector?: string;
  fullTimeEmployees?: number;
  website?: string;
  country?: string;
  city?: string;
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
}


export interface FormattedKeyStatistics {
  [key: string]: string; 
}