// frontend/src/app/layout.tsx
import './globals.css';
import Header from '@/components/layout/Header'; // <-- Đảm bảo dòng này có
import TickerBar from '@/components/layout/TickerBar'; // <-- Và dòng này
import ChatbotIcon from '@/components/layout/ChatbotIcon'; // <-- Và dòng này (nếu dùng)

export const metadata = {
  title: 'StockTrack - Phân tích & Dự đoán Chứng khoán',
  description: 'Ứng dụng phân tích và dự đoán thị trường chứng khoán.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* <-- Header phải được render ở đây */}
        <TickerBar /> {/* <-- TickerBar cũng vậy */}
        {children}
        <ChatbotIcon /> {/* <-- ChatbotIcon (nếu có) */}
      </body>
    </html>
  );
}