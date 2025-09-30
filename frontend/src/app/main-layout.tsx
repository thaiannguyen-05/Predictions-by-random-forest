import Header from '@/components/layout/Header';
import TickerBar from '@/components/layout/TickerBar';
import ChatbotIcon from '@/components/layout/ChatbotIcon';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <TickerBar />
      {children}
      <ChatbotIcon />
    </>
  );
}
