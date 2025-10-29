// components/stock/StockSummary.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
import { STOCK_DETAILS } from "../constants/TrainedStock";

const StockSummary: React.FC<{ data: any }> = ({ data }) => {
  const [isPinned, setIsPinned] = useState(false);
  const isPositive = data.changePercent > 0;
  const colorClass = isPositive ? "text-green-400" : "text-red-500";
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  // Lấy thông tin thực tế từ STOCK_DETAILS
  const realStockInfo = STOCK_DETAILS[data.symbol];

  // Sử dụng tên từ STOCK_DETAILS nếu có, nếu không thì dùng từ data
  const displayName = realStockInfo?.name || data.companyName;

  useEffect(() => {
    checkIfPinned();
  }, [data.symbol]);

  const checkIfPinned = () => {
    try {
      const saved = localStorage.getItem("pinned-stocks");
      if (saved) {
        const pinnedStocks = JSON.parse(saved);
        const isCurrentlyPinned = pinnedStocks.some(
          (stock: any) => stock.symbol === data.symbol
        );
        setIsPinned(isCurrentlyPinned);
      }
    } catch (error) {
      console.error("Error checking pinned status:", error);
    }
  };

  const togglePin = () => {
    try {
      const saved = localStorage.getItem("pinned-stocks");
      let pinnedStocks = saved ? JSON.parse(saved) : [];

      if (isPinned) {
        // Bỏ ghim
        pinnedStocks = pinnedStocks.filter(
          (stock: any) => stock.symbol !== data.symbol
        );
      } else {
        // Thêm vào danh sách ghim
        const stockToPin = {
          symbol: data.symbol,
          name: displayName, // Sử dụng displayName đã được xử lý
          price: data.currentPrice,
          change: data.change,
          changePercent: data.changePercent,
        };
        pinnedStocks.push(stockToPin);
      }

      localStorage.setItem("pinned-stocks", JSON.stringify(pinnedStocks));
      setIsPinned(!isPinned);
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            {data.symbol} <span className="text-gray-400">| {displayName}</span>
          </h1>
          <p className="text-sm text-gray-500">
            {realStockInfo?.sector || "Chưa phân loại"} • Cập nhật lúc:{" "}
            {data.lastUpdated}
          </p>
        </div>
        <button
          onClick={togglePin}
          className={`p-2 rounded-lg transition-colors flex items-center ${
            isPinned
              ? "bg-yellow-600 hover:bg-yellow-500 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-gray-400"
          }`}
          title={isPinned ? "Bỏ ghim" : "Ghim cổ phiếu"}
        >
          <Star
            size={20}
            className="mr-1"
            fill={isPinned ? "currentColor" : "none"}
          />
          {isPinned ? "Đã ghim" : "Ghim"}
        </button>
      </div>

      <div className="mt-5 flex items-end space-x-6 border-t border-gray-700 pt-5">
        {/* Giá Hiện tại */}
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-white leading-none">
            {data.currentPrice.toLocaleString("vi-VN")}
          </span>
          <span className="text-lg text-gray-400 mt-1">VND/Cổ phiếu</span>
        </div>

        {/* Thay đổi */}
        <div
          className={`flex items-center ${colorClass} text-2xl font-semibold`}
        >
          <Icon size={24} className="mr-2" />
          <span>
            {data.change >= 0 ? "+" : ""}
            {typeof data.change === "number" ? data.change.toFixed(0) : "-"}
          </span>
          <span className="text-xl ml-2">
            ({data.changePercent >= 0 ? "+" : ""}
            {typeof data.changePercent === "number"
              ? data.changePercent.toFixed(2)
              : "-"}
            %)
          </span>
        </div>

        {/* Chỉ số Khác */}
        <div className="text-sm space-y-1 ml-auto text-right">
          <p className="text-gray-400">
            Vốn hóa:{" "}
            <span className="font-bold text-white">{data.marketCap}</span>
          </p>
          <p className="text-gray-400">
            Khối lượng:{" "}
            <span className="font-bold text-white">{data.volume}</span>
          </p>
          <p className="text-gray-400">
            P/E: <span className="font-bold text-white">{data.peRatio}</span>
          </p>
        </div>
      </div>

      {/* Thông tin thực tế từ Yahoo Finance */}
      {realStockInfo && (
        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-700/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Giá tham khảo:</strong>{" "}
            {realStockInfo.currentPrice.toLocaleString("vi-VN")}₫ •{" "}
            <strong>KLGD:</strong>{" "}
            {realStockInfo.volume.toLocaleString("vi-VN")} •{" "}
            <strong>P/E:</strong> {realStockInfo.peRatio}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockSummary;
