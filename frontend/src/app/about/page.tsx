"use client";

import React from "react";
import MainLayout from "@/app/main-layout";
import {
	PageHero,
	GradientText,
	Section,
	SectionHeader,
	Card,
	FeatureCard,
	Button,
	CTASection,
	ListWithIcons,
	BackgroundGlow,
} from "@/components/ui";
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
 * Core values data
 */
const coreValues = [
	{
		icon: <Brain size={24} />,
		title: "Công Nghệ Tiên Tiến",
		description:
			"Ứng dụng AI và Machine Learning với thuật toán Random Forest để dự đoán xu hướng thị trường",
		iconBgColor: "bg-brand-orange/20",
		iconColor: "text-brand-orange",
	},
	{
		icon: <Shield size={24} />,
		title: "Độ Tin Cậy Cao",
		description:
			"Độ chính xác lên đến 94.8% được kiểm chứng qua các bộ dữ liệu lịch sử thực tế",
		iconBgColor: "bg-green-400/20",
		iconColor: "text-green-400",
	},
	{
		icon: <Zap size={24} />,
		title: "Phân Tích Real-time",
		description:
			"Cập nhật dữ liệu liên tục từ sàn HOSE, HNX và UPCOM trong thời gian thực",
		iconBgColor: "bg-yellow-400/20",
		iconColor: "text-yellow-400",
	},
	{
		icon: <Users size={24} />,
		title: "Cộng Đồng Mạnh Mẽ",
		description:
			"Hơn 500+ nhà đầu tư tin dùng và đóng góp ý kiến để phát triển nền tảng",
		iconBgColor: "bg-blue-400/20",
		iconColor: "text-blue-400",
	},
];

/**
 * Technology features list
 */
const techFeatures = [
	"Phân tích hơn 50+ chỉ số kỹ thuật và cơ bản",
	"Huấn luyện trên dữ liệu lịch sử 10+ năm",
	"Cập nhật model hàng ngày với dữ liệu mới",
	"Cross-validation để đảm bảo tính ổn định",
];

/**
 * Stats data
 */
const stats = [
	{ label: "Độ chính xác", value: "94.8%", icon: <TrendingUp size={20} className="text-brand-orange" /> },
	{ label: "Mã cổ phiếu", value: "1,000+", icon: <BarChart3 size={20} className="text-brand-orange" /> },
	{ label: "Dữ liệu lịch sử", value: "10+ năm", icon: <Brain size={20} className="text-brand-orange" /> },
	{ label: "Cập nhật", value: "Real-time", icon: <Zap size={20} className="text-brand-orange" /> },
];

/**
 * Trang Giới Thiệu - About Page
 * Giới thiệu về StockDN, sứ mệnh, tầm nhìn và đội ngũ
 */
export default function AboutPage(): React.ReactElement {
	return (
		<MainLayout>
			{/* Hero Section */}
			<PageHero
				badge="VỀ CHÚNG TÔI"
				title={
					<>
						Định Hình <GradientText>Tương Lai Đầu Tư</GradientText>
					</>
				}
				subtitle="StockDN là nền tảng phân tích và dự đoán chứng khoán tiên tiến, ứng dụng công nghệ AI và Machine Learning để mang đến những insights có giá trị cho nhà đầu tư Việt Nam."
			/>

			{/* Mission & Vision Section */}
			<Section>
				<div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{/* Mission Card */}
					<Card
						variant="gradient"
						hover
						padding="lg"
						rounded="3xl"
						className="group"
					>
						<BackgroundGlow />
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
					</Card>

					{/* Vision Card */}
					<Card
						variant="gradient"
						hover
						padding="lg"
						rounded="3xl"
						className="group"
					>
						<BackgroundGlow />
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
					</Card>
				</div>
			</Section>

			{/* Core Values Section */}
			<Section>
				<SectionHeader
					title="Giá Trị Cốt Lõi"
					subtitle="Những nguyên tắc định hướng mọi hoạt động của chúng tôi"
				/>

				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
					{coreValues.map((value, index) => (
						<FeatureCard
							key={index}
							icon={value.icon}
							iconBgColor={value.iconBgColor}
							iconColor={value.iconColor}
							title={value.title}
							description={value.description}
						/>
					))}
				</div>
			</Section>

			{/* Technology Stack Section */}
			<Section>
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

							<ListWithIcons
								items={techFeatures}
								icon={<CheckCircle size={20} />}
							/>

							<Button
								as="link"
								href="/dashboard"
								icon={<ArrowRight size={18} />}
							>
								Khám Phá Ngay
							</Button>
						</div>

						{/* Visual - Stats Grid */}
						<Card variant="gradient" padding="lg" rounded="3xl" className="relative overflow-hidden">
							<BackgroundGlow variant="subtle" />

							<div className="relative z-10 space-y-6">
								{/* Stats Grid */}
								<div className="grid grid-cols-2 gap-4">
									{stats.map((stat, index) => (
										<Card
											key={index}
											variant="outline"
											padding="md"
											rounded="xl"
											className="bg-white/5"
										>
											{stat.icon}
											<p className="text-xl font-bold text-white mt-2">
												{stat.value}
											</p>
											<p className="text-gray-400 text-xs">{stat.label}</p>
										</Card>
									))}
								</div>

								{/* Accuracy Bar */}
								<Card variant="outline" padding="md" rounded="xl" className="bg-white/5">
									<div className="flex justify-between items-center mb-2">
										<span className="text-gray-400 text-sm">Model Accuracy</span>
										<span className="text-brand-orange font-semibold">94.8%</span>
									</div>
									<div className="h-2 bg-white/10 rounded-full overflow-hidden">
										<div
											className="h-full bg-gradient-to-r from-brand-orange to-yellow-500 rounded-full animate-[slideInRight_1s_ease-out]"
											style={{ width: "94.8%" }}
										/>
									</div>
								</Card>
							</div>
						</Card>
					</div>
				</div>
			</Section>

			{/* CTA Section */}
			<CTASection />
		</MainLayout>
	);
}
