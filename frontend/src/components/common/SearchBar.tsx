// components/common/SearchBar.tsx
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

  // Định nghĩa basePrices với index signature
  const basePrices: { [key: string]: number } = {
    'FPT': 80000, 'VNM': 75000, 'VCB': 30000, 'VIC': 45000, 'HPG': 28000,
    'TCB': 35000, 'VPB': 25000, 'MSN': 90000, 'MWG': 120000, 'GAS': 85000,
    'PLX': 55000, 'SAB': 150000, 'BID': 40000, 'CTG': 32000, 'MBB': 28000,
    'ACB': 30000, 'HDB': 27000, 'STB': 22000, 'TPB': 18000, 'EIB': 20000,
    'VHM': 50000, 'VRE': 35000, 'NVL': 30000, 'KDH': 25000, 'PDR': 20000,
    'DGC': 40000, 'DPM': 35000, 'GVR': 30000, 'REE': 40000, 'SSI': 35000,
    'VND': 30000, 'HCM': 25000, 'VCI': 20000, 'VDS': 15000, 'VXR': 18000,
    'BSI': 22000, 'CTS': 19000, 'FTS': 28000, 'VIX': 17000, 'WSS': 16000,
  };

  // Hàm tìm kiếm trong danh sách cổ phiếu đã train
  const fetchSuggestions = async (query: string): Promise<StockSuggestion[]> => {
    if (query.length < 1) return [];

    // Tìm trong danh sách cổ phiếu đã train
    const filteredStocks = TRAINED_STOCKS.filter(stock =>
      stock.toLowerCase().includes(query.toLowerCase()) ||
      (STOCK_DETAILS[stock as keyof typeof STOCK_DETAILS]?.name.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 10); // Giới hạn 10 kết quả

    return filteredStocks.map(symbol => ({
      symbol,
      companyName: STOCK_DETAILS[symbol as keyof typeof STOCK_DETAILS]?.name || `Công ty ${symbol}`,
      currentPrice: getMockPrice(symbol),
      changePercent: (Math.random() - 0.5) * 10
    }));
  };

  // Hàm tạo giá mock
  const getMockPrice = (symbol: string) => {
    const basePrice = basePrices[symbol] || 40000;
    return basePrice * (0.9 + Math.random() * 0.2);
  };

  const searchStocks = useCallback(async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
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
      <div className="relative flex items-center bg-gray-800 rounded-lg border border-gray-700 focus-within:border-brand-orange transition-all shadow-xl">
        <Search size={20} className="text-gray-400 ml-4 absolute" />
        <input
          type="text"
          placeholder="Tìm kiếm mã cổ phiếu (VD: FPT, VNM, VIC)..."
          className="w-full py-3 pl-12 pr-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
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
        <div className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400 flex items-center justify-center">
              <Loader2 size={18} className="animate-spin mr-2" />
              Đang tìm kiếm...
            </div>
          ) : (
            suggestions.map((stock) => (
              <div
                key={stock.symbol}
                className="p-3 hover:bg-gray-700 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0"
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