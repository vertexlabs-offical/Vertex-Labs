import faqData from "../data/faq.json";
import servicesData from "../data/services.json";
import projectsData from "../data/projects.json";
import pricingData from "../data/pricing.json";
import { scoreMatch } from "./keywordMatcher";

export type ResponseType = "text" | "services" | "projects" | "pricing" | "contact";

export interface ServiceItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  features: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  technologies: string[];
  category: string;
  highlights: string[];
}

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  emoji: string;
  description: string;
  features: string[];
  bestFor: string;
}

export interface SearchResult {
  type: ResponseType;
  text: string;
  services?: ServiceItem[];
  projects?: ProjectItem[];
  pricing?: PricingItem[];
  score: number;
}

const SCORE_THRESHOLD = 1.5;

const UNANSWERED_KEY = "vertex_unanswered_questions";

export function trackUnanswered(question: string): void {
  try {
    const existing = JSON.parse(localStorage.getItem(UNANSWERED_KEY) || "[]");
    existing.push({
      question,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
    localStorage.setItem(UNANSWERED_KEY, JSON.stringify(existing));
  } catch {
    // localStorage may be unavailable
  }
}

export function exportUnansweredQuestions(): string {
  try {
    const data = JSON.parse(localStorage.getItem(UNANSWERED_KEY) || "[]");
    return JSON.stringify(data, null, 2);
  } catch {
    return "[]";
  }
}

export function searchKnowledgeBase(query: string): SearchResult {
  const q = query.trim();
  if (!q) return contactFallback(q);

  // --- Score FAQ ---
  let bestFaqScore = 0;
  let bestFaq: (typeof faqData)[0] | null = null;
  for (const item of faqData) {
    const s = scoreMatch(q, [...item.keywords, item.question]);
    if (s > bestFaqScore) { bestFaqScore = s; bestFaq = item; }
  }

  // --- Score Services ---
  let bestServicesScore = 0;
  const scoredServices = servicesData.map((item) => ({
    item,
    score: scoreMatch(q, [...item.keywords, item.name]),
  }));
  scoredServices.sort((a, b) => b.score - a.score);
  bestServicesScore = scoredServices[0]?.score ?? 0;

  // --- Score Projects ---
  let bestProjectsScore = 0;
  const scoredProjects = projectsData.map((item) => ({
    item,
    score: scoreMatch(q, [...item.keywords, item.name, item.category]),
  }));
  scoredProjects.sort((a, b) => b.score - a.score);
  bestProjectsScore = scoredProjects[0]?.score ?? 0;

  // --- Score Pricing ---
  let bestPricingScore = 0;
  const pricingKeywords = ["price", "cost", "how much", "rate", "fee", "charge", "plan", "package", "₹", "rupee", "budget"];
  const pricingBoost = scoreMatch(q, pricingKeywords);
  const scoredPricing = pricingData.map((item) => ({
    item,
    score: scoreMatch(q, [...item.keywords, item.name]) + pricingBoost * 0.5,
  }));
  scoredPricing.sort((a, b) => b.score - a.score);
  bestPricingScore = scoredPricing[0]?.score ?? 0;

  const best = Math.max(bestFaqScore, bestServicesScore, bestProjectsScore, bestPricingScore);

  if (best < SCORE_THRESHOLD) {
    trackUnanswered(q);
    return contactFallback(q);
  }

  // Projects wins
  if (
    bestProjectsScore === best &&
    bestProjectsScore >= bestServicesScore &&
    bestProjectsScore >= bestFaqScore
  ) {
    const matched = scoredProjects.filter((p) => p.score >= SCORE_THRESHOLD).map((p) => p.item);
    return {
      type: "projects",
      text: `Here are some relevant projects from Vertex Labs:`,
      projects: (matched.length > 0 ? matched : projectsData) as ProjectItem[],
      score: bestProjectsScore,
    };
  }

  // Pricing wins
  if (
    bestPricingScore === best &&
    bestPricingScore >= bestServicesScore &&
    bestPricingScore >= bestFaqScore
  ) {
    return {
      type: "pricing",
      text: `Here's our pricing breakdown:`,
      pricing: pricingData as PricingItem[],
      score: bestPricingScore,
    };
  }

  // Services wins
  if (bestServicesScore === best && bestServicesScore >= bestFaqScore) {
    const matched = scoredServices.filter((s) => s.score >= SCORE_THRESHOLD).map((s) => s.item);
    return {
      type: "services",
      text: `Here's what Vertex Labs offers:`,
      services: (matched.length > 0 ? matched : servicesData) as ServiceItem[],
      score: bestServicesScore,
    };
  }

  // FAQ wins
  if (bestFaq && bestFaqScore >= SCORE_THRESHOLD) {
    return {
      type: "text",
      text: bestFaq.answer,
      score: bestFaqScore,
    };
  }

  trackUnanswered(q);
  return contactFallback(q);
}

function contactFallback(_query: string): SearchResult {
  return {
    type: "contact",
    text: "I couldn't find a specific answer for that yet.\n\nWould you like to contact Vertex Labs directly?",
    score: 0,
  };
}

// Quick action shortcuts — always return full data sets
export function getQuickAction(action: "services" | "projects" | "pricing" | "contact"): SearchResult {
  switch (action) {
    case "services":
      return {
        type: "services",
        text: "Here's everything Vertex Labs offers:",
        services: servicesData as ServiceItem[],
        score: 10,
      };
    case "projects":
      return {
        type: "projects",
        text: "Here are our featured projects:",
        projects: projectsData as ProjectItem[],
        score: 10,
      };
    case "pricing":
      return {
        type: "pricing",
        text: "Here's our pricing breakdown:",
        pricing: pricingData as PricingItem[],
        score: 10,
      };
    case "contact":
      return {
        type: "contact",
        text: "We'd love to hear from you! Here's how to reach Vertex Labs:",
        score: 10,
      };
  }
}
