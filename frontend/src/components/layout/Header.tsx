// frontend/src/components/layout/Header.tsx
'use client'; 

import React from 'react';
import UserDropdown from '../common/UserDropdown'; 
// Không cần import User, LogOut, Settings ở đây vì chúng đã được dùng trong UserDropdown

const Header: React.FC = () => {
  // Dữ liệu giả lập người dùng đã đăng nhập
  const currentUser = { name: 'Nguyễn Văn A', email: 'vana@invest.com' };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* 1. Góc trên bên trái: Logo/Tên sản phẩm và Mô tả */}
      <div className="flex items-center cursor-pointer">
        <a href="/" className="flex flex-col"> {/* Dùng <a> để click về trang chủ */}
          {/* Dòng chữ biểu thị sản phẩm chính - Có thể đổi màu */}
          <span className="text-3xl font-extrabold text-blue-400 tracking-wider">
            STOCK<span className="text-green-400">TRACK</span>
          </span>
          {/* Dòng chữ nhỏ hơn mô tả trang web */}
          <span className="text-xs text-gray-500 mt-1 italic">
            Phân tích & Dự đoán Thị trường Chứng khoán
          </span>
        </a>
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