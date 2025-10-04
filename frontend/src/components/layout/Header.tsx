// frontend/src/components/layout/Header.tsx
'use client'; 

import React, { useEffect, useState } from 'react'; // Import useState và useEffect
import UserDropdown from '../common/UserDropdown'; 
import Link from 'next/link'; // Import Link từ Next.js để điều hướng

const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null); // State để lưu thông tin người dùng

  useEffect(() => {
    // Trong thực tế, bạn sẽ kiểm tra accessToken trong localStorage/cookies
    // và fetch thông tin người dùng từ Backend nếu token còn hợp lệ.
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Giả lập đã đăng nhập
      setCurrentUser({ name: 'Nguyễn Văn A', email: 'vana@invest.com' });
      // TODO: Call API Backend để xác thực token và lấy thông tin user thật
    } else {
      setCurrentUser(null);
    }
  }, []); // Chỉ chạy một lần khi component mount

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center cursor-pointer">
        <Link href="/" className="flex flex-col">
          <span className="text-3xl font-extrabold text-blue-400 tracking-wider">
            STOCK<span className="text-green-400">TRACK</span>
          </span>
          <span className="text-xs text-gray-500 mt-1 italic">
            Phân tích & Dự đoán Thị trường Chứng khoán
          </span>
        </Link>
      </div>

      <div className="relative">
        {currentUser ? (
          <UserDropdown user={currentUser} />
        ) : (
          <Link href="/login" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-200">
            Đăng nhập
          </Link> // Dùng Link để điều hướng đến trang đăng nhập
        )}
      </div>
    </header>
  );
};

export default Header;