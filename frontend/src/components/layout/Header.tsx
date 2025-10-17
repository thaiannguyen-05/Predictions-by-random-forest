'use client';

import React from 'react';
import UserDropdown from '../common/UserDropdown';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { user: currentUser, loading } = useAuth();

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
          <Link
            href="/auth/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition duration-200"
          >
            Đăng nhập
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
