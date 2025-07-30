import { useEffect, useRef } from 'react';

interface HeroSectionProps {
  onInstallClick: () => void;
  onTryWebVersion: () => void;
}

export function HeroSection({ onInstallClick, onTryWebVersion }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // CSS-based animations with staggered delays
    if (titleRef.current) {
      titleRef.current.style.animation = 'fadeInUp 1s ease-out 0.3s forwards';
    }
    if (subtitleRef.current) {
      subtitleRef.current.style.animation = 'fadeInUp 0.8s ease-out 0.6s forwards';
    }
    if (buttonRef.current) {
      buttonRef.current.style.animation = 'scaleIn 0.6s ease-out 1s forwards';
    }
  }, []);


  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-glow overflow-hidden">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-hero gradient-text font-black mb-6 opacity-0"
        >
          prompt10X
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-subtitle text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0"
        >
          Transform your writing with AI-powered text rewriting. 
          Choose from multiple tones and styles to make your content shine.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            ref={buttonRef}
            onClick={onInstallClick}
            className="btn-primary text-lg px-8 py-4 opacity-0 group"
          >
            <span className="flex items-center gap-3">
              <svg 
                className="w-6 h-6 transition-transform group-hover:scale-110" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Install Chrome Extension
            </span>
          </button>

          <button onClick={onTryWebVersion} className="btn-secondary px-6 py-3">
            Try Web Version
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 fade-in-up" style={{ animationDelay: '1.5s' }}>
          {['AI-Powered', 'Multiple Tones', 'Instant Results', 'Chrome Extension'].map((feature, index) => (
            <div
              key={feature}
              className="glass-card px-4 py-2 text-sm font-medium text-muted-foreground fade-in-up"
              style={{ animationDelay: `${1.5 + index * 0.1}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}