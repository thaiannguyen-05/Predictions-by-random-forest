"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Facebook } from "lucide-react";

// QUAN TRỌNG: Sửa thành port 4000
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(
    "Đang kiểm tra kết nối..."
  );

  // Kiểm tra kết nối backend khi component mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        console.log(`🔍 Kiểm tra backend tại: ${API_URL}/auth/login`);
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "OPTIONS",
          headers: { "Content-Type": "application/json" },
        });

        console.log(`📡 Backend response status: ${response.status}`);

        if (response.status !== 404) {
          setBackendStatus("✅ Đã kết nối đến backend");
        } else {
          setBackendStatus("❌ Backend không khả dụng");
        }
      } catch (err) {
        console.error("❌ Lỗi kết nối backend:", err);
        setBackendStatus("❌ Không thể kết nối đến backend");
      }
    };

    checkBackend();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      return;
    }

    setLoading(true);

    try {
      console.log("📤 Đang gửi request đến:", `${API_URL}/auth/login`);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          access: email, // backend chấp nhận email hoặc username
          password,
        }),
      });

      console.log("📥 Response status:", response.status);
      console.log("📥 Response ok:", response.ok);

      // Kiểm tra content type
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log("📥 Response data:", data);

        if (!response.ok) {
          throw new Error(
            data.message || `Đăng nhập thất bại: ${response.status}`
          );
        }

        // ✅ Kiểm tra và lưu token
        if (!data.tokens?.accessToken) {
          throw new Error("Không nhận được accessToken từ server");
        }

        // Lưu token vào localStorage
        localStorage.setItem("accessToken", data.tokens.accessToken);

        // Lưu thông tin user
        if (data.data) {
          localStorage.setItem("user", JSON.stringify(data.data));
        }

        // Lưu session info nếu có
        if (data.session) {
          localStorage.setItem("session", JSON.stringify(data.session));
        }

        // Gửi sự kiện để các component khác biết có token mới
        window.dispatchEvent(new Event("storage"));

        console.log("✅ Đăng nhập thành công, chuyển hướng đến dashboard");

        // ✅ Redirect về dashboard
        router.push("/dashboard");
      } else {
        // Xử lý response không phải JSON
        const textResponse = await response.text();
        console.error("❌ Server trả về HTML:", textResponse.substring(0, 500));

        if (response.status === 404) {
          throw new Error(
            "Endpoint không tồn tại. Kiểm tra lại đường dẫn API."
          );
        } else {
          throw new Error(
            `Lỗi server: ${response.status} - ${response.statusText}`
          );
        }
      }
    } catch (err: any) {
      console.error("🔥 Lỗi đăng nhập:", err);

      // Hiển thị thông báo lỗi thân thiện
      if (err.message.includes("fetch") || err.message.includes("Network")) {
        setError(
          "Không thể kết nối đến server. Vui lòng kiểm tra:\n- Backend có đang chạy trên port 4000?\n- Kết nối mạng"
        );
      } else if (err.message.includes("401") || err.message.includes("403")) {
        setError("Email hoặc mật khẩu không chính xác");
      } else if (err.message.includes("404")) {
        setError("Endpoint không tồn tại. Kiểm tra lại đường dẫn API.");
      } else {
        setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (backendStatus.includes("❌")) {
      setError("Backend chưa sẵn sàng. Vui lòng kiểm tra server.");
      return;
    }
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    if (backendStatus.includes("❌")) {
      setError("Backend chưa sẵn sàng. Vui lòng kiểm tra server.");
      return;
    }
    window.location.href = `${API_URL}/auth/facebook`;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "email") {
      setEmail(value);
      setEmailError("");
    } else if (field === "password") {
      setPassword(value);
    }

    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Đăng nhập
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4 whitespace-pre-line">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Email hoặc tên đăng nhập
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                emailError ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Nhập email hoặc tên đăng nhập"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || backendStatus.includes("❌")}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xử lý...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="text-center text-gray-400 text-sm mb-4">
          Hoặc đăng nhập với
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={backendStatus.includes("❌")}
            className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle size={20} className="mr-2" /> Đăng nhập với Google
          </button>

          <button
            onClick={handleFacebookLogin}
            disabled={backendStatus.includes("❌")}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Facebook size={20} className="mr-2" /> Đăng nhập với Facebook
          </button>
        </div>

        <div className="text-gray-400 text-sm text-center mt-6">
          Chưa có tài khoản?{" "}
          <button
            onClick={() => router.push("/auth/register")}
            className="text-blue-500 hover:underline font-medium"
          >
            Đăng ký ngay
          </button>
        </div>

        {/* Forgot password link */}
        <div className="text-gray-400 text-sm text-center mt-4">
          Quên mật khẩu?{" "}
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="text-blue-500 hover:underline font-medium"
          >
            Khôi phục mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
