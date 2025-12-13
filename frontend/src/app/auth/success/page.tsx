'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

type AuthStatus = 'loading' | 'success' | 'error';

function AuthSuccessContent(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    async function handleAuth(): Promise<void> {
      try {
        const token = searchParams.get('token');
        const error = searchParams.get('error');

        // Handle OAuth error
        if (error) {
          setStatus('error');
          setErrorMessage(decodeURIComponent(error));
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
          return;
        }

        if (!token) {
          setStatus('error');
          setErrorMessage('Không tìm thấy token xác thực');
          setTimeout(() => {
            router.push('/auth/login');
          }, 3000);
          return;
        }

        // Save token to localStorage
        localStorage.setItem('accessToken', token);
        console.log('✅ Token saved from OAuth callback');

        // Refresh user data
        await refreshUser();

        setStatus('success');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);

      } catch (err) {
        console.error('❌ Auth error:', err);
        setStatus('error');
        setErrorMessage('Có lỗi xảy ra khi xác thực');
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    }

    handleAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl text-center max-w-md mx-4">
      {status === 'loading' && (
        <>
          <Loader2 className="w-16 h-16 text-brand-orange mx-auto mb-6 animate-spin" />
          <h2 className="text-2xl font-bold text-white mb-2">Đang xác thực...</h2>
          <p className="text-gray-400">Vui lòng đợi trong giây lát</p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Đăng nhập thành công!</h2>
          <p className="text-gray-400">Đang chuyển hướng đến Dashboard...</p>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Xác thực thất bại</h2>
          <p className="text-gray-400 mb-4">{errorMessage}</p>
          <p className="text-sm text-gray-500">Đang chuyển về trang đăng nhập...</p>
        </>
      )}
    </div>
  );
}

function LoadingFallback(): JSX.Element {
  return (
    <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 p-12 rounded-3xl shadow-2xl text-center max-w-md mx-4">
      <Loader2 className="w-16 h-16 text-brand-orange mx-auto mb-6 animate-spin" />
      <h2 className="text-2xl font-bold text-white mb-2">Đang tải...</h2>
      <p className="text-gray-400">Vui lòng đợi trong giây lát</p>
    </div>
  );
}

export default function AuthSuccess(): JSX.Element {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-dark via-gray-900 to-brand-dark">
      <Suspense fallback={<LoadingFallback />}>
        <AuthSuccessContent />
      </Suspense>
    </div>
  );
}
