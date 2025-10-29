// components/common/RealTimeClock.tsx
"use client";

import React, { useState, useEffect } from "react";

const RealTimeClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
      });
      const dateString = now.toLocaleDateString("vi-VN", {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Ho_Chi_Minh",
      });
      setCurrentTime(`${dateString} - ${timeString} (GMT+7)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
      {currentTime}
    </div>
  );
};

export default RealTimeClock;
