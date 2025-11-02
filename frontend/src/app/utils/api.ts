// utils/api.ts
export interface CurrentPrice {
  ticker: string;
  price: number;
  time: string;
  timestamp: number;
}

export interface PredictionItem {
  hour: number;
  predicted_price: number;
  confidence: number;
}

export interface Predictions {
  ticker: string;
  current_price: number;
  current_time: string;
  predictions: PredictionItem[];
  timestamp: number;
}

export interface FinancialData {
  ticker: string;
  previousClose: number | null;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
  marketCap: number | null;
  peRatio: number | null;
  eps: number | null;
  beta: number | null;
  yahooPrice: number | null;
  timestamp: string;
}

export async function fetchCurrentPrice(ticker: string): Promise<CurrentPrice> {
  const res = await fetch(`/api/stock/current-price/${ticker}`);
  if (!res.ok) throw new Error("Failed to fetch current price");
  return res.json();
}

export async function fetchPredictions(ticker: string): Promise<Predictions> {
  const res = await fetch(`/api/stock/predictions/${ticker}`);
  if (!res.ok) throw new Error("Failed to fetch predictions");
  return res.json();
}

export async function fetchFinancialData(
  ticker: string
): Promise<FinancialData> {
  const res = await fetch(`/api/stock/financial/${ticker}`);
  if (!res.ok) throw new Error("Failed to fetch financial data");
  return res.json();
}
