// app/layout.tsx
import './globals.css';
import MainLayout from '@/app/main-layout';
import Header from '@/components/layout/Header';
import TickerBar from '@/components/layout/TickerBar';

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
    <html lang="vi">
      <body>
        <Header />
        <TickerBar />  
        {children}
      </body>
    </html>
  );
}
