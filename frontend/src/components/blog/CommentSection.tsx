"use client";

import React, { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { FaPaperPlane, FaSpinner, FaTrash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";

interface Comment {
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

interface CommentSectionProps {
	postId: string;
	initialCommentCount: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({
	postId,
	initialCommentCount,
}) => {
	const { user } = useAuth();
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState("");
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [expanded, setExpanded] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [cursor, setCursor] = useState<string | undefined>(undefined);
	const [commentCount, setCommentCount] = useState(initialCommentCount);

	const fetchComments = useCallback(
		async (reset = false): Promise<void> => {
			if (loading) return;
			setLoading(true);

			try {
				const currentPage = reset ? 1 : page;
				const currentCursor = reset ? undefined : cursor;

				const res = await api.post(
					`/comment/loadingPostComments?postId=${postId}`,
					{
						limit: 5,
						page: currentPage,
						cursor: currentCursor,
					}
				);

				const data = await res.json();

				if (data.status) {
					if (reset) {
						setComments(data.data.comments || []);
					} else {
						setComments((prev) => [...prev, ...(data.data.comments || [])]);
					}
					setHasMore(data.data.hasMore);
					setCursor(data.data.cursor);
					setPage(data.data.page);
				}
			} catch (error) {
				console.error("Failed to fetch comments:", error);
			} finally {
				setLoading(false);
			}
		},
		[postId, page, cursor, loading]
	);

	useEffect(() => {
		if (expanded && comments.length === 0) {
			fetchComments(true);
		}
	}, [expanded]);

	const handleSubmitComment = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!newComment.trim()) {
			toast.error("Vui lòng nhập nội dung bình luận!");
			return;
		}

		if (!user) {
			toast.error("Vui lòng đăng nhập để bình luận!");
			return;
		}

		setSubmitting(true);
		try {
			const res = await api.post("/comment/create", {
				content: newComment.trim(),
				postId,
			});

			const data = await res.json();

			if (data.status) {
				// Add new comment to the list with user info
				const createdComment: Comment = {
					...data.data.newComment,
					user: {
						id: user.id,
						username: user.name,
						avtUrl: user.avatar || null,
					},
				};
				setComments((prev) => [createdComment, ...prev]);
				setNewComment("");
				setCommentCount((c) => c + 1);
				toast.success("Đã thêm bình luận!");
			} else {
				toast.error(data.message || "Không thể thêm bình luận");
			}
		} catch (error) {
			console.error("Failed to create comment:", error);
			toast.error("Lỗi khi gửi bình luận");
		} finally {
			setSubmitting(false);
		}
	};

	const handleDeleteComment = async (commentId: string) => {
		if (!confirm("Bạn có chắc muốn xóa bình luận này?")) return;

		try {
			const res = await api.delete(`/comment/delete?commentId=${commentId}`);
			const data = await res.json();

			if (data.status) {
				setComments((prev) => prev.filter((c) => c.id !== commentId));
				setCommentCount((c) => c - 1);
				toast.success("Đã xóa bình luận!");
			} else {
				toast.error(data.message || "Không thể xóa bình luận");
			}
		} catch (error) {
			console.error("Failed to delete comment:", error);
			toast.error("Lỗi khi xóa bình luận");
		}
	};

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<div className="mt-4 border-t border-white/5 pt-4">
			{/* Toggle Button */}
			<button
				onClick={toggleExpanded}
				className="text-sm text-gray-400 hover:text-brand-orange transition-colors mb-3"
			>
				{expanded ? "Ẩn bình luận" : `Xem ${commentCount} bình luận`}
			</button>

			{expanded && (
				<>
					{/* Comment Form */}
					{user && (
						<form onSubmit={handleSubmitComment} className="flex gap-3 mb-4">
							<img
								src={user.avatar || "/default-avatar.png"}
								alt={user.name}
								className="w-8 h-8 rounded-full object-cover flex-shrink-0"
							/>
							<div className="flex-1 flex gap-2">
								<input
									type="text"
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									placeholder="Viết bình luận..."
									className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange/50"
									disabled={submitting}
								/>
								<button
									type="submit"
									disabled={submitting || !newComment.trim()}
									className="px-3 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									{submitting ? (
										<FaSpinner className="animate-spin" size={14} />
									) : (
										<FaPaperPlane size={14} />
									)}
								</button>
							</div>
						</form>
					)}

					{/* Comments List */}
					<div className="space-y-3 max-h-80 overflow-y-auto">
						{comments.map((comment) => (
							<div key={comment.id} className="flex gap-3 group">
								<div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-red-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden flex-shrink-0">
									{comment.user?.avtUrl ? (
										<img
											src={comment.user.avtUrl}
											alt={comment.user.username}
											className="w-full h-full object-cover"
										/>
									) : (
										comment.user?.username?.charAt(0).toUpperCase() || "?"
									)}
								</div>
								<div className="flex-1">
									<div className="bg-black/20 rounded-lg px-3 py-2">
										<div className="flex items-center justify-between">
											<span className="text-sm font-medium text-white">
												{comment.user?.username || "Ẩn danh"}
											</span>
											{user?.id === comment.userId && (
												<button
													onClick={() => handleDeleteComment(comment.id)}
													className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
													title="Xóa bình luận"
												>
													<FaTrash size={12} />
												</button>
											)}
										</div>
										<p className="text-gray-300 text-sm mt-1">
											{comment.content}
										</p>
									</div>
									<span className="text-xs text-gray-500 mt-1 block">
										{formatDistanceToNow(new Date(comment.createdAt), {
											addSuffix: true,
											locale: vi,
										})}
									</span>
								</div>
							</div>
						))}

						{loading && (
							<div className="flex justify-center py-2">
								<div className="w-6 h-6 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
							</div>
						)}

						{hasMore && !loading && comments.length > 0 && (
							<button
								onClick={() => fetchComments(false)}
								className="w-full text-center text-sm text-gray-400 hover:text-brand-orange py-2"
							>
								Tải thêm bình luận...
							</button>
						)}

						{!loading && comments.length === 0 && (
							<p className="text-center text-gray-500 text-sm py-4">
								Chưa có bình luận nào. Hãy là người đầu tiên!
							</p>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default CommentSection;
