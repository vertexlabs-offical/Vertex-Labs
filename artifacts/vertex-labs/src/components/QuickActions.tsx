interface Props {
  onAction: (action: "services" | "projects" | "pricing" | "contact" | "benefits") => void;
}

const ACTIONS: { label: string; emoji: string; key: "services" | "projects" | "pricing" | "contact" | "benefits" }[] = [
  { label: "Services", emoji: "🚀", key: "services" },
  { label: "Projects", emoji: "📁", key: "projects" },
  { label: "Pricing", emoji: "💰", key: "pricing" },
  { label: "Benefits", emoji: "💡", key: "benefits" },
  { label: "Contact", emoji: "📞", key: "contact" },
];

export default function QuickActions({ onAction }: Props) {
  return (
    <div className="flex gap-1.5 px-3 py-2 border-t border-white/5 overflow-x-auto scrollbar-none">
      {ACTIONS.map((a) => (
        <button
          key={a.key}
          onClick={() => onAction(a.key)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/60 hover:bg-primary/20 hover:border-primary/40 hover:text-primary transition-all duration-200 whitespace-nowrap"
        >
          <span>{a.emoji}</span>
          <span>{a.label}</span>
        </button>
      ))}
    </div>
  );
}
