'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get('token');
    if (token) {
      localStorage.setItem('accessToken', token);
      router.push('/'); // về trang chủ
    } else {
      router.push('/login');
    }
  }, [params, router]);

  return <div className="text-white p-4">Đang xử lý đăng nhập...</div>;
}
