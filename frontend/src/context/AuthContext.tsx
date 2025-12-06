"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/utils/api";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
  setUserData: (userData: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Use apiFetch - will auto-refresh token on 401
      const res = await apiFetch("http://localhost:4000/auth/me", {
        method: "GET",
        cache: "no-cache" as RequestCache,
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
        }
        setUser(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      let avatarUrl = data.user.avatar;

      if (!avatarUrl || avatarUrl === "") {
        avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.user.name
        )}&background=random`;
      }

      setUser({
        id: data.user.id,
        name: data.user.name || data.user.username || data.user.email,
        email: data.user.email,
        avatar: avatarUrl,
      });
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    // Chỉ refetch nếu có token
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    await fetchUser();
  };

  const logout = () => {
    // Clear token và user state ngay lập tức
    localStorage.removeItem("accessToken");
    setUser(null);
    setLoading(false);
  };

  const setUserData = (userData: UserData) => {
    setUser(userData);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
