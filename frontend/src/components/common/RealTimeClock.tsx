// components/common/RealTimeClock.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Clock, Calendar } from "lucide-react";

const RealTimeClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateTime = () => {
      const now = new Date();

      // Format time: HH:MM:SS
      const timeString = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Ho_Chi_Minh",
      });

      // Format date: Thứ, ngày/tháng/năm
      const dateString = now.toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
      });

      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 min-w-[280px]">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-32 mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 px-4 py-2.5 rounded-xl border border-white/10 bg-brand-card/50 backdrop-blur-sm">
      {/* Time + Timezone */}
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-brand-orange" />
        <span className="text-white font-mono text-base font-semibold tracking-wide">
          {currentTime}
        </span>
        <span className="text-xs text-brand-orange font-medium bg-brand-orange/10 px-2 py-0.5 rounded-md">
          GMT+7
        </span>
      </div>

      {/* Separator */}
      <div className="w-px h-5 bg-white/10" />

      {/* Date */}
      <span className="text-gray-400 text-sm font-medium capitalize">
        {currentDate}
      </span>

      {/* Live Indicator */}
      <div className="flex items-center gap-1.5 ml-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
        <span className="text-green-400 text-xs font-semibold">LIVE</span>
      </div>
    </div>
  );
};

export default RealTimeClock;