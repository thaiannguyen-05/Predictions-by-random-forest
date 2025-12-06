// components/stock/PredictionButton.tsx
"use client";

import React from 'react';
import { Brain, Loader } from 'lucide-react';
import { TRAINED_STOCKS } from '../../../constants/trainedStocks';

interface PredictionButtonProps {
  onPredict: () => void;
  isPredicting: boolean;
  symbol: string;
}

const PredictionButton: React.FC<PredictionButtonProps> = ({
  onPredict,
  isPredicting,
  symbol
}) => {
  const isTrainedStock = TRAINED_STOCKS.includes(symbol);

  if (!isTrainedStock) {
    return (
      <button
        disabled
        className="flex items-center px-6 py-3 rounded-lg font-bold text-gray-400 bg-gray-600 cursor-not-allowed"
        title="Cổ phiếu này chưa được train model"
      >
        <Brain size={20} className="mr-2" />
        Chưa hỗ trợ dự đoán
      </button>
    );
  }

  return (
    <button
      onClick={onPredict}
      disabled={isPredicting}
      className={`
        relative overflow-hidden group w-full sm:w-auto px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-300
        ${isPredicting
          ? "bg-gray-700 cursor-not-allowed"
          : "bg-gradient-to-r from-brand-orange to-red-500 hover:from-orange-500 hover:to-red-400 transform hover:-translate-y-1 hover:shadow-brand-orange/50"
        }
      `}
    >
      {isPredicting ? (
        <>
          <Loader size={20} className="mr-2 animate-spin" />
          Đang dự đoán...
        </>
      ) : (
        <>
          <Brain size={20} className="mr-2" />
          Dự đoán giá {symbol} ngày mai
        </>
      )}
    </button>
  );
};

export default PredictionButton;