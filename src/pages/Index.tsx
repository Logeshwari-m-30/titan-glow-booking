import { Link } from "react-router-dom";
import { Gamepad2, Zap, Users, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const consoles = [
  { name: "PS5", desc: "Next-gen 4K gaming", icon: "🎮" },
  { name: "PS4", desc: "1080p gaming experience", icon: "🕹️" },
  { name: "PS2", desc: "Retro classics collection", icon: "👾" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Gaming cafe" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-border mb-6 animate-pulse-neon">
            <Zap className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-neon-cyan font-medium">Now Open — Console Gaming Available</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black mb-4 text-glow-blue bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue">
            TITANS GAMING
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-body">
            Play Like a Titan. Rule the Game.
          </p>
          
          <div className="inline-block my-6 px-6 py-3 rounded-lg bg-destructive/20 neon-border animate-pulse-neon">
            <div className="flex items-center gap-2">
              <Percent className="w-5 h-5 text-neon-red" />
              <span className="font-heading text-lg text-neon-red font-bold">Flat 20% OFF on Opening Week!</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Link to="/booking">
              <Button size="lg" className="gradient-neon text-primary-foreground font-heading text-lg px-10 py-7 neon-glow-blue hover:scale-105 transition-transform duration-300">
                <Gamepad2 className="mr-2 w-6 h-6" />
                Book Your Slot Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Consoles Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-center mb-12 text-glow-purple text-foreground">
            Available Consoles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consoles.map((c) => (
              <div key={c.name} className="bg-card rounded-xl p-8 neon-border text-center hover:neon-glow-purple transition-shadow duration-300 group">
                <div className="text-5xl mb-4 animate-float">{c.icon}</div>
                <h3 className="font-heading text-2xl text-foreground mb-2">{c.name}</h3>
                <p className="text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full gradient-neon flex items-center justify-center neon-glow-blue">
              <Users className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg text-foreground">Group Bookings</h3>
            <p className="text-sm text-muted-foreground">Book for up to 12 players per slot</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full gradient-neon flex items-center justify-center neon-glow-blue">
              <Gamepad2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg text-foreground">Premium Setup</h3>
            <p className="text-sm text-muted-foreground">HD displays, surround sound & comfy chairs</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full gradient-neon flex items-center justify-center neon-glow-blue">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-lg text-foreground">Pay at Shop</h3>
            <p className="text-sm text-muted-foreground">No online payment needed</p>
          </div>
        </div>
      </section>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-current text-primary-foreground">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.742 3.052 9.376L1.054 31.4l6.26-1.972A15.89 15.89 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.31 22.608c-.39 1.1-1.932 2.014-3.17 2.28-.846.18-1.95.324-5.668-1.218-4.762-1.974-7.822-6.81-8.06-7.124-.228-.314-1.916-2.55-1.916-4.864 0-2.314 1.214-3.45 1.644-3.922.39-.428.914-.556 1.206-.556.344 0 .576.004.828.016.266.012.624-.1.976.744.39.936 1.328 3.248 1.444 3.484.118.236.196.51.04.824-.158.314-.236.51-.47.786-.236.276-.496.616-.708.826-.236.236-.482.49-.206.962.274.47 1.222 2.016 2.624 3.266 1.804 1.608 3.324 2.106 3.796 2.342.47.236.746.196 1.02-.118.276-.314 1.178-1.374 1.492-1.844.314-.47.628-.39 1.06-.236.432.158 2.742 1.294 3.212 1.53.47.236.786.354.902.55.118.196.118 1.138-.274 2.238z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-border">
        <p className="text-muted-foreground text-sm">© 2026 TITANS GAMING. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
