import TicketWrapper from "@/components/layout/TicketWrapper";
import ChatbotIcon from "@/components/layout/ChatbotIcon";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <TicketWrapper />
      <ChatbotIcon />
    </>
  );
}
