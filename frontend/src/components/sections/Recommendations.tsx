'use client';

import React from 'react';
import { Zap, TrendingUp, TrendingDown, Plus } from 'lucide-react';

// Kiểu dữ liệu cho cổ phiếu đề xuất
interface RecommendedStock {
  symbol: string;
  reason: string;
  targetPrice: number;
  currentPrice: number;
  isBullish: boolean; // Tăng hay Giảm
}

const DUMMY_RECS: RecommendedStock[] = [
  {
    symbol: 'HPG',
    reason: 'Kỳ vọng tăng trưởng lợi nhuận quý 3 sau khi mở lại lò cao.',
    targetPrice: 32.50,
    currentPrice: 31.80,
    isBullish: true,
  },
  {
    symbol: 'SSI',
    reason: 'Dự báo hưởng lợi lớn từ hệ thống KRX và thanh khoản thị trường tăng.',
    targetPrice: 38.00,
    currentPrice: 36.50,
    isBullish: true,
  },
];

const Recommendations: React.FC = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="flex items-center text-xl font-bold text-green-400 mb-4 border-b border-gray-700 pb-3">
        <Zap size={22} className="mr-2" />
        Đề xuất Trong ngày
      </h2>
      
      <div className="space-y-4">
        {DUMMY_RECS.map((stock) => {
          const Icon = stock.isBullish ? TrendingUp : TrendingDown;
          const colorClass = stock.isBullish ? 'text-green-400' : 'text-red-500';
          
          return (
            <div 
              key={stock.symbol} 
              className="p-3 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2">
                    <span className={`font-extrabold text-lg ${colorClass}`}>{stock.symbol}</span>
                    <Icon size={18} className={colorClass} />
                </div>
                <button 
                    className="p-1 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors"
                    title="Thêm vào danh sách theo dõi"
                >
                    <Plus size={16} className="text-white" />
                </button>
              </div>
              
              <p className="text-xs text-gray-400 line-clamp-2 italic mb-2">
                "{stock.reason}"
              </p>
              
              <div className="text-xs space-y-1">
                <p className="text-gray-300">Giá hiện tại: <span className="font-bold">{stock.currentPrice.toFixed(2)}</span></p>
                <p className="text-green-400 font-semibold">Mục tiêu: {stock.targetPrice.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendations;