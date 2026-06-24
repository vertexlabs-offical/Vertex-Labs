import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import SuggestedQuestions from "./SuggestedQuestions";
import QuickActions from "./QuickActions";
import type { ChatMessage } from "../hooks/useChatbot";

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
  input: string;
  onInputChange: (v: string) => void;
  onSend: (text: string) => void;
  onQuickAction: (action: "services" | "projects" | "pricing" | "contact") => void;
  onSuggestion: (text: string) => void;
  onClose: () => void;
}

export default function ChatWindow({
  messages,
  isTyping,
  input,
  onInputChange,
  onSend,
  onQuickAction,
  onSuggestion,
  onClose,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasUserMessages = messages.some((m) => m.role === "user");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend(input);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col w-[360px] max-w-[calc(100vw-24px)] h-[580px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(139,60,247,0.25),0_24px_64px_rgba(0,0,0,0.6)] bg-[#0a0a0f]/95 backdrop-blur-xl"
      style={{ backgroundImage: "radial-gradient(ellipse at top, rgba(139,60,247,0.07) 0%, transparent 60%)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/8 bg-gradient-to-r from-primary/10 to-transparent shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-sm shadow-[0_0_16px_rgba(139,60,247,0.6)]">
            ✦
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">Vertex AI Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/40">Online · Instant replies</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 pt-4 scrollbar-none">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-xs shrink-0 shadow-[0_0_12px_rgba(139,60,247,0.5)]">
                ✦
              </div>
              <div className="flex gap-1 px-4 py-3 rounded-2xl rounded-bl-sm bg-white/8 border border-white/10">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary/70"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested questions — shown only before first user message */}
        {!hasUserMessages && (
          <SuggestedQuestions onSelect={onSuggestion} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions */}
      <QuickActions onAction={onQuickAction} />

      {/* Input */}
      <div className="px-3 pb-3 pt-1 shrink-0">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 focus-within:border-primary/50 focus-within:bg-primary/5 transition-all">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
          />
          <button
            onClick={() => onSend(input)}
            disabled={!input.trim()}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/80 hover:bg-primary text-white text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_12px_rgba(139,60,247,0.6)]"
            aria-label="Send"
          >
            ↑
          </button>
        </div>
        <p className="text-center text-[10px] text-white/20 mt-1.5">Vertex Labs · AI Assistant</p>
      </div>
    </motion.div>
  );
}
