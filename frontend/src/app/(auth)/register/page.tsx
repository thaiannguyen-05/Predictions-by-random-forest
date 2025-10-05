'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { Facebook } from 'lucide-react';

const BACKEND_BASE_URL = 'http://localhost:3000';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Đăng ký thất bại');

      alert('Đăng ký thành công! Bạn có thể đăng nhập.');
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_BASE_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${BACKEND_BASE_URL}/auth/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Đăng ký tài khoản</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>
        </form>

        <div className="text-center text-gray-400 text-sm mb-4">
          Hoặc đăng ký với
        </div>
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <FcGoogle size={20} className="mr-2" /> Đăng ký với Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Facebook size={20} className="mr-2" /> Đăng ký với Facebook
          </button>
        </div>

        <div className="text-gray-400 text-sm text-center mt-6">
          Đã có tài khoản?{' '}
          <button
            onClick={() => router.push('/login')}
            className="text-blue-500 hover:underline"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
