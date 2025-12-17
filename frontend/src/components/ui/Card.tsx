"use client";

import React from "react";
import Link from "next/link";

/**
 * Card variant types
 */
type CardVariant = "default" | "elevated" | "gradient" | "outline";

interface CardProps {
	variant?: CardVariant;
	hover?: boolean;
	padding?: "none" | "sm" | "md" | "lg";
	rounded?: "md" | "lg" | "xl" | "2xl" | "3xl";
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	href?: string;
}

/**
 * Variant styles
 */
const variantStyles: Record<CardVariant, string> = {
	default: "bg-brand-card/80 backdrop-blur-xl border border-white/10",
	elevated: "bg-brand-card/80 backdrop-blur-xl border border-white/10 shadow-xl",
	gradient: "bg-gradient-to-br from-brand-card to-gray-900/50 border border-white/10",
	outline: "bg-transparent border border-white/10",
};

/**
 * Hover styles
 */
const hoverStyles = "hover:border-brand-orange/30 hover:-translate-y-1 cursor-pointer";

/**
 * Padding styles
 */
const paddingStyles: Record<"none" | "sm" | "md" | "lg", string> = {
	none: "",
	sm: "p-4",
	md: "p-6",
	lg: "p-8",
};

/**
 * Rounded styles
 */
const roundedStyles: Record<"md" | "lg" | "xl" | "2xl" | "3xl", string> = {
	md: "rounded-md",
	lg: "rounded-lg",
	xl: "rounded-xl",
	"2xl": "rounded-2xl",
	"3xl": "rounded-3xl",
};

/**
 * Reusable Card component với multiple variants
 * Có thể render as div, button hoặc link
 */
export function Card({
	variant = "default",
	hover = false,
	padding = "md",
	rounded = "2xl",
	children,
	className = "",
	onClick,
	href,
}: CardProps): React.ReactElement {
	const baseStyles = "transition-all duration-300";

	const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${paddingStyles[padding]}
    ${roundedStyles[rounded]}
    ${hover ? hoverStyles : ""}
    ${className}
  `.trim();

	// Render as Link
	if (href) {
		return (
			<Link href={href} className={combinedClassName}>
				{children}
			</Link>
		);
	}

	// Render as clickable div
	if (onClick) {
		return (
			<div
				role="button"
				tabIndex={0}
				onClick={onClick}
				onKeyDown={(e) => e.key === "Enter" && onClick()}
				className={combinedClassName}
			>
				{children}
			</div>
		);
	}

	// Render as plain div
	return <div className={combinedClassName}>{children}</div>;
}

/**
 * Card Header component
 */
interface CardHeaderProps {
	icon?: React.ReactNode;
	iconColor?: string;
	title: string;
	subtitle?: string;
	action?: React.ReactNode;
	className?: string;
}

export function CardHeader({
	icon,
	iconColor = "text-brand-orange",
	title,
	subtitle,
	action,
	className = "",
}: CardHeaderProps): React.ReactElement {
	return (
		<div className={`flex items-start justify-between mb-4 ${className}`}>
			<div className="flex items-center gap-3">
				{icon && (
					<div
						className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}
					>
						{icon}
					</div>
				)}
				<div>
					<h3 className="text-lg font-semibold text-white">{title}</h3>
					{subtitle && (
						<p className="text-gray-400 text-sm">{subtitle}</p>
					)}
				</div>
			</div>
			{action && <div>{action}</div>}
		</div>
	);
}

/**
 * Feature Card - Card với icon hover effect
 */
interface FeatureCardProps {
	icon: React.ReactNode;
	iconBgColor?: string;
	iconColor?: string;
	title: string;
	description: string;
	className?: string;
}

export function FeatureCard({
	icon,
	iconBgColor = "bg-brand-orange/20",
	iconColor = "text-brand-orange",
	title,
	description,
	className = "",
}: FeatureCardProps): React.ReactElement {
	return (
		<Card
			variant="default"
			hover
			className={`group ${className}`}
		>
			<div
				className={`w-12 h-12 rounded-xl ${iconBgColor} flex items-center justify-center ${iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
			>
				{icon}
			</div>
			<h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
			<p className="text-gray-400 text-sm leading-relaxed">{description}</p>
		</Card>
	);
}

/**
 * Stat Card - Card hiển thị statistics
 */
interface StatCardProps {
	icon: React.ReactNode;
	value: string;
	label: string;
	change?: string;
	isPositive?: boolean;
	className?: string;
}

export function StatCard({
	icon,
	value,
	label,
	change,
	isPositive = true,
	className = "",
}: StatCardProps): React.ReactElement {
	return (
		<Card
			variant="default"
			hover
			className={`group ${className}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="p-3 bg-brand-dark rounded-xl group-hover:scale-110 transition-transform">
					{icon}
				</div>
				{change && (
					<span
						className={`text-sm font-semibold ${isPositive ? "text-green-400" : "text-red-400"
							}`}
					>
						{change}
					</span>
				)}
			</div>
			<h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
			<p className="text-sm text-gray-400">{label}</p>
		</Card>
	);
}

export default Card;
