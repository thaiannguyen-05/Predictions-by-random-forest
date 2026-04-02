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
}

export default function CompareModelsPage(): React.ReactElement {
    const [isLoading, setIsLoading] = useState(false);
    const [isWaitingData, setIsWaitingData] = useState(false);
    const [refreshRequested, setRefreshRequested] = useState(false);
    const [results, setResults] = useState<ModelResult[] | null>(null);
    const [rfQualified, setRfQualified] = useState(false);
    const [rfMeasuredAccuracy, setRfMeasuredAccuracy] = useState(0);
    const [rfTargetThreshold, setRfTargetThreshold] = useState(0.7);
    const [rfQualificationReason, setRfQualificationReason] = useState('');
    const [error, setError] = useState<string | null>(null);

    const loadAggregatedCompare = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            const compareRes = await fetch(`${API_BASE}/stock/compare-summary`);

            if (!compareRes.ok) {
                throw new Error('Lỗi khi tải dữ liệu so sánh tổng hợp. Vui lòng thử lại sau.');
            }

            const compareData = await compareRes.json();
            if (compareData?.loading) {
                setIsWaitingData(true);
                if (!refreshRequested) {
                    void fetch(`${API_BASE}/stock/compare-summary/trigger-refresh`, {
                        method: 'POST',
                    });
                    setRefreshRequested(true);
                }
                setResults(null);
                return;
            }

            setIsWaitingData(false);
            setRfQualified(Boolean(compareData?.data?.rf_qualified ?? compareData?.rf_qualified));
            setRfMeasuredAccuracy(Number(compareData?.data?.rf_measured_accuracy ?? compareData?.rf_measured_accuracy ?? 0));
            setRfTargetThreshold(Number(compareData?.data?.rf_target_threshold ?? compareData?.rf_target_threshold ?? 0.7));
            setRfQualificationReason(String(compareData?.data?.rf_qualification_reason ?? compareData?.rf_qualification_reason ?? ''));

            const resultsPayload =
                compareData.results ??
                compareData?.data?.results ??
                compareData?.data?.models;

            if (!resultsPayload || !Array.isArray(resultsPayload)) {
                throw new Error('Định dạng dữ liệu trả về không hợp lệ hoặc model chưa sẵn sàng.');
            }

            const mappedResults: ModelResult[] = resultsPayload.map((item: any) => {
                let name = item.name;
                if (name === 'random_forest') name = 'RandomForest';
                else if (name === 'hist_gradient_boosting') name = 'HistGradientBoosting';
                else if (name === 'decision_tree') name = 'DecisionTree';
                else if (name === 'bagging') name = 'Bagging';

                const predictionDate = item.predictionDate ? new Date(item.predictionDate) : new Date();

                return {
                    name: name,
                    predictionDate: predictionDate.toLocaleDateString('vi-VN'),
                    accuracy: item.accuracy || 0,
                    mae: item.mae || 0,
                    rmse: item.rmse || 0,
                    mape: item.mape || 0,
                };
            });

            // Sắp xếp trung thực theo accuracy thực tế
            mappedResults.sort((a, b) => b.accuracy - a.accuracy);

            setResults(mappedResults);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Đã có lỗi xảy ra');
            setResults(null);
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
                {results && !isLoading && (
                    <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-6 animate-fade-in text-sm text-gray-300">
                        {rfQualified ? (
                            <div>
                                RandomForest đạt điều kiện nổi trội: {(rfMeasuredAccuracy * 100).toFixed(2)}%
                                (mục tiêu {(rfTargetThreshold * 100).toFixed(0)}%).
                            </div>
                        ) : (
                            <div>
                                RandomForest chưa đạt điều kiện nổi trội: {(rfMeasuredAccuracy * 100).toFixed(2)}%
                                (mục tiêu {(rfTargetThreshold * 100).toFixed(0)}%).
                                {rfQualificationReason ? ` Lý do: ${rfQualificationReason}.` : ''}
                            </div>
                        )}
                    </div>
                )}

                {/* Bảng so sánh */}
                {results && !isLoading && (
                    <div className="bg-brand-dark/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
                        <div className="px-6 py-4 border-b border-white/10 bg-brand-card flex justify-between items-center">
                            <h3 className="font-bold text-brand-orange">Bảng dự báo theo từng mô hình</h3>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-[#1a1c23] border-b border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-brand-orange">Model</th>
                                        <th className="px-6 py-4 font-semibold text-brand-orange">Ngày dự đoán</th>
                                        <th className="px-6 py-4 font-semibold text-brand-orange text-center">Độ chính xác</th>
                                        <th className="px-6 py-4 font-semibold text-brand-orange text-right">MAE</th>
                                        <th className="px-6 py-4 font-semibold text-brand-orange text-right">RMSE</th>
                                        <th className="px-6 py-4 font-semibold text-brand-orange text-right">MAPE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {results.map((item) => (
                                        <tr
                                            key={item.name}
                                            className={`hover:bg-white/5 transition-colors ${item.name === 'RandomForest' && rfQualified ? 'bg-white/[0.02]' : ''}`}
                                        >
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
