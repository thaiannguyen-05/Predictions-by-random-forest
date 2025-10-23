"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email");

  const [email, setEmail] = useState(emailFromParams || "");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0);

  // Countdown timer cho resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email là bắt buộc");
      return;
    }

    if (!code.trim() || code.length !== 6) {
      setError("Mã xác thực phải có 6 chữ số");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          code: code.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Xác thực email thành công! Bây giờ bạn có thể đăng nhập.");

        // Redirect đến login page sau 3 giây
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setError(data.message || "Xác thực thất bại. Vui lòng thử lại.");
      }
    } catch (err: any) {
      setError("Lỗi kết nối đến server. Vui lòng thử lại.");
      console.error("Verify error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Đã gửi lại mã xác thực. Vui lòng kiểm tra email.");
        setCountdown(60); // 60 giây countdown
      } else {
        setError(data.message || "Gửi lại mã thất bại. Vui lòng thử lại.");
      }
    } catch (err: any) {
      setError("Lỗi kết nối đến server. Vui lòng thử lại.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    // Chỉ cho phép nhập số và giới hạn 6 ký tự
    const numericValue = value.replace(/\D/g, "").slice(0, 6);
    setCode(numericValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Xác thực Email</h2>
          <p className="text-gray-400 mt-2">
            Nhập mã xác thực đã được gửi đến email của bạn
          </p>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email của bạn"
              required
              disabled={!!emailFromParams}
            />
            {emailFromParams && (
              <p className="text-gray-400 text-xs mt-1">
                Email đã được tự động điền từ quá trình đăng ký
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="code"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Mã xác thực (6 số)
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl font-mono tracking-widest"
              placeholder="000000"
              maxLength={6}
              required
            />
            <p className="text-gray-400 text-xs mt-2 text-center">
              Vui lòng kiểm tra hộp thư email và nhập mã 6 số
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xác thực...
              </span>
            ) : (
              "Xác thực Email"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendCode}
            disabled={resendLoading || countdown > 0}
            className="text-blue-500 hover:text-blue-400 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {resendLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                Đang gửi...
              </span>
            ) : countdown > 0 ? (
              `Gửi lại sau ${countdown}s`
            ) : (
              "Gửi lại mã xác thực"
            )}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="text-gray-400 text-sm text-center">
            <p className="mb-2">📧 Mẹo:</p>
            <ul className="text-left space-y-1">
              <li>• Kiểm tra thư mục spam nếu không thấy email</li>
              <li>• Mã xác thực có thời hạn 10 phút</li>
              <li>• Nhập chính xác mã 6 số</li>
            </ul>
          </div>
        </div>

        <div className="text-gray-400 text-sm text-center mt-6">
          Quay lại{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-500 hover:underline font-medium"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
