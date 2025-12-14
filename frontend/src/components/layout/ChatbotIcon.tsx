"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  timestamp?: Date;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL_AUTH || "http://localhost:4000";

/**
 * Component hiển thị nội dung tin nhắn với Markdown cơ bản
 */
const MessageContent: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="whitespace-pre-line text-[14px] leading-relaxed">
      {text.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            if (part.startsWith("*") && part.endsWith("*")) {
              return (
                <em key={j} className="italic">
                  {part.slice(1, -1)}
                </em>
              );
            }
            return part;
          })}
          {i < text.split("\n").length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Component hiển thị animation typing
 */
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-1 px-4 py-3">
      <div
        className="w-2 h-2 bg-brand-orange rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="w-2 h-2 bg-brand-orange rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-brand-orange rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
    <span className="text-xs text-gray-400 italic">Đang suy nghĩ...</span>
  </div>
);

interface ChatWindowProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onClose: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  userName?: string;
  isMobile: boolean;
}

/**
 * Component cửa sổ chat
 */
const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  input,
  isLoading,
  onInputChange,
  onSendMessage,
  onClose,
  onKeyDown,
  userName,
  isMobile,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    onInputChange(e.target.value);
  };

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isMobile || !chatWindowRef.current) return;

    const rect = chatWindowRef.current.getBoundingClientRect();
    const currentLeft = rect.left;
    const currentTop = rect.top;

    setPosition({ top: currentTop, left: currentLeft });

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: currentLeft,
      startTop: currentTop,
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!dragRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    setPosition({
      left: dragRef.current.startLeft + dx,
      top: dragRef.current.startTop + dy,
    });
  };

  const handleMouseUp = (): void => {
    dragRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Styles based on state
  const containerStyle: React.CSSProperties = isMobile
    ? { top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }
    : position
      ? {
        top: `${position.top}px`,
        left: `${position.left}px`,
        margin: 0,
        width: "400px",
        height: "550px",
      }
      : {};

  const containerClasses = isMobile
    ? "fixed bg-brand-dark z-50 flex flex-col rounded-none"
    : `fixed bg-brand-dark rounded-2xl shadow-2xl flex flex-col border border-white/10 z-50 resize overflow-hidden min-w-[350px] min-h-[450px] ${!position ? "bottom-24 right-6 w-[400px] h-[550px]" : ""}`;

  return (
    <div
      ref={chatWindowRef}
      className={`${containerClasses} animate-fade-in`}
      style={
        !isMobile && position
          ? { ...containerStyle, resize: "both" }
          : containerStyle
      }
    >
      {/* Header với gradient đẹp */}
      <div
        className={`relative overflow-hidden z-10 flex-shrink-0 ${isMobile ? "" : "cursor-move rounded-t-2xl"}`}
        onMouseDown={!isMobile ? handleMouseDown : undefined}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-orange via-orange-500 to-yellow-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZ24+PC9nPg==')] opacity-30" />

        <div className="relative p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Bot Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot size={22} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-sm">
                  Trợ Lý AI
                </span>
                <Sparkles size={14} className="text-yellow-200" />
              </div>
              {userName ? (
                <span className="text-xs text-white/80">
                  Xin chào, {userName}! 👋
                </span>
              ) : (
                <span className="text-xs text-white/80">
                  Luôn sẵn sàng hỗ trợ
                </span>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer"
            type="button"
            aria-label="Đóng chat"
          >
            <X size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-brand-dark to-gray-900/50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${m.sender === "user"
                ? "bg-brand-orange/20 text-brand-orange"
                : "bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300"
                }`}
            >
              {m.sender === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Message Bubble */}
            <div
              className={`relative max-w-[75%] ${m.sender === "user"
                ? "bg-gradient-to-br from-brand-orange to-orange-600 text-white rounded-2xl rounded-br-md"
                : "bg-gray-800/80 backdrop-blur-sm text-gray-100 rounded-2xl rounded-bl-md border border-white/5"
                } px-4 py-3 shadow-lg`}
            >
              <MessageContent text={m.text} />

              {/* Timestamp */}
              {m.timestamp && (
                <span
                  className={`text-[10px] mt-1 block ${m.sender === "user" ? "text-white/60" : "text-gray-500"}`}
                >
                  {m.timestamp.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-gray-300">
              <Bot size={16} />
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl rounded-bl-md border border-white/5 shadow-lg">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-brand-dark/95 backdrop-blur-sm">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              placeholder="Nhập tin nhắn..."
              className="w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all duration-200 resize-none max-h-32"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={onSendMessage}
            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${isLoading || !input.trim()
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-brand-orange to-orange-500 text-white shadow-lg shadow-brand-orange/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-orange/30"
              }`}
            disabled={isLoading || !input.trim()}
            type="button"
            aria-label="Gửi tin nhắn"
          >
            <Send size={18} />
          </button>
        </div>

        <p className="text-[10px] text-gray-500 text-center mt-2">
          Nhấn Enter để gửi • Shift + Enter để xuống dòng
        </p>
      </div>
    </div>
  );
};

/**
 * Component chính - Icon chatbot và quản lý trạng thái
 */
const ChatbotIcon: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const userName = user?.name;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Khi mở chat lần đầu, gọi init-chat
  useEffect(() => {
    if (isOpen && messages.length === 0 && userId) {
      fetchInitialMessage();
    }
  }, [isOpen, userId]);

  const fetchInitialMessage = async (): Promise<void> => {
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

      // Thay thế userId bằng userName trong message chào mừng
      let welcomeMessage = data.result;
      if (userName) {
        welcomeMessage = welcomeMessage.replace(
          new RegExp(userId, "g"),
          userName
        );
        if (user?.email) {
          welcomeMessage = welcomeMessage.replace(
            new RegExp(user.email, "g"),
            userName
          );
        }
      }

      setSessionId(data.sessionId);
      setMessages([
        {
          sender: "bot",
          text: welcomeMessage || "Xin chào! Tôi là trợ lý AI của StockDN. Tôi có thể giúp gì cho bạn?",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Lỗi khi khởi tạo chat:", err);
      setMessages([
        {
          sender: "bot",
          text: "❌ Không thể kết nối với trợ lý AI. Vui lòng thử lại sau.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (!input.trim() || !userId || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, timestamp: new Date() },
    ]);
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

      // Thay thế userId bằng userName trong response từ AI
      let responseMessage = data.result;
      if (userName) {
        responseMessage = responseMessage.replace(
          new RegExp(userId, "g"),
          userName
        );
        if (user?.email) {
          responseMessage = responseMessage.replace(
            new RegExp(user.email, "g"),
            userName
          );
        }
      }

      setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responseMessage || "🤖 (Không có phản hồi)",
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Đã xảy ra lỗi khi gửi tin nhắn. Vui lòng thử lại.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string): void => {
    setInput(value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
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
          userName={userName}
          isMobile={isMobile}
        />
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none cursor-pointer ${isOpen
          ? "bg-gray-800 text-white shadow-gray-900/50"
          : "bg-gradient-to-r from-brand-orange to-orange-500 text-white shadow-brand-orange/40"
          }`}
        type="button"
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {/* Ripple effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-25" />
        )}

        {/* Icon */}
        <div
          className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-0"}`}
        >
          {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
            Chat với AI
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatbotIcon;
