import './globals.css';
import MainLayout from '@/app/main-layout';
import Header from '@/components/layout/Header';
import ConditionalTickerBar from '@/components/layout/ConditionalTickerBar';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';

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
        <Providers>
          <Header />
          <ConditionalTickerBar />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
