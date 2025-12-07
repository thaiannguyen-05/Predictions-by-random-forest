/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					dark: "#121212",      // Nền chính
					card: "#1E1E1E",      // Nền card/section
					orange: "#F97316",    // Màu chủ đạo (Orange-500)
					"orange-hover": "#EA580C", // Orange-600
					text: "#F3F4F6",      // Màu chữ chính
					muted: "#9CA3AF",     // Màu chữ phụ
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'conic-gradient':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'orange-glow': 'radial-gradient(circle at center, rgba(249, 115, 22, 0.15), transparent 70%)',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				popIn: {
					'0%': { opacity: '0', transform: 'scale(0.5)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				}
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'float': 'float 3s ease-in-out infinite',
				'pop-in': 'popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
			},
		},
	},
	plugins: [],
};
