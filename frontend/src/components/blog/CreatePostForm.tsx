"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FaImage, FaSmile, FaPaperPlane, FaTimes } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";

interface CreatePostFormProps {
	onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
	const { user } = useAuth();
	const [content, setContent] = useState("");
	const [title, setTitle] = useState(""); // Title is required by backend DTO
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || !title.trim()) {
			toast.error("Vui lòng nhập cả tiêu đề và nội dung!");
			return;
		}

		if (!user) {
			toast.error("Vui lòng đăng nhập để đăng bài!");
			return;
		}

		setLoading(true);
		try {
			const res = await api.post("/post/create", {
				title,
				content,
				file: [], // Hiện tại chưa làm upload file thực tế
			});

			const data = await res.json();

			if (data.status) {
				toast.success("Đăng bài thành công!");
				setContent("");
				setTitle("");
				onPostCreated(); // Refresh list
			} else {
				toast.error(data.message || "Có lỗi xảy ra");
			}
		} catch (error) {
			console.error(error);
			toast.error("Lỗi kết nối đến server");
		} finally {
			setLoading(false);
		}
	};

	const handleReset = () => {
		setContent("");
		setTitle("");
	};

	return (
		<div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-4 md:p-6 mb-8 shadow-xl">
			<h3 className="text-lg font-semibold text-white mb-4 border-b border-white/5 pb-2">
				Tạo bài viết mới
			</h3>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				{/* Title Input */}
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Tiêu đề bài viết..."
					className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-all font-medium"
				/>

				{/* Content Input */}
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Nội dung bạn muốn chia sẻ..."
					className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 min-h-[120px] focus:outline-none focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/50 transition-all resize-none"
				/>


				{/* Actions */}
				<div className="flex justify-between items-center pt-2">
					<div className="flex gap-2">
						<button type="button" className="p-2 text-gray-400 hover:text-brand-orange hover:bg-white/5 rounded-full transition-colors" title="Thêm ảnh">
							<FaImage size={18} />
						</button>
						<button type="button" className="p-2 text-gray-400 hover:text-brand-orange hover:bg-white/5 rounded-full transition-colors" title="Thêm emoji">
							<FaSmile size={18} />
						</button>
					</div>

					<div className="flex gap-3">
						<button
							type="button"
							onClick={handleReset}
							className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
						>
							<FaTimes size={14} />
							<span>Làm lại</span>
						</button>

						<button
							type="submit"
							disabled={loading}
							className="flex items-center gap-2 px-6 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-semibold shadow-lg shadow-brand-orange/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
						>
							{loading ? (
								<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
							) : (
								<FaPaperPlane size={14} />
							)}
							<span>Đăng bài</span>
						</button>
					</div>
				</div>
			</form>

			<div className="mt-3 text-right">
				<span className="text-[10px] text-blue-400 hover:underline cursor-pointer">* Quy định về nội dung đăng tải trên mạng xã hội StockDN</span>
			</div>
		</div>
	);
};

export default CreatePostForm;
