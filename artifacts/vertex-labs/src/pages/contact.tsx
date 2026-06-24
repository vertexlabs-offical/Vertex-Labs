import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const budgetOptions = [
  "₹2,499 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹15,000",
  "₹15,000 – ₹25,000",
  "₹25,000+",
  "Not sure yet",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    description: "",
    budget: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const encode = (data: Record<string, string>) =>
        Object.entries(data)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
          .join("&");

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...form }),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-block border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium tracking-widest uppercase mb-5">
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">
            Start Your Project
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tell us about your business and what you need. We'll get back to you within 24 hours with a custom quote.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/8 bg-card/60 backdrop-blur-sm p-8 md:p-10 shadow-[0_0_60px_rgba(139,60,247,0.07)]"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-7" data-testid="contact-form">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground/80 tracking-wide">
                  Your Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  data-testid="input-name"
                  className="bg-background/60 border-white/10 focus:border-primary/60 h-12 rounded-xl placeholder:text-muted-foreground/40 transition-colors"
                />
              </motion.div>

              <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium text-foreground/80 tracking-wide">
                  Business Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="businessName"
                  name="businessName"
                  required
                  value={form.businessName}
                  onChange={handleChange}
                  placeholder="Sharma & Co."
                  data-testid="input-business-name"
                  className="bg-background/60 border-white/10 focus:border-primary/60 h-12 rounded-xl placeholder:text-muted-foreground/40 transition-colors"
                />
              </motion.div>

              <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground/80 tracking-wide">
                  Email Address <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  data-testid="input-email"
                  className="bg-background/60 border-white/10 focus:border-primary/60 h-12 rounded-xl placeholder:text-muted-foreground/40 transition-colors"
                />
              </motion.div>

              <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-foreground/80 tracking-wide">
                  Project Description <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Tell us about your business, what kind of website you need, any features or pages you have in mind..."
                  rows={5}
                  data-testid="input-description"
                  className="bg-background/60 border-white/10 focus:border-primary/60 rounded-xl placeholder:text-muted-foreground/40 resize-none transition-colors"
                />
              </motion.div>

              <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium text-foreground/80 tracking-wide">
                  Budget Range{" "}
                  <span className="text-muted-foreground/50 font-normal text-xs ml-1">(optional)</span>
                </Label>
                <Select onValueChange={(val) => setForm((prev) => ({ ...prev, budget: val }))}>
                  <SelectTrigger
                    id="budget"
                    data-testid="select-budget"
                    className="bg-background/60 border-white/10 focus:border-primary/60 h-12 rounded-xl text-muted-foreground/70"
                  >
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10">
                    {budgetOptions.map((opt) => (
                      <SelectItem key={opt} value={opt} className="focus:bg-primary/20">
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  data-testid="error-message"
                >
                  {error}
                </motion.div>
              )}

              <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="button-submit"
                  size="lg"
                  className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-accent text-white border-none shadow-[0_0_25px_rgba(139,60,247,0.35)] hover:shadow-[0_0_40px_rgba(139,60,247,0.55)] transition-all duration-300 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-center text-xs text-muted-foreground/50 mt-4">
                  We respond within 24 hours. No spam, ever.
                </p>
              </motion.div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center py-12 space-y-6"
              data-testid="success-message"
            >
              <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(139,60,247,0.3)]">
                <svg className="w-9 h-9 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3">Message Received</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Thanks, <span className="text-primary font-medium">{form.name}</span>. We'll review your project details and reach out to{" "}
                  <span className="text-primary font-medium">{form.email}</span> within 24 hours.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setError(null);
                  setForm({ name: "", businessName: "", email: "", description: "", budget: "" });
                }}
                className="text-sm text-muted-foreground/60 hover:text-primary underline underline-offset-4 transition-colors"
                data-testid="button-reset"
              >
                Submit another enquiry
              </button>
            </motion.div>
          )}
        </motion.div>

        {!submitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { label: "Response Time", value: "Within 24 hrs" },
              { label: "Free Consultation", value: "No commitment" },
              { label: "Custom Quote", value: "Every project" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/5 bg-card/40 py-4 px-3">
                <div className="text-primary font-semibold text-sm">{item.value}</div>
                <div className="text-muted-foreground text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
