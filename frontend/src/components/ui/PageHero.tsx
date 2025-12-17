"use client";

import React from "react";
import BackgroundGlow from "./BackgroundGlow";
import Container from "./Container";
import Badge from "./Badge";

interface PageHeroProps {
	badge?: string;
	title: React.ReactNode;
	subtitle?: string;
	children?: React.ReactNode;
	minHeight?: "sm" | "md" | "lg";
	centered?: boolean;
	className?: string;
}

/**
 * Min height mappings
 */
const minHeightStyles: Record<PageHeroProps["minHeight"] & string, string> = {
	sm: "min-h-[50vh]",
	md: "min-h-[60vh]",
	lg: "min-h-[90vh]",
};

/**
 * Reusable Page Hero section component
 * Sử dụng cho tất cả các page headers với consistent styling
 */
export function PageHero({
	badge,
	title,
	subtitle,
	children,
	minHeight = "md",
	centered = true,
	className = "",
}: PageHeroProps): React.ReactElement {
	return (
		<section
			className={`
        relative flex items-center bg-brand-dark overflow-hidden pt-24
        ${minHeightStyles[minHeight]}
        ${className}
      `}
		>
			<BackgroundGlow variant="hero" />

			<Container className="relative z-10">
				<div
					className={`
            space-y-6 md:space-y-8 animate-fade-in
            ${centered ? "max-w-4xl mx-auto text-center" : ""}
          `}
				>
					{badge && (
						<Badge
							variant="orange"
							size="lg"
							className="tracking-wider uppercase font-semibold"
						>
							{badge}
						</Badge>
					)}

					<h1
						className={`
              text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight
            `}
					>
						{title}
					</h1>

					{subtitle && (
						<p
							className={`
                text-gray-400 text-lg leading-relaxed
                ${centered ? "max-w-2xl mx-auto" : "max-w-xl"}
              `}
						>
							{subtitle}
						</p>
					)}

					{children}
				</div>
			</Container>
		</section>
	);
}

/**
 * Gradient text wrapper for hero titles
 */
interface GradientTextProps {
	children: React.ReactNode;
	className?: string;
}

export function GradientText({
	children,
	className = "",
}: GradientTextProps): React.ReactElement {
	return (
		<span
			className={`
        text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yellow-500
        ${className}
      `}
		>
			{children}
		</span>
	);
}

export default PageHero;
