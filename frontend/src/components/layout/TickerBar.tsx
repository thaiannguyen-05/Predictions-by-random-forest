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

  useEffect(() => {
    // ✅ KHÔNG GỌI API NỮA - Chỉ dùng mock data để tránh spam API
    // Lý do: TickerBar gọi API cho 40 mã cổ phiếu mỗi lần load trang
    const generateMockTickers = () => {
      const mockTickers = TRAINED_STOCKS.map(getFallbackTickerData);
      setTickers(mockTickers);
      setIsLoading(false);
    };

    generateMockTickers();

    // ✅ Tạo animation "thay đổi giá" nhẹ mỗi 10 giây (không gọi API)
    const interval = setInterval(() => {
      setTickers(prevTickers =>
        prevTickers.map(ticker => {
          const priceChange = (Math.random() - 0.5) * ticker.price * 0.005; // Thay đổi ±0.5%
          const newPrice = ticker.price + priceChange;
          // Calculate previousClose based on current price and changePercent
          const previousClose = newPrice / (1 + ticker.changePercent / 100);
          const change = newPrice - previousClose;
          return {
            ...ticker,
            price: newPrice,
            change: change,
            changePercent: (change / previousClose) * 100
          };
        })
      );
    }, 10000); // 10 giây

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
      <div className="bg-brand-dark border-b border-gray-800 py-3 overflow-hidden">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-brand-orange rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">
              Đang tải dữ liệu {TRAINED_STOCKS.length} cổ phiếu...
            </span>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-brand-dark border-b border-white/5 py-3 overflow-hidden relative">
      <div className="relative overflow-hidden">
        <div className="animate-ticker whitespace-nowrap">
          {tickers.map((stock, i) => (
            <button
              key={`${stock.symbol}-${i}`}
              onClick={() => handleStockClick(stock.symbol)}
              className="inline-flex items-center mx-4 px-4 py-2 rounded-xl hover:bg-brand-card transition-all duration-300 cursor-pointer group border border-transparent hover:border-brand-orange/30"
            >
              <div className="flex items-center space-x-3">
                <div className="text-left">
                  <span className="font-bold text-white group-hover:text-brand-orange transition-colors block leading-tight">
                    {stock.symbol}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-white font-semibold text-sm block leading-tight">
                    {stock.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span
                    className={`text-xs font-semibold ${stock.change >= 0 ? "text-green-400" : "text-red-400"
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
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none"></div>
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
