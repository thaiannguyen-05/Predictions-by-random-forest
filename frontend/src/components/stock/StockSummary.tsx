import React from 'react';
import { ArrowUpRight, ArrowDownRight, Pin } from 'lucide-react';

const StockSummary: React.FC<{ data: any }> = ({ data }) => {
    const isPositive = data.changePercent > 0;
    const colorClass = isPositive ? 'text-green-400' : 'text-red-500';
    const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

    return (
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-1">
                        {data.symbol} <span className="text-gray-400">| {data.companyName}</span>
                    </h1>
                    <p className="text-sm text-gray-500">Cập nhật lúc: 10:28:00 (GMT+7)</p>
                </div>
                <button 
                    className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors text-white flex items-center"
                    title="Ghim cổ phiếu"
                >
                    <Pin size={20} className="mr-1" /> Ghim
                </button>
            </div>

            <div className="mt-5 flex items-end space-x-6 border-t border-gray-700 pt-5">
                {/* Giá Hiện tại */}
                <div className="flex flex-col">
                    <span className="text-5xl font-bold text-white leading-none">
                        {data.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 mt-1">VND/Cổ phiếu</span>
                </div>

                {/* Thay đổi */}
                <div className={`flex items-center ${colorClass} text-2xl font-semibold`}>
                    <Icon size={24} className="mr-2" />
                    <span>{data.change.toFixed(2)}</span>
                    <span className="text-xl ml-2">({data.changePercent.toFixed(2)}%)</span>
                </div>

                {/* Chỉ số Khác */}
                <div className="text-sm space-y-1 ml-auto">
                    <p className="text-gray-400">Vốn hóa: <span className="font-bold text-white">{data.marketCap}</span></p>
                    <p className="text-gray-400">Khối lượng: <span className="font-bold text-white">{data.volume}</span></p>
                </div>
            </div>
        </div>
    );
};

export default StockSummary;