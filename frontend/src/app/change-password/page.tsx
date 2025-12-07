"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import { apiFetch } from "@/utils/api";

export default function ChangePasswordPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		password: "",
		newPassword: "",
		confirmNewPassword: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		if (error) setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		if (formData.newPassword !== formData.confirmNewPassword) {
			setError("Mật khẩu mới không khớp.");
			setIsLoading(false);
			return;
		}

		if (formData.newPassword.length < 8) {
			setError("Mật khẩu mới phải có ít nhất 8 ký tự.");
			setIsLoading(false);
			return;
		}

		try {
			const res = await apiFetch("/auth/change-password", {
				method: "PATCH",
				body: JSON.stringify({
					password: formData.password,
					newPassword: formData.newPassword,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Đổi mật khẩu thất bại");
			}

			setSuccess(true);
			setFormData({
				password: "",
				newPassword: "",
				confirmNewPassword: "",
			});

		} catch (err: any) {
			console.error("Change password error:", err);
			setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
			<div className="w-full max-w-md mx-auto">

				{/* Back Link */}
				<div className="mb-6">
					<Link href="/dashboard" className="flex items-center text-gray-400 hover:text-brand-orange transition-colors">
						<ArrowLeft size={18} className="mr-2" /> Quay lại Dashboard
					</Link>
				</div>

				{/* Header Logo Area */}
				<div className="text-center mb-8">
					<Link href="/" className="inline-block group">
						<span className="text-4xl font-extrabold text-white tracking-widest transition-transform duration-300 group-hover:scale-105 block">
							STOCK<span className="text-brand-orange">DN</span>
						</span>
					</Link>
					<h1 className="text-2xl font-bold mt-4 flex items-center justify-center gap-2">
						<ShieldCheck className="text-brand-orange" />
						Đổi Mật Khẩu
					</h1>
					<p className="text-gray-400 mt-2 text-sm">
						Bảo vệ tài khoản của bạn với mật khẩu mạnh
					</p>
				</div>

				{/* Main Card */}
				<div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
					{/* Glow effect inside card */}
					<div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

					{success && (
						<div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-xl text-center animate-fade-in">
							<p className="font-bold flex items-center justify-center gap-2">
								<ShieldCheck size={20} /> Đổi mật khẩu thành công!
							</p>
							<p className="text-sm mt-1">Mật khẩu của bạn đã được cập nhật.</p>
							<Link href="/dashboard" className="inline-block mt-3 text-sm underline hover:text-green-400">
								Trở về trang chủ
							</Link>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6 relative z-10">

						{error && (
							<div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center font-medium animate-fade-in">
								{error}
							</div>
						)}

						{/* Current Password */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Mật khẩu hiện tại</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock size={18} className="text-gray-500 group-focus-within:text-brand-orange transition-colors" />
								</div>
								<input
									type="password"
									name="password"
									required
									className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
									placeholder="••••••••"
									value={formData.password}
									onChange={handleChange}
								/>
							</div>
						</div>

						{/* New Password */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Mật khẩu mới</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock size={18} className="text-gray-500 group-focus-within:text-brand-orange transition-colors" />
								</div>
								<input
									type="password"
									name="newPassword"
									required
									className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
									placeholder="••••••••"
									value={formData.newPassword}
									onChange={handleChange}
								/>
							</div>
						</div>

						{/* Confirm New Password */}
						<div className="space-y-2">
							<label className="text-sm font-medium text-gray-300 ml-1">Xác nhận mật khẩu mới</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock size={18} className="text-gray-500 group-focus-within:text-brand-orange transition-colors" />
								</div>
								<input
									type="password"
									name="confirmNewPassword"
									required
									className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
									placeholder="••••••••"
									value={formData.confirmNewPassword}
									onChange={handleChange}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isLoading || success}
							className="w-full bg-gradient-to-r from-brand-orange to-red-500 hover:from-orange-500 hover:to-red-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
						>
							{isLoading ? (
								<Loader2 size={20} className="animate-spin" />
							) : (
								<>
									Lưu thay đổi <ArrowRight size={20} />
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
