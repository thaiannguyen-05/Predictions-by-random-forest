"use client";

import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import TickerBar from "../components/layout/TickerBar";
import ChatbotIcon from "../components/layout/ChatbotIcon";

export default function HeaderControl({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <>
      <Header /> {/* Header luôn xuất hiện */}
      {!isAuthPage && (
        <>
          <TickerBar />
          <ChatbotIcon />
        </>
      )}
      {children}
    </>
  );
}
