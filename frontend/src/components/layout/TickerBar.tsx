'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react'; // Sử dụng icon từ lucide-react (hoặc react-icons)

// Định nghĩa kiểu dữ liệu cho cổ phiếu
interface StockData {
  symbol: string;
  price: number;
  changePercent: number;
}

const DUMMY_STOCKS: StockData[] = [
  { symbol: 'VNINDEX', price: 1250.35, changePercent: 0.85 },
  { symbol: 'HNX', price: 245.10, changePercent: -1.20 },
  { symbol: 'HOSE', price: 1250.35, changePercent: 0.85 },
  { symbol: 'ACB', price: 28.50, changePercent: 1.55 },
  { symbol: 'FPT', price: 135.20, changePercent: -0.45 },
  { symbol: 'VNM', price: 72.80, changePercent: 2.10 },
  // ... Cổ phiếu khác
];

const TickerBar: React.FC = () => {
  // Thay thế bằng logic kết nối WebSocket (hoặc Polling) tới NestJS Backend
  const [stocks, setStocks] = useState<StockData[]>(DUMMY_STOCKS);

  // useEffect(() => {
  //   // Logic kết nối WebSocket tới ws://localhost:3000/realtime-stocks
  //   // lắng nghe sự kiện và cập nhật setStocks
  // }, []);

  return (
    // Sử dụng Tailwind CSS cho phong cách tối giản, nền tối
    <div className="bg-gray-800 text-white py-2 overflow-hidden shadow-lg border-b border-gray-700">
      {/* Sử dụng CSS animation cho hiệu ứng chạy ngang (marquee) 
        Hoặc dùng thư viện như react-fast-marquee
      */}
      <div className="flex w-[200%] animate-ticker whitespace-nowrap">
        {/* Lặp lại danh sách để tạo hiệu ứng cuộn liền mạch */}
        {[...stocks, ...stocks].map((stock, index) => {
          const isPositive = stock.changePercent > 0;
          const colorClass = isPositive ? 'text-green-400' : 'text-red-500';
          const Icon = isPositive ? ChevronUp : ChevronDown;

          return (
            <div key={index} className="flex items-center mx-4 px-3 py-1 hover:bg-gray-700 transition-colors cursor-pointer rounded-sm">
              <span className="font-bold text-sm mr-2">{stock.symbol}</span>
              <span className="text-sm mr-2">{stock.price.toFixed(2)}</span>
              <div className={`flex items-center text-xs font-semibold ${colorClass}`}>
                <Icon size={12} className="mr-0.5" />
                <span>{stock.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tailwind CSS keyframe cho hiệu ứng marquee (cần thêm vào tailwind.config.js) */}
      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); } /* Dịch chuyển 50% để lặp lại */
        }
        .animate-ticker {
          animation: ticker 25s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default TickerBar;