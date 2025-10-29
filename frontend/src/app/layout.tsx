import "./globals.css";
import Providers from "./providers";
import HeaderControl from "./HeaderControl";

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
          {/* HeaderControl là client component */}
          <HeaderControl>{children}</HeaderControl>
        </Providers>
      </body>
    </html>
  );
}
