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

		
		if (requireAuth && !loading && !user) {
			router.push("/auth/login");
			return;
		}

		
		router.push(href);
	};

	return (
		<a href={href} onClick={handleClick} className={className}>
			{children}
		</a>
	);
};

export default AuthLink;
