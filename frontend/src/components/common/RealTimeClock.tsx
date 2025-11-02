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
    <div className="flex items-center space-x-3 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors duration-200 group">
      {/* Calendar Icon */}
      <div className="flex-shrink-0">
        <Calendar 
          size={18} 
          className="text-blue-400 group-hover:text-blue-300 transition-colors" 
        />
      </div>
      
      {/* Date and Time */}
      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-green-400" />
          <span className="text-white font-mono text-sm font-medium tracking-wide">
            {currentTime}
          </span>
          <span className="text-xs text-blue-400 font-medium bg-blue-400/10 px-1.5 py-0.5 rounded">
            GMT+7
          </span>
        </div>
        
        <span className="text-gray-400 text-xs font-medium mt-0.5 capitalize">
          {currentDate}
        </span>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center space-x-1 flex-shrink-0">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-xs font-medium">LIVE</span>
      </div>
    </div>
  );
};

export default RealTimeClock;