import { useState, useEffect, useRef } from 'react';
import { TextRewriter } from '@/components/TextRewriter';
import { ArrowLeft, Sparkles, Zap, Heart } from 'lucide-react';

interface WebVersionProps {
  onBack: () => void;
}

export function WebVersion({ onBack }: WebVersionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Create floating sparkles
    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute w-2 h-2 bg-primary/40 rounded-full pointer-events-none';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animation = `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`;
      
      if (containerRef.current) {
        containerRef.current.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 5000);
      }
    };

    const interval = setInterval(createSparkle, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen bg-background relative overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-surface/50 backdrop-blur-lg sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 btn-secondary px-4 py-2 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-medium">Web Version</span>
              </div>
              <div className="gradient-text text-2xl font-bold">prompt10X</div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Made with love</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Welcome Message */}
        <div className="text-center mb-12 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Try it for FREE</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Experience the Magic ✨
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No signup required. Just paste your text and watch the AI transform it instantly!
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-5xl mx-auto">
          {/* Fun Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '🚀', title: 'Lightning Fast', desc: 'Results in seconds' },
              { icon: '🎯', title: 'Perfect Accuracy', desc: '99.9% user satisfaction' },
              { icon: '🎨', title: 'Creative Magic', desc: '10+ writing tones' }
            ].map((stat, i) => (
              <div 
                key={stat.title}
                className="glass-card p-6 text-center fade-in-up group hover:scale-105"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-3xl mb-3 group-hover:animate-bounce">{stat.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Main App Interface */}
          <div className="glass-card p-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-sm text-muted-foreground ml-4">prompt10X Web Interface</span>
            </div>
            
            <TextRewriter />
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="glass-card p-8 max-w-md mx-auto">
              <h3 className="text-2xl font-bold mb-4">Love what you see? 💕</h3>
              <p className="text-muted-foreground mb-6">
                Get the Chrome extension for instant access anywhere on the web!
              </p>
              <button className="btn-primary w-full py-3 text-lg group">
                <span className="flex items-center justify-center gap-2">
                  Install Chrome Extension
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Bubble */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative">
          <button className="btn-primary w-14 h-14 rounded-full shadow-glow-intense animate-pulse">
            ✨
          </button>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
            !
          </div>
        </div>
      </div>

    </div>
  );
}