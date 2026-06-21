import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" data-testid="nav-logo">
          <img src="/vertex-labs-logo.png" alt="Vertex Labs" className="h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-primary/80 bg-clip-text text-transparent group-hover:to-primary transition-all duration-300">
            VERTEX LABS
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors" data-testid="nav-home">Home</Link>
          <Link href="/projects" className="hover:text-primary transition-colors" data-testid="nav-projects">Projects</Link>
          <Link href="/pricing" className="hover:text-primary transition-colors" data-testid="nav-pricing">Pricing</Link>
          <Link href="/why-website" className="hover:text-primary transition-colors" data-testid="nav-why-website">Why a Website</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="bg-primary hover:bg-accent text-primary-foreground shadow-[0_0_15px_rgba(139,60,247,0.3)] hover:shadow-[0_0_25px_rgba(139,60,247,0.5)] transition-all border-none">
            <Link href="/pricing" data-testid="nav-cta">Get Quote</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
