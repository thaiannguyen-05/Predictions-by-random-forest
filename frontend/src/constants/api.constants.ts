/**
 * API Constants cho Frontend
 */

/**
 * Base API URL
 */
export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Pagination defaults
 */
export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_LIMIT: 10,
	POST_LIMIT: 10,
	COMMENT_LIMIT: 5,
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
	USER_DATA: 'userData',
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
	// Auth
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		LOGOUT: '/auth/logout',
		REFRESH_TOKEN: '/auth/refresh-token',
		ME: '/auth/me',
		VERIFY: '/auth/verify',
		CHANGE_PASSWORD: '/auth/change-password',
	},
	// User
	USER: {
		ME: '/user/me',
		UPDATE_PROFILE: '/user/change-detail-user',
		UPLOAD_AVATAR: '/user/upload-avatar-chunk',
	},
	// Post
	POST: {
		CREATE: '/post/create',
		UPDATE: '/post/update',
		DELETE: '/post/delete',
		FEED: '/post/feed',
		BY_ID: '/post/loadingById',
		BY_USER: '/post/loading',
		LIKE: '/post/like',
		VIEW_INCREMENT: '/post/view',
		VIEW_GET: '/post/view',
	},
	// Comment
	COMMENT: {
		CREATE: '/comment/create',
		UPDATE: '/comment/update',
		DELETE: '/comment/delete',
		BY_POST: '/comment/loadingPostComments',
	},
	// Stock
	STOCK: {
		PREDICTIONS: '/api/stock/predictions',
		CURRENT_PRICE: '/api/stock/current-price',
		FINANCIAL: '/api/stock/financial',
		ANALYSIS: '/api/stock/analysis',
		TRAIN: '/api/stock/train',
		HISTORY_SEARCH: '/api/stock/history-search',
	},
} as const;

/**
 * Route paths cho frontend navigation
 */
export const ROUTES = {
	HOME: '/',
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	DASHBOARD: '/dashboard',
	PROFILE: '/profile',
	BLOG: '/blog',
	STOCKS: '/stocks',
	TRAIN: '/train',
	HISTORY: '/history',
	CHANGE_PASSWORD: '/change-password',
} as const;

/**
 * Default avatar URL generator
 */
export const getDefaultAvatarUrl = (name: string): string => {
	return `https://ui-avatars.com/api/?name=${encodeURIComponent(
		name
	)}&background=random`;
};
