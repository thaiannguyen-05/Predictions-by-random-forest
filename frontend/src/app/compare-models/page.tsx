'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '../main-layout';
import { Zap, Loader2, Info } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

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

export default function CompareModelsPage(): React.ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingData, setIsWaitingData] = useState(false);
    const [windowRows, setWindowRows] = useState<WindowCompareData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const mapResultRows = (payload: any[]): ModelResult[] => {
        const mappedResults: ModelResult[] = payload.map((item: any) => {
            let name = item.name;
            if (name === 'random_forest') name = 'RandomForest';
            else if (name === 'hist_gradient_boosting') name = 'HistGradientBoosting';
            else if (name === 'decision_tree') name = 'DecisionTree';
            else if (name === 'bagging') name = 'Bagging';

            const predictionDate = item.predictionDate ? new Date(item.predictionDate) : new Date();

            const f1 = Number(item.f1);
            const r2 = Number(item.r2);

            return {
                name,
                predictionDate: predictionDate.toLocaleDateString('vi-VN'),
                accuracy: item.accuracy || 0,
                mae: item.mae || 0,
                rmse: item.rmse || 0,
                mape: item.mape || 0,
                f1: Number.isFinite(f1) ? f1 : null,
                r2: Number.isFinite(r2) ? r2 : null,
            };
        });

        mappedResults.sort((a, b) => b.accuracy - a.accuracy);
        return mappedResults;
    };

    const loadAggregatedCompare = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const windows: Array<10 | 20 | 30> = [10, 20, 30];
            const responses = await Promise.all(
                windows.map(async (days) => {
                    const res = await fetch(`${API_BASE}/stock/compare-summary?recent_days=${days}`);
                    if (!res.ok) {
                        throw new Error('Lỗi khi tải dữ liệu so sánh tổng hợp. Vui lòng thử lại sau.');
                    }
                    const json = await res.json();
                    return { days, json };
                }),
            );

            const loadingWindows = responses
                .filter((item) => item.json?.loading)
                .map((item) => item.days);

            if (loadingWindows.length > 0) {
                setIsWaitingData(true);
                await Promise.all(
                    loadingWindows.map((days) =>
                        fetch(`${API_BASE}/stock/compare-summary/trigger-refresh?recent_days=${days}`, {
                            method: 'POST',
                        }),
                    ),
                );
                setWindowRows([]);
                return;
            }

            setIsWaitingData(false);

            const rows: WindowCompareData[] = responses.map(({ days, json }) => {
                const resultsPayload = json?.results ?? json?.data?.results ?? json?.data?.models ?? [];
                const normalizedPayload = Array.isArray(resultsPayload) ? resultsPayload : [];

                return {
                    recentDays: days,
                    results: mapResultRows(normalizedPayload),
                };
            });

            setWindowRows(rows);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
            setWindowRows([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void loadAggregatedCompare();
    }, []);

    useEffect(() => {
        if (!isWaitingData) return;
        const timer = setInterval(() => {
            void loadAggregatedCompare();
        }, 15000);
        return () => clearInterval(timer);
    }, [isWaitingData]);

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

                {isLoading && (
                    <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 animate-fade-in text-gray-300 flex items-center gap-3">
                        <Loader2 className="animate-spin text-brand-orange" size={20} />
                        Đang tải dữ liệu tổng hợp...
                    </div>
                )}

                {isWaitingData && !isLoading && (
                    <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 animate-fade-in text-gray-300 flex items-center gap-3">
                        <Loader2 className="animate-spin text-brand-orange" size={20} />
                        Đang lấy dữ liệu từ hệ thống train định kỳ, vui lòng đợi...
                    </div>
                )}

                {error && (
                    <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 animate-fade-in">
                        <div className="text-red-400 text-sm flex items-center gap-2 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                            <Info size={16} />
                            {error}
                        </div>
                    </div>
                )}

                {/* Bảng so sánh */}
                {!isLoading && (
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
                                    {windowRows.flatMap((windowItem) => {
                                        if (windowItem.results.length === 0) {
                                            return [
                                                <tr key={`empty-${windowItem.recentDays}`} className="hover:bg-white/5 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-gray-200">{windowItem.recentDays} ngày</td>
                                                    <td className="px-6 py-4 text-gray-400" colSpan={8}>Chưa có dữ liệu hợp lệ, đang chờ cron cập nhật.</td>
                                                </tr>,
                                            ];
                                        }

                                        return windowItem.results.map((item, idx) => (
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
                                        ));
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
