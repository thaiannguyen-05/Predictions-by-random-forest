"use client";

import React from "react";

interface BackgroundGlowProps {
	variant?: "default" | "hero" | "subtle";
	className?: string;
}

/**
 * Reusable Background Glow effect component
 * Được sử dụng cho Hero sections và page backgrounds
 */
export function BackgroundGlow({
	variant = "default",
	className = "",
}: BackgroundGlowProps): React.ReactElement {
	if (variant === "hero") {
		return (
			<>
				<div
					className={`absolute top-1/4 -left-32 w-96 h-96 bg-brand-orange/20 rounded-full blur-[128px] pointer-events-none ${className}`}
				/>
				<div
					className={`absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none ${className}`}
				/>
			</>
		);
	}

	if (variant === "subtle") {
		return (
			<>
				<div
					className={`absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none ${className}`}
				/>
				<div
					className={`absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none ${className}`}
				/>
			</>
		);
	}

	return (
		<div
			className={`absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${className}`}
		/>
	);
}

export default BackgroundGlow;
