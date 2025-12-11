"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "@/utils/api";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
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
      // Use /user/me endpoint for user data
      const res = await apiFetch("/user/me", {
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

      const response = await res.json();
      const userData = response.data;

      // Get avatar URL - use avtUrl from DB or generate fallback
      let avatarUrl = userData.avtUrl;
      const displayName = userData.fullname || userData.username || userData.email;

      if (!avatarUrl || avatarUrl === "") {
        avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName
        )}&background=random`;
      }

      setUser({
        id: userData.id,
        name: displayName,
        email: userData.email,
        avatar: avatarUrl,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
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
