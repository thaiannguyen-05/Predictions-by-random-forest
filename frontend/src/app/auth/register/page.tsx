"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { Facebook } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL_AUTH || "http://localhost:4000";

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState(
    "Đang kiểm tra kết nối..."
  );

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          method: "OPTIONS",
          headers: { "Content-Type": "application/json" },
        });

        if (response.status !== 404) {
          setBackendStatus("✅ Đã kết nối đến backend");
        } else {
          setBackendStatus("❌ Backend không khả dụng");
        }
      } catch (err) {
        setBackendStatus("❌ Không thể kết nối đến backend");
      }
    };

    checkBackend();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    setError("");
    setEmailError("");
    setUsernameError("");

    if (!validateEmail(formData.email)) {
      setEmailError("Email không hợp lệ");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return false;
    }

    if (!formData.username.trim()) {
      setUsernameError("Tên đăng nhập là bắt buộc");
      return false;
    }

    if (formData.username.length < 3) {
      setUsernameError("Tên đăng nhập phải có ít nhất 3 ký tự");
      return false;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setUsernameError(
        "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới"
      );
      return false;
    }

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Họ và tên là bắt buộc");
      return false;
    }

    if (!formData.dateOfBirth) {
      setError("Ngày sinh là bắt buộc");
      return false;
    }

    // Kiểm tra tuổi (ít nhất 13 tuổi)
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13) {
      setError("Bạn phải đủ 13 tuổi trở lên để đăng ký");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dateOfBirth: formData.dateOfBirth,
        ...(formData.phoneNumber && {
          phoneNumber: formData.phoneNumber.trim(),
        }),
      };

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        // Chuyển hướng đến trang verify email với email làm parameter
        router.push(
          `/auth/verify-email?email=${encodeURIComponent(formData.email)}`
        );
        return;
      } else {
        // Xử lý lỗi từ server
        if (response.status === 409) {
          const errorMessage = data.message.toLowerCase();
          if (errorMessage.includes("email")) {
            setError("Email này đã được sử dụng. Vui lòng sử dụng email khác.");
          } else if (
            errorMessage.includes("tên đăng nhập") ||
            errorMessage.includes("username")
          ) {
            setUsernameError(
              "Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác."
            );
          } else {
            setError(data.message);
          }
        } else {
          setError(data.message || `Đăng ký thất bại: ${response.status}`);
        }
        return;
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("Lỗi kết nối đến server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors khi user bắt đầu nhập
    if (error) setError("");
    if (emailError && field === "email") setEmailError("");
    if (usernameError && field === "username") setUsernameError("");
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${API_URL}/auth/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Đăng ký tài khoản
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Họ
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Họ"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Tên
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tên"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                usernameError ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Tên đăng nhập"
              required
              minLength={3}
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>

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
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                emailError ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Nhập địa chỉ email của bạn"
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Ngày sinh
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Số điện thoại (tùy chọn)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Số điện thoại"
            />
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
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu của bạn"
              minLength={6}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lại mật khẩu để xác nhận"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xử lý...
              </span>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        <div className="text-center text-gray-400 text-sm mb-4">
          Hoặc đăng ký với
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <FcGoogle size={20} className="mr-2" /> Đăng ký với Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <Facebook size={20} className="mr-2" /> Đăng ký với Facebook
          </button>
        </div>

        <div className="text-gray-400 text-sm text-center mt-6">
          Đã có tài khoản?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-500 hover:underline font-medium"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
