'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot, X, Send, Minimize2, Maximize2, Sparkles,
  ChevronDown, FileText, Video, BookOpen, Wrench,
  MessageCircle, Loader2, RotateCcw, Copy, Check
} from 'lucide-react';

/* ── Types ── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

/* ── Suggested Quick Actions ── */
const quickActions = [
  { icon: <Video size={16} />, label: 'ویدئوهای آموزشی رایگان', query: 'ویدئوهای آموزشی رایگان کجا هستند؟' },
  { icon: <BookOpen size={16} />, label: 'دوره‌های آموزشی', query: 'دوره‌های آموزشی آریاز را نشان بده' },
  { icon: <FileText size={16} />, label: 'فرم‌ها و دستورالعمل‌ها', query: 'فرم‌ها و دستورالعمل‌های قابل دانلود' },
  { icon: <Wrench size={16} />, label: 'ابزارهای هوشمند', query: 'ابزارهای هوشمند آریاز چیست؟' },
];

/* ── Welcome Suggestions ── */
const welcomeSuggestions = [
  'چگونه می‌توانم دوره مناسب خودم را پیدا کنم؟',
  'آیا محتوای رایگان هم دارید؟',
  'ابزارهای هوشمند آریاز چه کاربردهایی دارند؟',
  'چگونه می‌توانم عضو شوم؟',
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history: messages.slice(-6) }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.reply || 'متأسفانه خطایی رخ داد. لطفاً دوباره تلاش کنید.',
        timestamp: new Date(),
        suggestions: data.suggestions || [],
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: 'اتصال به سرور برقرار نشد. لطفاً اتصال اینترنت خود را بررسی کنید.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([]);
  };

  return (
    <>
      {/* ── Floating Button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          /* Docked to the middle of the left edge: clear of the mobile
             bottom bar, and out of the way of page content either side. */
          className="fixed top-1/2 -translate-y-1/2 left-0 z-[100] w-12 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-l-none rounded-r-2xl shadow-lg shadow-orange-300/50 flex items-center justify-center text-white hover:w-14 hover:shadow-xl hover:shadow-orange-300/60 transition-all duration-300 group"
          aria-label="دستیار هوشمند"
        >
          <Bot size={24} strokeWidth={2} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
          <span className="absolute top-1/2 -translate-y-1/2 left-full ml-2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            دستیار هوشمند
          </span>
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className={`fixed z-[100] bg-white rounded-2xl shadow-2xl shadow-gray-400/30 border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized
              ? 'bottom-6 left-6 w-80 h-14'
              : 'bottom-6 left-6 w-[380px] h-[560px] sm:w-[420px] sm:h-[600px]'
          }`}
        >
          {/* ── Header ── */}
          <div className="bg-gradient-to-l from-orange-500 to-orange-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">دستیار هوشمند آریاز</h3>
                <div className="flex items-center gap-1.5 text-[11px] text-orange-100">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  آماده پاسخگویی
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="شروع مجدد"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title={isMinimized ? 'باز کردن' : 'کوچک کردن'}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="بستن"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* ── Minimized State ── */}
          {isMinimized ? (
            <div className="flex-1 flex items-center justify-center px-4 cursor-pointer" onClick={() => setIsMinimized(false)}>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <MessageCircle size={16} className="text-orange-500" />
                برای ادامه مکالمه کلیک کنید
              </p>
            </div>
          ) : (
            <>
              {/* ── Messages Area ── */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.length === 0 ? (
                  /* Welcome Screen */
                  <div className="flex flex-col items-center justify-center h-full text-center px-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mb-4">
                      <Bot size={32} className="text-orange-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">سلام! من دستیار هوشمند آریاز هستم</h4>
                    <p className="text-sm text-gray-500 mb-6 leading-6">
                      می‌تونم در پیدا کردن دوره‌ها، ویدئوهای رایگان، فرم‌ها و ابزارها کمکتون کنم
                    </p>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2 w-full mb-6">
                      {quickActions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(action.query)}
                          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all text-right"
                        >
                          <span className="text-orange-500 shrink-0">{action.icon}</span>
                          <span className="truncate">{action.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Welcome Suggestions */}
                    <div className="w-full space-y-2">
                      {welcomeSuggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(suggestion)}
                          className="w-full text-right bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-600 hover:border-orange-300 hover:bg-orange-50 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Chat Messages */
                  <>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 relative group ${
                            msg.role === 'user'
                              ? 'bg-orange-500 text-white rounded-br-md'
                              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                          }`}
                        >
                          {msg.role === 'assistant' && (
                            <div className="flex items-center gap-2 mb-1.5">
                              <Sparkles size={12} className="text-orange-500" />
                              <span className="text-[10px] font-semibold text-orange-500">دستیار هوشمند</span>
                            </div>
                          )}
                          <p className="text-sm leading-7 whitespace-pre-wrap">{msg.content}</p>
                          {msg.role === 'assistant' && (
                            <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => copyToClipboard(msg.content, msg.id)}
                                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                title="کپی"
                              >
                                {copiedId === msg.id ? (
                                  <Check size={12} className="text-emerald-500" />
                                ) : (
                                  <Copy size={12} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          )}

                          {/* Suggestions after assistant message */}
                          {msg.suggestions && msg.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {msg.suggestions.map((s, i) => (
                                <button
                                  key={i}
                                  onClick={() => sendMessage(s)}
                                  className="text-[11px] bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))} 

                    {isLoading && (
                      <div className="flex justify-end">
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Loader2 size={14} className="text-orange-500 animate-spin" />
                            <span className="text-xs text-gray-500">در حال نوشتن...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* ── Input Area ── */}
              <div className="border-t border-gray-200 bg-white p-3 shrink-0">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="سوال خود را بپرسید..."
                    rows={1}
                    className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-gray-50/50 max-h-24 leading-6"
                    style={{ minHeight: '40px' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = Math.min(target.scrollHeight, 96) + 'px';
                    }}
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className={`p-2.5 rounded-xl transition-all shrink-0 ${
                      input.trim() && !isLoading
                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  دستیار هوشمند ممکن است گاهی اطلاعات نادرست ارائه دهد
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
