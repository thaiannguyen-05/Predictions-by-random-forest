"use client";

import React from "react";

/**
 * Badge variant types
 */
type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "orange";

/**
 * Badge size types
 */
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
	variant?: BadgeVariant;
	size?: BadgeSize;
	children: React.ReactNode;
	className?: string;
	icon?: React.ReactNode;
	pulse?: boolean;
}

/**
 * Variant styles
 */
const variantStyles: Record<BadgeVariant, string> = {
	default: "bg-white/10 text-gray-300 border-white/10",
	success: "bg-green-500/10 text-green-400 border-green-500/20",
	warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
	danger: "bg-red-500/10 text-red-400 border-red-500/20",
	info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
	orange: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
};

/**
 * Size styles
 */
const sizeStyles: Record<BadgeSize, string> = {
	sm: "px-2 py-0.5 text-xs",
	md: "px-3 py-1 text-xs",
	lg: "px-4 py-1.5 text-sm",
};

/**
 * Reusable Badge component
 */
export function Badge({
	variant = "default",
	size = "md",
	children,
	className = "",
	icon,
	pulse = false,
}: BadgeProps): React.ReactElement {
	return (
		<span
			className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full border
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
		>
			{pulse && (
				<span
					className={`w-2 h-2 rounded-full animate-pulse ${variant === "success"
						? "bg-green-400"
						: variant === "warning"
							? "bg-yellow-400"
							: variant === "danger"
								? "bg-red-400"
								: variant === "info"
									? "bg-blue-400"
									: variant === "orange"
										? "bg-brand-orange"
										: "bg-gray-400"
						}`}
				/>
			)}
			{icon}
			{children}
		</span>
	);
}

/**
 * Status indicator dot
 */
interface StatusDotProps {
	status: "online" | "offline" | "busy" | "away";
	className?: string;
}

const statusColors: Record<StatusDotProps["status"], string> = {
	online: "bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
	offline: "bg-gray-400",
	busy: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]",
	away: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]",
};

export function StatusDot({
	status,
	className = "",
}: StatusDotProps): React.ReactElement {
	return (
		<span
			className={`
        w-2 h-2 rounded-full
        ${statusColors[status]}
        ${status === "online" ? "animate-pulse" : ""}
        ${className}
      `}
		/>
	);
}

export default Badge;
