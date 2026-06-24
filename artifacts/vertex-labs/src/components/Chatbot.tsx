import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatWindow from "./ChatWindow";
import { useChatbot } from "../hooks/useChatbot";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    isTyping,
    input,
    setInput,
    sendMessage,
    handleQuickAction,
    handleSuggestion,
  } = useChatbot();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            isTyping={isTyping}
            input={input}
            onInputChange={setInput}
            onSend={sendMessage}
            onQuickAction={handleQuickAction}
            onSuggestion={handleSuggestion}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[0_0_32px_rgba(139,60,247,0.55),0_8px_24px_rgba(0,0,0,0.4)] bg-gradient-to-br from-primary via-purple-600 to-purple-900 border border-primary/40"
        aria-label={isOpen ? "Close chat" : "Open Vertex AI Assistant"}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-base"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
