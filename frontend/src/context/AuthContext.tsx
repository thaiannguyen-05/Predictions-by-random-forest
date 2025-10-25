"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
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
      const res = await fetch("http://localhost:4000/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-cache",
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
          data.user.name || data.user.username || data.user.email
        )}&background=random`;
      }

      setUser({
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

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener("user-logged-in", handleAuthChange);
    window.addEventListener("user-logged-out", handleAuthChange);

    return () => {
      window.removeEventListener("user-logged-in", handleAuthChange);
      window.removeEventListener("user-logged-out", handleAuthChange);
    };
  }, []);

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
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
