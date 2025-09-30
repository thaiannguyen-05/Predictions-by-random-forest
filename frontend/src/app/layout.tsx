import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
