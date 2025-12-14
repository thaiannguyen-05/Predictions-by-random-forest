import { Metadata } from "next";

/**
 * SEO Metadata cho trang Liên Hệ
 */
export const metadata: Metadata = {
	title: "Liên Hệ | StockDN - Hỗ Trợ & Tư Vấn",
	description:
		"Liên hệ với StockDN để được hỗ trợ kỹ thuật, tư vấn sản phẩm hoặc hợp tác kinh doanh. Đội ngũ hỗ trợ 24/7 sẵn sàng giải đáp mọi thắc mắc.",
	keywords: [
		"liên hệ StockDN",
		"hỗ trợ khách hàng",
		"tư vấn chứng khoán",
		"support",
		"hotline StockDN",
		"đầu tư chứng khoán",
	],
	openGraph: {
		title: "Liên Hệ | StockDN - Hỗ Trợ & Tư Vấn",
		description:
			"Liên hệ với StockDN để được hỗ trợ kỹ thuật và tư vấn sản phẩm. Phản hồi trong 24 giờ.",
		type: "website",
		locale: "vi_VN",
		siteName: "StockDN",
	},
	twitter: {
		card: "summary",
		title: "Liên Hệ | StockDN",
		description: "Liên hệ với StockDN để được hỗ trợ và tư vấn",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	return <>{children}</>;
}
