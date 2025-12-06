"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TickerBar from "@/components/layout/TickerBar";

export default function ConditionalTickerBar() {
	const pathname = usePathname();
	const { user, loading } = useAuth();

	// Không hiển thị TickerBar ở các trang auth
	const isAuthPage = pathname?.startsWith("/auth");

	// Chỉ hiển thị khi user đã đăng nhập thành công
	if (isAuthPage || !user || loading) {
		return null;
	}

	return <TickerBar />;
}
