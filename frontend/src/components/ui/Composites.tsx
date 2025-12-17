"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";

interface CTASectionProps {
	title?: string;
	subtitle?: string;
	primaryAction?: {
		label: string;
		href: string;
	};
	secondaryAction?: {
		label: string;
		href: string;
	};
	className?: string;
}

/**
 * Reusable CTA (Call-to-Action) Section component
 * Sử dụng cho các page endings với consistent styling
 */
export function CTASection({
	title = "Sẵn Sàng Bắt Đầu?",
	subtitle = "Tham gia cùng hàng trăm nhà đầu tư đã tin tưởng sử dụng StockDN để đón đầu xu hướng thị trường.",
	primaryAction = { label: "Đăng Ký Miễn Phí", href: "/auth/register" },
	secondaryAction = { label: "Liên Hệ Tư Vấn", href: "/contact" },
	className = "",
}: CTASectionProps): React.ReactElement {
	return (
		<Section className={className}>
			<div className="max-w-4xl mx-auto text-center">
				<Card variant="gradient" padding="lg" rounded="3xl" className="border-brand-orange/10">
					<h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
					<p className="text-gray-400 mb-8 max-w-xl mx-auto">{subtitle}</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button as="link" href={primaryAction.href} size="lg">
							{primaryAction.label}
						</Button>
						<Button
							as="link"
							href={secondaryAction.href}
							variant="secondary"
							size="lg"
						>
							{secondaryAction.label}
						</Button>
					</div>
				</Card>
			</div>
		</Section>
	);
}

interface InfoGridProps {
	items: Array<{
		icon: React.ReactNode;
		title: string;
		content: string;
		subContent?: string;
	}>;
	columns?: 2 | 3 | 4;
	className?: string;
}

/**
 * Reusable Info Grid component
 * Displays information cards in a responsive grid
 */
export function InfoGrid({
	items,
	columns = 4,
	className = "",
}: InfoGridProps): React.ReactElement {
	const gridCols = {
		2: "sm:grid-cols-2",
		3: "sm:grid-cols-2 lg:grid-cols-3",
		4: "sm:grid-cols-2 lg:grid-cols-4",
	};

	return (
		<div className={`grid ${gridCols[columns]} gap-6 ${className}`}>
			{items.map((item, index) => (
				<Card
					key={index}
					variant="default"
					hover
					className="group"
				>
					<div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center text-brand-orange mb-4 group-hover:scale-110 transition-transform duration-300">
						{item.icon}
					</div>
					<h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
					<p className="text-gray-300">{item.content}</p>
					{item.subContent && (
						<p className="text-gray-400 text-sm mt-1">{item.subContent}</p>
					)}
				</Card>
			))}
		</div>
	);
}

interface ListWithIconsProps {
	items: string[];
	icon?: React.ReactNode;
	iconColor?: string;
	className?: string;
}

/**
 * Reusable List with Icons component
 */
export function ListWithIcons({
	items,
	icon,
	iconColor = "text-brand-orange",
	className = "",
}: ListWithIconsProps): React.ReactElement {
	return (
		<ul className={`space-y-3 md:space-y-4 ${className}`}>
			{items.map((item, index) => (
				<li key={index} className="flex items-start gap-3 text-gray-300">
					<span className={`mt-1 flex-shrink-0 ${iconColor}`}>
						{icon || "•"}
					</span>
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

/**
 * Avatar Stack component - hiển thị multiple avatars stacked
 */
interface AvatarStackProps {
	count?: number;
	label?: string;
	className?: string;
}

export function AvatarStack({
	count = 4,
	label = "500+ Nhà đầu tư tin dùng",
	className = "",
}: AvatarStackProps): React.ReactElement {
	return (
		<div className={`flex items-center gap-4 ${className}`}>
			<div className="flex -space-x-3">
				{Array.from({ length: count }).map((_, i) => (
					<div
						key={i}
						className="w-10 h-10 rounded-full bg-gray-700 border-2 border-brand-dark flex items-center justify-center text-xs overflow-hidden"
					>
						<img
							src={`https://ui-avatars.com/api/?name=U+${i + 1}&background=random&color=fff`}
							alt={`User ${i + 1}`}
							className="w-full h-full object-cover"
						/>
					</div>
				))}
			</div>
			<p className="text-sm text-gray-400">
				<span className="text-brand-orange font-bold">
					{label.split(" ")[0]}
				</span>{" "}
				{label.split(" ").slice(1).join(" ")}
			</p>
		</div>
	);
}

export default CTASection;
