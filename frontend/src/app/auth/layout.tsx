// frontend/src/app/(auth)/layout.tsx
import React from 'react';

// Ẩn hoàn toàn Header, TickerBar, ChatbotIcon ở các route (auth)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}