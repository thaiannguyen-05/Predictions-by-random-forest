import React, { useState } from 'react';
import { BarChart2,TrendingUp } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalDataItem } from '@/types/stock';
// Do không thể render thư viện bên ngoài, tôi sẽ dùng một placeholder

const timeRanges = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
    { label: 'Max', value: 'MAX' },
];

interface StockChartProps {
    symbol: string;
    chartData: HistoricalDataItem[]; 
}
const StockChart: React.FC<{ symbol: string, chartData: any }> = ({ symbol }) => {
    const [selectedRange, setSelectedRange] = useState('1D');

    // TẠI ĐÂY: Hàm fetch dữ liệu biểu đồ từ NestJS Backend, có thể gọi trực tiếp tới ML Service/Database
    // Dựa trên symbol và selectedRange (vd: /api/charts/FPT?range=1D)

    return (
        <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 h-[500px]">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                <h2 className="flex items-center text-xl font-bold text-blue-400">
                    <BarChart2 size={22} className="mr-2" />
                    Biểu đồ Giá ({symbol})
                </h2>
                {/* Lựa chọn khoảng thời gian */}
                <div className="flex space-x-2 text-sm">
                    {timeRanges.map(range => (
                        <button
                            key={range.value}
                            onClick={() => setSelectedRange(range.value)}
                            className={`px-3 py-1 rounded transition-colors ${
                                selectedRange === range.value 
                                    ? 'bg-blue-600 text-white font-semibold' 
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Placeholder cho Biểu đồ thực tế */}
            <div className="flex items-center justify-center w-full h-[400px] bg-gray-900 rounded-lg border border-dashed border-gray-600 text-gray-400">
                {/* <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}> ... </LineChart>
                </ResponsiveContainer> */}
                <TrendingUp size={40} className="mr-2 text-blue-500" />
                Khu vực Biểu đồ Nến / Biểu đồ Đường (Sử dụng Recharts/Chart.js)
            </div>
        </div>
    );
};

export default StockChart;