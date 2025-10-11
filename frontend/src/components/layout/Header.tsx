'use client';

import React, { useEffect, useState } from 'react';
import UserDropdown from '../common/UserDropdown';
import Link from 'next/link';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

const Header: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('accessToken') ?? '';
      if (!token) {
        setCurrentUser(null);
        return;
      }

      try {
        const res = await fetch('http://localhost:4000/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
          cache: 'no-cache' // THÊM DÒNG NÀY: tránh cache
        });

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('accessToken');
          setCurrentUser(null);
          return;
        }

        if (!res.ok) {
          setCurrentUser(null);
          return;
        }

        const data = await res.json();
        console.log('User data from /auth/me:', data.user);

        // Xử lý avatar URL - THÊM TIMESTAMP để tránh cache
        let avatarUrl = data.user.avatar;
        if (avatarUrl && avatarUrl.startsWith('http')) {
          // Thêm timestamp để tránh browser cache
          avatarUrl += (avatarUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
        }

        console.log('Final avatar URL with cache busting:', avatarUrl);

        setCurrentUser({
          name: data.user.name || data.user.username || data.user.email,
          email: data.user.email,
          avatar: avatarUrl,
        });
      } catch (err) {
        console.error('Lỗi fetch user:', err);
        setCurrentUser(null);
      }
    }

    fetchUser();
  }, []);

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
