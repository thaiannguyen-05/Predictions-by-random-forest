/**
 * API Response Types cho Frontend
 * Tương ứng với backend StandardResponse format
 */

/**
 * Standard API response wrapper (mới)
 * Đây là format chuẩn từ ResponseInterceptor
 */
export interface StandardResponse<T> {
	success: boolean;
	data: T;
	message: string;
	timestamp: string;
}

/**
 * Legacy API response wrapper (cũ - để tương thích ngược)
 * @deprecated Sử dụng StandardResponse thay thế
 */
export interface ApiResponse<T> {
	status: boolean;
	data: T;
	message?: string;
}

/**
 * Paginated data wrapper
 */
export interface PaginatedData<T> {
	items: T[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
	total?: number;
}

/**
 * Standard paginated response
 */
export type StandardPaginatedResponse<T> = StandardResponse<PaginatedData<T>>;

/**
 * Legacy paginated response (cũ)
 * @deprecated Sử dụng StandardPaginatedResponse thay thế
 */
export interface PaginatedResponse<T> {
	status: boolean;
	data: {
		items: T[];
		cursor: string | null;
		page: number;
		hasMore: boolean;
	};
}

/**
 * User data từ API
 */
export interface UserData {
	id: string;
	username: string;
	email: string;
	fullname?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	avtUrl?: string | null;
	avatar?: string;
	isActive?: boolean;
}

/**
 * Post data từ API
 */
export interface PostData {
	id: string;
	title: string;
	content: string;
	file: string[];
	userId: string;
	createdAt: string;
	updatedAt?: string;
	likeCount?: number;
	viewCount?: number;
	isLiked?: boolean;
	user: PostAuthor;
	_count?: {
		comments: number;
		likes?: number;
	};
}

/**
 * View count response từ /post/view API
 */
export interface ViewCountResponse {
	postId: string;
	viewCount: number;
}

/**
 * Post author info
 */
export interface PostAuthor {
	id: string;
	username: string;
	avatar?: string | null;
	avtUrl?: string | null;
}

/**
 * Comment data từ API
 */
export interface CommentData {
	id: string;
	content: string;
	userId: string;
	postId: string;
	createdAt: string;
	user?: {
		id: string;
		username: string;
		avtUrl: string | null;
	};
}

/**
 * Feed response data
 */
export interface FeedResponseData {
	post: PostData[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
}

/**
 * Comments response data
 */
export interface CommentsResponseData {
	comments: CommentData[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
}

/**
 * Auth me response
 */
export interface AuthMeResponse {
	loggedIn: boolean;
	user: {
		id: string;
		email: string;
		username?: string;
		name?: string;
		firstName?: string;
		lastName?: string;
		phoneNumber?: string;
		avatar?: string;
		provider?: string;
		isActive?: boolean;
	};
}
