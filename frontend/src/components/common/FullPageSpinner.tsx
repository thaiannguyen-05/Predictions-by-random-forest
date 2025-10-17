'use client';

import React from 'react';

const FullPageSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-glow"></div>
        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 opacity-60 animate-pulse-glow"></div>
      </div>
    </div>
  );
};

export default FullPageSpinner;
