import { Metadata } from "next";

/**
 * SEO Metadata cho trang Giới Thiệu
 */
export const metadata: Metadata = {
	title: "Giới Thiệu | StockDN - Nền Tảng Phân Tích Chứng Khoán AI",
	description:
		"Tìm hiểu về StockDN - nền tảng phân tích và dự đoán chứng khoán hàng đầu Việt Nam. Ứng dụng công nghệ AI và thuật toán Random Forest với độ chính xác 94.8%.",
	keywords: [
		"StockDN",
		"phân tích chứng khoán",
		"dự đoán chứng khoán",
		"AI chứng khoán",
		"Random Forest",
		"machine learning",
		"đầu tư thông minh",
		"thị trường chứng khoán Việt Nam",
	],
	openGraph: {
		title: "Giới Thiệu | StockDN - Nền Tảng Phân Tích Chứng Khoán AI",
		description:
			"Nền tảng phân tích và dự đoán chứng khoán sử dụng AI với độ chính xác 94.8%. Tham gia cùng 500+ nhà đầu tư tin dùng.",
		type: "website",
		locale: "vi_VN",
		siteName: "StockDN",
	},
	twitter: {
		card: "summary_large_image",
		title: "Giới Thiệu | StockDN",
		description:
			"Nền tảng phân tích chứng khoán AI hàng đầu Việt Nam với độ chính xác 94.8%",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	return <>{children}</>;
}
