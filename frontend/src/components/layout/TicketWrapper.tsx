"use client";

import { usePathname } from "next/navigation";
import TickerBar from "@/components/layout/TickerBar";
export default function TickerWrapper() {
  const pathname = usePathname();

  console.log(">>> CURRENT PATH:", pathname);

  // Ẩn cho tất cả routes bắt đầu bằng /auth
  if (pathname.startsWith("/auth")) return null;

  return <TickerBar />;
}
