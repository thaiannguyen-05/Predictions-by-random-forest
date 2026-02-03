"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StockSummary from "@/components/stock/StockSummary";
import StockChart from "@/components/stock/StockChart";
import KeyStatistics from "@/components/stock/KeyStatistics";
import PredictionButton from "@/components/stock/PredictionButton";
import { STOCK_DETAILS } from "../../../../constants/trainedStocks";

interface StockDetailPageProps {
  params: {
    symbol: string;
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL_TICKET_LOAD || "http://localhost:4000/api";

// ⚡ Giảm tần suất refresh từ 5s → 30s để tránh biểu đồ nhảy liên tục
const REFRESH_INTERVAL = 30000;

const StockDetailPage: React.FC<StockDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { symbol } = params;
  const [stockData, setStockData] = useState<any>(null);
  const [financialData, setFinancialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // ✅ Cache historical data để không re-generate mỗi lần refresh
  const historicalDataCache = useRef<any[]>([]);
  const isInitialLoad = useRef<boolean>(true);

  const formatSymbolForAPI = (symbol: string) => `${symbol}.VN`;

  useEffect(() => {
    // Reset cache khi symbol thay đổi
    isInitialLoad.current = true;
    historicalDataCache.current = [];

    // ✅ CHỈ CALL 1 LẦN DUY NHẤT khi load trang, KHÔNG auto-refresh
    fetchStockDetails(true);
  }, [symbol]);

  const fetchStockDetails = async (firstLoad = false) => {
    if (firstLoad) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const apiSymbol = formatSymbolForAPI(symbol);
      const priceResponse = await fetch(
        `${API_BASE_URL}/stock/current-price/${apiSymbol}`,
        { cache: "no-store" }
      );

      if (!priceResponse.ok)
        throw new Error(`Không tìm thấy dữ liệu cho ${symbol}`);

      const priceData = await priceResponse.json();
      const pricePayload = priceData?.data ?? priceData;

      const financialResponse = await fetch(
        `${API_BASE_URL}/stock/financial/${apiSymbol}`,
        { cache: "no-store" }
      );
      const financialRaw = financialResponse.ok
        ? await financialResponse.json()
        : {};
      const financialData = financialRaw?.data ?? financialRaw;

      const currentPrice = pricePayload?.price || 0;
      const previousClose = financialData.previousClose || currentPrice * 0.95;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      // ✅ Lấy thông tin chi tiết từ STOCK_DETAILS
      const stockInfo = STOCK_DETAILS[symbol.toUpperCase()] || {
        name: `Công ty ${symbol}`,
        sector: "Chưa phân loại",
        marketCap: 0,
      };

      // ✅ CHỈ GENERATE DATA MỘT LẦN khi load lần đầu
      let updatedChartData: any[];
      if (isInitialLoad.current) {
        // Lần đầu tiên: Generate toàn bộ historical data
        updatedChartData = await generateHistoricalData(symbol, currentPrice);
        historicalDataCache.current = updatedChartData;
        isInitialLoad.current = false;
      } else {
        // Các lần sau: CHỈ UPDATE điểm cuối cùng với current price mới
        if (historicalDataCache.current.length > 0) {
          updatedChartData = [...historicalDataCache.current];
          const lastIndex = updatedChartData.length - 1;

          // Update chỉ điểm cuối cùng
          updatedChartData[lastIndex] = {
            ...updatedChartData[lastIndex],
            close: currentPrice,
            high: Math.max(updatedChartData[lastIndex].high || currentPrice, currentPrice),
            low: Math.min(updatedChartData[lastIndex].low || currentPrice, currentPrice),
            date: new Date().toISOString().split("T")[0],
          };

          historicalDataCache.current = updatedChartData;
        } else {
          // Fallback: nếu cache bị mất, generate lại
          updatedChartData = await generateHistoricalData(symbol, currentPrice);
          historicalDataCache.current = updatedChartData;
        }
      }

      const updatedStockData = {
        symbol: symbol.toUpperCase(),
        companyName: stockInfo.name, // ✅ Dùng tên thật
        sector: stockInfo.sector, // ✅ Hiển thị ngành
        currentPrice,
        previousClose,
        change,
        changePercent,
        marketCap: stockInfo.marketCap
          ? `${(stockInfo.marketCap / 1e9).toFixed(1)} tỷ`
          : "N/A",
        volume: financialData.volume
          ? `${(financialData.volume / 1e6).toFixed(1)}M`
          : "N/A",
        peRatio: financialData.peRatio
          ? financialData.peRatio.toFixed(1) + "x"
          : "N/A",
        eps: financialData.eps
          ? financialData.eps.toLocaleString("vi-VN") + " VND"
          : "N/A",
        beta: financialData.beta ? financialData.beta.toFixed(2) : "N/A",
        openPrice: financialData.open || previousClose,
        high52Week: financialData.high || currentPrice * 1.2,
        low52Week: financialData.low || currentPrice * 0.8,
        lastUpdated:
          pricePayload?.time ||
          new Date().toLocaleTimeString("vi-VN") + " (GMT+7)",
        chartData: updatedChartData, // ✅ Dùng cached data
      };

      setStockData(updatedStockData);
      setFinancialData(financialData);
      setChartData(updatedChartData); // ✅ Set cached chart data
      setError(null);
    } catch (err: any) {
      console.warn("⚠️ Lỗi khi tải dữ liệu:", err.message);
      if (firstLoad) setError(err.message);
    } finally {
      if (firstLoad) setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // ✅ FUNCTION NÀY CHỈ ĐƯỢC GỌI 1 LẦN DUY NHẤT khi load trang đầu tiên
  // Sau đó data sẽ được cache và chỉ update điểm cuối cùng
  const generateHistoricalData = async (symbol: string, currentPrice: number) => {
    // Generate data cho 5 năm (khoảng 1825 ngày) để hỗ trợ chart 5Y/MAX
    const days = 365 * 5;
    const data = [];
    let price = currentPrice;

    // Generate ngược từ hôm nay về quá khứ để đảm bảo giá cuối cùng khớp currentPrice
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Bỏ qua Thứ 7, Chủ Nhật để giống thị trường chứng khoán hơn (tùy chọn)
      // const day = date.getDay();
      // if (day === 0 || day === 6) continue;

      const volatility = 0.025; // Độ biến động
      const changePercent = (Math.random() - 0.5) * 2 * volatility;

      // Giá ngày hôm trước = Giá ngày hôm nay / (1 + % thay đổi)
      // (Tính ngược lại của: Giá hôm nay = Giá hôm trước * (1 + % thay đổi))
      const prevPrice = price / (1 + changePercent);

      data.unshift({
        date: date.toISOString().split("T")[0],
        open: prevPrice * (1 + (Math.random() - 0.5) * 0.01),
        high: price > prevPrice ? price * (1 + Math.random() * 0.01) : prevPrice * (1 + Math.random() * 0.01),
        low: price < prevPrice ? price * (1 - Math.random() * 0.01) : prevPrice * (1 - Math.random() * 0.01),
        close: price,
        volume: Math.floor(1000000 + Math.random() * 9000000),
      });

      price = prevPrice;
    }
    return data;
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const apiSymbol = formatSymbolForAPI(symbol);
      const response = await fetch(
        `${API_BASE_URL}/stock/predictions/${apiSymbol}`
      );

      if (!response.ok) {
        console.error("Lỗi phản hồi API:", response.status);
        return;
      }

      const predictionData = await response.json();
      const predictionPayload = predictionData?.data ?? predictionData;
      console.log("📊 API trả về:", predictionData);

      // ✅ Lấy phần tử đầu tiên trong mảng predictions
      const firstPrediction = predictionPayload?.predictions?.[0];

      if (!firstPrediction) {
        console.error("Không có dữ liệu dự đoán trong predictions");
        return;
      }

      const rawPrediction = firstPrediction.prediction || "GIẢM";

      setPrediction({
        symbol,
        prediction: rawPrediction.toUpperCase(),
        confidence: (firstPrediction.confidence ?? 0.75) * 100,
        predictedPrice:
          firstPrediction.predicted_price ?? stockData.currentPrice,
        predictionDate: new Date(
          firstPrediction.prediction_time
        ).toLocaleDateString("vi-VN"),
        reasoning: [
          rawPrediction === "TĂNG"
            ? "Mô hình AI dự đoán giá sẽ tăng dựa trên xu hướng tích cực."
            : "Mô hình AI dự đoán giá sẽ giảm do tín hiệu thị trường yếu.",
        ],
      });
    } catch (err) {
      console.error("Lỗi khi dự đoán:", err);
    } finally {
      setIsPredicting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-blue-400 text-xl">
        <div className="animate-spin h-8 w-8 mr-3 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        Đang tải dữ liệu cổ phiếu {symbol}...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-red-500 text-xl p-4">
        <p>Đã xảy ra lỗi: {error}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Quay về Trang chủ
        </button>
      </div>
    );
  }

  if (!stockData) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-gray-400 text-xl">
        Không có dữ liệu cho mã cổ phiếu này.
      </div>
    );
  }

  const formattedKeyStats = {
    "Giá Mở Cửa": financialData?.open
      ? financialData.open.toLocaleString("vi-VN") + "₫"
      : "N/A",
    "Giá Cao Nhất": financialData?.high
      ? financialData.high.toLocaleString("vi-VN") + "₫"
      : "N/A",
    "Giá Thấp Nhất": financialData?.low
      ? financialData.low.toLocaleString("vi-VN") + "₫"
      : "N/A",
    "Giá Đóng Cửa Trước": financialData?.previousClose
      ? financialData.previousClose.toLocaleString("vi-VN") + "₫"
      : "N/A",
    "P/E Ratio": financialData?.peRatio
      ? financialData.peRatio.toFixed(2) + "x"
      : "N/A",
    EPS: financialData?.eps
      ? financialData.eps.toLocaleString("vi-VN") + "₫"
      : "N/A",
    Beta: financialData?.beta ? financialData.beta.toFixed(2) : "N/A",
    "Vốn hóa": stockData.marketCap,
    Ngành: stockData.sector, // ✅ thêm hiển thị ngành
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-end">
        <PredictionButton
          onPredict={handlePredict}
          isPredicting={isPredicting}
          symbol={symbol}
        />
      </div>

      {prediction && (
        <div className="mb-6 bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-orange rounded-full"></span>
              Dự báo AI cho ngày mai ({prediction.predictionDate})
            </h3>
            <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-full border border-brand-orange/20">
              Random Forest Model
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Thẻ Xu hướng */}
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors group">
              <div className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Xu hướng</div>
              <div
                className={`text-3xl font-black ${prediction.prediction === "TĂNG"
                  ? "text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                  }`}
              >
                {prediction.prediction}
              </div>
            </div>

            {/* Thẻ Độ tin cậy */}
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors group">
              <div className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Độ tin cậy</div>
              <div className="text-3xl font-black text-brand-orange drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                {prediction.confidence.toFixed(1)}%
              </div>
            </div>

            {/* Thẻ Giá dự đoán */}
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors group">
              <div className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Giá mục tiêu</div>
              <div className="text-3xl font-black text-white">
                {prediction.predictedPrice.toLocaleString("vi-VN")}₫
              </div>
            </div>
          </div>
        </div>
      )}

      <StockSummary data={stockData} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-8">
          <StockChart symbol={symbol} chartData={chartData} />
        </div>
        <div className="lg:col-span-4">
          <KeyStatistics statistics={formattedKeyStats} />
        </div>
      </div>
    </div>
  );
};

export default StockDetailPage;
