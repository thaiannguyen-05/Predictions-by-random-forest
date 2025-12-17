"use client";

import React from "react";

interface ContainerProps {
	size?: "sm" | "md" | "lg" | "xl" | "full";
	children: React.ReactNode;
	className?: string;
	as?: keyof JSX.IntrinsicElements;
}

/**
 * Size mappings
 */
const sizeStyles: Record<ContainerProps["size"] & string, string> = {
	sm: "max-w-3xl",
	md: "max-w-4xl",
	lg: "max-w-6xl",
	xl: "max-w-7xl",
	full: "max-w-full",
};

/**
 * Reusable Container component với responsive padding
 * Provides consistent max-width và centered content
 */
export function Container({
	size = "xl",
	children,
	className = "",
	as: Component = "div",
}: ContainerProps): React.ReactElement {
	return (
		<Component
			className={`
        container mx-auto px-4 md:px-6
        ${sizeStyles[size]}
        ${className}
      `}
		>
			{children}
		</Component>
	);
}

export default Container;
