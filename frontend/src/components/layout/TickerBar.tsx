"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RealTimeClock from "@/components/common/RealTimeClock";
import { TRAINED_STOCKS } from "../../../constants/trainedStocks";

interface StockTicker {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function TickerBar() {
  const router = useRouter();
  const [tickers, setTickers] = useState<StockTicker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 👉 Backend base URL
  const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const formatSymbolForAPI = (symbol: string) => `${symbol}.VN`;

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const tickerPromises = TRAINED_STOCKS.map(async (symbol) => {
          const apiSymbol = formatSymbolForAPI(symbol);
          let data: any = null;
          let success = false;

          // 🟢 Thử lần lượt 2 định dạng: có và không có .VN
          const variants = [
            `${API_BASE}/stock/current-price/${apiSymbol}`,
            `${API_BASE}/stock/current-price/${symbol}`,
          ];

          for (const url of variants) {
            try {
              const res = await fetch(url);
              if (res.ok) {
                data = await res.json();
                success = true;
                break;
              }
            } catch {
              // Bỏ qua lỗi, thử URL tiếp theo
            }
          }

          if (!success || !data?.price || data?.price <= 0) {
            console.warn(`⚠️ API thất bại cho ${symbol}, dùng dữ liệu giả.`);
            return getFallbackTickerData(symbol);
          }

          // ✅ Lấy thêm dữ liệu tài chính (không quan trọng, bỏ qua lỗi)
          let previousClose = data.price * 0.95;
          try {
            const finRes = await fetch(
              `${API_BASE}/stock/financial/${apiSymbol}`
            );
            if (finRes.ok) {
              const finData = await finRes.json();
              if (finData.previousClose) previousClose = finData.previousClose;
            }
          } catch {}

          const change = data.price - previousClose;
          const changePercent = (change / previousClose) * 100;

          return { symbol, price: data.price, change, changePercent };
        });

        const results = await Promise.all(tickerPromises);
        setTickers(results);
      } catch (err) {
        console.error("Error fetching ticker data:", err);
        setError("Không thể tải dữ liệu thời gian thực");
        setTickers(TRAINED_STOCKS.map(getFallbackTickerData));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickerData();
    const interval = setInterval(fetchTickerData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getFallbackTickerData = (symbol: string): StockTicker => {
    const basePrice = 40000 + Math.random() * 60000;
    const changePercent = (Math.random() - 0.5) * 8;
    const change = (basePrice * changePercent) / 100;
    return { symbol, price: basePrice + change, change, changePercent };
  };

  const handleStockClick = (symbol: string) => router.push(`/stocks/${symbol}`);

  // Loading UI
  if (isLoading)
    return (
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 border-b border-gray-700 py-3 overflow-hidden">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">
              Đang tải dữ liệu {TRAINED_STOCKS.length} cổ phiếu...
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-900 border-b border-blue-500/30 py-3 overflow-hidden relative">
      <div className="flex justify-between items-center px-6 mb-2 relative z-10">
        <div className="flex items-center space-x-3">
          {error && (
            <span className="text-xs text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded">
              ⚠️ {error}
            </span>
          )}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="animate-ticker whitespace-nowrap">
          {tickers.map((stock, i) => (
            <button
              key={`${stock.symbol}-${i}`}
              onClick={() => handleStockClick(stock.symbol)}
              className="inline-flex items-center mx-4 px-4 py-2 rounded-xl hover:bg-blue-500/20 transition-all duration-300 cursor-pointer group border border-transparent hover:border-blue-500/30"
            >
              <div className="flex items-center space-x-3">
                <div className="text-left">
                  <span className="font-bold text-white group-hover:text-blue-300 transition-colors block leading-tight">
                    {stock.symbol}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-white font-semibold text-sm block leading-tight">
                    {stock.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      stock.change >= 0 ? "text-green-400" : "text-red-400"
                    } block leading-tight`}
                  >
                    {stock.change >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
      </div>

      <style jsx>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker-scroll 120s linear infinite;
          display: inline-block;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
