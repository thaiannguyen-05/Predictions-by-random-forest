"use client";

import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

/**
 * Button variant types
 */
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/**
 * Button size types
 */
type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	children: React.ReactNode;
	className?: string;
}

interface ButtonAsButtonProps extends ButtonBaseProps {
	as?: "button";
	href?: never;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	type?: "button" | "submit" | "reset";
}

interface ButtonAsLinkProps extends ButtonBaseProps {
	as: "link";
	href: string;
	onClick?: never;
	type?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/**
 * Style variants cho button
 */
const variantStyles: Record<ButtonVariant, string> = {
	primary:
		"bg-brand-orange hover:bg-brand-orange-hover text-white shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40",
	secondary:
		"bg-brand-card hover:bg-brand-card/80 text-white border border-white/10 hover:border-white/20",
	ghost:
		"bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-transparent",
	danger:
		"bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20",
};

/**
 * Size styles cho button
 */
const sizeStyles: Record<ButtonSize, string> = {
	sm: "px-4 py-2 text-sm rounded-lg",
	md: "px-6 py-3 text-sm rounded-xl",
	lg: "px-8 py-4 text-base rounded-xl",
};

/**
 * Reusable Button component với multiple variants
 * Hỗ trợ render as button hoặc Link
 */
export function Button({
	variant = "primary",
	size = "md",
	loading = false,
	disabled = false,
	fullWidth = false,
	icon,
	iconPosition = "right",
	children,
	className = "",
	...props
}: ButtonProps): React.ReactElement {
	const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold
    transition-all duration-300
    transform hover:-translate-y-0.5
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
    focus:outline-none focus:ring-2 focus:ring-brand-orange/50
  `;

	const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

	const content = (
		<>
			{loading && <Loader2 size={18} className="animate-spin" />}
			{!loading && icon && iconPosition === "left" && icon}
			{children}
			{!loading && icon && iconPosition === "right" && icon}
		</>
	);

	if (props.as === "link") {
		return (
			<Link
				href={props.href}
				className={combinedClassName}
				aria-disabled={disabled || loading}
			>
				{content}
			</Link>
		);
	}

	return (
		<button
			type={props.type || "button"}
			onClick={props.onClick}
			disabled={disabled || loading}
			className={combinedClassName}
		>
			{content}
		</button>
	);
}

export default Button;
