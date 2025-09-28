'use client';

import React from 'react';
import { Pin, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Kiểu dữ liệu cho cổ phiếu đã ghim
interface WatchlistItem {
  symbol: string;
  price: number;
  changePercent: number;
}

const DUMMY_WATCHLIST: WatchlistItem[] = [
  { symbol: 'STB', price: 30.55, changePercent: 1.25 },
  { symbol: 'MWG', price: 48.90, changePercent: -0.70 },
  { symbol: 'GAS', price: 82.00, changePercent: 0.05 },
];

const Watchlist: React.FC = () => {
    // TẠI ĐÂY: Sử dụng useState/useEffect để fetch dữ liệu từ NestJS Backend (User data)

    const handleRemove = (symbol: string) => {
        // Logic gọi API Backend để xóa mã cổ phiếu khỏi danh sách ghim
        console.log(`Removing ${symbol} from watchlist.`);
    };

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="flex items-center text-xl font-bold text-amber-400 mb-4 border-b border-gray-700 pb-3">
        <Pin size={22} className="mr-2" />
        Cổ phiếu Đã ghim ({DUMMY_WATCHLIST.length})
      </h2>
      
      <ul className="space-y-3">
        {DUMMY_WATCHLIST.map((stock) => {
          const isPositive = stock.changePercent > 0;
          const colorClass = isPositive ? 'text-green-400' : 'text-red-500';
          const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

          return (
            <li 
              key={stock.symbol} 
              className="flex justify-between items-center p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-white">{stock.symbol}</span>
                <span className="text-sm text-gray-300">{stock.price.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`flex items-center text-sm font-semibold ${colorClass}`}>
                  <Icon size={16} className="mr-1" />
                  <span>{stock.changePercent.toFixed(2)}%</span>
                </div>
                
                <button 
                  onClick={() => handleRemove(stock.symbol)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1"
                  title="Bỏ ghim"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Watchlist;