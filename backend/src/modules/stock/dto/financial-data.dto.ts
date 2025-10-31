export interface FinancialDataDto {
  ticker: string;
  previousClose: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  marketCap: number | null;
  peRatio: number | null;
  eps: number | null;
  beta: number | null
  yahooPrice: number | null;
  timestamp: string;
}

export interface FinancialDataResponse {
  success: boolean;
  data?: FinancialDataDto;
  error?: string;
}
