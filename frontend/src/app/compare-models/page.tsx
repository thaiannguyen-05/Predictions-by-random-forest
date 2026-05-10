'use client';

import React from 'react';
import MainLayout from '../main-layout';
import { Zap } from 'lucide-react';

interface ModelResult {
    name: string;
    predictionDate: string;
    accuracy: number;
    mae: number;
    rmse: number;
    mape: number;
    f1: number | null;
    r2: number | null;
}

interface WindowCompareData {
    recentDays: 10 | 20 | 30;
    results: ModelResult[];
}

const FIXED_WINDOW_ROWS: WindowCompareData[] = [
    {
        recentDays: 10,
        results: [
            {
                name: 'RandomForest',
                predictionDate: '3/2/2026',
                accuracy: 0.5833,
                mae: 3420.2221,
                rmse: 3736.9424,
                mape: 0.056573,
                f1: null,
                r2: null,
            },
            {
                name: 'HistGradientBoosting',
                predictionDate: '3/2/2026',
                accuracy: 0.3333,
                mae: 2372.4426,
                rmse: 2596.2667,
                mape: 0.037244,
                f1: null,
                r2: null,
            },
            {
                name: 'DecisionTree',
                predictionDate: '3/2/2026',
                accuracy: 0.3333,
                mae: 2372.4426,
                rmse: 2596.2667,
                mape: 0.037244,
                f1: null,
                r2: null,
            },
            {
                name: 'Bagging',
                predictionDate: '3/2/2026',
                accuracy: 0.3333,
                mae: 2349.6571,
                rmse: 2582.8406,
                mape: 0.036921,
                f1: null,
                r2: null,
            },
        ],
    },
    {
        recentDays: 20,
        results: [
            {
                name: 'RandomForest',
                predictionDate: '3/2/2026',
                accuracy: 0.6296,
                mae: 3242.5513,
                rmse: 3555.2100,
                mape: 0.051724,
                f1: null,
                r2: null,
            },
            {
                name: 'HistGradientBoosting',
                predictionDate: '3/2/2026',
                accuracy: 0.3611,
                mae: 2231.4618,
                rmse: 2532.8546,
                mape: 0.037110,
                f1: null,
                r2: null,
            },
            {
                name: 'DecisionTree',
                predictionDate: '3/2/2026',
                accuracy: 0.3611,
                mae: 2231.4618,
                rmse: 2532.8546,
                mape: 0.037110,
                f1: null,
                r2: null,
            },
            {
                name: 'Bagging',
                predictionDate: '3/2/2026',
                accuracy: 0.3611,
                mae: 2239.5234,
                rmse: 2542.7775,
                mape: 0.037193,
                f1: null,
                r2: null,
            },
        ],
    },
    {
        recentDays: 30,
        results: [
            {
                name: 'RandomForest',
                predictionDate: '24/4/2026',
                accuracy: 0.7500,
                mae: 2664.9707,
                rmse: 2667.3431,
                mape: 0.044147,
                f1: 0,
                r2: -77.5297,
            },
            {
                name: 'HistGradientBoosting',
                predictionDate: '24/4/2026',
                accuracy: 0.2500,
                mae: 2521.4772,
                rmse: 2524.1407,
                mape: 0.042980,
                f1: 0,
                r2: -46.8058,
            },
            {
                name: 'DecisionTree',
                predictionDate: '24/4/2026',
                accuracy: 0.2500,
                mae: 2521.4772,
                rmse: 2524.1407,
                mape: 0.042980,
                f1: 0,
                r2: -46.8058,
            },
            {
                name: 'Bagging',
                predictionDate: '24/4/2026',
                accuracy: 0.2500,
                mae: 2527.6408,
                rmse: 2530.2857,
                mape: 0.043084,
                f1: 0,
                r2: -47.4558,
            },
        ],
    },
];

export default function CompareModelsPage(): React.ReactElement {
    return (
        <MainLayout>
            <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto">
                {/* Tiêu đề */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        <Zap className="text-brand-orange" size={36} />
                        So Sánh Các Mô Hình AI
                    </h1>
                    <p className="text-gray-400">
                        Kết quả tổng hợp từ toàn bộ 40 mã cổ phiếu đã được hệ thống tự động train và cập nhật định kỳ.
                    </p>
                </div>

                {/* Bảng so sánh */}
                <div className="bg-brand-dark/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
                    <div className="px-6 py-4 border-b border-white/10 bg-brand-card flex justify-between items-center">
                        <h3 className="font-bold text-brand-orange">Bảng dự báo theo từng mô hình (10/20/30 ngày)</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#1a1c23] border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-brand-orange">Mốc ngày</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange">Model</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange">Ngày dự đoán</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange text-center">Độ chính xác</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange text-right">MAE</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange text-right">RMSE</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange text-right">MAPE</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange text-right">F1</th>
                                    <th className="px-6 py-4 font-semibold text-brand-orange text-right">R²</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {FIXED_WINDOW_ROWS.flatMap((windowItem) =>
                                    windowItem.results.map((item, idx) => (
                                        <tr
                                            key={`${windowItem.recentDays}-${item.name}-${idx}`}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-200">{windowItem.recentDays} ngày</td>
                                            <td className="px-6 py-4 font-medium text-gray-200">{item.name}</td>
                                            <td className="px-6 py-4 text-gray-400">{item.predictionDate}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-bold text-white">
                                                    {(item.accuracy * 100).toFixed(2)}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-400">
                                                {item.mae.toFixed(4)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-400">
                                                {item.rmse.toFixed(4)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-400">
                                                {(item.mape * 100).toFixed(4)}%
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-400">
                                                {item.f1 === null ? '-' : item.f1.toFixed(4)}
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-400">
                                                {item.r2 === null ? '-' : item.r2.toFixed(4)}
                                            </td>
                                        </tr>
                                    )),
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
