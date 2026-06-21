import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const advantages = [
  {
    title: "24/7 Online Presence",
    desc: "Your business never sleeps. A website works around the clock to capture leads and showcase your brand."
  },
  {
    title: "Build Credibility & Trust",
    desc: "Customers expect professional businesses to have a website. Without one, you lose immediate credibility."
  },
  {
    title: "Reach More Customers",
    desc: "Break geographical barriers. A website allows anyone, anywhere to find your services instantly."
  },
  {
    title: "Compete with Big Brands",
    desc: "A stunning, premium website levels the playing field, making your local business look world-class."
  },
  {
    title: "Cost-Effective Marketing",
    desc: "Compared to traditional ads, a website is a one-time investment that generates ROI for years."
  },
  {
    title: "Showcase Your Work",
    desc: "The perfect canvas to display your products, services, and portfolio exactly how you want."
  },
  {
    title: "Customer Convenience",
    desc: "Let customers find information, pricing, and contact details without needing to call you."
  },
  {
    title: "Data & Insights",
    desc: "Understand your audience. Track exactly how many people visit, where they come from, and what they want."
  }
];

export default function WhyWebsite() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium tracking-wide uppercase mb-6"
          >
            The Digital Edge
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Why Your Business Needs a Website
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            In today's digital economy, an Instagram page isn't enough. Here's why serious businesses invest in their own web presence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-32">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-white/5 p-8 rounded-2xl hover:border-primary/40 hover:bg-secondary/50 transition-all duration-300 group"
            >
              <div className="text-primary font-mono text-xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
              <h3 className="text-xl font-bold text-white mb-3">{adv.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-3xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background z-0" />
          <div className="absolute inset-0 border border-primary/20 rounded-3xl z-10" />
          
          <div className="relative z-20 px-8 py-20 text-center flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to grow your business?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
              Join the businesses across India who have upgraded their digital presence with Vertex Labs.
            </p>
            <Button asChild size="lg" className="h-16 px-10 text-lg bg-primary text-white shadow-[0_0_30px_rgba(139,60,247,0.4)] hover:shadow-[0_0_50px_rgba(139,60,247,0.6)] border-none transition-all hover:scale-105">
              <Link href="/pricing" data-testid="cta-get-started">Get Started Today</Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
