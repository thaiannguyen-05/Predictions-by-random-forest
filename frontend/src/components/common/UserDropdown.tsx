'use client';

import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

interface UserDropdownProps {
  user: UserData;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/auth/logout', {
        method: 'PATCH',
        credentials: 'include',
      });

      localStorage.removeItem('accessToken');
      setIsOpen(false);
      window.location.href = '/auth/login';
    } catch (err) {
      console.error('Lỗi đăng xuất:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-700 transition duration-150 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-blue-500">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Khi avatar load lỗi, ẩn img và hiển thị chữ cái
                console.log('Avatar load failed, showing fallback initial');
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : null}

          {/* Hiển thị chữ cái khi không có avatar hoặc avatar load lỗi */}
          {(!user.avatar || user.avatar === '') && (
            <span className="text-sm font-semibold text-white">
              {user.name[0].toUpperCase()}
            </span>
          )}
        </div>
        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-xl z-50 border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <div className="py-1">
            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} className="mr-3 text-blue-400" />
              Thông tin Tài khoản
            </a>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
            >
              <LogOut size={18} className="mr-3 text-red-400" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export default UserDropdown;
