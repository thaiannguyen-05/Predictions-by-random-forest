/**
 * API Utility with automatic token refresh on 401
 * Hỗ trợ cả legacy format và StandardResponse format mới
 */

import type { StandardResponse } from '@/types/api.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * Subscribe to token refresh completion
 */
function subscribeTokenRefresh(cb: (token: string) => void): void {
	refreshSubscribers.push(cb);
}

/**
 * Notify all subscribers with new token
 */
function onTokenRefreshed(token: string): void {
	refreshSubscribers.forEach((cb) => cb(token));
	refreshSubscribers = [];
}

/**
 * Refresh access token using refresh token from cookies
 */
async function refreshAccessToken(): Promise<string | null> {
	try {
		const response = await fetch(`${API_BASE}/auth/refresh-token`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Refresh token failed');
		}

		const data = await response.json();

		// Handle cả legacy và new format
		const tokens = data.data?.tokens || data.tokens;
		if (tokens?.accessToken) {
			localStorage.setItem('accessToken', tokens.accessToken);
			return tokens.accessToken;
		}

		return null;
	} catch (error) {
		console.error('Token refresh error:', error);
		return null;
	}
}

/**
 * Enhanced fetch with automatic token refresh on 401
 */
export async function apiFetch(
	url: string,
	options: RequestInit = {}
): Promise<Response> {
	const token = localStorage.getItem('accessToken');
	const fullUrl = url.startsWith('/') ? `${API_BASE}${url}` : url;

	const isFormData = options.body instanceof FormData;

	const headers: Record<string, string> = {
		...(isFormData ? {} : { 'Content-Type': 'application/json' }),
		...(options.headers as Record<string, string>),
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	let response = await fetch(fullUrl, {
		...options,
		headers,
		credentials: 'include',
	});

	if (response.status === 401 && token) {
		if (!isRefreshing) {
			isRefreshing = true;

			const newToken = await refreshAccessToken();

			if (newToken) {
				isRefreshing = false;
				onTokenRefreshed(newToken);

				headers['Authorization'] = `Bearer ${newToken}`;
				response = await fetch(fullUrl, {
					...options,
					headers,
					credentials: 'include',
				});
			} else {
				isRefreshing = false;
				localStorage.removeItem('accessToken');
				window.location.href = '/auth/login';
				throw new Error('Session expired. Please login again.');
			}
		} else {
			const newToken = await new Promise<string>((resolve) => {
				subscribeTokenRefresh((refreshedToken: string) => {
					resolve(refreshedToken);
				});
			});

			headers['Authorization'] = `Bearer ${newToken}`;
			response = await fetch(fullUrl, {
				...options,
				headers,
				credentials: 'include',
			});
		}
	}

	return response;
}

/**
 * Parse API response và chuẩn hóa về format thống nhất
 * Hỗ trợ cả legacy { status, data } và new { success, data }
 */
export async function parseApiResponse<T>(
	response: Response
): Promise<{ success: boolean; data: T; message: string }> {
	const json = await response.json();

	// New format: { success, data, message, timestamp }
	if (typeof json.success === 'boolean') {
		return {
			success: json.success,
			data: json.data as T,
			message: json.message || '',
		};
	}

	// Legacy format: { status, data, message }
	if (typeof json.status === 'boolean') {
		return {
			success: json.status,
			data: json.data as T,
			message: json.message || '',
		};
	}

	// Direct data (no wrapper)
	return {
		success: response.ok,
		data: json as T,
		message: '',
	};
}

/**
 * Typed API fetch with automatic response parsing
 */
export async function apiRequest<T>(
	url: string,
	options: RequestInit = {}
): Promise<StandardResponse<T>> {
	const response = await apiFetch(url, options);
	const json = await response.json();

	// Nếu đã có format chuẩn
	if (typeof json.success === 'boolean' && 'timestamp' in json) {
		return json as StandardResponse<T>;
	}

	// Chuyển đổi legacy format
	if (typeof json.status === 'boolean') {
		return {
			success: json.status,
			data: json.data as T,
			message: json.message || (json.status ? 'Success' : 'Failed'),
			timestamp: new Date().toISOString(),
		};
	}

	// Wrap direct data
	return {
		success: response.ok,
		data: json as T,
		message: response.ok ? 'Success' : 'Failed',
		timestamp: new Date().toISOString(),
	};
}

/**
 * Convenience methods
 */
export const api = {
	get: (url: string, options?: RequestInit): Promise<Response> =>
		apiFetch(url, { ...options, method: 'GET' }),

	post: (url: string, body?: unknown, options?: RequestInit): Promise<Response> => {
		const isFormData = body instanceof FormData;
		return apiFetch(url, {
			...options,
			method: 'POST',
			body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
			headers: isFormData ? undefined : options?.headers,
		});
	},

	put: (url: string, body?: unknown, options?: RequestInit): Promise<Response> =>
		apiFetch(url, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined,
		}),

	patch: (url: string, body?: unknown, options?: RequestInit): Promise<Response> =>
		apiFetch(url, {
			...options,
			method: 'PATCH',
			body: body ? JSON.stringify(body) : undefined,
		}),

	delete: (url: string, options?: RequestInit): Promise<Response> =>
		apiFetch(url, { ...options, method: 'DELETE' }),
};

/**
 * Typed API methods với automatic parsing
 */
export const typedApi = {
	get: <T>(url: string, options?: RequestInit): Promise<StandardResponse<T>> =>
		apiRequest<T>(url, { ...options, method: 'GET' }),

	post: <T>(url: string, body?: unknown, options?: RequestInit): Promise<StandardResponse<T>> =>
		apiRequest<T>(url, {
			...options,
			method: 'POST',
			body: body ? JSON.stringify(body) : undefined,
		}),

	put: <T>(url: string, body?: unknown, options?: RequestInit): Promise<StandardResponse<T>> =>
		apiRequest<T>(url, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined,
		}),

	patch: <T>(url: string, body?: unknown, options?: RequestInit): Promise<StandardResponse<T>> =>
		apiRequest<T>(url, {
			...options,
			method: 'PATCH',
			body: body ? JSON.stringify(body) : undefined,
		}),

	delete: <T>(url: string, options?: RequestInit): Promise<StandardResponse<T>> =>
		apiRequest<T>(url, { ...options, method: 'DELETE' }),
};

export default api;
