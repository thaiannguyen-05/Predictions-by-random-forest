'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LogOut, Settings, User } from 'lucide-react';

interface UserData {
  name: string;
  email?: string;
  avatar?: string;
}

interface Props {
  user: UserData;
}

const UserDropdown: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gọi API logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Logout failed: ${response.status}`);

      const result = await response.json();
      if (result.status) {
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar + Tên */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition"
      >
        <img
          src={!imageError ? (user.avatar || '/default-avatar.png') : '/default-avatar.png'}
          alt={user.name}
          className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
        />
        <span className="text-white font-medium">{user.name}</span>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700 overflow-hidden animate-fade-in z-50">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="font-semibold">{user.name}</p>
            {user.email && (
              <p className="text-sm text-gray-400 truncate">{user.email}</p>
            )}
          </div>

          <button
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition"
            onClick={() => alert('Trang cá nhân đang phát triển')}
          >
            <User size={16} /> Trang cá nhân
          </button>

          <button
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition"
            onClick={() => alert('Cài đặt đang phát triển')}
          >
            <Settings size={16} /> Cài đặt
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-600 text-red-400 hover:text-white transition"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
