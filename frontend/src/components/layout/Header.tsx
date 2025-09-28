'use client';

import React from 'react';
import { User, LogOut, Settings } from 'lucide-react'; // Icon
import UserDropdown from '../common/UserDropdown'; // Sẽ tạo ở bước 4

const Header: React.FC = () => {
  // Dữ liệu giả lập người dùng đã đăng nhập
  const currentUser = { name: 'Nguyễn Văn A', email: 'vana@invest.com' };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* 1. Góc trên bên trái: Logo trang web */}
      <div className="flex items-center cursor-pointer">
        <span className="text-2xl font-extrabold text-blue-400 tracking-wider">
          STOCK<span className="text-green-400">TRACK</span>
        </span>
      </div>

      {/* 2. Góc trên bên phải: Tài khoản đã đăng nhập */}
      <div className="relative">
        {currentUser ? (
          <UserDropdown user={currentUser} />
        ) : (
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-200">
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;