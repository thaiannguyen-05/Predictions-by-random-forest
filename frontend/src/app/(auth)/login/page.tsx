// frontend/src/app/(auth)/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { Facebook } from 'lucide-react'; // Facebook vẫn dùng từ lucide-react

// Base URL của Backend NestJS để gọi API Social Login
const BACKEND_BASE_URL = 'http://localhost:3000'; 

const LoginPage: React.FC = () => {
  const [isLoginTab, setIsLoginTab] = useState(true); // true: Login, false: Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Xử lý đăng nhập/đăng ký bằng email/password thông thường
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLoginTab ? '/auth/login' : '/auth/register'; // Các API này sẽ do Backend cung cấp
    const payload = isLoginTab ? { email, password } : { email, password, confirmPassword };

    try {
      const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đã xảy ra lỗi!');
      }

      // Xử lý thành công: lưu token, chuyển hướng
      localStorage.setItem('accessToken', data.accessToken);
      alert(isLoginTab ? 'Đăng nhập thành công!' : 'Đăng ký thành công!');
      router.push('/'); // Chuyển hướng về trang chủ
    } catch (err: any) {
      setError(err.message || 'Lỗi mạng hoặc server không phản hồi.');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập bằng Google
  const handleGoogleLogin = () => {
    // Chuyển hướng người dùng đến endpoint Google OAuth của Backend NestJS
    window.location.href = `${BACKEND_BASE_URL}/auth/google`; 
  };

  // Xử lý đăng nhập bằng Facebook
  const handleFacebookLogin = () => {
    // Chuyển hướng người dùng đến endpoint Facebook OAuth của Backend NestJS
    window.location.href = `${BACKEND_BASE_URL}/auth/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="flex justify-center mb-6 border-b border-gray-700 pb-4">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`px-6 py-2 text-lg font-semibold rounded-t-lg transition-colors duration-200 ${
              isLoginTab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`px-6 py-2 text-lg font-semibold rounded-t-lg transition-colors duration-200 ${
              !isLoginTab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Đăng ký
          </button>
        </div>

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {isLoginTab ? 'Chào mừng đến với Stock Chart!' : 'Đăng ký với mạng xã hội'}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Chỉ hiện form khi là tab đăng nhập hoặc đăng ký */}
        {(isLoginTab || !isLoginTab) && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Mật khẩu</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {!isLoginTab && (
              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : (isLoginTab ? 'Đăng nhập' : 'Đăng ký')}
            </button>
          </form>
        )}

        {/* Đăng nhập/Đăng ký với Google/Facebook */}
        <div className="text-center text-gray-400 text-sm mb-6">
          {isLoginTab ? 'Hoặc đăng nhập với' : 'Chọn một mạng xã hội để đăng ký'}
        </div>
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            <FcGoogle size={20} className="mr-2" /> {isLoginTab ? 'Đăng nhập với Google' : 'Đăng ký với Google'}
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            <Facebook size={20} className="mr-2" /> {isLoginTab ? 'Đăng nhập với Facebook' : 'Đăng ký với Facebook'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;