"use client";

import React, { useState } from "react";
import MainLayout from "@/app/main-layout";
import {
	Mail,
	Phone,
	MapPin,
	Send,
	MessageSquare,
	Clock,
	CheckCircle,
	Loader2,
	Facebook,
	Linkedin,
	Instagram,
} from "lucide-react";

interface ContactFormData {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactCardProps {
	icon: React.ElementType;
	title: string;
	content: string;
	subContent?: string;
	color: string;
}

/**
 * Component hiển thị thông tin liên hệ
 */
function ContactCard({
	icon: Icon,
	title,
	content,
	subContent,
	color,
}: ContactCardProps): React.ReactElement {
	return (
		<div className="group bg-brand-card/50 rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
			<div
				className={`w-12 h-12 rounded-xl bg-${color}/20 flex items-center justify-center text-${color} mb-4 group-hover:scale-110 transition-transform duration-300`}
			>
				<Icon size={24} />
			</div>
			<h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
			<p className="text-gray-300">{content}</p>
			{subContent && <p className="text-gray-400 text-sm mt-1">{subContent}</p>}
		</div>
	);
}

/**
 * Trang Liên Hệ - Contact Page
 * Form liên hệ và thông tin hỗ trợ
 */
export default function ContactPage(): React.ReactElement {
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});
	const [status, setStatus] = useState<FormStatus>("idle");

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		e.preventDefault();
		setStatus("loading");

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/contact`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);

			const result = await response.json();

			if (response.ok && result.success) {
				setStatus("success");
				setFormData({
					name: "",
					email: "",
					phone: "",
					subject: "",
					message: "",
				});
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	const contactInfo: ContactCardProps[] = [
		{
			icon: Mail,
			title: "Email",
			content: "thaianthedev@gmail.com",
			subContent: "Phản hồi trong 24h",
			color: "brand-orange",
		},
		{
			icon: Phone,
			title: "Hotline",
			content: "0337 700 159",
			subContent: "8:00 - 17:00 (T2 - T6)",
			color: "green-400",
		},
		{
			icon: MapPin,
			title: "Địa Chỉ",
			content: "Hà Nội, Việt Nam",
			subContent: "Làm việc từ xa toàn cầu",
			color: "blue-400",
		},
		{
			icon: Clock,
			title: "Giờ Làm Việc",
			content: "T2 - T6: 8:00 - 17:00",
			subContent: "T7: 8:00 - 12:00",
			color: "yellow-400",
		},
	];

	const subjectOptions = [
		"Hỗ trợ kỹ thuật",
		"Tư vấn sản phẩm",
		"Góp ý & Phản hồi",
		"Hợp tác kinh doanh",
		"Khác",
	];

	return (
		<MainLayout>
			{/* Hero Section */}
			<section className="relative min-h-[50vh] flex items-center bg-brand-dark overflow-hidden pt-24">
				{/* Background Glows */}
				<div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px]" />
				<div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />

				<div className="container mx-auto px-6 relative z-10">
					<div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
						<span className="inline-block px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 text-brand-orange text-sm font-semibold tracking-wider">
							LIÊN HỆ
						</span>

						<h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
							Chúng Tôi Sẵn Sàng{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500">
								Hỗ Trợ Bạn
							</span>
						</h1>

						<p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
							Có câu hỏi hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn lòng
							lắng nghe và giải đáp mọi thắc mắc của bạn.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Info Cards */}
			<section className="bg-brand-dark py-16 border-t border-white/5">
				<div className="container mx-auto px-6">
					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
						{contactInfo.map((info, index) => (
							<ContactCard key={index} {...info} />
						))}
					</div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="bg-brand-dark py-20 border-t border-white/5">
				<div className="container mx-auto px-6">
					<div className="max-w-6xl mx-auto">
						<div className="grid lg:grid-cols-5 gap-12">
							{/* Form */}
							<div className="lg:col-span-3">
								<div className="bg-gradient-to-br from-brand-card to-gray-900/50 rounded-3xl p-8 border border-white/10">
									<div className="flex items-center gap-3 mb-8">
										<div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange">
											<MessageSquare size={24} />
										</div>
										<div>
											<h2 className="text-2xl font-bold text-white">
												Gửi Tin Nhắn
											</h2>
											<p className="text-gray-400 text-sm">
												Điền thông tin bên dưới, chúng tôi sẽ phản hồi sớm nhất
											</p>
										</div>
									</div>

									{status === "success" ? (
										<div className="text-center py-12">
											<div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
												<CheckCircle size={40} />
											</div>
											<h3 className="text-xl font-bold text-white mb-2">
												Gửi Thành Công!
											</h3>
											<p className="text-gray-400 mb-6">
												Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng
												24 giờ.
											</p>
											<button
												onClick={() => setStatus("idle")}
												className="px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-xl transition-all duration-300"
											>
												Gửi Tin Nhắn Khác
											</button>
										</div>
									) : (
										<form onSubmit={handleSubmit} className="space-y-6">
											<div className="grid sm:grid-cols-2 gap-6">
												<div>
													<label
														htmlFor="contact-name"
														className="block text-gray-300 text-sm font-medium mb-2"
													>
														Họ và Tên <span className="text-red-400">*</span>
													</label>
													<input
														id="contact-name"
														type="text"
														name="name"
														value={formData.name}
														onChange={handleInputChange}
														required
														placeholder="Nguyễn Văn A"
														className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all duration-300"
													/>
												</div>
												<div>
													<label
														htmlFor="contact-email"
														className="block text-gray-300 text-sm font-medium mb-2"
													>
														Email <span className="text-red-400">*</span>
													</label>
													<input
														id="contact-email"
														type="email"
														name="email"
														value={formData.email}
														onChange={handleInputChange}
														required
														placeholder="email@example.com"
														className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all duration-300"
													/>
												</div>
											</div>

											<div className="grid sm:grid-cols-2 gap-6">
												<div>
													<label
														htmlFor="contact-phone"
														className="block text-gray-300 text-sm font-medium mb-2"
													>
														Số Điện Thoại
													</label>
													<input
														id="contact-phone"
														type="tel"
														name="phone"
														value={formData.phone}
														onChange={handleInputChange}
														placeholder="0901234567"
														className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all duration-300"
													/>
												</div>
												<div>
													<label
														htmlFor="contact-subject"
														className="block text-gray-300 text-sm font-medium mb-2"
													>
														Chủ Đề <span className="text-red-400">*</span>
													</label>
													<select
														id="contact-subject"
														name="subject"
														value={formData.subject}
														onChange={handleInputChange}
														required
														className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all duration-300 appearance-none"
													>
														<option value="" className="bg-brand-dark">
															Chọn chủ đề
														</option>
														{subjectOptions.map((option) => (
															<option
																key={option}
																value={option}
																className="bg-brand-dark"
															>
																{option}
															</option>
														))}
													</select>
												</div>
											</div>

											<div>
												<label
													htmlFor="contact-message"
													className="block text-gray-300 text-sm font-medium mb-2"
												>
													Nội Dung <span className="text-red-400">*</span>
												</label>
												<textarea
													id="contact-message"
													name="message"
													value={formData.message}
													onChange={handleInputChange}
													required
													rows={5}
													placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
													className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all duration-300 resize-none"
												/>
											</div>

											<button
												type="submit"
												disabled={status === "loading"}
												className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold rounded-xl shadow-lg shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
											>
												{status === "loading" ? (
													<>
														<Loader2 size={20} className="animate-spin" />
														Đang Gửi...
													</>
												) : (
													<>
														<Send size={20} />
														Gửi Tin Nhắn
													</>
												)}
											</button>

											{status === "error" && (
												<p className="text-red-400 text-sm">
													Có lỗi xảy ra. Vui lòng thử lại sau.
												</p>
											)}
										</form>
									)}
								</div>
							</div>

							{/* Sidebar Info */}
							<div className="lg:col-span-2 space-y-8">
								{/* FAQ Quick Links */}
								<div className="bg-brand-card/50 rounded-2xl p-6 border border-white/5">
									<h3 className="text-lg font-semibold text-white mb-4">
										Câu Hỏi Thường Gặp
									</h3>
									<ul className="space-y-3">
										{[
											"Làm sao để bắt đầu sử dụng StockDN?",
											"Thuật toán AI hoạt động như thế nào?",
											"Dữ liệu được cập nhật bao lâu một lần?",
											"Tôi có thể yêu cầu tính năng mới không?",
										].map((faq, index) => (
											<li
												key={index}
												className="text-gray-400 text-sm hover:text-brand-orange cursor-pointer transition-colors duration-200"
											>
												• {faq}
											</li>
										))}
									</ul>
								</div>

								{/* Social Links */}
								<div className="bg-brand-card/50 rounded-2xl p-6 border border-white/5">
									<h3 className="text-lg font-semibold text-white mb-4">
										Kết Nối Với Chúng Tôi
									</h3>
									<div className="flex gap-4">
										{[
											{
												icon: Facebook,
												href: "https://www.facebook.com/thaiannguyen05",
												color: "hover:text-blue-500",
											},
											{
												icon: Instagram,
												href: "https://www.instagram.com/thaiannguyen05/",
												color: "hover:text-pink-500",
											},
											{
												icon: Linkedin,
												href: "https://www.linkedin.com/in/th%C3%A1i-an-nguy%E1%BB%85n-5541a8329/",
												color: "hover:text-blue-600",
											},
										].map((social, index) => (
											<a
												key={index}
												href={social.href}
												target="_blank"
												rel="noopener noreferrer"
												className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:-translate-y-1`}
											>
												<social.icon size={22} />
											</a>
										))}
									</div>
								</div>

								{/* Support Hours */}
								<div className="bg-gradient-to-br from-brand-orange/10 to-brand-card rounded-2xl p-6 border border-brand-orange/20">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 rounded-lg bg-brand-orange/20 flex items-center justify-center text-brand-orange">
											<Clock size={20} />
										</div>
										<h3 className="text-lg font-semibold text-white">
											Hỗ Trợ Nhanh
										</h3>
									</div>
									<p className="text-gray-400 text-sm leading-relaxed">
										Đội ngũ hỗ trợ của chúng tôi cam kết phản hồi trong vòng{" "}
										<span className="text-brand-orange font-semibold">
											24 giờ
										</span>{" "}
										làm việc. Với các vấn đề khẩn cấp, vui lòng liên hệ hotline.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
