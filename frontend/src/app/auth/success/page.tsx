'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthSuccess() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    async function handleAuth() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        console.log("✅ Token saved from URL");
        localStorage.setItem('accessToken', token);
        
        // Refresh the user data
        await refreshUser();

        // Redirect sau khi login thành công
        router.push('/dashboard');
      } else {
        console.error("❌ No token found in URL");
        router.push('/auth/login');
      }
    }

    handleAuth();
  }, [router, refreshUser]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-xl animate-pulse">🔐 Initializing authentication...</div>
    </div>
  );
}
