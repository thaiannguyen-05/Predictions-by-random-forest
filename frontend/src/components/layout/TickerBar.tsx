// components/layout/TickerBar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RealTimeClock from "@/components/common/RealTimeClock";
import { TRAINED_STOCKS, STOCK_DETAILS } from "../constants/TrainedStock";

interface StockTicker {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  hasModel: boolean;
}

export default function TickerBar() {
  const router = useRouter();
  const [tickers, setTickers] = useState<StockTicker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        // Sử dụng giá thực tế từ STOCK_DETAILS và thêm biến động nhỏ
        const realisticTickers: StockTicker[] = TRAINED_STOCKS.map((symbol) => {
          const stockInfo = STOCK_DETAILS[symbol];
          if (!stockInfo) {
            // Fallback nếu không có thông tin
            const basePrice = 40000;
            const changePercent = (Math.random() - 0.5) * 4; // Biến động ±2%
            const change = (basePrice * changePercent) / 100;

            return {
              symbol,
              price: basePrice,
              change,
              changePercent,
              hasModel: true,
            };
          }

          // Tạo biến động thực tế quanh giá hiện tại (±1-2%)
          const changePercent = (Math.random() - 0.5) * 4;
          const change = (stockInfo.currentPrice * changePercent) / 100;
          const currentPrice = stockInfo.currentPrice + change;

          return {
            symbol,
            price: currentPrice,
            change,
            changePercent,
            hasModel: true,
          };
        });

        setTickers(realisticTickers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching ticker data:", error);
        setIsLoading(false);
      }
    };

    fetchTickerData();
    // Cập nhật mỗi 10 giây để có cảm giác real-time
    const interval = setInterval(fetchTickerData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStockClick = (symbol: string) => {
    router.push(`/stocks/${symbol}`);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 border-b border-gray-700 py-2 overflow-hidden">
        <div className="flex justify-between items-center px-4">
          <div className="animate-pulse text-gray-500">
            Đang tải dữ liệu {TRAINED_STOCKS.length} cổ phiếu...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border-b border-gray-700 py-2 shadow-xl overflow-hidden">
      <div className="animate-ticker whitespace-nowrap">
        {tickers.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => handleStockClick(stock.symbol)}
            className="inline-flex items-center mx-6 px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group relative"
          >
            {/* Indicator cho cổ phiếu đã train */}
            {stock.hasModel && (
              <div
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                title="Đã train model AI"
              />
            )}

            <span className="font-bold text-white mr-2 group-hover:text-blue-400 transition-colors">
              {stock.symbol}
            </span>
            <span className="text-white font-medium mr-2">
              {stock.price.toLocaleString("vi-VN")}₫
            </span>
            <span
              className={`text-sm font-semibold ${
                stock.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(0)}({stock.change >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
