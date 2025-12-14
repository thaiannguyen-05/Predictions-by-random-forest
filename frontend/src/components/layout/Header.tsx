"use client";

import React from "react";
import UserDropdown from "../common/UserDropdown";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import RealTimeClock from "../common/RealTimeClock";
import AuthLink from "../common/AuthLink";

const Header: React.FC = () => {
	const { user: currentUser } = useAuth();

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
			<div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
				{/* Logo - Click sẽ về trang chủ */}
				<div className="flex items-center cursor-pointer">
					<Link href="/" className="flex flex-col group">
						<span className="text-2xl font-bold text-white tracking-wide group-hover:text-brand-orange transition-colors duration-300">
							STOCK<span className="text-brand-orange">DN</span>
						</span>
					</Link>
				</div>

				{/* Navigation Items - Yêu cầu đăng nhập */}
				<div className="hidden md:flex items-center space-x-8">
					<AuthLink href="/dashboard" className="text-gray-300 hover:text-brand-orange transition-colors text-sm font-medium" requireAuth={true}>Trang Chủ</AuthLink>
					<AuthLink href="/blog" className="text-gray-300 hover:text-brand-orange transition-colors text-sm font-medium" requireAuth={false}>Blog</AuthLink>
					<AuthLink href="/about" className="text-gray-300 hover:text-brand-orange transition-colors text-sm font-medium" requireAuth={false}>Giới Thiệu</AuthLink>
					<AuthLink href="/contact" className="text-gray-300 hover:text-brand-orange transition-colors text-sm font-medium" requireAuth={false}>Liên Hệ</AuthLink>
				</div>

				{/* Right Side: Clock + User/Login */}
				<div className="flex items-center gap-6">
					<div className="hidden lg:block text-gray-400 text-sm">
						<RealTimeClock />
					</div>

					<div className="relative">
						{currentUser ? (
							<UserDropdown user={currentUser} />
						) : (
							<Link
								href="/auth/login"
								className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-full shadow-lg shadow-brand-orange/20 transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
							>
								Đăng nhập
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
