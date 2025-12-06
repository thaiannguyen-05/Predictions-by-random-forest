"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Calendar, Phone, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMode, setSuccessMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic Validation Frontend
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      setIsLoading(false);
      return;
    }

    // Password regex check (optional if backend handles it well, but nice to simple check)
    if (formData.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      setIsLoading(false);
      return;
    }

    // Construct Payload for Backend DTO
    const payload = {
      email: formData.email,
      username: formData.username,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth, // YYYY-MM-DD from input[type=date]
    };

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Backend có thể trả về message dạng array hoặc string
        const msg = Array.isArray(data.message) ? data.message[0] : (data.message || "Đăng ký thất bại");
        throw new Error(msg);
      }

      // Redirect to Verify Page
      router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`);

    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  // FORM UI
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group">
          <span className="text-3xl font-extrabold text-white tracking-widest block">
            STOCK<span className="text-brand-orange">DN</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">Tạo tài khoản mới</h1>
        <p className="text-gray-400 text-sm mt-1">
          Bắt đầu hành trình đầu tư thông minh cùng AI
        </p>
      </div>

      <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center font-medium animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Họ & Tên đệm</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input type="text" name="firstName" required className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="Nguyễn Văn" value={formData.firstName} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Tên</label>
              <input type="text" name="lastName" required className="w-full px-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="A" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>

          {/* Row 2: Username & Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Tên đăng nhập (Username)</label>
            <input type="text" name="username" required minLength={3} className="w-full px-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="nguyenvana123" value={formData.username} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3.5 text-gray-500" />
              <input type="email" name="email" required className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="email@example.com" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          {/* Row 3: Phone & DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Số điện thoại</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input type="tel" name="phoneNumber" className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="0901234567" value={formData.phoneNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Ngày sinh</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input type="date" name="dateOfBirth" required className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all [color-scheme:dark]" value={formData.dateOfBirth} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Row 4: Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3.5 text-gray-500" />
                <input type="password" name="password" required className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="••••••••" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Xác nhận mật khẩu</label>
              <input type="password" name="confirmPassword" required className="w-full px-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-orange to-red-500 hover:from-orange-500 hover:to-red-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Đăng Ký Tài Khoản <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

        </form>

        <div className="mt-8 text-center border-t border-gray-700/50 pt-6">
          <p className="text-gray-400 text-sm">
            Đã có tài khoản?{" "}
            <Link href="/auth/login" className="text-brand-orange font-bold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
