// components/stock/TradingHistory.tsx
import React from 'react';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { HistoricalDataItem } from '@/types/stock'; // Import kiểu dữ liệu

interface TradingHistoryProps {
    symbol: string;
    historyData: HistoricalDataItem[]; // Thêm prop này
}

const TradingHistory: React.FC<TradingHistoryProps> = ({ symbol, historyData }) => {
    return (
        <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 mt-6">
            {/* ... Tiêu đề ... */}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            {['Ngày', 'Giá Đóng', 'Giá Mở', 'Giá Cao', 'Giá Thấp', 'Khối Lượng', 'Thay Đổi (%)'].map(header => (
                                <th 
                                    key={header} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {historyData.map((item, index) => { // Sử dụng historyData
                            // Tính toán thay đổi cho mỗi ngày từ dữ liệu lịch sử
                            const dailyChange = item.close - item.open;
                            const dailyChangePercent = (dailyChange / item.open) * 100;

                            const isPositive = dailyChangePercent > 0;
                            const colorClass = isPositive ? 'text-green-400' : 'text-red-500';
                            const Icon = isPositive ? TrendingUp : TrendingDown;

                            return (
                                <tr key={item.date} className="bg-gray-900 hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.close.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.open.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.high.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item.low.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.volume.toLocaleString('en')}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${colorClass}`}>
                                        <div className="flex items-center">
                                            <Icon size={14} className="mr-1" />
                                            {dailyChangePercent.toFixed(2)}%
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TradingHistory;