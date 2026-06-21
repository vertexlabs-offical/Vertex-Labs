import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-primary/20 bg-background/50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img src="/vertex-labs-logo.png" alt="Vertex Labs" className="h-6 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Precision-grade web development studio building premium websites for businesses across India.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/why-website" className="hover:text-primary transition-colors">Why a Website</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>hello@vertexlabs.in</li>
            <li>+91 98765 43210</li>
            <li>Mumbai, India</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          &copy; 2025 Vertex Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
