"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    access: "", 
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      
      
      if (data.data && data.data.isActive === false) {
        setError("Tài khoản chưa được kích hoạt. Chuyển hướng xác thực...");

        
        const emailToVerify = data.data.email || (formData.access.includes("@") ? formData.access : "");

        setTimeout(() => {
          router.push(`/auth/verify-email?email=${encodeURIComponent(emailToVerify)}`);
        }, 1500);
        return; 
      }

      
      if (data.tokens?.accessToken) {
        localStorage.setItem("accessToken", data.tokens.accessToken);
      }

      
      await refreshUser();

      
      router.push("/dashboard");

    } catch (err: any) {
      console.error("Login error:", err);
      const msg = err.message || "";

      
      if (
        msg.toLowerCase().includes("active") ||
        msg.toLowerCase().includes("verify") ||
        msg.toLowerCase().includes("activation")
      ) {
        setError("Tài khoản chưa kích hoạt. Đang chuyển đến trang xác thực...");
        setTimeout(() => {
          
          const isEmail = formData.access.includes("@");
          const query = isEmail ? `?email=${encodeURIComponent(formData.access)}` : "";
          router.push(`/auth/verify-email${query}`);
        }, 1500);
      } else {
        setError(msg || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group">
          <span className="text-4xl font-extrabold text-white tracking-widest transition-transform duration-300 group-hover:scale-105 block">
            STOCK<span className="text-brand-orange">DN</span>
          </span>
        </Link>
        <p className="text-gray-400 mt-2 text-sm">
          Chào mừng trở lại! Đăng nhập để tiếp tục.
        </p>
      </div>

      {}
      <div className="bg-brand-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm text-center font-medium animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email hoặc Tên đăng nhập</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500 group-focus-within:text-brand-orange transition-colors" />
              </div>
              <input
                type="text"
                name="access"
                required
                className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                placeholder="nhadautu@example.com"
                value={formData.access}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-300">Mật khẩu</label>
              <a href="#" className="text-xs text-brand-orange hover:text-orange-400 transition-colors">Quên mật khẩu?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500 group-focus-within:text-brand-orange transition-colors" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-brand-dark/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-orange to-red-500 hover:from-orange-500 hover:to-red-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Đăng Nhập <ArrowRight size={20} />
              </>
            )}
          </button>

          {}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Hoặc</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {}
          {}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => (window.location.href = `${API_BASE}/auth/google`)}
              className="flex items-center justify-center py-2.5 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              <span className="text-sm text-gray-300 font-medium">Google</span>
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = `${API_BASE}/auth/facebook`)}
              className="flex items-center justify-center py-2.5 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors gap-2"
            >
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                className="w-5 h-5"
                alt="Facebook"
              />
              <span className="text-sm text-gray-300 font-medium">Facebook</span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/auth/register" className="text-brand-orange font-bold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
