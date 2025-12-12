/**
 * API Utility with automatic token refresh on 401
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * Subscribe to token refresh completion
 */
function subscribeTokenRefresh(cb: (token: string) => void) {
	refreshSubscribers.push(cb);
}

/**
 * Notify all subscribers with new token
 */
function onTokenRefreshed(token: string) {
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
			credentials: 'include', // Important: send cookies (session_id, refresh_token)
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Refresh token failed');
		}

		const data = await response.json();

		if (data.tokens?.accessToken) {
			localStorage.setItem('accessToken', data.tokens.accessToken);
			return data.tokens.accessToken;
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

	// Check if body is FormData - don't set Content-Type for FormData
	const isFormData = options.body instanceof FormData;

	// Add authorization header if token exists
	const headers: Record<string, string> = {
		...(isFormData ? {} : { 'Content-Type': 'application/json' }),
		...(options.headers as Record<string, string>),
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	// Make the initial request
	let response = await fetch(fullUrl, {
		...options,
		headers,
		credentials: 'include', // Important for cookies
	});

	// If 401 and not already refreshing, try to refresh token
	if (response.status === 401 && token) {
		if (!isRefreshing) {
			isRefreshing = true;

			const newToken = await refreshAccessToken();

			if (newToken) {
				// Token refreshed successfully
				isRefreshing = false;
				onTokenRefreshed(newToken);

				// Retry the original request with new token
				headers['Authorization'] = `Bearer ${newToken}`;
				response = await fetch(fullUrl, {
					...options,
					headers,
					credentials: 'include',
				});
			} else {
				// Refresh failed - logout user
				isRefreshing = false;
				localStorage.removeItem('accessToken');
				window.location.href = '/auth/login';
				throw new Error('Session expired. Please login again.');
			}
		} else {
			// Already refreshing, wait for it to complete
			const newToken = await new Promise<string>((resolve) => {
				subscribeTokenRefresh((token: string) => {
					resolve(token);
				});
			});

			// Retry with new token
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
 * Convenience methods
 */
export const api = {
	get: (url: string, options?: RequestInit) =>
		apiFetch(url, { ...options, method: 'GET' }),

	post: (url: string, body?: unknown, options?: RequestInit) => {
		const isFormData = body instanceof FormData;
		return apiFetch(url, {
			...options,
			method: 'POST',
			body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
			headers: isFormData ? undefined : options?.headers,
		});
	},

	put: (url: string, body?: unknown, options?: RequestInit) =>
		apiFetch(url, {
			...options,
			method: 'PUT',
			body: body ? JSON.stringify(body) : undefined,
		}),

	patch: (url: string, body?: unknown, options?: RequestInit) =>
		apiFetch(url, {
			...options,
			method: 'PATCH',
			body: body ? JSON.stringify(body) : undefined,
		}),

	delete: (url: string, options?: RequestInit) =>
		apiFetch(url, { ...options, method: 'DELETE' }),
};

export default api;
