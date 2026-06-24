import { motion } from "framer-motion";
import type { ChatMessage } from "../hooks/useChatbot";
import type { ServiceItem, ProjectItem, PricingItem, BenefitPoint, BenefitsData } from "../utils/searchKnowledgeBase";

interface Props {
  message: ChatMessage;
}

function formatText(text: string) {
  return text.split("\n").map((line, i) => {
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <span key={i} dangerouslySetInnerHTML={{ __html: bold }} className="block" />
    );
  });
}

function ServicesCard({ services }: { services: ServiceItem[] }) {
  return (
    <div className="mt-2 space-y-2">
      {services.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{s.emoji}</span>
            <span className="font-semibold text-white text-sm">{s.name}</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed mb-2">{s.description}</p>
          <div className="flex flex-wrap gap-1">
            {s.technologies.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsCard({ projects }: { projects: ProjectItem[] }) {
  return (
    <div className="mt-2 space-y-2">
      {projects.map((p) => (
        <div
          key={p.id}
          className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">{p.emoji}</span>
            <span className="font-semibold text-white text-sm">{p.name}</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed mb-2">{p.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {p.technologies.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {p.highlights.map((h) => (
              <span key={h} className="text-[10px] text-white/40">✓ {h}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingCard({ pricing }: { pricing: PricingItem[] }) {
  return (
    <div className="mt-2 space-y-2">
      {pricing.map((p) => (
        <div
          key={p.id}
          className="rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-base">{p.emoji}</span>
              <span className="font-semibold text-white text-sm">{p.name}</span>
            </div>
            <span className="text-primary font-bold text-sm">{p.price}</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed mb-2">{p.description}</p>
          <div className="space-y-0.5">
            {p.features.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-white/50">
                <span className="text-primary text-[10px]">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-white/30 italic">Best for: {p.bestFor}</p>
        </div>
      ))}
    </div>
  );
}

function BenefitsCard({ benefits }: { benefits: BenefitsData }) {
  const Section = ({ data }: { data: { title: string; emoji: string; points: BenefitPoint[] } }) => (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-2">
        <span>{data.emoji}</span>
        <span className="font-semibold text-white text-xs uppercase tracking-wider">{data.title}</span>
      </div>
      <div className="space-y-1.5">
        {data.points.map((p) => (
          <div key={p.title} className="flex items-start gap-2 rounded-lg bg-white/5 border border-white/8 px-2.5 py-2">
            <span className="text-sm shrink-0 mt-0.5">{p.emoji}</span>
            <div>
              <p className="text-xs font-semibold text-white/90">{p.title}</p>
              <p className="text-[11px] text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-2 space-y-1">
      <Section data={benefits.websiteBenefits} />
      <Section data={benefits.vertexBenefits} />
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <a
        href="mailto:vertex.labs.offical@gmail.com"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary text-sm font-medium hover:bg-primary/30 transition-colors"
      >
        📧 Email Us
      </a>
      <a
        href="/contact"
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
      >
        📞 Contact Page
      </a>
    </div>
  );
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const { result } = message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center text-xs mr-2 mt-0.5 shrink-0 shadow-[0_0_12px_rgba(139,60,247,0.5)]">
          ✦
        </div>
      )}
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-gradient-to-br from-primary to-purple-700 text-white rounded-br-sm shadow-[0_0_20px_rgba(139,60,247,0.3)]"
              : "bg-white/8 border border-white/10 text-white/90 rounded-bl-sm"
          }`}
        >
          <div className="whitespace-pre-line">{formatText(result.text)}</div>

          {result.type === "services" && result.services && (
            <ServicesCard services={result.services} />
          )}
          {result.type === "projects" && result.projects && (
            <ProjectsCard projects={result.projects} />
          )}
          {result.type === "pricing" && result.pricing && (
            <PricingCard pricing={result.pricing} />
          )}
          {result.type === "benefits" && result.benefits && <BenefitsCard benefits={result.benefits} />}
          {result.type === "contact" && <ContactCard />}
        </div>

        <span className="text-[10px] text-white/25 mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}
