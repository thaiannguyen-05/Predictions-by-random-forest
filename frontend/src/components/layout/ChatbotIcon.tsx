'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatbotIcon: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Bạn sẽ cần tạo một component ChatWindow riêng biệt để chứa khung chat
    const ChatWindow = () => (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-blue-500">
            {/* Header khung chat */}
            <div className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
                <span className="font-semibold">Trợ lý Chứng khoán AI</span>
                <button onClick={() => setIsOpen(false)}>
                    <X size={20} />
                </button>
            </div>
            {/* Khung tin nhắn (Giả lập) */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3">
                <div className="text-xs text-gray-400 text-center">Hôm nay tôi có thể giúp gì cho bạn?</div>
                {/* ... Các tin nhắn sẽ được render ở đây */}
            </div>
            {/* Input gửi tin nhắn */}
            <div className="p-3 border-t border-gray-700">
                <input 
                    type="text" 
                    placeholder="Nhập câu hỏi của bạn..." 
                    className="w-full p-2 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Khung Chat hiện ra */}
            {isOpen && <ChatWindow />}

            {/* Icon Chatbot */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none"
                title="Mở Chatbot"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>
        </div>
    );
};

export default ChatbotIcon;