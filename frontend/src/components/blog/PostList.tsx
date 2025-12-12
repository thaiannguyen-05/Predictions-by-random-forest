"use client";

import React, { useEffect, useState, forwardRef, useImperativeHandle, useRef, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { FaRegComment, FaRegHeart, FaShare } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { api } from "@/utils/api";
import type { PostData, FeedResponse } from "@/types/api.types";
import { API_ENDPOINTS, PAGINATION } from "@/constants/api.constants";

export interface PostListHandle {
	refresh: () => void;
}

const PostList = forwardRef<PostListHandle>((props, ref) => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState<string | undefined>(undefined);

	const fetchPosts = async (reset = false): Promise<void> => {
		if (loading) return;
		setLoading(true);

		try {
			// If resetting, start from scratch
			const currentPage = reset ? 1 : page;
			const currentCursor = reset ? undefined : cursor;

			const res = await api.post(API_ENDPOINTS.POST.FEED, {
				limit: PAGINATION.POST_LIMIT,
				page: currentPage,
				cursor: currentCursor,
			});

			const data = await res.json();

			if (data.status) {
				if (reset) {
					setPosts(data.data.post);
				} else {
					setPosts((prev) => [...prev, ...data.data.post]);
				}

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

	return (
		<div className="space-y-6">
			{posts.map((post) => {
				// Get avatar URL - backend uses avtUrl
				const avatarUrl = post.user.avatar || post.user.avtUrl;

				return (
					<article
						key={post.id}
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
							<div>
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
						</div>

						{/* Content */}
						<div className="mb-4">
							<h3 className="text-lg font-bold text-gray-100 mb-2">{post.title}</h3>
							<p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
						</div>

						{/* Footer: Actions */}
						<div className="flex items-center gap-6 pt-4 border-t border-white/5">
							<button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm group">
								<FaRegHeart className="group-hover:scale-110 transition-transform" />
								<span>Thích</span>
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
			})}

			{/* Sentinel for infinite scroll - observe this to load more */}
			{posts.length > 0 && hasMore && <div ref={lastPostElementRef} className="h-4 w-full" />}


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
