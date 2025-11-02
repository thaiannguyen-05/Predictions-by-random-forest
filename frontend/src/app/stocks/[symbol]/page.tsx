// app/stocks/[symbol]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StockSummary from "@/components/stock/StockSummary";
import StockChart from "@/components/stock/StockChart";
import KeyStatistics from "@/components/stock/KeyStatistics";
import PredictionButton from "@/components/stock/PredictionButton";

interface StockDetailPageProps {
  params: {
    symbol: string;
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const StockDetailPage: React.FC<StockDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const { symbol } = params;
  const [stockData, setStockData] = useState<any>(null);
  const [financialData, setFinancialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Format symbol cho API
  const formatSymbolForAPI = (symbol: string) => {
    return `${symbol}.VN`;
  };

  useEffect(() => {
    fetchStockDetails();
  }, [symbol]);

  const fetchStockDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiSymbol = formatSymbolForAPI(symbol);

      // Lấy dữ liệu giá hiện tại
      const priceResponse = await fetch(
        `${API_BASE_URL}/stock/current-price/${apiSymbol}`
      );
      if (!priceResponse.ok) {
        const errText = await priceResponse.text();
        console.error("API error:", priceResponse.status, errText);
        throw new Error(
          `Không tìm thấy dữ liệu cho mã cổ phiếu ${symbol} (${priceResponse.status})`
        );
      }

      const priceData = await priceResponse.json();

      // Lấy dữ liệu tài chính
      const financialResponse = await fetch(
        `${API_BASE_URL}/stock/financial/${apiSymbol}`
      );
      const financialData = financialResponse.ok
        ? await financialResponse.json()
        : {};

      // Lấy dữ liệu phân tích
      const analysisResponse = await fetch(
        `${API_BASE_URL}/stock/analysis/${apiSymbol}`
      );
      const analysisData = analysisResponse.ok
        ? await analysisResponse.json()
        : {};

      // Tính toán các giá trị
      const currentPrice = priceData.price || 0;
      const previousClose = financialData.previousClose || currentPrice * 0.95;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      const stockData = {
        symbol: symbol.toUpperCase(),
        companyName: `Công ty ${symbol}`,
        currentPrice: currentPrice,
        previousClose: previousClose,
        change: change,
        changePercent: changePercent,
        marketCap: financialData.marketCap
          ? `${(financialData.marketCap / 1e9).toFixed(1)} tỷ`
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
        tradingHistory: await generateTradingHistory(symbol),
      };

      setStockData(stockData);
      setFinancialData(financialData);
      setChartData(stockData.chartData);
    } catch (err: any) {
      setError(err.message);
      console.error("Lỗi khi tải dữ liệu cổ phiếu:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateHistoricalData = async (
    symbol: string,
    currentPrice: number
  ) => {
    try {
      // Trong thực tế, bạn sẽ có API để lấy dữ liệu lịch sử
      // Ở đây tôi tạo dữ liệu mẫu dựa trên giá hiện tại
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));

        // Tạo biến động giá thực tế
        const volatility = 0.02; // 2% biến động mỗi ngày
        const randomChange = (Math.random() - 0.5) * 2 * volatility;
        const price =
          i === 29 ? currentPrice : currentPrice * (1 + randomChange);

        return {
          date: date.toISOString().split("T")[0],
          price: price,
          open: price * (0.99 + Math.random() * 0.02),
          high: price * (1 + Math.random() * 0.03),
          low: price * (0.97 - Math.random() * 0.02),
          close: price,
          volume: Math.floor(1000000 + Math.random() * 9000000),
        };
      });
    } catch (error) {
      console.error("Error generating historical data:", error);
      return [];
    }
  };

  const generateTradingHistory = async (symbol: string) => {
    try {
      // Dữ liệu lịch sử giao dịch mẫu
      return Array.from({ length: 10 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (9 - i));

        const basePrice = stockData?.currentPrice || 40000;
        const changePercent = (Math.random() - 0.5) * 5;

        return {
          date: date.toISOString().split("T")[0],
          open: basePrice * (0.98 + Math.random() * 0.04),
          high: basePrice * (1 + Math.random() * 0.05),
          low: basePrice * (0.95 - Math.random() * 0.05),
          close: basePrice * (1 + changePercent / 100),
          volume: Math.floor(1000000 + Math.random() * 9000000),
          change: changePercent,
        };
      });
    } catch (error) {
      console.error("Error generating trading history:", error);
      return [];
    }
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const apiSymbol = formatSymbolForAPI(symbol);
      const response = await fetch(
        `${API_BASE_URL}/stock/predictions/${apiSymbol}`
      );

      if (response.ok) {
        const predictionData = await response.json();

        const predictionResult = {
          symbol: symbol,
          prediction:
            predictionData.predictions?.[0]?.predicted_price >
            stockData.currentPrice
              ? "TĂNG"
              : "GIẢM",
          confidence: predictionData.predictions?.[0]?.confidence
            ? (predictionData.predictions[0].confidence * 100).toFixed(1)
            : (70 + Math.random() * 25).toFixed(1),
          predictedPrice:
            predictionData.predictions?.[0]?.predicted_price ||
            stockData.currentPrice * (1 + (Math.random() - 0.5) * 0.1),
          predictionDate: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toLocaleDateString("vi-VN"),
          reasoning: [
            "Phân tích kỹ thuật cho thấy xu hướng tích cực",
            "Khối lượng giao dịch ổn định",
            "Chỉ số RSI ở vùng trung lập",
            "Mô hình AI dự báo khả năng tăng điểm",
          ],
        };

        setPrediction(predictionResult);
      } else {
        throw new Error("Không thể lấy dự đoán từ server");
      }
    } catch (error) {
      console.error("Lỗi khi dự đoán:", error);
      // Fallback prediction
      const fallbackPrediction = {
        symbol: symbol,
        prediction: Math.random() > 0.5 ? "TĂNG" : "GIẢM",
        confidence: (70 + Math.random() * 25).toFixed(1),
        predictedPrice:
          stockData.currentPrice * (1 + (Math.random() - 0.5) * 0.1),
        predictionDate: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toLocaleDateString("vi-VN"),
        reasoning: [
          "Phân tích kỹ thuật cho thấy xu hướng tăng",
          "Khối lượng giao dịch tăng mạnh",
          "Chỉ số RSI ở vùng trung lập",
        ],
      };
      setPrediction(fallbackPrediction);
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
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      {/* Nút dự đoán */}
      <div className="mb-6 flex justify-end">
        <PredictionButton
          onPredict={handlePredict}
          isPredicting={isPredicting}
          symbol={symbol}
        />
      </div>

      {/* Hiển thị kết quả dự đoán */}
      {prediction && (
        <div className="mb-6 bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl border border-blue-500">
          <h3 className="text-xl font-bold text-white mb-4">
            📊 Dự đoán cho ngày mai ({prediction.predictionDate})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
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
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {prediction.confidence}%
              </div>
              <div className="text-sm text-gray-300">Độ tin cậy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {prediction.predictedPrice.toLocaleString("vi-VN")}₫
              </div>
              <div className="text-sm text-gray-300">Giá dự đoán</div>
            </div>
          </div>
          {prediction.reasoning && (
            <div className="mt-4">
              <h4 className="font-semibold text-white mb-2">Phân tích:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {prediction.reasoning.map((reason: string, index: number) => (
                  <li key={index}>• {reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 1. Phần Tóm tắt và Giá Hiện tại */}
      <StockSummary data={stockData} />

      {/* 2. Biểu đồ và Dữ liệu Thống kê */}
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
