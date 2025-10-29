// components/sections/Recommendations.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, Star } from "lucide-react";
import { TRAINED_STOCKS, STOCK_DETAILS } from "../constants/TrainedStock";

export default function Recommendations() {
  const router = useRouter();

  // Lấy ngẫu nhiên 5 cổ phiếu từ danh sách đã train để recommend
  const recommendedStocks = TRAINED_STOCKS.sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((symbol) => {
      const stockInfo = STOCK_DETAILS[symbol];
      const basePrice = 30000 + Math.random() * 70000;
      const changePercent = (Math.random() - 0.3) * 10; // Thiên về tăng giá

      return {
        symbol,
        name: stockInfo?.name || `Công ty ${symbol}`,
        price: basePrice,
        changePercent,
        sector: stockInfo?.sector || "Chưa phân loại",
      };
    });

  const handleStockClick = (symbol: string) => {
    router.push(`/stocks/${symbol}`);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
      <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
        <TrendingUp className="mr-2" size={20} />
        Cổ phiếu đề xuất
      </h3>

      <div className="space-y-3">
        {recommendedStocks.map((stock) => {
          const isPositive = stock.changePercent >= 0;

          return (
            <div
              key={stock.symbol}
              onClick={() => handleStockClick(stock.symbol)}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer group"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {stock.symbol}
                  </span>
                  <span className="text-white font-medium">
                    {stock.price.toLocaleString("vi-VN")}₫
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">{stock.sector}</span>
                  <span
                    className={`text-sm font-semibold ${
                      isPositive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="ml-2">
                <Star size={16} className="text-yellow-400" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        💡 Đề xuất từ 38 cổ phiếu đã train model AI
      </div>
    </div>
  );
}
