"use client";

import React, { useState, useEffect } from "react";
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
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const REFRESH_INTERVAL = 5000;

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

  const formatSymbolForAPI = (symbol: string) => `${symbol}.VN`;

  useEffect(() => {
    fetchStockDetails(true);
    const interval = setInterval(
      () => fetchStockDetails(false),
      REFRESH_INTERVAL
    );
    return () => clearInterval(interval);
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

      const financialResponse = await fetch(
        `${API_BASE_URL}/stock/financial/${apiSymbol}`,
        { cache: "no-store" }
      );
      const financialData = financialResponse.ok
        ? await financialResponse.json()
        : {};

      const currentPrice = priceData.price || 0;
      const previousClose = financialData.previousClose || currentPrice * 0.95;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      // ✅ Lấy thông tin chi tiết từ STOCK_DETAILS
      const stockInfo = STOCK_DETAILS[symbol.toUpperCase()] || {
        name: `Công ty ${symbol}`,
        sector: "Chưa phân loại",
        marketCap: 0,
      };

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
          priceData.time || new Date().toLocaleTimeString("vi-VN") + " (GMT+7)",
        chartData: await generateHistoricalData(symbol, currentPrice),
      };

      setStockData(updatedStockData);
      setFinancialData(financialData);
      setChartData(updatedStockData.chartData);
      setError(null);
    } catch (err: any) {
      console.warn("⚠️ Lỗi khi tải dữ liệu:", err.message);
      if (firstLoad) setError(err.message);
    } finally {
      if (firstLoad) setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const generateHistoricalData = async (symbol: string, currentPrice: number) =>
    Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const volatility = 0.02;
      const randomChange = (Math.random() - 0.5) * 2 * volatility;
      const price = i === 29 ? currentPrice : currentPrice * (1 + randomChange);
      return {
        date: date.toISOString().split("T")[0],
        open: price * (0.99 + Math.random() * 0.02),
        high: price * (1 + Math.random() * 0.03),
        low: price * (0.97 - Math.random() * 0.02),
        close: price,
        volume: Math.floor(1000000 + Math.random() * 9000000),
      };
    });

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const apiSymbol = formatSymbolForAPI(symbol);
      const response = await fetch(
        `${API_BASE_URL}/stock/predictions/${apiSymbol}`
      );

      if (response.ok) {
        const predictionData = await response.json();

        // ✅ Nếu API trả predictions là ["TĂNG"] hoặc ["GIẢM"]
        const rawPrediction = predictionData.predictions?.[0] || "GIẢM";

        setPrediction({
          symbol,
          prediction: rawPrediction.toUpperCase(),
          confidence: (predictionData.confidence ?? 0.75) * 100,
          predictedPrice:
            predictionData.predicted_price ?? stockData.currentPrice,
          predictionDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toLocaleDateString("vi-VN"),
          reasoning: [
            rawPrediction === "TĂNG"
              ? "Mô hình AI dự đoán giá sẽ tăng dựa trên xu hướng tích cực."
              : "Mô hình AI dự đoán giá sẽ giảm do tín hiệu thị trường yếu.",
          ],
        });
      } else {
        console.error("Lỗi phản hồi API:", response.status);
      }
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
        <div className="mb-6 bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl border border-blue-500">
          <h3 className="text-xl font-bold text-white mb-4">
            📊 Dự đoán cho ngày mai ({prediction.predictionDate})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div
                className={`text-2xl font-bold ${
                  prediction.prediction === "TĂNG"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {prediction.prediction}
              </div>
              <div className="text-sm text-gray-300">Xu hướng</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {prediction.confidence.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-300">Độ tin cậy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {prediction.predictedPrice.toLocaleString("vi-VN")}₫
              </div>
              <div className="text-sm text-gray-300">Giá dự đoán</div>
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
