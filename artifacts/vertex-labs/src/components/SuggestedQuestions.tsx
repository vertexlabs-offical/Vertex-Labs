import { motion } from "framer-motion";

const SUGGESTIONS = [
  "What services do you offer?",
  "Show your projects",
  "How much does a website cost?",
  "What technologies do you use?",
  "How can I contact Vertex Labs?",
];

interface Props {
  onSelect: (text: string) => void;
}

export default function SuggestedQuestions({ onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="px-3 pb-2"
    >
      <p className="text-xs text-white/30 mb-2 px-1">Suggested questions</p>
      <div className="flex flex-col gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="text-left text-xs px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/60 hover:bg-primary/15 hover:border-primary/40 hover:text-primary transition-all duration-200"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
