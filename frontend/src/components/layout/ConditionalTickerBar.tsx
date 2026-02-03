"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import TickerBar from "@/components/layout/TickerBar";

export default function ConditionalTickerBar() {
	const pathname = usePathname();
	const { user, loading } = useAuth();

	
	const isAuthPage = pathname?.startsWith("/auth");

	
	if (isAuthPage || !user || loading) {
		return null;
	}

	return <TickerBar />;
}
