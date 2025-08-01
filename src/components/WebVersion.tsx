import { useState, useEffect, useRef } from 'react';
import { TextRewriter } from '@/components/TextRewriter';
import { ParticleBackground } from '@/components/ParticleBackground';
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
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0 bg-glow" />

      {/* Premium Header */}
      <header className="relative z-10 navbar-glass sticky top-0">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 btn-secondary px-6 py-3 group"
            >
              <ArrowLeft className="w-4 h-4 icon-thin transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="w-5 h-5 icon-thin animate-pulse" />
                <span className="text-sm font-medium font-sans">Web Experience</span>
              </div>
              <div className="gradient-text text-3xl font-hanken">Prompt10X</div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-satoshi">Created with intent, because it's needed</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-16">
        {/* Welcome Message */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full mb-8 border border-accent/20">
            <Zap className="w-5 h-5 text-accent icon-thin" />
            <span className="text-accent font-medium font-sans">Experience for FREE</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-hanken gradient-text mb-6 leading-tight">
            Pure Magic ✨
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed">
            No registration, no limits, no friction. Simply paste your text and witness 
            the transformation happen in real-time with our advanced AI engine.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '⚡', title: 'Instant Processing', desc: 'Sub-second response times', color: 'accent' },
              { icon: '🎯', title: 'Precision AI', desc: '99.9% satisfaction rate', color: 'primary' },
              { icon: '🎨', title: 'Style Mastery', desc: '12+ distinct writing tones', color: 'accent-secondary' }
            ].map((stat, i) => (
              <div 
                key={stat.title}
                className="glass-card text-center fade-in-up group hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce transition-all duration-300">{stat.icon}</div>
                <h3 className="font-inter text-xl mb-3 text-foreground">{stat.title}</h3>
                <p className="text-muted-foreground font-inter">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Premium App Interface */}
          <div className="glass-card fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border/50">
              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-sm text-muted-foreground ml-6 font-sans">Prompt10X Web Studio</span>
            </div>
            
            <TextRewriter />
          </div>

          {/* Enhanced Call to Action */}
          <div className="text-center mt-16 fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="glass-card max-w-lg mx-auto">
              <div className="text-4xl mb-6">🚀</div>
              <h3 className="text-3xl font-hanken gradient-text mb-4">Ready to Elevate?</h3>
              <p className="text-muted-foreground mb-8 font-inter leading-relaxed">
                Install our Chrome extension and bring this magic to every website, 
                email, and document you work with.
              </p>
              <button className="btn-primary w-full py-4 text-lg group shadow-glow-intense">
                <span className="flex items-center justify-center gap-3">
                  Install Chrome Extension
                  <Sparkles className="w-5 h-5 icon-thin group-hover:animate-spin" />
                </span>
              </button>
              <p className="text-xs text-muted-foreground-secondary mt-4 font-inter">
                Free installation • Works everywhere • Instant access
              </p>
            </div>
          </div>
        </div>
      </main>



    </div>
  );
}