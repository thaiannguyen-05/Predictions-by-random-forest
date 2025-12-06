"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, ShieldCheck, BarChart3 } from "lucide-react";
import MainLayout from "@/app/main-layout";
import SearchBar from "@/components/common/SearchBar";

export default function Home() {
	return (
		<MainLayout>
			{/* Hero Section */}
			<section className="relative min-h-[90vh] flex items-center bg-brand-dark overflow-hidden pt-20">
				{/* Background Glows */}
				<div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px]" />
				<div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />

				<div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
					{/* Left Content */}
					<div className="space-y-8 animate-fade-in pl-4">
						<span className="inline-block px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-semibold tracking-wider">
							PHIÊN BẢN AI 2025
						</span>

						<h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1]">
							Tự Tin <br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
								Đón Đầu Xu Hướng
							</span>
						</h1>

						<p className="text-gray-400 text-lg leading-relaxed max-w-xl">
							Khám phá sức mạnh của AI trong việc dự đoán thị trường chứng khoán.
							Kết hợp giữa dữ liệu lớn và thuật toán Random Forest để mang lại
							lợi thế đầu tư vượt trội cho bạn.
						</p>

						<div className="flex flex-wrap gap-4">
							<Link
								href="/stocks/FPT"
								className="px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl shadow-lg shadow-brand-orange/25 transition-all transform hover:-translate-y-1 flex items-center gap-2"
							>
								Xem Dự Báo Ngay <ArrowRight size={20} />
							</Link>
							<Link
								href="/about"
								className="px-8 py-4 bg-brand-card hover:bg-brand-card/80 text-white border border-white/10 font-bold rounded-xl transition-all transform hover:-translate-y-1"
							>
								Tìm Hiểu Thêm
							</Link>
						</div>

						<div className="flex items-center gap-4 pt-4">
							<div className="flex -space-x-3">
								{[1, 2, 3, 4].map((i) => (
									<div
										key={i}
										className="w-10 h-10 rounded-full bg-gray-700 border-2 border-brand-dark flex items-center justify-center text-xs overflow-hidden"
									>
										<img
											src={`https://ui-avatars.com/api/?name=U+${i}&background=random&color=fff`}
											alt="User"
										/>
									</div>
								))}
							</div>
							<p className="text-sm text-gray-400">
								<span className="text-brand-orange font-bold">500+</span> Nhà đầu tư tin dùng
							</p>
						</div>
					</div>

					{/* Right Image / Visualization */}
					<div className="relative animate-float lg:h-[600px] flex items-center justify-center">
						<div className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-brand-card to-gray-900 rounded-[3rem] border border-white/5 p-8 shadow-2xl flex flex-col justify-between overflow-hidden group">
							{/* Decorative Chart Elements */}
							<div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>

							<div className="flex justify-between items-start mb-8 z-10">
								<div>
									<h3 className="text-2xl font-bold text-white">VN-INDEX</h3>
									<p className="text-brand-orange flex items-center gap-2 font-medium">
										<TrendingUp size={18} /> +12.5% (Dự báo)
									</p>
								</div>
								<div className="bg-brand-orange/20 p-3 rounded-full text-brand-orange">
									<BarChart3 size={24} />
								</div>
							</div>

							{/* Fake Chart Visualization */}
							<div className="flex-1 flex items-end gap-2 z-10">
								{[40, 65, 50, 80, 55, 90, 70, 95].map((h, i) => (
									<div
										key={i}
										className="flex-1 bg-brand-orange rounded-t-lg opacity-80 hover:opacity-100 transition-all duration-300"
										style={{ height: `${h}%`, opacity: 0.3 + (i / 10) }}
									></div>
								))}
							</div>

							{/* Floating Card */}
							<div className="absolute top-1/2 -right-6 bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl animate-pulse z-20">
								<div className="flex items-center gap-3">
									<div className="bg-green-500/20 p-2 rounded-lg text-green-400"><ShieldCheck size={20} /></div>
									<div>
										<p className="text-xs text-gray-400">Độ chính xác</p>
										<p className="text-white font-bold">94.8%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Quick Search Section */}
			<section className="bg-brand-dark py-12 border-t border-white/5">
				<div className="container mx-auto px-6 max-w-4xl">
					<h2 className="text-center text-gray-400 mb-6 font-medium">Tìm kiếm mã cổ phiếu để xem dự báo AI</h2>
					<SearchBar />
				</div>
			</section>
		</MainLayout>
	);
}
