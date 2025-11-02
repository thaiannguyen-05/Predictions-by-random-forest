// components/stock/StockSummary.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";

const StockSummary: React.FC<{ data: any }> = ({ data }) => {
  const [isPinned, setIsPinned] = useState(false);
  const isPositive = data.changePercent > 0;
  const colorClass = isPositive ? "text-green-400" : "text-red-500";
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  useEffect(() => {
    checkIfPinned();
  }, [data.symbol]);

  const checkIfPinned = () => {
    try {
      const saved = localStorage.getItem('pinned-stocks');
      if (saved) {
        const pinnedStocks = JSON.parse(saved);
        const isCurrentlyPinned = pinnedStocks.some((stock: any) => stock.symbol === data.symbol);
        setIsPinned(isCurrentlyPinned);
      }
    } catch (error) {
      console.error('Error checking pinned status:', error);
    }
  };

  const togglePin = () => {
    try {
      const saved = localStorage.getItem('pinned-stocks');
      let pinnedStocks = saved ? JSON.parse(saved) : [];

      if (isPinned) {
        // Bỏ ghim
        pinnedStocks = pinnedStocks.filter((stock: any) => stock.symbol !== data.symbol);
      } else {
        // Thêm vào danh sách ghim
        const stockToPin = {
          symbol: data.symbol,
          name: data.companyName,
          price: data.currentPrice,
          change: data.change,
          changePercent: data.changePercent
        };
        pinnedStocks.push(stockToPin);
      }

      localStorage.setItem('pinned-stocks', JSON.stringify(pinnedStocks));
      setIsPinned(!isPinned);
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            {data.symbol}{" "}
            <span className="text-gray-400">| {data.companyName}</span>
          </h1>
          <p className="text-sm text-gray-500">
            Cập nhật lúc: {data.lastUpdated || "10:28:00 (GMT+7)"}
          </p>
        </div>
        <button
          onClick={togglePin}
          className={`p-2 rounded-lg transition-colors flex items-center ${
            isPinned 
              ? 'bg-yellow-600 hover:bg-yellow-500 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
          }`}
          title={isPinned ? "Bỏ ghim" : "Ghim cổ phiếu"}
        >
          <Star size={20} className="mr-1" fill={isPinned ? "currentColor" : "none"} />
          {isPinned ? "Đã ghim" : "Ghim"}
        </button>
      </div>

      <div className="mt-5 flex items-end space-x-6 border-t border-gray-700 pt-5">
        {/* Giá Hiện tại */}
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-white leading-none">
            {data.currentPrice.toFixed(2)}
          </span>
          <span className="text-lg text-gray-400 mt-1">VND/Cổ phiếu</span>
        </div>

        {/* Thay đổi */}
        <div
          className={`flex items-center ${colorClass} text-2xl font-semibold`}
        >
          <Icon size={24} className="mr-2" />
          <span>{data.change.toFixed(2)}</span>
          <span className="text-xl ml-2">
            ({data.changePercent.toFixed(2)}%)
          </span>
        </div>

        {/* Chỉ số Khác */}
        <div className="text-sm space-y-1 ml-auto">
          <p className="text-gray-400">
            Vốn hóa:{" "}
            <span className="font-bold text-white">{data.marketCap}</span>
          </p>
          <p className="text-gray-400">
            Khối lượng:{" "}
            <span className="font-bold text-white">{data.volume}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockSummary;