import './globals.css';
import MainLayout from '@/app/main-layout';
import Header from '@/components/layout/Header';
import ConditionalTickerBar from '@/components/layout/ConditionalTickerBar';
import Providers from './providers';

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
        </Providers>
      </body>
    </html>
  );
}
