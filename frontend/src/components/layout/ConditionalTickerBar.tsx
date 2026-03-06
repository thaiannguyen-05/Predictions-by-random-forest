"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TickerBar from "@/components/layout/TickerBar";

export default function ConditionalTickerBar() {
	const pathname = usePathname();
	const { user, loading } = useAuth();

	const isAuthPage = pathname?.startsWith("/auth");
	const hiddenTickerRoutes = ["/profile", "/settings"];
	const isHiddenRoute = hiddenTickerRoutes.some((route) =>
		pathname?.startsWith(route),
	);

	if (isAuthPage || isHiddenRoute || !user || loading) {
		return null;
	}

	return <TickerBar />;
}
