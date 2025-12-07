"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface AuthLinkProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	requireAuth?: boolean;
}

/**
 * Link component với xác thực - redirect đến trang login nếu chưa đăng nhập
 * @param href Đường dẫn đích
 * @param children Nội dung link
 * @param className CSS classes
 * @param requireAuth Yêu cầu đăng nhập (default: true)
 */
const AuthLink: React.FC<AuthLinkProps> = ({
	href,
	children,
	className = "",
	requireAuth = true,
}) => {
	const router = useRouter();
	const { user, loading } = useAuth();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
		e.preventDefault();

		// Nếu yêu cầu auth và chưa đăng nhập -> redirect to login
		if (requireAuth && !loading && !user) {
			router.push("/auth/login");
			return;
		}

		// Đã đăng nhập hoặc không yêu cầu auth -> navigate bình thường
		router.push(href);
	};

	return (
		<a href={href} onClick={handleClick} className={className}>
			{children}
		</a>
	);
};

export default AuthLink;
