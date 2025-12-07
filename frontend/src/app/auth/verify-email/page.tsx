"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

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

  useEffect(() => {
    if (emailFromParams) setEmail(emailFromParams);
  }, [emailFromParams]);

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
        credentials: "include",
        body: JSON.stringify({
          to: email.trim(),
          code: code.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Xác thực thành công! Đang chuyển đến trang đăng nhập...");

        // Redirect đến login page sau 1.5 giây
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
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
      const response = await fetch(`${API_URL}/email/send-verify-code-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email.trim() }),
      });

      if (response.ok) {
        setSuccess("Đã gửi lại mã xác thực. Vui lòng kiểm tra email.");
        setCountdown(60);
      } else {
        const data = await response.json();
        setError(data.message || "Không thể gửi lại mã lúc này. Vui lòng thử lại sau.");
      }
    } catch (err: any) {
      setError("Lỗi kết nối đến server.");
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
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group">
          <span className="text-3xl font-extrabold text-white tracking-widest block">
            STOCK<span className="text-brand-orange">DN</span>
          </span>
        </Link>
        <p className="text-gray-400 mt-2 text-sm">
          Xác thực tài khoản để bắt đầu
        </p>
      </div>

      <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Mail size={32} className="text-brand-orange" />
          </div>
          <h2 className="text-2xl font-bold text-white">Xác thực Email</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Nhập mã 6 số đã gửi tới <span className="text-brand-orange font-medium">{email || "email của bạn"}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center font-medium animate-fade-in mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-xl text-sm text-center font-medium animate-fade-in mb-4 flex items-center justify-center gap-2">
            <CheckCircle2 size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
              placeholder="nhadautu@example.com"
              required
              disabled={!!emailFromParams}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Mã xác thực</label>
            <input
              type="text"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full px-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange text-center text-3xl font-mono tracking-[0.5em] transition-all"
              placeholder="000000"
              maxLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-orange to-red-500 hover:from-orange-500 hover:to-red-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Xác Thực Tài Khoản"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendCode}
            disabled={resendLoading || countdown > 0}
            className="text-brand-orange hover:text-orange-400 text-sm font-medium disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {resendLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 size={14} className="animate-spin mr-2" /> Đang gửi...
              </span>
            ) : countdown > 0 ? (
              `Gửi lại mã sau ${countdown}s`
            ) : (
              "Chưa nhận được mã? Gửi lại"
            )}
          </button>
        </div>

        <div className="mt-8 text-center border-t border-gray-700/50 pt-6">
          <Link href="/auth/login" className="text-gray-400 hover:text-white text-sm transition-colors">
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
