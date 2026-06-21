import { Suspense, useRef, Component, type ReactNode, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random points
  const count = 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B3CF7"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingShapes() {
  return (
    <>
      <Float speed={2} rotationIntensity={2} floatIntensity={2} position={[-2, 1, -3]}>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#8B3CF7" wireframe transparent opacity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5} position={[2, -1, -2]}>
        <mesh>
          <torusGeometry args={[0.8, 0.2, 16, 100]} />
          <meshBasicMaterial color="#8B3CF7" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={3} position={[0, -2, -4]}>
        <mesh>
          <octahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </>
  );
}

const CSSFallbackBg = () => (
  <div className="w-full h-full bg-background overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,60,247,0.15)_0%,_transparent_70%)]" />
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-purple-500/20"
        style={{
          width: `${80 + i * 50}px`,
          height: `${80 + i * 50}px`,
          left: `${5 + (i % 5) * 20}%`,
          top: `${5 + Math.floor(i / 5) * 50}%`,
          background: `radial-gradient(circle, rgba(139,60,247,${0.04 + i * 0.01}) 0%, transparent 70%)`,
        }}
        animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.08, 1] }}
        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
      />
    ))}
  </div>
);

export default function Home() {
  const [webglSupported] = useState(() => typeof window !== "undefined" && isWebGLSupported());
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          {webglSupported ? (
            <Suspense fallback={<CSSFallbackBg />}>
              <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={['#000000', 3, 10]} />
                <FloatingShapes />
                <ParticleField />
              </Canvas>
            </Suspense>
          ) : (
            <CSSFallbackBg />
          )}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 max-w-4xl"
          >
            <div className="inline-block border border-primary/30 rounded-full px-4 py-1.5 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium tracking-wide uppercase mb-4">
              We Build Premium Websites
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl">
              VERTEX LABS
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light mt-4 mb-8">
              Affordable. Professional. Stunning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-primary hover:bg-accent text-white shadow-[0_0_20px_rgba(139,60,247,0.4)] hover:shadow-[0_0_30px_rgba(139,60,247,0.6)] border-none">
                <Link href="/pricing" data-testid="hero-cta-start">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-primary/30 text-white hover:bg-primary/10">
                <Link href="/projects" data-testid="hero-cta-work">View Our Work</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 text-primary/50">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-ping" />
          </div>
        </div>
      </section>

      {/* Floating Code Symbols & Intro */}
      <section className="relative py-32 bg-background overflow-hidden border-t border-primary/10">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[10%] text-6xl md:text-8xl font-mono text-primary drop-shadow-[0_0_10px_rgba(139,60,247,0.8)]">&lt;/&gt;</motion.div>
          <motion.div style={{ y: y2 }} className="absolute top-[40%] right-[15%] text-7xl md:text-9xl font-mono text-primary drop-shadow-[0_0_10px_rgba(139,60,247,0.8)]">{`{  }`}</motion.div>
          <motion.div style={{ y: y3 }} className="absolute top-[70%] left-[20%] text-5xl md:text-7xl font-mono text-primary drop-shadow-[0_0_10px_rgba(139,60,247,0.8)]">&lt; &gt;</motion.div>
          <motion.div style={{ y: y4 }} className="absolute top-[80%] right-[25%] text-6xl md:text-8xl font-mono text-primary drop-shadow-[0_0_10px_rgba(139,60,247,0.8)]">( )</motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            We Are Vertex Labs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            India's most affordable premium web dev studio. We combine world-class engineering, modern design aesthetics, and highly optimized performance to deliver websites that don't just look good—they convert.
          </motion.p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-20 bg-card border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "3+", label: "Projects Delivered" },
              { value: "₹2499", label: "Starting Price" },
              { value: "100%", label: "Custom Design" },
              { value: "India", label: "Based Studio" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-background/50 border border-white/5 backdrop-blur-sm"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Cards */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Why Choose Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Affordable Pricing", desc: "Premium doesn't mean overpriced. We offer the best rates in India." },
              { title: "Premium Quality", desc: "Precision-crafted code and beautiful, modern design aesthetics." },
              { title: "Fast Delivery", desc: "Streamlined processes mean your site goes live in record time." },
              { title: "India-Focused", desc: "We understand the local market and what Indian consumers expect." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-card border-white/5 hover:border-primary/50 transition-colors group">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(139,60,247,0.8)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
