// frontend/src/app/stocks/[symbol]/page.tsx

'use client'; // Dòng này quan trọng nếu bạn dùng component client-side trong App Router

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Để xử lý lỗi hoặc redirect
import StockSummary from '@/components/stock/StockSummary';
import StockChart from '@/components/stock/StockChart';
import KeyStatistics from '@/components/stock/KeyStatistics';
import TradingHistory from '@/components/stock/TradingHistory';

// Import các kiểu dữ liệu đã định nghĩa ở Bước 1
import { 
  BackendStockResponse, 
  FrontendStockData, 
  HistoricalDataItem, 
  FormattedKeyStatistics 
} from '@/types/stock'; // Hoặc đặt trực tiếp ở đây nếu muốn

interface StockDetailPageProps {
    params: {
        symbol: string;
    }
}

const API_BASE_URL = 'http://localhost:3000'; // Đảm bảo đúng cổng Backend NestJS của bạn

const StockDetailPage: React.FC<StockDetailPageProps> = ({ params }) => {
    const router = useRouter();
    const { symbol } = params;
    
    const [stockData, setStockData] = useState<FrontendStockData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStockDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/stock-prediction/stocks/${symbol}`);
                
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Mã cổ phiếu không tìm thấy.');
                    }
                    throw new Error(`Lỗi khi lấy dữ liệu: ${response.statusText}`);
                }
                
                const backendData: BackendStockResponse = await response.json();
                console.log("Dữ liệu từ Backend:", backendData); // Kiểm tra dữ liệu trả về

                // --- Xử lý và định dạng dữ liệu cho Frontend ---
                const currentPrice = backendData.currentPrice?.price || 0;
                const previousClose = backendData.additionalInfo?.summaryDetail?.previousClose?.raw || currentPrice;
                const change = currentPrice - previousClose;
                const changePercent = (change / previousClose) * 100;
                
                const formattedData: FrontendStockData = {
                    symbol: symbol.toUpperCase(),
                    companyName: backendData.additionalInfo?.summaryProfile?.longName || 'Đang cập nhật...',
                    currentPrice: currentPrice,
                    previousClose: previousClose,
                    change: change,
                    changePercent: changePercent,
                    marketCap: (backendData.additionalInfo?.keyStatistics?.marketCap?.raw ? 
                                new Intl.NumberFormat('vi-VN', { 
                                    notation: 'compact', 
                                    compactDisplay: 'short' 
                                }).format(backendData.additionalInfo.keyStatistics.marketCap.raw) + ' VND' 
                                : 'N/A'),
                    volume: (backendData.historicalData[backendData.historicalData.length -1]?.volume ? 
                                new Intl.NumberFormat('en-US').format(backendData.historicalData[backendData.historicalData.length -1].volume) 
                                : 'N/A'),
                    peRatio: backendData.additionalInfo?.keyStatistics?.forwardPE?.raw?.toFixed(2) + 'x' || 'N/A',
                    eps: backendData.additionalInfo?.keyStatistics?.trailingEps?.raw?.toFixed(2) + ' VND' || 'N/A',
                    beta: backendData.additionalInfo?.keyStatistics?.beta?.raw?.toFixed(2) || 'N/A',
                    openPrice: backendData.additionalInfo?.summaryDetail?.open?.raw || 0,
                    high52Week: backendData.additionalInfo?.keyStatistics?.fiftyTwoWeekHigh?.raw || 0,
                    low52Week: backendData.additionalInfo?.keyStatistics?.fiftyTwoWeekLow?.raw || 0,
                    lastUpdated: new Date().toLocaleTimeString('vi-VN') + ' (GMT+7)', // Cần lấy từ Backend nếu có
                    
                    chartData: backendData.historicalData,
                    tradingHistory: backendData.historicalData.slice(0, 10).map(item => ({ // Lấy 10 mục gần nhất
                        ...item,
                        change: ((item.close - item.open) / item.open) * 100 // Tính lại thay đổi % cho lịch sử
                    })),
                };
                
                setStockData(formattedData);

            } catch (err: any) {
                setError(err.message);
                console.error("Lỗi khi tải dữ liệu cổ phiếu:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (symbol) {
            fetchStockDetails();
        }
    }, [symbol]); // Effect chạy lại khi 'symbol' thay đổi

    // Xử lý trạng thái tải và lỗi
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-blue-400 text-xl">
                <svg className="animate-spin h-8 w-8 mr-3" viewBox="0 0 24 24"> {/* Icon loading */}
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang tải dữ liệu cổ phiếu {symbol}...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[400px] text-red-500 text-xl p-4">
                <p>Đã xảy ra lỗi: {error}</p>
                <button 
                    onClick={() => router.push('/')} 
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Quay về Trang chủ
                </button>
            </div>
        );
    }

    if (!stockData) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-gray-400 text-xl">
                Không có dữ liệu cho mã cổ phiếu này.
            </div>
        );
    }

    // Định dạng dữ liệu thống kê cho component KeyStatistics
    const formattedKeyStats: FormattedKeyStatistics = {
        'Giá Mở Cửa (Open)': stockData.openPrice.toFixed(2),
        'Giá Đỉnh (52 Tuần)': stockData.high52Week.toFixed(2),
        'Giá Đáy (52 Tuần)': stockData.low52Week.toFixed(2),
        'P/E Ratio': stockData.peRatio,
        'EPS': stockData.eps,
        'Beta': stockData.beta,
        'Giá Đóng Trước': stockData.previousClose.toFixed(2),
        // Thêm các chỉ số khác nếu bạn muốn từ summaryDetail, keyStatistics
    };

    return (
        <div className="min-h-screen p-4 max-w-7xl mx-auto">
            
            {/* 1. Phần Tóm tắt và Giá Hiện tại */}
            <StockSummary data={stockData} />

            {/* 2. Biểu đồ và Dữ liệu Thống kê */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
                
                {/* Cột chính: Biểu đồ */}
                <div className="lg:col-span-8">
                    <StockChart symbol={symbol} chartData={stockData.chartData} />
                </div>
                
                {/* Cột phụ: Dữ liệu Thống kê Tham khảo */}
                <div className="lg:col-span-4">
                    <KeyStatistics statistics={formattedKeyStats} />
                </div>
            </div>

            {/* 3. Lịch sử Giao dịch */}
            <TradingHistory symbol={symbol} historyData={stockData.tradingHistory} />
            
            {/* Tạm thời bỏ qua phần Tin tức để giữ tập trung */}
        </div>
    );
};

export default StockDetailPage;