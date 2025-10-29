// components/stock/PredictionButton.tsx
"use client";

import React from "react";

interface PredictionButtonProps {
  onPredict: () => void;
  isPredicting: boolean;
  symbol: string;
}

const PredictionButton: React.FC<PredictionButtonProps> = ({
  onPredict,
  isPredicting,
  symbol,
}) => {
  return (
    <button
      onClick={onPredict}
      disabled={isPredicting}
      className={`
        px-6 py-3 rounded-lg font-bold text-white transition-all duration-300
        ${
          isPredicting
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        }
        shadow-lg hover:shadow-xl transform hover:scale-105
      `}
    >
      {isPredicting ? (
        <div className="flex items-center">
          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
          Đang dự đoán...
        </div>
      ) : (
        <div className="flex items-center">
          <span className="mr-2">🤖</span>
          Dự đoán giá {symbol}
        </div>
      )}
    </button>
  );
};

export default PredictionButton;
