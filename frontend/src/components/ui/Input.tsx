"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	hint?: string;
	required?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	fullWidth?: boolean;
}

/**
 * Reusable Input component với label, error handling và icon support
 * Consistent styling cho tất cả form inputs trong app
 */
export function Input({
	label,
	error,
	hint,
	required = false,
	icon,
	iconPosition = "left",
	fullWidth = true,
	className = "",
	id,
	...props
}: InputProps): React.ReactElement {
	const inputId = id || `input-${props.name || Math.random().toString(36).substring(7)}`;

	const baseInputStyles = `
    bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-gray-500
    focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

	const inputPadding = icon
		? iconPosition === "left"
			? "pl-12 pr-4 py-3"
			: "pl-4 pr-12 py-3"
		: "px-4 py-3";

	const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

	return (
		<div className={`${fullWidth ? "w-full" : ""}`}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-gray-300 text-sm font-medium mb-2"
				>
					{label}
					{required && <span className="text-red-400 ml-1">*</span>}
				</label>
			)}

			<div className="relative">
				{icon && iconPosition === "left" && (
					<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
						{icon}
					</div>
				)}

				<input
					id={inputId}
					className={`
            ${baseInputStyles}
            ${inputPadding}
            ${errorStyles}
            ${fullWidth ? "w-full" : ""}
            ${className}
          `}
					{...props}
				/>

				{icon && iconPosition === "right" && (
					<div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
						{icon}
					</div>
				)}
			</div>

			{error && (
				<p className="mt-2 text-sm text-red-400">{error}</p>
			)}

			{hint && !error && (
				<p className="mt-2 text-sm text-gray-500">{hint}</p>
			)}
		</div>
	);
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	hint?: string;
	required?: boolean;
	fullWidth?: boolean;
}

/**
 * Reusable Textarea component
 */
export function Textarea({
	label,
	error,
	hint,
	required = false,
	fullWidth = true,
	className = "",
	id,
	...props
}: TextareaProps): React.ReactElement {
	const textareaId = id || `textarea-${props.name || Math.random().toString(36).substring(7)}`;

	const baseStyles = `
    bg-white/5 border border-white/10 rounded-xl
    text-white placeholder-gray-500
    focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
    transition-all duration-300 resize-none
    disabled:opacity-50 disabled:cursor-not-allowed
    px-4 py-3
  `;

	const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

	return (
		<div className={`${fullWidth ? "w-full" : ""}`}>
			{label && (
				<label
					htmlFor={textareaId}
					className="block text-gray-300 text-sm font-medium mb-2"
				>
					{label}
					{required && <span className="text-red-400 ml-1">*</span>}
				</label>
			)}

			<textarea
				id={textareaId}
				className={`
          ${baseStyles}
          ${errorStyles}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
				{...props}
			/>

			{error && (
				<p className="mt-2 text-sm text-red-400">{error}</p>
			)}

			{hint && !error && (
				<p className="mt-2 text-sm text-gray-500">{hint}</p>
			)}
		</div>
	);
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	required?: boolean;
	options: Array<{ value: string; label: string }>;
	fullWidth?: boolean;
}

/**
 * Reusable Select component
 */
export function Select({
	label,
	error,
	required = false,
	options,
	fullWidth = true,
	className = "",
	id,
	...props
}: SelectProps): React.ReactElement {
	const selectId = id || `select-${props.name || Math.random().toString(36).substring(7)}`;

	const baseStyles = `
    bg-white/5 border border-white/10 rounded-xl
    text-white
    focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange
    transition-all duration-300 appearance-none
    disabled:opacity-50 disabled:cursor-not-allowed
    px-4 py-3
  `;

	const errorStyles = error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "";

	return (
		<div className={`${fullWidth ? "w-full" : ""}`}>
			{label && (
				<label
					htmlFor={selectId}
					className="block text-gray-300 text-sm font-medium mb-2"
				>
					{label}
					{required && <span className="text-red-400 ml-1">*</span>}
				</label>
			)}

			<select
				id={selectId}
				className={`
          ${baseStyles}
          ${errorStyles}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
				{...props}
			>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
						className="bg-brand-dark"
					>
						{option.label}
					</option>
				))}
			</select>

			{error && (
				<p className="mt-2 text-sm text-red-400">{error}</p>
			)}
		</div>
	);
}

export default Input;
