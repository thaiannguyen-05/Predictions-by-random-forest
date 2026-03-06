'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '../main-layout';
import { useAuth } from '@/context/AuthContext';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Search,
  Zap,
  Clock,
  ChevronRight,
  Sparkles,
  Server,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/common/SearchBar';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface QuickStat {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [mlServiceStatus, setMlServiceStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  const [topStocks, setTopStocks] = useState([
    { symbol: 'VCB', name: 'Vietcombank', price: '0', change: '0%', isPositive: true },
    { symbol: 'FPT', name: 'FPT Corp', price: '0', change: '0%', isPositive: true },
    { symbol: 'VNM', name: 'Vinamilk', price: '0', change: '0%', isPositive: false },
    { symbol: 'HPG', name: 'Hòa Phát', price: '0', change: '0%', isPositive: true },
  ]);

  useEffect(() => {
    checkMLService();
    fetchTopStocks();

    const intervalId = setInterval(() => {
      fetchTopStocks();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const checkMLService = async () => {
    try {
      const res = await fetch(`${API_BASE}/stock/health`);
      if (res.ok) {
        setMlServiceStatus('online');
      } else {
        setMlServiceStatus('offline');
      }
    } catch {
      setMlServiceStatus('offline');
    }
  };

  const formatSymbolForApi = (symbol: string) => `${symbol}.VN`;

  const fetchTopStocks = async () => {
    const symbols = ['VCB', 'FPT', 'VNM', 'HPG'];
    const names: Record<string, string> = {
      VCB: 'Vietcombank',
      FPT: 'FPT Corp',
      VNM: 'Vinamilk',
      HPG: 'Hòa Phát'
    };

    const updatedStocks = await Promise.all(
      symbols.map(async (sym) => {
        try {
          const apiSymbol = formatSymbolForApi(sym);
          const res = await fetch(`${API_BASE}/stock/current-price/${apiSymbol}`, {
            cache: 'no-store',
          });
          const data = await res.json();

          const payload = data?.data ?? data;

          if (payload) {
            const priceNumber = Number(payload.price ?? 0);
            const priceStr = Number.isFinite(priceNumber)
              ? Math.round(priceNumber).toLocaleString('vi-VN')
              : '0';

            const changeVal = parseFloat(String(payload.change ?? '0'));
            const normalizedChange = Number.isFinite(changeVal) ? changeVal : 0;
            const isPos = normalizedChange >= 0;

            return {
              symbol: sym,
              name: names[sym],
              price: priceStr,
              change: `${Math.abs(normalizedChange).toFixed(2)}%`,
              isPositive: isPos,
            };
          }
          throw new Error('No data');
        } catch {
          return {
            symbol: sym,
            name: names[sym],
            price: 'N/A',
            change: '0%',
            isPositive: true,
          };
        }
      })
    );
    setTopStocks(updatedStocks);
  };

  const quickStats: QuickStat[] = [
    {
      label: 'VN-INDEX',
      value: '1,258.45',
      change: '+2.3%',
      isPositive: true,
      icon: <TrendingUp className="text-green-400" size={24} />,
    },
    {
      label: 'Stocks Trained',
      value: '50+',
      icon: <BarChart3 className="text-brand-orange" size={24} />,
    },
    {
      label: 'Model Accuracy',
      value: '94.8%',
      change: '+1.2%',
      isPositive: true,
      icon: <Sparkles className="text-yellow-400" size={24} />,
    },
    {
      label: 'ML Service',
      value: mlServiceStatus === 'online' ? 'Online' : mlServiceStatus === 'offline' ? 'Offline' : 'Checking',
      icon: mlServiceStatus === 'online'
        ? <Server className="text-green-400" size={24} />
        : <AlertCircle className="text-red-400" size={24} />,
    },
  ];

  const quickActions = [
    {
      title: 'Tìm kiếm cổ phiếu',
      desc: 'Xem dự đoán & phân tích',
      icon: <Search className="text-brand-orange" size={28} />,
      action: () => document.getElementById('search-input')?.focus(),
    },
    {
      title: 'Train Model',
      desc: 'Huấn luyện mô hình AI',
      icon: <Zap className="text-yellow-400" size={28} />,
      href: '/train',
    },
    {
      title: 'Lịch sử dự đoán',
      desc: 'Xem các dự đoán trước',
      icon: <Clock className="text-blue-400" size={28} />,
      href: '/history',
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen px-4 py-6 max-w-7xl mx-auto">
        { }
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Xin chào, <span className="text-brand-orange">{user?.name || 'Investor'}</span>! 👋
          </h1>
          <p className="text-gray-400">
            Chào mừng bạn đến với dashboard AI phân tích & dự đoán chứng khoán
          </p>
        </div>

        { }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
          {quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-brand-orange/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-brand-dark rounded-xl group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className={`text-sm font-semibold ${stat.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        { }
        <div className="mb-8 animate-fade-in relative z-50">
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          { }
          <div className="lg:col-span-2 space-y-6">
            { }
            <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-fade-in">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="text-brand-orange" size={24} />
                Thao tác nhanh
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    href={action.href || '#'}
                    onClick={action.action ? (e) => { e.preventDefault(); action.action?.(); } : undefined}
                    className="bg-brand-dark/50 border border-white/5 rounded-xl p-6 hover:border-brand-orange/30 hover:bg-brand-dark/70 transition-all group cursor-pointer"
                  >
                    <div className="mb-4 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                    <p className="text-gray-400 text-sm">{action.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            { }
            <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-brand-orange" size={24} />
                  Cổ phiếu nổi bật
                </h2>
                <Link href="/stocks" className="text-brand-orange hover:text-orange-400 text-sm font-medium flex items-center gap-1">
                  Xem tất cả <ChevronRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {topStocks.map((stock) => (
                  <Link
                    key={stock.symbol}
                    href={`/stocks/${stock.symbol}`}
                    className="flex items-center justify-between p-4 bg-brand-dark/50 rounded-xl hover:bg-brand-dark/70 border border-transparent hover:border-brand-orange/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-orange/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-brand-orange font-bold text-sm">{stock.symbol[0]}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{stock.symbol}</h3>
                        <p className="text-gray-400 text-sm">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.price}đ
                      </p>
                      <p className={`text-sm font-semibold flex items-center justify-end gap-1 ${stock.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.isPositive ? '▲' : '▼'} {stock.change}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          { }
          <div className="space-y-6">
            { }
            <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-white mb-4">ML Service Status</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${mlServiceStatus === 'online' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-white font-semibold">
                  {mlServiceStatus === 'online' ? 'Đang hoạt động' : mlServiceStatus === 'offline' ? 'Offline' : 'Đang kiểm tra...'}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {mlServiceStatus === 'online'
                  ? 'Dịch vụ AI đang sẵn sàng phục vụ dự đoán'
                  : 'Dịch vụ AI tạm thời không khả dụng'}
              </p>
              <button
                onClick={checkMLService}
                className="mt-4 w-full bg-brand-orange/20 hover:bg-brand-orange/30 text-brand-orange font-semibold py-2 rounded-xl transition-all"
              >
                Kiểm tra lại
              </button>
            </div>

            { }
            <div className="bg-gradient-to-br from-brand-orange/10 to-transparent border border-brand-orange/20 rounded-2xl p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-brand-orange" size={20} />
                Mẹo đầu tư
              </h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">•</span>
                  <span>Dùng AI để phân tích xu hướng, không phải quyết định cuối cùng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">•</span>
                  <span>Đa dạng hóa danh mục để giảm rủi ro</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">•</span>
                  <span>Cập nhật model thường xuyên để độ chính xác cao hơn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
