"use client";

import React from "react";
import Container from "./Container";

interface SectionProps {
	children: React.ReactNode;
	className?: string;
	containerSize?: "sm" | "md" | "lg" | "xl" | "full";
	padding?: "sm" | "md" | "lg";
	border?: boolean;
	id?: string;
}

/**
 * Padding mappings
 */
const paddingStyles: Record<SectionProps["padding"] & string, string> = {
	sm: "py-12",
	md: "py-16",
	lg: "py-20",
};

/**
 * Reusable Section component
 * Provides consistent section spacing and borders
 */
export function Section({
	children,
	className = "",
	containerSize = "lg",
	padding = "lg",
	border = true,
	id,
}: SectionProps): React.ReactElement {
	return (
		<section
			id={id}
			className={`
        bg-brand-dark
        ${paddingStyles[padding]}
        ${border ? "border-t border-white/5" : ""}
        ${className}
      `}
		>
			<Container size={containerSize}>
				{children}
			</Container>
		</section>
	);
}

/**
 * Section Header component
 */
interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	centered?: boolean;
	className?: string;
}

export function SectionHeader({
	title,
	subtitle,
	centered = true,
	className = "",
}: SectionHeaderProps): React.ReactElement {
	return (
		<div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""} ${className}`}>
			<h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
				{title}
			</h2>
			{subtitle && (
				<p className={`text-gray-400 ${centered ? "max-w-xl mx-auto" : ""}`}>
					{subtitle}
				</p>
			)}
		</div>
	);
}

export default Section;
