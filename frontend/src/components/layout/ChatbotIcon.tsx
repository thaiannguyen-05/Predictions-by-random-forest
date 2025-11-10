"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL_AUTH || "http://localhost:4000";

// Tách component ChatWindow ra ngoài
interface ChatWindowProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  input,
  isLoading,
  onInputChange,
  onSendMessage,
  onClose,
  onKeyDown,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-blue-500 z-50">
      {/* Header */}
      <div className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
        <span className="font-semibold text-sm">💬 Trợ lý Chứng khoán AI</span>
        <button
          onClick={onClose}
          className="hover:bg-blue-700 rounded-full p-1 transition-colors cursor-pointer"
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow p-3 overflow-y-auto space-y-3 text-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-wrap break-words ${
                m.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-lg bg-gray-700 text-gray-200 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700 flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder="Nhập câu hỏi..."
          className="flex-1 p-2 bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none max-h-32 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          onClick={onSendMessage}
          className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer flex-shrink-0"
          disabled={isLoading || !input.trim()}
          type="button"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
};

const ChatbotIcon: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  // Khi mở chat lần đầu, gọi init-chat
  useEffect(() => {
    if (isOpen && messages.length === 0 && userId) {
      fetchInitialMessage();
    }
  }, [isOpen, userId]);

  const fetchInitialMessage = async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `${API_BASE_URL}/chat/init-chat?userId=${encodeURIComponent(userId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const textData = await res.text();
      let data: { result: string; sessionId?: string };
      try {
        data = JSON.parse(textData);
      } catch {
        data = { result: textData, sessionId: undefined };
      }

      setSessionId(data.sessionId);
      setMessages([
        { sender: "bot", text: data.result || "Xin chào! Tôi là trợ lý AI." },
      ]);
    } catch (err) {
      console.error("Lỗi khi khởi tạo chat:", err);
      setMessages([
        { sender: "bot", text: "❌ Không thể khởi động trợ lý AI." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !userId || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`${API_BASE_URL}/chat/call-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, sessionId, prompt: userMsg }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: { result: string; sessionId?: string } = await res.json();
      setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.result || "🤖 (Không có phản hồi)" },
      ]);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Đã xảy ra lỗi khi gửi tin nhắn." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <ChatWindow
          messages={messages}
          input={input}
          isLoading={isLoading}
          onInputChange={handleInputChange}
          onSendMessage={sendMessage}
          onClose={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
        />
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 cursor-pointer"
        type="button"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatbotIcon;
