// frontend/src/types/stock.d.ts (hoặc đặt ngay trên đầu page.tsx nếu muốn nhanh)

// === KIỂU DỮ LIỆU TỪ BACKEND ===

// Dữ liệu lịch sử (historicalData)
export interface HistoricalDataItem {
  date: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Thông tin chi tiết giá hiện tại
export interface CurrentPriceData {
  symbol: string;
  price: number;
  currency: string;
  // ... có thể có thêm các trường khác như change, changePercent
}

// Các thống kê từ Yahoo Finance
export interface KeyStatistics {
  // Đây chỉ là một số ví dụ, bạn cần bổ sung dựa trên dữ liệu thực tế từ Yahoo Finance
  forwardPE?: { raw: number };
  pegRatio?: { raw: number };
  trailingEps?: { raw: number };
  beta?: { raw: number };
  fiftyTwoWeekHigh?: { raw: number };
  fiftyTwoWeekLow?: { raw: number };
  marketCap?: { raw: number };
  // ... và nhiều trường khác
}

export interface SummaryDetail {
  previousClose?: { raw: number };
  open?: { raw: number };
  dayHigh?: { raw: number };
  dayLow?: { raw: number };
  // ...
}

// Cấu trúc dữ liệu mà service.ts trả về
export interface BackendStockResponse {
  historicalData: HistoricalDataItem[];
  currentPrice: CurrentPriceData;
  additionalInfo: {
    keyStatistics: KeyStatistics;
    summaryProfile: SummaryProfile;
    summaryDetail: SummaryDetail;
  };
}

/**
 * Summary Profile từ Yahoo Finance
 */
export interface SummaryProfile {
  longBusinessSummary?: string;
  industry?: string;
  sector?: string;
  fullTimeEmployees?: number;
  website?: string;
  country?: string;
  city?: string;
}

// === KIỂU DỮ LIỆU CHÚNG TA SẼ SỬ DỤNG TRÊN FRONTEND (Đã tổng hợp) ===

export interface FrontendStockData {
  symbol: string;
  companyName: string; // Cần lấy từ summaryProfile hoặc tự đặt
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  marketCap: string; // Định dạng lại cho dễ đọc
  volume: string; // Định dạng lại cho dễ đọc
  peRatio: string;
  eps: string;
  beta: string;
  openPrice: number;
  high52Week: number;
  low52Week: number;
  lastUpdated: string; // Thời gian cập nhật

  chartData: HistoricalDataItem[]; // Dữ liệu cho biểu đồ
  tradingHistory: HistoricalDataItem[]; // Dữ liệu cho bảng lịch sử giao dịch (thường là historicalData)
}

// Dành cho dữ liệu thống kê
export interface FormattedKeyStatistics {
  [key: string]: string; // Ví dụ: 'P/E Ratio': '25.5x'
}