import React from "react";
import { Info, Gauge } from "lucide-react";
import { FormattedKeyStatistics, HistoricalDataItem } from "@/types/stock";

// Định nghĩa type cho statistics: key là string, value là number hoặc string
type Statistics = {
  [key: string]: string | number;
};

interface KeyStatisticsProps {
  statistics: FormattedKeyStatistics;
}

const KeyStatistics: React.FC<KeyStatisticsProps> = ({ statistics }) => {
  const statsArray = Object.entries(statistics);

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="flex items-center text-xl font-bold text-yellow-400 mb-4 border-b border-gray-700 pb-3">
        <Gauge size={22} className="mr-2" />
        Thống kê Cơ bản
      </h2>

      <p className="text-sm text-gray-500 mb-4 italic">
        (Dữ liệu tham khảo từ các nguồn quốc tế)
      </p>

      <ul className="space-y-3">
        {statsArray.map(([key, value]) => (
          <li
            key={key}
            className="flex justify-between items-center pb-2 border-b border-gray-700 last:border-b-0"
          >
            <span className="text-gray-400 font-medium">{key}</span>
            <span className="text-white font-semibold">{value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-start text-xs text-gray-500 p-2 bg-gray-900 rounded-lg">
        <Info size={16} className="mr-2 mt-0.5 flex-shrink-0" />
        <p>
          Các chỉ số như P/E, EPS, Beta giúp đánh giá giá trị và rủi ro của cổ
          phiếu.
        </p>
      </div>
    </div>
  );
};

export default KeyStatistics;
