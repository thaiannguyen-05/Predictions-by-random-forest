"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Lưu token vào localStorage
      localStorage.setItem("accessToken", token);

      // Chuyển về trang chủ
      router.push("/");
    } else {
      // Nếu không có token thì quay về trang đăng nhập
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center text-white bg-gray-900">
      Đang đăng nhập...
    </div>
  );
}
