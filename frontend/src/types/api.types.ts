export interface StandardResponse<T> {
	success: boolean;
	data: T;
	message: string;
	timestamp: string;
}

export interface ApiResponse<T> {
	status: boolean;
	data: T;
	message?: string;
}

export interface PaginatedData<T> {
	items: T[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
	total?: number;
}

export type StandardPaginatedResponse<T> = StandardResponse<PaginatedData<T>>;

export interface PaginatedResponse<T> {
	status: boolean;
	data: {
		items: T[];
		cursor: string | null;
		page: number;
		hasMore: boolean;
	};
}

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

export interface ViewCountResponse {
	postId: string;
	viewCount: number;
}

export interface PostAuthor {
	id: string;
	username: string;
	avatar?: string | null;
	avtUrl?: string | null;
}

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

export interface FeedResponseData {
	post: PostData[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
}

export interface CommentsResponseData {
	comments: CommentData[];
	cursor: string | null;
	page: number;
	hasMore: boolean;
}

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
