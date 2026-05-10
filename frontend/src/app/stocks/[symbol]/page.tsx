"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import StockSummary from "@/components/stock/StockSummary";
import StockChart from "@/components/stock/StockChart";
import KeyStatistics from "@/components/stock/KeyStatistics";
import PredictionButton from "@/components/stock/PredictionButton";
import { STOCK_DETAILS, TRAINED_STOCKS } from "../../../../constants/trainedStocks";
import { FALLBACK_STOCK_QUOTES } from "@/constants/fallbackStockQuotes";

interface StockDetailPageProps {
  params: {
    symbol: string;
  };
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL_TICKET_LOAD || "http://localhost:4000/api";


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
  const [nextHoursPredictions, setNextHoursPredictions] = useState<any[]>([]);
  const [isPredictingNextHours, setIsPredictingNextHours] = useState(false);


  const historicalDataCache = useRef<any[]>([]);
  const isInitialLoad = useRef<boolean>(true);

  const formatSymbolForAPI = (symbol: string) => `${symbol}.VN`;

  const toFiniteNumber = (value: any): number | null => {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === "string") {
      const normalized = value.replace(/,/g, "").replace("%", "").trim();
      if (!normalized) return null;
      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  useEffect(() => {
    isInitialLoad.current = true;
    historicalDataCache.current = [];
    fetchStockDetails(true);

    const intervalId = setInterval(() => {
      fetchStockDetails(false);
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [symbol]);

  const fetchStockDetails = async (firstLoad = false) => {
    if (firstLoad) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const normalizedSymbol = symbol.toUpperCase();
      const fallbackQuote = FALLBACK_STOCK_QUOTES[normalizedSymbol];
      const apiSymbol = formatSymbolForAPI(symbol);
      const priceResponse = await fetch(
        `${API_BASE_URL}/stock/current-price/${apiSymbol}`,
        { cache: "no-store" }
      );

      const priceData = priceResponse.ok ? await priceResponse.json() : {};
      const pricePayload = priceData?.data ?? priceData;

      const financialResponse = await fetch(
        `${API_BASE_URL}/stock/financial/${apiSymbol}`,
        { cache: "no-store" }
      );
      const financialRaw = financialResponse.ok
        ? await financialResponse.json()
        : {};
      const financialData = financialRaw?.data ?? financialRaw;

      const yahooPrice = toFiniteNumber(financialData?.yahooPrice);
      const fallbackPrice = toFiniteNumber(pricePayload?.price);
      const canonicalCurrentPrice = yahooPrice ?? fallbackPrice ?? fallbackQuote?.price ?? null;

      const fallbackPreviousClose =
        fallbackQuote && fallbackQuote.changePercent !== -100
          ? fallbackQuote.price / (1 + fallbackQuote.changePercent / 100)
          : null;
      const previousClose = toFiniteNumber(financialData?.previousClose) ?? fallbackPreviousClose;
      const openPrice = toFiniteNumber(financialData?.open);
      const highPrice = toFiniteNumber(financialData?.high);
      const lowPrice = toFiniteNumber(financialData?.low);

      const fallbackChangePercent = toFiniteNumber(pricePayload?.change) ?? fallbackQuote?.changePercent ?? null;
      const change =
        canonicalCurrentPrice !== null && previousClose !== null
          ? canonicalCurrentPrice - previousClose
          : null;
      const changePercent =
        canonicalCurrentPrice !== null && previousClose !== null && previousClose !== 0
          ? (change! / previousClose) * 100
          : fallbackChangePercent;


      const stockInfo = STOCK_DETAILS[normalizedSymbol] || {
        name: `Công ty ${symbol}`,
        sector: "Chưa phân loại",
        marketCap: 0,
      };


      const chartCurrentPrice = canonicalCurrentPrice ?? previousClose ?? fallbackQuote?.price ?? 0;

      let updatedChartData: any[];
      if (isInitialLoad.current) {
        updatedChartData = await generateHistoricalData(symbol, chartCurrentPrice);
        historicalDataCache.current = updatedChartData;
        isInitialLoad.current = false;
      } else {
        if (historicalDataCache.current.length > 0) {
          updatedChartData = [...historicalDataCache.current];
          const lastIndex = updatedChartData.length - 1;

          updatedChartData[lastIndex] = {
            ...updatedChartData[lastIndex],
            close: chartCurrentPrice,
            high: Math.max(
              updatedChartData[lastIndex].high || chartCurrentPrice,
              chartCurrentPrice
            ),
            low: Math.min(
              updatedChartData[lastIndex].low || chartCurrentPrice,
              chartCurrentPrice
            ),
            date: new Date().toISOString().split("T")[0],
          };

          historicalDataCache.current = updatedChartData;
        } else {
          updatedChartData = await generateHistoricalData(symbol, chartCurrentPrice);
          historicalDataCache.current = updatedChartData;
        }
      }

      const updatedStockData = {
        symbol: normalizedSymbol,
        companyName: stockInfo.name,
        sector: stockInfo.sector,
        currentPrice: canonicalCurrentPrice,
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
        openPrice,
        high52Week: highPrice,
        low52Week: lowPrice,
        lastUpdated:
          pricePayload?.time ||
          new Date().toLocaleTimeString("vi-VN") + " (GMT+7)",
        chartData: updatedChartData,
      };

      setStockData(updatedStockData);
      setFinancialData(financialData);
      setChartData(updatedChartData);
      setError(null);
    } catch (err: any) {
      console.warn("⚠️ Lỗi khi tải dữ liệu:", err.message);
      if (firstLoad) setError(err.message);
    } finally {
      if (firstLoad) setIsLoading(false);
      setIsRefreshing(false);
    }
  };



  const generateHistoricalData = async (symbol: string, currentPrice: number) => {

    const days = 365 * 5;
    const data = [];
    let price = currentPrice;


    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);





      const volatility = 0.025;
      const changePercent = (Math.random() - 0.5) * 2 * volatility;



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
        `${API_BASE_URL}/stock/prediction-tomorrow/${apiSymbol}`
      );

      if (!response.ok) {
        console.error("Lỗi phản hồi API:", response.status);
        return;
      }

      const predictionData = await response.json();
      const payload = predictionData?.data ?? predictionData;
      console.log("📊 API tomorrow trả về:", predictionData);

      const rawPrediction = payload.prediction;

      if (!rawPrediction) {
        console.error("Không có dữ liệu dự đoán từ API");
        return;
      }

      const predictedPrice = toFiniteNumber(payload.predicted_price) ?? stockData.currentPrice;

      setPrediction({
        symbol,
        prediction: rawPrediction.toUpperCase(),
        confidence: (payload.confidence ?? 0.75) * 100,
        predictedPrice,
        predictionDate: payload.prediction_time ? new Date(
          payload.prediction_time
        ).toLocaleDateString("vi-VN") : "Ngày mai",
        reasoning: [
          rawPrediction.toUpperCase() === "TĂNG"
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

  const handlePredictNextHours = async () => {
    setIsPredictingNextHours(true);
    try {
      const apiSymbol = formatSymbolForAPI(symbol);
      const response = await fetch(
        `${API_BASE_URL}/stock/predictions-next-hours/${apiSymbol}`
      );

      if (!response.ok) {
        console.error("Lỗi phản hồi API:", response.status);
        return;
      }

      const predictionData = await response.json();
      const payload = predictionData?.data ?? predictionData;
      console.log("📊 API next hours trả về:", predictionData);

      if (payload.predictions && payload.predictions.length > 0) {
        setNextHoursPredictions(payload.predictions);
      } else {
        console.error("Không có dữ liệu dự đoán ngắn hạn");
      }
    } catch (err) {
      console.error("Lỗi khi dự đoán ngắn hạn:", err);
    } finally {
      setIsPredictingNextHours(false);
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
    Ngành: stockData.sector,
  };

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-end gap-4">
        {TRAINED_STOCKS.includes(symbol) && (
          <button
            onClick={handlePredictNextHours}
            disabled={isPredictingNextHours}
            className={`
              relative overflow-hidden group w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300
              ${isPredictingNextHours
                ? "bg-gray-700 cursor-not-allowed border border-white/5"
                : "bg-blue-600 hover:bg-blue-500 border border-blue-500/30 transform hover:-translate-y-1 shadow-blue-500/20"
              }
            `}
          >
            {isPredictingNextHours ? (
              <div className="flex items-center justify-center">
                <span className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
                Đang dự báo...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span className="mr-2">⚡</span>
                Dự báo ngắn hạn (1-3h)
              </div>
            )}
          </button>
        )}

        <PredictionButton
          onPredict={handlePredict}
          isPredicting={isPredicting}
          symbol={symbol}
        />
      </div>

      {nextHoursPredictions.length > 0 && (
        <div className="mb-6 bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              Dự báo AI ngắn hạn (1-3 giờ tới)
            </h3>
            <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
              Random Forest
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {nextHoursPredictions.map((pred: any, index: number) => {
              const isUp = stockData.currentPrice !== null && pred.predicted_price > stockData.currentPrice;
              return (
                <div key={index} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors group">
                  <div className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">
                    Trong {pred.hour} giờ tới
                  </div>
                  <div className={`text-2xl font-black mb-2 ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                    {Number.isFinite(pred.predicted_price)
                      ? `${pred.predicted_price.toLocaleString("vi-VN")}₫`
                      : "N/A"}
                  </div>
                  <div className="text-sm font-semibold text-brand-orange">
                    Độ tin cậy: {pred.confidence ? (pred.confidence * 100).toFixed(1) : "N/A"}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
            { }
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

            { }
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors group">
              <div className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Độ tin cậy</div>
              <div className="text-3xl font-black text-brand-orange drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                {prediction.confidence.toFixed(1)}%
              </div>
            </div>

            { }
            <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 transition-colors group">
              <div className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wide">Giá mục tiêu</div>
              <div className="text-3xl font-black text-white">
                {Number.isFinite(prediction.predictedPrice)
                  ? `${prediction.predictedPrice.toLocaleString("vi-VN")}₫`
                  : "N/A"}
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
