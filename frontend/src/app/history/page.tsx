'use client';

import React, { useEffect, useState } from 'react';
import { Clock, TrendingUp, TrendingDown, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HistoryItem {
	id: string;
	symbol: string;
	currentPrice: string; // BigInt serialized as string
	previousClose: string;
	open: string;
	high: string;
	low: string;
	volume: string;
	marketCap: string;
	peRatio: number;
	eps: number;
	beta: number;
	yahooPrice: number;
	createdAt: string;
	updatedAt: string;
}

export default function HistoryPage() {
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
				const res = await fetch(`${apiUrl}/stock/history-search`);

				if (!res.ok) {
					throw new Error('Failed to fetch history');
				}

				const data = await res.json();
				if (data.history_search) {
					setHistory(data.history_search);
				}
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchHistory();
	}, []);

	const formatPrice = (price: string | number) => {
		return Number(price).toLocaleString('vi-VN') + '₫';
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('vi-VN', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		}).format(date);
	};

	const calculateChange = (current: string, previous: string) => {
		const curr = Number(current);
		const prev = Number(previous);
		const change = curr - prev;
		const percent = (change / prev) * 100;
		return { change, percent };
	};

	return (
		<div className="min-h-screen bg-brand-dark text-white p-6 md:p-12">
			<div className="max-w-6xl mx-auto">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
							<Clock className="text-brand-orange" size={32} />
							Lịch sử tìm kiếm
						</h1>
						<p className="text-gray-400">10 mã cổ phiếu được tra cứu gần đây nhất</p>
					</div>
					<Link
						href="/dashboard"
						className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 text-sm font-medium"
					>
						<Search size={16} className="mr-2" />
						Tra cứu mới
					</Link>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-20">
						<div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
					</div>
				) : error ? (
					<div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center text-red-500">
						<p>Có lỗi xảy ra: {error}</p>
					</div>
				) : history.length === 0 ? (
					<div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 text-center">
						<Search className="mx-auto h-12 w-12 text-gray-600 mb-4" />
						<h3 className="text-xl font-medium text-gray-300 mb-2">Chưa có lịch sử tìm kiếm</h3>
						<p className="text-gray-500 mb-6">Hãy bắt đầu tra cứu các mã cổ phiếu để xem lịch sử tại đây.</p>
						<Link
							href="/dashboard"
							className="inline-flex items-center px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40"
						>
							Tra cứu ngay
						</Link>
					</div>
				) : (
					<div className="grid gap-4">
						{history.map((item) => {
							const { change, percent } = calculateChange(item.currentPrice, item.previousClose);
							const isPositive = change >= 0;

							return (
								<div
									key={item.id}
									className="group bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-brand-orange/30 rounded-2xl p-5 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4"
								>
									<div className="flex items-center gap-4 w-full md:w-auto">
										<div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center font-bold text-lg text-brand-orange border border-gray-700 group-hover:border-brand-orange/50 transition-colors">
											{item.symbol}
										</div>
										<div>
											<div className="font-bold text-lg">{item.symbol}</div>
											<div className="text-xs text-gray-500 flex items-center gap-2">
												{formatDate(item.createdAt)}
											</div>
										</div>
									</div>

									<div className="flex items-center justify-between gap-8 w-full md:w-auto">
										<div className="text-right">
											<div className="text-sm text-gray-400 mb-1">Giá tra cứu</div>
											<div className="font-bold text-xl">{formatPrice(item.currentPrice)}</div>
										</div>

										<div className="text-right min-w-[100px]">
											<div className="text-sm text-gray-400 mb-1">Thay đổi</div>
											<div className={`font-bold flex items-center justify-end gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
												{isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
												{Math.abs(percent).toFixed(2)}%
											</div>
										</div>

										<div className="text-right hidden sm:block">
											<div className="text-sm text-gray-400 mb-1">Khối lượng</div>
											<div className="font-medium">{Number(item.volume).toLocaleString('vi-VN')}</div>
										</div>

										<Link
											href={`/stocks/${item.symbol}`}
											className="p-2 rounded-full bg-gray-800 hover:bg-brand-orange/20 text-gray-400 hover:text-brand-orange transition-colors"
										>
											<ArrowRight size={20} />
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
