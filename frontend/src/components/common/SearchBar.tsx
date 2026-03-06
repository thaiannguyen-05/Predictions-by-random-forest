
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TRAINED_STOCKS, STOCK_DETAILS } from '../../../constants/trainedStocks';

interface StockSuggestion {
  symbol: string;
  companyName: string;
  currentPrice?: number;
  changePercent?: number;
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();


  const fetchSuggestions = async (query: string): Promise<StockSuggestion[]> => {
    let filteredStocks = TRAINED_STOCKS;

    if (query.trim().length > 0) {
      filteredStocks = TRAINED_STOCKS.filter(stock =>
        stock.toLowerCase().includes(query.toLowerCase()) ||
        (STOCK_DETAILS[stock as keyof typeof STOCK_DETAILS]?.name.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (filteredStocks.length === 0) return [];

    try {
      const tickersQuery = filteredStocks.join(',');
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${API_BASE}/stock/current-prices?tickers=${tickersQuery}`);
      const jsonRes = await res.json();
      const priceData = jsonRes?.data ?? jsonRes ?? {};

      return filteredStocks.map(symbol => {
        const data = priceData[symbol];
        return {
          symbol,
          companyName: STOCK_DETAILS[symbol as keyof typeof STOCK_DETAILS]?.name || `Công ty ${symbol}`,
          currentPrice: data ? data.price : undefined,
          changePercent: data ? parseFloat(data.change) : undefined,
        };
      });
    } catch (error) {
      console.error("Error fetching suggestions prices:", error);
      return filteredStocks.map(symbol => ({
        symbol,
        companyName: STOCK_DETAILS[symbol as keyof typeof STOCK_DETAILS]?.name || `Công ty ${symbol}`,
        currentPrice: undefined,
        changePercent: undefined,
      }));
    }
  };

  const searchStocks = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const results = await fetchSuggestions(query);
      setSuggestions(results);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchStocks(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchStocks]);

  const handleSelectSuggestion = (symbol: string) => {
    setSearchTerm(symbol);
    setSuggestions([]);
    setIsFocused(false);
    router.push(`/stocks/${symbol}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const foundStock = TRAINED_STOCKS.find(stock =>
        stock.toLowerCase() === searchTerm.toUpperCase()
      );
      if (foundStock) {
        router.push(`/stocks/${foundStock}`);
      }
    }
  };

  const showDropdown = isFocused && (suggestions.length > 0 || isLoading);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-4">
      <div className="relative flex items-center bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20 transition-all shadow-xl">
        <Search size={20} className="text-gray-500 ml-6 absolute" />
        <input
          type="text"
          placeholder="Tìm kiếm mã cổ phiếu (VD: FPT, VNM, VIC)..."
          className="w-full py-4 pl-14 pr-6 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyPress={handleKeyPress}
        />
        {isLoading && (
          <Loader2 size={20} className="text-brand-orange mr-4 animate-spin absolute right-0" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-10 w-full mt-2 bg-brand-card/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl max-h-80 overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin mr-2" />
              Đang tìm kiếm...
            </div>
          ) : (
            suggestions.map((stock) => (
              <div
                key={stock.symbol}
                className="p-4 hover:bg-brand-dark cursor-pointer transition-colors border-b border-white/5 last:border-b-0"
                onMouseDown={() => handleSelectSuggestion(stock.symbol)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{stock.symbol}</p>
                    <p className="text-sm text-gray-400">{stock.companyName}</p>
                  </div>
                  {stock.currentPrice && (
                    <div className="text-right">
                      <p className="text-white font-bold">
                        {stock.currentPrice.toLocaleString('vi-VN')}₫
                      </p>
                      <p className={`text-sm ${(stock.changePercent || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {(stock.changePercent || 0) >= 0 ? '+' : ''}{(stock.changePercent || 0).toFixed(2)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;