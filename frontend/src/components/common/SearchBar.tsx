"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search, Loader2 } from "lucide-react";

// Giả định kiểu dữ liệu trả về từ API Backend
interface StockSuggestion {
  symbol: string;
  companyName: string;
}

// Giả lập hàm gọi API tìm kiếm
const fetchSuggestions = async (query: string): Promise<StockSuggestion[]> => {
  if (query.length < 2) return [];
  console.log(`Searching for: ${query}...`);

  // TẠI ĐÂY: Sẽ gọi API tới Backend NestJS (e.g., /api/stocks/search?q=...)
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API delay

  // Dữ liệu giả lập
  const allStocks: StockSuggestion[] = [
    { symbol: "FPT", companyName: "Công ty Cổ phần FPT" },
    { symbol: "VND", companyName: "Chứng khoán VNDIRECT" },
    { symbol: "VNM", companyName: "Vinamilk" },
    { symbol: "VIC", companyName: "Tập đoàn Vingroup" },
    { symbol: "VCB", companyName: "Vietcombank" },
  ];

  return allStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.companyName.toLowerCase().includes(query.toLowerCase())
  );
};

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Debounce hook hoặc logic để giảm tần suất gọi API
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
      console.error("Lỗi tìm kiếm:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect để theo dõi thay đổi của searchTerm và gọi hàm searchStocks sau một khoảng delay ngắn
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
    // TẠI ĐÂY: Chuyển hướng người dùng đến trang chi tiết cổ phiếu /stocks/symbol
    console.log(`Maps to stock details: /stocks/${symbol}`);
  };

  const showDropdown = isFocused && (suggestions.length > 0 || isLoading);

  return (
    <div className="relative w-full max-w-4xl mx-auto my-6 px-4">
      {/* Thanh Input Tìm kiếm */}
      <div className="relative flex items-center bg-gray-800 rounded-lg border border-gray-700 focus-within:border-blue-500 transition-all shadow-xl">
        <Search size={20} className="text-gray-400 ml-4 absolute" />
        <input
          type="text"
          placeholder="Tìm kiếm mã cổ phiếu (VD: FPT, VNM, VIC)..."
          className="w-full py-3 pl-12 pr-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay để click vào gợi ý
        />
        {isLoading && (
          <Loader2
            size={20}
            className="text-blue-400 mr-4 animate-spin absolute right-0"
          />
        )}
      </div>

      {/* Dropdown Gợi ý Tự động */}
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
                onMouseDown={() => handleSelectSuggestion(stock.symbol)} // Dùng onMouseDown để bắt sự kiện trước onBlur
              >
                <p className="font-semibold text-white">{stock.symbol}</p>
                <p className="text-sm text-gray-400">{stock.companyName}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
