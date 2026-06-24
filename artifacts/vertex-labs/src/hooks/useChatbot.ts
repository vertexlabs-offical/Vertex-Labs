import { useState, useCallback } from "react";
import { searchKnowledgeBase, getQuickAction, type SearchResult } from "../utils/searchKnowledgeBase";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  result: SearchResult;
  timestamp: Date;
}

const WELCOME: SearchResult = {
  type: "text",
  text: "👋 Welcome to Vertex Labs.\n\nI'm Vertex AI Assistant.\n\nAsk me anything about our services, projects, pricing, technologies, or how we can help build your next digital product.",
  score: 10,
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function botMessage(result: SearchResult): ChatMessage {
  return { id: makeId(), role: "bot", result, timestamp: new Date() };
}

function userMessage(text: string): ChatMessage {
  return {
    id: makeId(),
    role: "user",
    result: { type: "text", text, score: 0 },
    timestamp: new Date(),
  };
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    botMessage(WELCOME),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");

  const addBotResponse = useCallback((result: SearchResult) => {
    setIsTyping(true);
    const delay = 600 + Math.random() * 400;
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage(result)]);
    }, delay);
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => [...prev, userMessage(trimmed)]);
      setInput("");
      const result = searchKnowledgeBase(trimmed);
      addBotResponse(result);
    },
    [addBotResponse]
  );

  const handleQuickAction = useCallback(
    (action: "services" | "projects" | "pricing" | "contact") => {
      const labels: Record<string, string> = {
        services: "Show me your services",
        projects: "Show your projects",
        pricing: "What are your prices?",
        contact: "How can I contact you?",
      };
      setMessages((prev) => [...prev, userMessage(labels[action])]);
      const result = getQuickAction(action);
      addBotResponse(result);
    },
    [addBotResponse]
  );

  const handleSuggestion = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return {
    messages,
    isTyping,
    input,
    setInput,
    sendMessage,
    handleQuickAction,
    handleSuggestion,
  };
}
