'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Shield, LogOut, Edit, Phone, Save, X, Calendar, AlertCircle, CheckCircle, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/utils/api';

export default function ProfilePage() {
	const { user, logout, refreshUser } = useAuth();
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		username: '',
		avtUrl: ''
	});

	const handleLogout = async () => {
		try {
			await api.patch('/auth/logout');
		} catch (error) {
			console.error('Logout error:', error);
		} finally {
			logout();
			router.push('/auth/login');
		}
	};

	const startEditing = () => {
		if (user) {
			setFormData({
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				phoneNumber: user.phone || '',
				username: user.name === user.email ? '' : (user.name || ''),
				avtUrl: user.avatar || ''
			});
			setIsEditing(true);
			setStatus({ type: null, message: '' });
		}
	};

	const cancelEditing = () => {
		setIsEditing(false);
		setIsLoading(false);
		setStatus({ type: null, message: '' });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Generate a unique upload ID
		const uploadId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
		const chunkSize = 10 * 1024; // 10KB chunks as requested
		const totalChunks = Math.ceil(file.size / chunkSize);

		try {
			let finalUrl = '';

			for (let i = 0; i < totalChunks; i++) {
				const start = i * chunkSize;
				const end = Math.min(file.size, start + chunkSize);
				const chunk = file.slice(start, end);

				const uploadFormData = new FormData();
				uploadFormData.append('file', chunk);
				uploadFormData.append('index', i.toString());
				uploadFormData.append('total', totalChunks.toString());
				uploadFormData.append('uploadId', uploadId);
				uploadFormData.append('originalname', file.name);

				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/user/upload-avatar-chunk`, {
					method: 'POST',
					body: uploadFormData,
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
					}
				});

				if (!res.ok) {
					throw new Error(`Upload failed at chunk ${i}`);
				}

				const data = await res.json();
				if (data.url) {
					finalUrl = data.url;
				}
			}

			if (finalUrl) {
				setFormData(prev => ({ ...prev, avtUrl: finalUrl }));
				setStatus({ type: 'success', message: 'Tải ảnh thành công!' });
				setTimeout(() => setStatus({ type: null, message: '' }), 3000);
			}

		} catch (error) {
			console.error('Avatar upload error:', error);
			setStatus({ type: 'error', message: 'Không thể tải ảnh lên.' });
		}
	};

	const handleSave = async () => {
		setIsLoading(true);
		setStatus({ type: null, message: '' });

		try {
			const res = await api.put('/user/change-detail-user', {
				firstName: formData.firstName,
				lastName: formData.lastName,
				phoneNumber: formData.phoneNumber,
				avtUrl: formData.avtUrl
			});

			if (res.ok) {
				await refreshUser();
				setIsEditing(false);
				setStatus({ type: 'success', message: 'Cập nhật hồ sơ thành công!' });

				// Clear success message after 3 seconds
				setTimeout(() => setStatus({ type: null, message: '' }), 3000);
			} else {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Cập nhật thất bại.');
			}
		} catch (error: any) {
			console.error('Error updating profile:', error);
			setStatus({ type: 'error', message: error.message || 'Đã xảy ra lỗi khi cập nhật.' });
		} finally {
			setIsLoading(false);
		}
	};

	if (!user) {
		return (
			<div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-gray-400">Đang tải thông tin...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-brand-dark text-white p-6 md:p-12 pt-28">
			<div className="max-w-4xl mx-auto">
				{/* Profile Header */}
				<div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 mb-8 relative overflow-hidden group hover:border-brand-orange/30 transition-all duration-300 animate-fade-in">
					<div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-900/20 to-brand-dark/0 pointer-events-none"></div>

					<div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
						{/* Avatar */}
						<div className="relative animate-pop-in group/avatar">
							<div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-brand-orange to-orange-900 shadow-2xl shadow-brand-orange/20 relative">
								<img
									src={isEditing && formData.avtUrl ? formData.avtUrl : (user.avatar || '/default-avatar.png')}
									alt={user.name}
									className="w-full h-full rounded-full object-cover bg-gray-900 border-4 border-gray-900"
								/>

								{/* Camera Overlay for Editing */}
								{isEditing && (
									<div
										onClick={() => fileInputRef.current?.click()}
										className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition-opacity"
									>
										<Camera size={32} className="text-white drop-shadow-lg" />
									</div>
								)}
								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept="image/*"
									onChange={handleFileChange}
								/>
							</div>
						</div>

						{/* Info */}
						<div
							className="flex-1 text-center md:text-left mt-4 md:mt-2 opacity-0 animate-slide-in-right"
							style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
						>
							<h1 className="text-3xl font-bold mb-2 flex items-center justify-center md:justify-start gap-3">
								{user.name}
								<span className="px-3 py-1 bg-brand-orange/20 text-brand-orange text-xs rounded-full font-medium border border-brand-orange/20">
									Member
								</span>
							</h1>
							<p className="text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2">
								<Mail size={16} className="text-gray-500" />
								{user.email}
							</p>

							{/* Status Message */}
							{status.message && (
								<div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm max-w-md md:max-w-none mx-auto md:mx-0 ${status.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
									} `}>
									{status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
									{status.message}
								</div>
							)}

							<div className="flex flex-wrap gap-3 justify-center md:justify-start">
								{!isEditing ? (
									<>
										<button
											onClick={startEditing}
											className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl font-medium transition-all shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 flex items-center gap-2"
										>
											<Edit size={18} />
											Chỉnh sửa hồ sơ
										</button>
										<button
											onClick={handleLogout}
											className="px-6 py-2.5 bg-gray-800 hover:bg-red-500/10 hover:text-red-500 border border-gray-700 text-gray-300 rounded-xl font-medium transition-all flex items-center gap-2 group/logout"
										>
											<LogOut size={18} className="group-hover/logout:text-red-500" />
											Đăng xuất
										</button>
									</>
								) : (
									<>
										<button
											onClick={handleSave}
											disabled={isLoading}
											className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all shadow-lg flex items-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
										>
											{isLoading ? (
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											) : (
												<Save size={18} />
											)}
											{isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
										</button>
										<button
											onClick={cancelEditing}
											disabled={isLoading}
											className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-all flex items-center gap-2 disabled:bg-gray-800 disabled:cursor-not-allowed"
										>
											<X size={18} />
											Hủy
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Details Grid */}
				<div
					className="grid md:grid-cols-2 gap-6 opacity-0 animate-fade-in"
					style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
				>
					<div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
						<h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
							<User size={20} className="text-brand-orange" />
							Thông tin cá nhân
						</h3>

						<div className="space-y-4">
							{/* Display or Edit First Name */}
							<div className="group">
								<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Họ (Last Name)</label>
								{isEditing ? (
									<input
										type="text"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
										className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
										placeholder="Nhập họ"
									/>
								) : (
									<div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-800 transition-colors">
										<User size={18} className="text-gray-400" />
										<span className="text-gray-200">{user.lastName || '(Chưa cập nhật)'}</span>
									</div>
								)}
							</div>

							{/* Display or Edit Last Name */}
							<div className="group">
								<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Tên (First Name)</label>
								{isEditing ? (
									<input
										type="text"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
										className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
										placeholder="Nhập tên"
									/>
								) : (
									<div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-800 transition-colors">
										<User size={18} className="text-gray-400" />
										<span className="text-gray-200">{user.firstName || '(Chưa cập nhật)'}</span>
									</div>
								)}
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Số điện thoại</label>
								{isEditing ? (
									<input
										type="text"
										name="phoneNumber"
										value={formData.phoneNumber}
										onChange={handleChange}
										className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
										placeholder="Nhập số điện thoại"
									/>
								) : (
									<div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-800 transition-colors">
										<Phone size={18} className="text-gray-400" />
										<span className="text-gray-200">{user.phone || '(Chưa cập nhật)'}</span>
									</div>
								)}
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
								<div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-800 transition-colors opacity-70 cursor-not-allowed">
									<Mail size={18} className="text-gray-400" />
									<span className="text-gray-200">{user.email}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-colors">
						<h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
							<Shield size={20} className="text-brand-orange" />
							Bảo mật & Tài khoản
						</h3>

						<div className="space-y-4">
							<div className="group">
								<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">ID Người dùng</label>
								<div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-800 transition-colors">
									<span className="text-gray-400 font-mono text-sm">#</span>
									<span className="text-gray-200 font-mono text-sm truncate">{user.id}</span>
								</div>
							</div>

							<div className="group">
								<label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Trạng thái tài khoản</label>
								<div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-800 transition-colors">
									<div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
									<span className="text-gray-200">Đang hoạt động</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

