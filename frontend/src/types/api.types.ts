/**
 * API Response Types cho Frontend
 * Tương ứng với backend response interfaces
 */

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
	status: boolean;
	data: T;
	message?: string;
}

/**
 * Paginated response với cursor-based pagination
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
	user: PostAuthor;
	_count?: {
		comments: number;
	};
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
 * Feed response từ /post/feed API
 */
export interface FeedResponse {
	post: PostData[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
}

/**
 * Comments response từ /comment/loadingPostComments API
 */
export interface CommentsResponse {
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
