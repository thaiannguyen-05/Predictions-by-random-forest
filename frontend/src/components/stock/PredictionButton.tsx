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
        flex items-center px-6 py-3 rounded-lg font-bold text-white
        transition-all duration-300 transform hover:scale-105
        ${isPredicting 
          ? 'bg-purple-600 cursor-not-allowed' 
          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        }
        shadow-lg hover:shadow-xl
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