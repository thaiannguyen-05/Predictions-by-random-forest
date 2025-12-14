"use client";

import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { FaRegComment, FaHeart, FaRegHeart, FaShare, FaEye } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { api } from "@/utils/api";
import type { PostData, ViewCountResponse } from "@/types/api.types";
import { API_ENDPOINTS, PAGINATION } from "@/constants/api.constants";

export interface PostListHandle {
	refresh: () => void;
}

interface LikeState {
	[postId: string]: {
		isLiked: boolean;
		likeCount: number;
	};
}

interface ViewCountState {
	[postId: string]: number;
}

const PostList = forwardRef<PostListHandle>((props, ref) => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState<string | undefined>(undefined);
	const [likeStates, setLikeStates] = useState<LikeState>({});
	const [likingPosts, setLikingPosts] = useState<Set<string>>(new Set());
	const [viewCounts, setViewCounts] = useState<ViewCountState>({});
	const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());

	/**
	 * Tăng view count cho post khi được hiển thị
	 * Chỉ call 1 lần cho mỗi post trong session
	 */
	const incrementViewCount = useCallback(async (postId: string): Promise<void> => {
		// Đã view rồi thì không call nữa
		if (viewedPosts.has(postId)) return;

		// Mark là đã view
		setViewedPosts((prev) => new Set(prev).add(postId));

		try {
			const res = await api.post(`${API_ENDPOINTS.POST.VIEW_INCREMENT}?postId=${postId}`, {});
			const data = await res.json();

			if (data.status && data.postId) {
				const viewData = data as ViewCountResponse;
				setViewCounts((prev) => ({
					...prev,
					[viewData.postId]: viewData.viewCount,
				}));
			}
		} catch (error) {
			console.error("Failed to increment view count:", error);
		}
	}, [viewedPosts]);

	const fetchPosts = async (reset = false): Promise<void> => {
		if (loading) return;
		setLoading(true);

		try {
			const currentPage = reset ? 1 : page;
			const currentCursor = reset ? undefined : cursor;

			const res = await api.post(API_ENDPOINTS.POST.FEED, {
				limit: PAGINATION.POST_LIMIT,
				page: currentPage,
				cursor: currentCursor,
			});

			const data = await res.json();

			if (data.status) {
				const newPosts = data.data.post;

				if (reset) {
					setPosts(newPosts);
				} else {
					setPosts((prev) => [...prev, ...newPosts]);
				}

				// Initialize like states and view counts for new posts
				const newLikeStates: LikeState = {};
				const newViewCounts: ViewCountState = {};
				newPosts.forEach((post: PostData) => {
					newLikeStates[post.id] = {
						isLiked: post.isLiked || false,
						likeCount: post.likeCount || post._count?.likes || 0,
					};
					newViewCounts[post.id] = post.viewCount || 0;
				});

				setLikeStates((prev) => ({
					...prev,
					...newLikeStates,
				}));

				setViewCounts((prev) => ({
					...prev,
					...newViewCounts,
				}));

				setHasMore(data.data.hasMore);
				setCursor(data.data.cursor);
				setPage(data.data.page);
			}
		} catch (error) {
			console.error("Failed to fetch posts:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleLike = async (postId: string): Promise<void> => {
		// Prevent double-clicking
		if (likingPosts.has(postId)) return;

		// Add to liking set
		setLikingPosts((prev) => new Set(prev).add(postId));

		// Get current state
		const currentState = likeStates[postId] || { isLiked: false, likeCount: 0 };
		const newIsLiked = !currentState.isLiked;
		const newLikeCount = newIsLiked
			? currentState.likeCount + 1
			: Math.max(0, currentState.likeCount - 1);

		// Optimistic update
		setLikeStates((prev) => ({
			...prev,
			[postId]: {
				isLiked: newIsLiked,
				likeCount: newLikeCount,
			},
		}));

		try {
			const res = await api.post(`${API_ENDPOINTS.POST.LIKE}?postId=${postId}`, {});
			const data = await res.json();

			if (!data.status) {
				// Revert on error
				setLikeStates((prev) => ({
					...prev,
					[postId]: currentState,
				}));
				console.error("Failed to like post");
			}
		} catch (error) {
			// Revert on error
			setLikeStates((prev) => ({
				...prev,
				[postId]: currentState,
			}));
			console.error("Failed to like post:", error);
		} finally {
			// Remove from liking set
			setLikingPosts((prev) => {
				const newSet = new Set(prev);
				newSet.delete(postId);
				return newSet;
			});
		}
	};

	useEffect(() => {
		fetchPosts(true);
	}, []);

	useImperativeHandle(ref, () => ({
		refresh: () => fetchPosts(true),
	}));

	// Infinite Scroll Logic
	const observer = useRef<IntersectionObserver | null>(null);
	const lastPostElementRef = useCallback(
		(node: HTMLElement | null) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					fetchPosts(false);
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	/**
	 * Component hiển thị một Post với view tracking
	 */
	const PostItem = ({ post, isLast }: { post: PostData; isLast: boolean }) => {
		const postRef = useRef<HTMLElement | null>(null);
		const hasTriggeredView = useRef(false);

		// Track khi post xuất hiện trong viewport
		useEffect(() => {
			const currentRef = postRef.current;
			if (!currentRef || hasTriggeredView.current) return;

			const viewObserver = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && !hasTriggeredView.current) {
						hasTriggeredView.current = true;
						void incrementViewCount(post.id);
					}
				},
				{ threshold: 0.5 } // 50% của post hiển thị mới count
			);

			viewObserver.observe(currentRef);

			return () => {
				viewObserver.disconnect();
			};
		}, [post.id]);

		const avatarUrl = post.user.avatar || post.user.avtUrl;
		const likeState = likeStates[post.id] || { isLiked: false, likeCount: 0 };
		const isLiking = likingPosts.has(post.id);
		const currentViewCount = viewCounts[post.id] || 0;

		return (
			<article
				ref={(node) => {
					postRef.current = node;
					if (isLast) {
						lastPostElementRef(node);
					}
				}}
				className="bg-[#1E1E1E] border border-white/10 rounded-xl p-6 hover:border-brand-orange/30 transition-all duration-300 shadow-sm hover:shadow-md"
			>
				{/* Header: User Info */}
				<div className="flex items-center gap-3 mb-4">
					<div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-orange to-red-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
						{avatarUrl ? (
							<img src={avatarUrl} alt={post.user.username} className="w-full h-full object-cover" />
						) : (
							post.user.username?.charAt(0).toUpperCase() || "?"
						)}
					</div>
					<div className="flex-1">
						<h4 className="font-semibold text-white text-sm hover:text-brand-orange cursor-pointer transition-colors">
							{post.user.username}
						</h4>
						<p className="text-gray-500 text-xs">
							{formatDistanceToNow(new Date(post.createdAt), {
								addSuffix: true,
								locale: vi,
							})}
						</p>
					</div>
					{/* View Count Badge */}
					<div className="flex items-center gap-1 text-gray-500 text-xs">
						<FaEye className="text-gray-600" />
						<span>{currentViewCount}</span>
					</div>
				</div>

				{/* Content */}
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-100 mb-2">{post.title}</h3>
					<p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
				</div>

				{/* Footer: Actions */}
				<div className="flex items-center gap-6 pt-4 border-t border-white/5">
					<button
						onClick={() => handleLike(post.id)}
						disabled={isLiking}
						className={`flex items-center gap-2 transition-all text-sm group ${likeState.isLiked
							? 'text-red-500'
							: 'text-gray-400 hover:text-red-500'
							} ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
					>
						{likeState.isLiked ? (
							<FaHeart className={`transition-transform ${isLiking ? '' : 'group-hover:scale-125'}`} />
						) : (
							<FaRegHeart className={`transition-transform ${isLiking ? '' : 'group-hover:scale-110'}`} />
						)}
						<span>
							{likeState.likeCount > 0 ? likeState.likeCount : ''} Thích
						</span>
					</button>

					<button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm group">
						<FaRegComment className="group-hover:scale-110 transition-transform" />
						<span>{post._count?.comments || 0} Bình luận</span>
					</button>

					<button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm group">
						<FaShare className="group-hover:scale-110 transition-transform" />
						<span>Chia sẻ</span>
					</button>
				</div>

				{/* Comment Section */}
				<CommentSection
					postId={post.id}
					initialCommentCount={post._count?.comments || 0}
				/>
			</article>
		);
	};

	return (
		<div className="space-y-6">
			{posts.map((post, index) => (
				<PostItem
					key={post.id}
					post={post}
					isLast={index === posts.length - 1}
				/>
			))}

			{loading && (
				<div className="flex justify-center py-4">
					<div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}

			{!loading && !hasMore && posts.length > 0 && (
				<p className="text-center text-gray-500 text-sm py-4">Bạn đã xem hết bài viết.</p>
			)}

			{!loading && posts.length === 0 && (
				<div className="text-center py-16 bg-white/5 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center">
					<div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
						<FaRegComment className="text-3xl text-gray-600" />
					</div>
					<p className="text-gray-300 font-medium text-lg mb-1">Chưa có bài viết nào</p>
					<p className="text-gray-500 text-sm">Hãy là người đầu tiên chia sẻ suy nghĩ của bạn!</p>
				</div>
			)}
		</div>
	);
});

PostList.displayName = "PostList";

export default PostList;
