"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import NewsFeed from "@/components/sections/NewsFeed";
import Recommendations from "@/components/sections/Recommendations";
import Watchlist from "@/components/sections/Watchlist";
import AboutUs from "@/components/sections/AboutUs";
import MainLayout from "./main-layout";

export default function Home() {
  const [phase, setPhase] = useState<"boot" | "logo" | "content">("boot");
  const [bootLines, setBootLines] = useState<string[]>([]);

  const messages = [
    "> Initializing core modules...",
    "> Loading AI neural matrix...",
    "> Calibrating prediction engine...",
    "> Connecting to global data stream...",
    "> Running diagnostics...",
    "> System check: OK ✅",
    "> Boot sequence complete. Welcome, Commander.",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, messages[index]]);
      index++;
      if (index === messages.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("logo"), 1000);
        setTimeout(() => setPhase("content"), 4000); // sau 4s thì hiển thị trang chính
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);

  /** 🧠 Giai đoạn 1: Console boot (che toàn trang) */
  if (phase === "boot") {
    return (
      <div className="fixed inset-0 flex flex-col items-start justify-center bg-black text-green-400 font-mono px-8 z-[9999] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,100,0.15),transparent_70%)] blur-3xl"></div>
        <div className="z-10">
          {bootLines.map((line, idx) => (
            <p
              key={idx}
              className="whitespace-pre-wrap animate-fade-in"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {line}
            </p>
          ))}
          <div className="flex mt-2">
            <span className="animate-pulse">█</span>
          </div>
        </div>

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.4s ease forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  /** ⚙️ Giai đoạn 2: Logo hologram (che toàn trang, không hiện header) */
  if (phase === "logo") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999] overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative text-cyan-300 text-6xl font-bold tracking-widest animate-float z-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_25px_#22d3ee]">
            START BUSINESS
          </span>
          <div className="absolute -inset-4 border border-cyan-400/40 rounded-full animate-spin-slow blur-sm"></div>
          <div className="absolute -inset-8 border-t-2 border-cyan-300/30 rounded-full animate-spin-slow-reverse"></div>
        </div>

        <style jsx>{`
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin 6s linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spinReverse 8s linear infinite;
          }
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes spinReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
        `}</style>
      </div>
    );
  }

  /** 🌐 Giai đoạn 3: Trang chính (MainLayout mới render) */
  return (
    <MainLayout>
      <div className="min-h-screen">
        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 px-4 max-w-7xl mx-auto">
          <div className="lg:col-span-3 space-y-6">
            <Recommendations />
            <Watchlist />
          </div>

          <div className="lg:col-span-6">
            <NewsFeed />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <AboutUs />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
