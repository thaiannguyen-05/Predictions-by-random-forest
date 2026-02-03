"use client";

import React, { useRef } from "react";
import Header from "@/components/layout/Header";
import CreatePostForm from "@/components/blog/CreatePostForm";
import PostList, { PostListHandle } from "@/components/blog/PostList";

const BlogPage = () => {
	const postListRef = useRef<PostListHandle>(null);

	const handlePostCreated = () => {
		
		postListRef.current?.refresh();
	};

	return (
		<div className="min-h-screen bg-brand-dark text-white font-sans pb-20">
			<Header />

			{}
			<div className="pt-24 md:pt-28 px-4 md:px-0">
				<div className="max-w-3xl mx-auto">

					{}
					<div className="mb-8 text-center md:text-left">
						<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
							Cộng đồng & Nhận định
						</h1>
						<p className="text-gray-400 text-sm mt-1">Cập nhật tin tức thị trường và chia sẻ góc nhìn của bạn.</p>
					</div>

					{}
					<CreatePostForm onPostCreated={handlePostCreated} />

					{}
					<PostList ref={postListRef} />

				</div>
			</div>
		</div>
	);
};

export default BlogPage;
