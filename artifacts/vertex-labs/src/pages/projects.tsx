import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "F1 Red Bull Demo",
    description: "High-speed Formula 1 Red Bull Racing themed website with aggressive typography and motion.",
    url: "https://f1-redbull-demo.netlify.app/"
  },
  {
    title: "Cyber Restaurant",
    description: "Futuristic cyberpunk-themed restaurant website featuring dark neon aesthetics.",
    url: "https://cyber-resturant-demo.netlify.app/"
  },
  {
    title: "Jeffington Site",
    description: "Modern professional business website built for high conversion and trust.",
    url: "https://jeffington-test-site.netlify.app/"
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Our Work
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Explore our precision-grade web experiences built for high-performance and stunning visual impact.
          </motion.p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                  <p className="text-muted-foreground max-w-2xl">{project.description}</p>
                </div>
                <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                  <a href={project.url} target="_blank" rel="noreferrer" data-testid={`visit-${index}`}>
                    Visit Live Site
                  </a>
                </Button>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-card shadow-2xl hover:shadow-[0_0_30px_rgba(139,60,247,0.15)] transition-shadow duration-500">
                {/* Browser Header */}
                <div className="h-10 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="mx-auto bg-black/50 text-xs text-muted-foreground px-4 py-1 rounded-md max-w-xs w-full text-center truncate">
                    {project.url}
                  </div>
                </div>
                
                {/* Iframe Container */}
                <div className="relative w-full h-[600px] bg-black">
                  <iframe
                    src={project.url}
                    className="w-full h-full border-none"
                    loading="lazy"
                    title={project.title}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
