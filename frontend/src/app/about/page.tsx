"use client";

import React from "react";
import MainLayout from "@/app/main-layout";
import Link from "next/link";
import {
	Target,
	Zap,
	Users,
	TrendingUp,
	Brain,
	Shield,
	ArrowRight,
	CheckCircle,
	BarChart3,
	Lightbulb,
} from "lucide-react";

/**
 * Trang Giới Thiệu - About Page
 * Giới thiệu về StockDN, sứ mệnh, tầm nhìn và đội ngũ
 */
export default function AboutPage(): React.ReactElement {
	return (
		<MainLayout>
			{/* Hero Section */}
			<section className="relative min-h-[60vh] flex items-center bg-brand-dark overflow-hidden pt-24">
				{/* Background Glows */}
				<div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px]" />
				<div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />

				<div className="container mx-auto px-6 relative z-10">
					<div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
						<span className="inline-block px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-semibold tracking-wider">
							VỀ CHÚNG TÔI
						</span>

						<h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
							Định Hình{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
								Tương Lai Đầu Tư
							</span>
						</h1>

						<p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
							StockDN là nền tảng phân tích và dự đoán chứng khoán tiên tiến,
							ứng dụng công nghệ AI và Machine Learning để mang đến những
							insights có giá trị cho nhà đầu tư Việt Nam.
						</p>
					</div>
				</div>
			</section>

			{/* Mission & Vision Section */}
			<section className="bg-brand-dark py-20 border-t border-white/5">
				<div className="container mx-auto px-6">
					<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
						{/* Mission Card */}
						<div className="group relative bg-gradient-to-br from-brand-card to-gray-900/50 rounded-3xl p-8 border border-white/10 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<div className="relative z-10">
								<div className="w-16 h-16 rounded-2xl bg-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:scale-110 transition-transform duration-300">
									<Target size={32} />
								</div>
								<h2 className="text-2xl font-bold text-white mb-4">Sứ Mệnh</h2>
								<p className="text-gray-400 leading-relaxed">
									Chúng tôi cam kết dân chủ hóa quyền truy cập vào các công cụ
									phân tích tài chính chuyên nghiệp. Bằng cách kết hợp công nghệ
									AI tiên tiến với dữ liệu thị trường real-time, StockDN giúp
									mọi nhà đầu tư - từ người mới bắt đầu đến chuyên gia - đều có
									thể đưa ra quyết định đầu tư thông minh và tự tin.
								</p>
							</div>
						</div>

						{/* Vision Card */}
						<div className="group relative bg-gradient-to-br from-brand-card to-gray-900/50 rounded-3xl p-8 border border-white/10 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
							<div className="relative z-10">
								<div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
									<Lightbulb size={32} />
								</div>
								<h2 className="text-2xl font-bold text-white mb-4">Tầm Nhìn</h2>
								<p className="text-gray-400 leading-relaxed">
									Trở thành nền tảng phân tích chứng khoán hàng đầu Việt Nam,
									nơi mà công nghệ AI và trí tuệ nhân tạo được ứng dụng một cách
									hiệu quả nhất để hỗ trợ cộng đồng nhà đầu tư. Chúng tôi hướng
									tới việc tạo ra một hệ sinh thái đầu tư thông minh và bền
									vững.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Core Values Section */}
			<section className="bg-brand-dark py-20 border-t border-white/5">
				<div className="container mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
							Giá Trị Cốt Lõi
						</h2>
						<p className="text-gray-400 max-w-xl mx-auto">
							Những nguyên tắc định hướng mọi hoạt động của chúng tôi
						</p>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						{[
							{
								icon: Brain,
								title: "Công Nghệ Tiên Tiến",
								description:
									"Ứng dụng AI và Machine Learning với thuật toán Random Forest để dự đoán xu hướng thị trường",
								color: "brand-orange",
							},
							{
								icon: Shield,
								title: "Độ Tin Cậy Cao",
								description:
									"Độ chính xác lên đến 94.8% được kiểm chứng qua các bộ dữ liệu lịch sử thực tế",
								color: "green-400",
							},
							{
								icon: Zap,
								title: "Phân Tích Real-time",
								description:
									"Cập nhật dữ liệu liên tục từ sàn HOSE, HNX và UPCOM trong thời gian thực",
								color: "yellow-400",
							},
							{
								icon: Users,
								title: "Cộng Đồng Mạnh Mẽ",
								description:
									"Hơn 500+ nhà đầu tư tin dùng và đóng góp ý kiến để phát triển nền tảng",
								color: "blue-400",
							},
						].map((value, index) => (
							<div
								key={index}
								className="group bg-brand-card/50 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
							>
								<div
									className={`w-12 h-12 rounded-xl bg-${value.color}/20 flex items-center justify-center text-${value.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
								>
									<value.icon size={24} />
								</div>
								<h3 className="text-lg font-semibold text-white mb-2">
									{value.title}
								</h3>
								<p className="text-gray-400 text-sm leading-relaxed">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Technology Stack Section */}
			<section className="bg-brand-dark py-20 border-t border-white/5">
				<div className="container mx-auto px-6">
					<div className="max-w-6xl mx-auto">
						<div className="grid lg:grid-cols-2 gap-12 items-center">
							{/* Content */}
							<div className="space-y-8">
								<div>
									<span className="inline-block px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-semibold tracking-wider mb-4">
										CÔNG NGHỆ
									</span>
									<h2 className="text-3xl font-bold text-white mb-4">
										Thuật Toán Random Forest
									</h2>
									<p className="text-gray-400 leading-relaxed">
										StockDN sử dụng thuật toán Random Forest - một trong những
										phương pháp Machine Learning mạnh mẽ nhất cho việc dự đoán
										và phân loại. Thuật toán này kết hợp hàng trăm cây quyết
										định để đưa ra dự báo chính xác và ổn định.
									</p>
								</div>

								<ul className="space-y-4">
									{[
										"Phân tích hơn 50+ chỉ số kỹ thuật và cơ bản",
										"Huấn luyện trên dữ liệu lịch sử 10+ năm",
										"Cập nhật model hàng ngày với dữ liệu mới",
										"Cross-validation để đảm bảo tính ổn định",
									].map((item, index) => (
										<li
											key={index}
											className="flex items-center gap-3 text-gray-300"
										>
											<CheckCircle
												size={20}
												className="text-brand-orange flex-shrink-0"
											/>
											<span>{item}</span>
										</li>
									))}
								</ul>

								<Link
									href="/dashboard"
									className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5"
								>
									Khám Phá Ngay <ArrowRight size={18} />
								</Link>
							</div>

							{/* Visual */}
							<div className="relative">
								<div className="relative bg-gradient-to-br from-brand-card to-gray-900 rounded-3xl border border-white/10 p-8 overflow-hidden">
									{/* Decorative Elements */}
									<div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl" />
									<div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />

									<div className="relative z-10 space-y-6">
										{/* Stats Grid */}
										<div className="grid grid-cols-2 gap-4">
											{[
												{
													label: "Độ chính xác",
													value: "94.8%",
													icon: TrendingUp,
												},
												{
													label: "Mã cổ phiếu",
													value: "1,000+",
													icon: BarChart3,
												},
												{
													label: "Dữ liệu lịch sử",
													value: "10+ năm",
													icon: Brain,
												},
												{
													label: "Cập nhật",
													value: "Real-time",
													icon: Zap,
												},
											].map((stat, index) => (
												<div
													key={index}
													className="bg-white/5 rounded-xl p-4 border border-white/5"
												>
													<stat.icon
														size={20}
														className="text-brand-orange mb-2"
													/>
													<p className="text-xl font-bold text-white">
														{stat.value}
													</p>
													<p className="text-gray-400 text-xs">{stat.label}</p>
												</div>
											))}
										</div>

										{/* Model Accuracy Bar */}
										<div className="bg-white/5 rounded-xl p-4 border border-white/5">
											<div className="flex justify-between items-center mb-2">
												<span className="text-gray-400 text-sm">
													Model Accuracy
												</span>
												<span className="text-brand-orange font-semibold">
													94.8%
												</span>
											</div>
											<div className="h-2 bg-white/10 rounded-full overflow-hidden">
												<div
													className="h-full bg-gradient-to-r from-brand-orange to-yellow-500 rounded-full animate-[slideInRight_1s_ease-out]"
													style={{ width: "94.8%" }}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-brand-dark py-20 border-t border-white/5">
				<div className="container mx-auto px-6">
					<div className="max-w-4xl mx-auto text-center">
						<div className="bg-gradient-to-br from-brand-orange/10 to-brand-card rounded-3xl p-12 border border-white/10">
							<h2 className="text-3xl font-bold text-white mb-4">
								Sẵn Sàng Bắt Đầu?
							</h2>
							<p className="text-gray-400 mb-8 max-w-xl mx-auto">
								Tham gia cùng hàng trăm nhà đầu tư đã tin tưởng sử dụng StockDN
								để đón đầu xu hướng thị trường.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link
									href="/auth/register"
									className="px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-1"
								>
									Đăng Ký Miễn Phí
								</Link>
								<Link
									href="/contact"
									className="px-8 py-4 bg-brand-card hover:bg-brand-card/80 text-white border border-white/10 font-bold rounded-xl transition-all duration-300 hover:-translate-y-1"
								>
									Liên Hệ Tư Vấn
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
