import "./globals.css";
import Header from "@/components/layout/Header";
import TicketWrapper from "@/components/layout/TicketWrapper";
import Providers from "./providers";

export const metadata = {
  title: "StockTrack - Phân tích & Dự đoán Chứng khoán",
  description: "Ứng dụng phân tích và dự đoán thị trường chứng khoán.",
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
          <TicketWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );
}
