// components/sections/Watchlist.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';

interface WatchlistStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function Watchlist() {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    try {
      const saved = localStorage.getItem('pinned-stocks');
      if (saved) {
        const pinnedStocks: WatchlistStock[] = JSON.parse(saved);
        
        // Cập nhật giá mới nhất cho các cổ phiếu đã ghim
        const updatedWatchlist = pinnedStocks.map(stock => ({
          ...stock,
          price: stock.price * (1 + (Math.random() - 0.5) * 0.02), // Giả lập biến động giá
          change: stock.change * (1 + (Math.random() - 0.5) * 0.1),
          changePercent: stock.changePercent * (1 + (Math.random() - 0.5) * 0.1)
        }));
        
        setWatchlist(updatedWatchlist);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading watchlist:', error);
      setIsLoading(false);
    }
  };

  const removeFromWatchlist = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedWatchlist = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('pinned-stocks', JSON.stringify(updatedWatchlist));
  };

  const handleStockClick = (symbol: string) => {
    router.push(`/stocks/${symbol}`);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
        <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
          <Star className="mr-2" size={20} />
          Danh sách theo dõi
        </h3>
        <div className="animate-pulse text-gray-500 text-center py-4">
          Đang tải...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
      <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
        <Star className="mr-2" size={20} />
        Danh sách theo dõi
      </h3>

      {watchlist.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Star size={32} className="mx-auto mb-2 opacity-50" />
          <p>Chưa có cổ phiếu nào được ghim</p>
          <p className="text-sm mt-1">Ghim cổ phiếu từ trang chi tiết để theo dõi</p>
        </div>
      ) : (
        <div className="space-y-3">
          {watchlist.map((stock) => {
            const isPositive = stock.change >= 0;
            const Icon = isPositive ? TrendingUp : TrendingDown;
            
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
                      {stock.price.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-400">{stock.name}</span>
                    <span className={`text-sm font-semibold flex items-center ${
                      isPositive ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <Icon size={14} className="mr-1" />
                      {isPositive ? '+' : ''}{stock.change.toFixed(2)} 
                      ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => removeFromWatchlist(stock.symbol, e)}
                  className="ml-3 p-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                  title="Bỏ ghim"
                >
                  <Star size={16} fill="currentColor" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}