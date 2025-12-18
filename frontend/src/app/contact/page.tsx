"use client";

import React, { useState } from "react";
import MainLayout from "@/app/main-layout";
import {
	PageHero,
	GradientText,
	Section,
	Card,
	CardHeader,
	Button,
	Input,
	Textarea,
	Select,
	InfoGrid,
} from "@/components/ui";
import {
	Mail,
	Phone,
	MapPin,
	Send,
	MessageSquare,
	Clock,
	CheckCircle,
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

/**
 * Contact info data
 */
const contactInfo = [
	{
		icon: <Mail size={24} />,
		title: "Email",
		content: "thaianthedev@gmail.com",
		subContent: "Phản hồi trong 24h",
	},
	{
		icon: <Phone size={24} />,
		title: "Hotline",
		content: "0337 700 159",
		subContent: "8:00 - 17:00 (T2 - T6)",
	},
	{
		icon: <MapPin size={24} />,
		title: "Địa Chỉ",
		content: "Hà Nội, Việt Nam",
		subContent: "Làm việc từ xa toàn cầu",
	},
	{
		icon: <Clock size={24} />,
		title: "Giờ Làm Việc",
		content: "T2 - T6: 8:00 - 17:00",
		subContent: "T7: 8:00 - 12:00",
	},
];

/**
 * Subject options for form
 */
const subjectOptions = [
	{ value: "", label: "Chọn chủ đề" },
	{ value: "Hỗ trợ kỹ thuật", label: "Hỗ trợ kỹ thuật" },
	{ value: "Tư vấn sản phẩm", label: "Tư vấn sản phẩm" },
	{ value: "Góp ý & Phản hồi", label: "Góp ý & Phản hồi" },
	{ value: "Hợp tác kinh doanh", label: "Hợp tác kinh doanh" },
	{ value: "Khác", label: "Khác" },
];

/**
 * FAQ items
 */
const faqItems = [
	"Làm sao để bắt đầu sử dụng StockDN?",
	"Thuật toán AI hoạt động như thế nào?",
	"Dữ liệu được cập nhật bao lâu một lần?",
	"Tôi có thể yêu cầu tính năng mới không?",
];

/**
 * Social links
 */
const socialLinks = [
	{
		icon: <Facebook size={22} />,
		href: "https://www.facebook.com/thaiannguyen05",
		hoverColor: "hover:text-blue-500",
	},
	{
		icon: <Instagram size={22} />,
		href: "https://www.instagram.com/thaiannguyen05/",
		hoverColor: "hover:text-pink-500",
	},
	{
		icon: <Linkedin size={22} />,
		href: "https://www.linkedin.com/in/th%C3%A1i-an-nguy%E1%BB%85n-5541a8329/",
		hoverColor: "hover:text-blue-600",
	},
];

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
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	): void => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setStatus("loading");

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/contact/sendContact`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify(formData),
				}
			);

			const result = await response.json();

			if (response.ok && result.success) {
				setStatus("success");
				setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	return (
		<MainLayout>
			{/* Hero Section */}
			<PageHero
				badge="LIÊN HỆ"
				title={
					<>
						Chúng Tôi Sẵn Sàng <GradientText>Hỗ Trợ Bạn</GradientText>
					</>
				}
				subtitle="Có câu hỏi hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn lòng lắng nghe và giải đáp mọi thắc mắc của bạn."
				minHeight="sm"
			/>

			{/* Contact Info Cards */}
			<Section padding="md">
				<InfoGrid items={contactInfo} columns={4} />
			</Section>

			{/* Contact Form Section */}
			<Section>
				<div className="max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-5 gap-12">
						{/* Form */}
						<div className="lg:col-span-3">
							<Card variant="gradient" padding="lg" rounded="3xl">
								<CardHeader
									icon={<MessageSquare size={24} />}
									title="Gửi Tin Nhắn"
									subtitle="Điền thông tin bên dưới, chúng tôi sẽ phản hồi sớm nhất"
								/>

								{status === "success" ? (
									<div className="text-center py-12">
										<div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-6">
											<CheckCircle size={40} />
										</div>
										<h3 className="text-xl font-bold text-white mb-2">
											Gửi Thành Công!
										</h3>
										<p className="text-gray-400 mb-6">
											Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
										</p>
										<Button onClick={() => setStatus("idle")}>
											Gửi Tin Nhắn Khác
										</Button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-6">
										<div className="grid sm:grid-cols-2 gap-6">
											<Input
												label="Họ và Tên"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required
												placeholder="Nguyễn Văn A"
											/>
											<Input
												label="Email"
												type="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												placeholder="email@example.com"
											/>
										</div>

										<div className="grid sm:grid-cols-2 gap-6">
											<Input
												label="Số Điện Thoại"
												type="tel"
												name="phone"
												value={formData.phone}
												onChange={handleInputChange}
												placeholder="0901234567"
											/>
											<Select
												label="Chủ Đề"
												name="subject"
												value={formData.subject}
												onChange={handleInputChange}
												required
												options={subjectOptions}
											/>
										</div>

										<Textarea
											label="Nội Dung"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={5}
											placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
										/>

										<Button
											type="submit"
											loading={status === "loading"}
											disabled={status === "loading"}
											icon={<Send size={20} />}
											iconPosition="left"
											size="lg"
										>
											{status === "loading" ? "Đang Gửi..." : "Gửi Tin Nhắn"}
										</Button>

										{status === "error" && (
											<p className="text-red-400 text-sm">
												Có lỗi xảy ra. Vui lòng thử lại sau.
											</p>
										)}
									</form>
								)}
							</Card>
						</div>

						{/* Sidebar Info */}
						<div className="lg:col-span-2 space-y-8">
							{/* FAQ Quick Links */}
							<Card padding="md">
								<h3 className="text-lg font-semibold text-white mb-4">
									Câu Hỏi Thường Gặp
								</h3>
								<ul className="space-y-3">
									{faqItems.map((faq, index) => (
										<li
											key={index}
											className="text-gray-400 text-sm hover:text-brand-orange cursor-pointer transition-colors duration-200"
										>
											• {faq}
										</li>
									))}
								</ul>
							</Card>

							{/* Social Links */}
							<Card padding="md">
								<h3 className="text-lg font-semibold text-white mb-4">
									Kết Nối Với Chúng Tôi
								</h3>
								<div className="flex gap-4">
									{socialLinks.map((social, index) => (
										<a
											key={index}
											href={social.href}
											target="_blank"
											rel="noopener noreferrer"
											className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 ${social.hoverColor} transition-all duration-300 hover:-translate-y-1`}
										>
											{social.icon}
										</a>
									))}
								</div>
							</Card>

							{/* Support Hours */}
							<Card
								variant="gradient"
								padding="md"
								className="border-brand-orange/20"
							>
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
									<span className="text-brand-orange font-semibold">24 giờ</span>{" "}
									làm việc. Với các vấn đề khẩn cấp, vui lòng liên hệ hotline.
								</p>
							</Card>
						</div>
					</div>
				</div>
			</Section>
		</MainLayout>
	);
}
