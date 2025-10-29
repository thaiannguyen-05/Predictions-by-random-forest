"use client";

import React from "react";

interface TradeRecord {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

interface TradingHistoryProps {
  symbol: string;
  historyData: TradeRecord[];
}

const TradingHistory: React.FC<TradingHistoryProps> = ({
  symbol,
  historyData,
}) => {
  if (!historyData || historyData.length === 0)
    return (
      <div className="text-gray-500 text-center py-10">
        Không có dữ liệu lịch sử giao dịch cho {symbol}
      </div>
    );

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700 mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            {["Ngày", "Mở", "Đóng", "Cao", "Thấp", "Khối lượng"].map(
              (header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {historyData.map((item) => (
            <tr
              key={item.date}
              className="bg-gray-900 hover:bg-gray-700 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-white">{item.date}</td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.open.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.close.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.high.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {item.low.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-sm text-white">
                {item.volume.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradingHistory;
