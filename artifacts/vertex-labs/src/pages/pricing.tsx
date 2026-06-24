import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Transparent Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Premium quality websites at Indian market rates. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="h-full bg-card border-white/5 hover:border-primary/30 transition-colors flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">Basic Business</CardTitle>
                <CardDescription>Perfect for small businesses</CardDescription>
                <div className="mt-4 text-3xl font-bold text-white">₹2,499<span className="text-lg text-muted-foreground font-normal"> - ₹14,999</span></div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> 4-6 pages
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Mobile responsive
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Contact form
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> SEO basics
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> 1 month support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/80 text-white" asChild>
                  <Link href="#contact" data-testid="select-basic">Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Restaurant Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-[0_0_10px_rgba(139,60,247,0.5)]">
              Popular
            </div>
            <Card className="h-full bg-card border-primary/50 shadow-[0_0_30px_rgba(139,60,247,0.1)] flex flex-col relative transform md:-translate-y-4">
              <CardHeader>
                <CardTitle className="text-xl">Restaurant Website</CardTitle>
                <CardDescription>Tailored for food businesses</CardDescription>
                <div className="mt-4 text-3xl font-bold text-white">₹2,999<span className="text-lg text-muted-foreground font-normal"> - ₹14,999</span></div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Menu page & Photo gallery
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Contact & maps integration
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Reservation form
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Mobile optimized
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> WhatsApp integration
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-accent text-white shadow-[0_0_15px_rgba(139,60,247,0.4)] border-none" asChild>
                  <Link href="#contact" data-testid="select-restaurant">Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full bg-card border-white/5 hover:border-primary/30 transition-colors flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Premium Animated</CardTitle>
                <CardDescription>Stand out from the competition</CardDescription>
                <div className="mt-4 text-3xl font-bold text-white">₹4,999<span className="text-lg text-muted-foreground font-normal"> - ₹24,999</span></div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Custom 3D animations
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Advanced interactions
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Premium design aesthetic
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Performance optimized
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Priority support
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-secondary hover:bg-secondary/80 text-white" asChild>
                  <Link href="#contact" data-testid="select-premium">Select Plan</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* AI Chatbot Pricing */}
        <div className="max-w-6xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium tracking-widest uppercase mb-4">
              AI Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">AI Chatbot Pricing</h2>
            <p className="text-muted-foreground mt-3">Intelligent chatbots tailored for your business — no monthly AI fees.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FAQ Chatbot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-card border-white/5 hover:border-primary/30 transition-colors flex flex-col">
                <CardHeader>
                  <div className="text-2xl mb-2">🤖</div>
                  <CardTitle className="text-xl">FAQ Based ChatBot</CardTitle>
                  <CardDescription>Rule-based intelligent FAQ assistant</CardDescription>
                  <div className="mt-4 text-3xl font-bold text-white">₹4,999<span className="text-lg text-muted-foreground font-normal"> - ₹29,999</span></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Custom knowledge base
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Keyword & intent matching
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Suggested questions & quick actions
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Contact handoff integration
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Zero ongoing AI costs
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Embeds into any website
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-secondary hover:bg-secondary/80 text-white" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* RAG Chatbot */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10 shadow-[0_0_10px_rgba(139,60,247,0.5)]">
                Advanced
              </div>
              <Card className="h-full bg-card border-primary/50 shadow-[0_0_30px_rgba(139,60,247,0.1)] flex flex-col">
                <CardHeader>
                  <div className="text-2xl mb-2">⚡</div>
                  <CardTitle className="text-xl text-primary">RAG Based ChatBot</CardTitle>
                  <CardDescription>AI-powered retrieval-augmented generation</CardDescription>
                  <div className="mt-4 text-3xl font-bold text-white">₹7,999<span className="text-lg text-muted-foreground font-normal"> - ₹29,999</span></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Trained on your documents & data
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Natural language understanding
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Semantic search & vector retrieval
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Multi-document knowledge base
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Context-aware responses
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Custom LLM integration
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary hover:bg-accent text-white shadow-[0_0_15px_rgba(139,60,247,0.4)] border-none" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 max-w-2xl mx-auto text-center bg-card border border-white/10 p-12 rounded-3xl"
          id="contact"
        >
          <h2 className="text-3xl font-bold mb-4">Get a Free Quote</h2>
          <p className="text-muted-foreground mb-8">
            Tell us about your project and we'll give you a precise timeline and quote.
          </p>
          <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-primary text-white border-none shadow-[0_0_20px_rgba(139,60,247,0.3)] hover:shadow-[0_0_30px_rgba(139,60,247,0.5)]">
            Contact hello@vertexlabs.in
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
