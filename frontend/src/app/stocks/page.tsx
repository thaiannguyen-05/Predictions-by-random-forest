'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MainLayout from '../main-layout';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { TRAINED_STOCKS, STOCK_DETAILS } from '@/constants/trainedStocks';
import { FALLBACK_STOCK_QUOTES } from '@/constants/fallbackStockQuotes';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
const POLL_INTERVAL = 15000;

interface StockListItem {
  symbol: string;
  companyName: string;
  price: number | null;
  changePercent: number;
}

export default function StocksPage() {
  const [stocks, setStocks] = useState<StockListItem[]>(
    TRAINED_STOCKS.map((symbol) => ({
      symbol,
      companyName: STOCK_DETAILS[symbol]?.name || `Công ty ${symbol}`,
      price: FALLBACK_STOCK_QUOTES[symbol]?.price ?? null,
      changePercent: FALLBACK_STOCK_QUOTES[symbol]?.changePercent ?? 0,
    }))
  );
  const [isLoading, setIsLoading] = useState(true);

  const toFiniteNumber = (value: unknown): number | null => {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value === 'string') {
      const normalized = value.replace(/,/g, '').replace('%', '').trim();
      if (!normalized) return null;
      const parsed = Number(normalized);
      return Number.isFinite(parsed) ? parsed : null;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const fetchCurrentPrices = async () => {
    try {
      const tickers = TRAINED_STOCKS.join(',');
      const response = await fetch(`${API_BASE}/stock/current-prices?tickers=${tickers}`, {
        cache: 'no-store',
      });

      const jsonData = await response.json();
      const payload = jsonData?.data ?? jsonData ?? {};

      const mapped = TRAINED_STOCKS.map((symbol) => {
        const data = payload?.[symbol];
        const fallbackQuote = FALLBACK_STOCK_QUOTES[symbol];
        const priceNumber = toFiniteNumber(data?.price);
        const changeNumber = toFiniteNumber(data?.change);

        return {
          symbol,
          companyName: STOCK_DETAILS[symbol]?.name || `Công ty ${symbol}`,
          price: priceNumber ?? fallbackQuote?.price ?? null,
          changePercent: changeNumber ?? fallbackQuote?.changePercent ?? 0,
        };
      });

      setStocks(mapped);
    } catch {
      setStocks((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price ?? FALLBACK_STOCK_QUOTES[item.symbol]?.price ?? null,
          changePercent: item.changePercent || FALLBACK_STOCK_QUOTES[item.symbol]?.changePercent || 0,
        }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentPrices();

    const intervalId = setInterval(() => {
      fetchCurrentPrices();
    }, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MainLayout>
      <div className="min-h-screen px-4 py-6 max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Danh sách cổ phiếu</h1>
          <p className="text-gray-400">Theo dõi giá hiện tại và biến động của các mã đã huấn luyện</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {stocks.map((stock) => {
              const isPositive = stock.changePercent >= 0;

              return (
                <Link
                  key={stock.symbol}
                  href={`/stocks/${stock.symbol}`}
                  className="flex items-center justify-between p-4 bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-xl hover:border-brand-orange/30 hover:bg-brand-dark/60 transition-all group"
                >
                  <div>
                    <p className="text-white font-bold text-lg">{stock.symbol}</p>
                    <p className="text-gray-400 text-sm">{stock.companyName}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-white font-bold">
                        {stock.price !== null ? `${Math.round(stock.price).toLocaleString('vi-VN')}₫` : 'N/A'}
                      </p>
                      <p
                        className={`text-sm font-semibold flex items-center justify-end gap-1 ${
                          isPositive ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(stock.changePercent).toFixed(2)}%
                      </p>
                    </div>

                    <ChevronRight size={18} className="text-gray-500 group-hover:text-brand-orange transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
