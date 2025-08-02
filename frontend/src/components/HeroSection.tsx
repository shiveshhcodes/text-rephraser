import { useEffect, useRef, useState } from 'react';
import { ParticleBackground } from './ParticleBackground';
import { Sparkles, Chrome, Zap } from 'lucide-react';

interface HeroSectionProps {
  onInstallClick: () => void;
  onTryWebVersion: () => void;
}

export function HeroSection({ onInstallClick, onTryWebVersion }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    setIsVisible(true);
    
    // CSS-based animations with staggered delays
    if (titleRef.current) {
      titleRef.current.style.animation = 'fadeInUp 1.2s ease-out 0.5s forwards';
    }
    if (subtitleRef.current) {
      subtitleRef.current.style.animation = 'fadeInUp 1s ease-out 0.8s forwards';
    }
    if (buttonRef.current) {
      buttonRef.current.style.animation = 'scaleIn 0.8s ease-out 1.2s forwards';
    }
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-glow" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Hero Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-accent/20 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-sm font-medium text-accent font-sans">AI-Powered Writing Revolution</span>
        </div>

        {/* Hero Title with Typewriter Effect */}
        <h1
          ref={titleRef}
          className="text-hero gradient-text mb-8 opacity-0"
        >
          <span className="text-display">prompt</span>
          <span className="text-display">10X</span>
        </h1>
        
        {/* Hero Subtitle */}
        <p
          ref={subtitleRef}
          className="text-subtitle text-muted-foreground mb-12 max-w-3xl mx-auto opacity-0 leading-relaxed"
        >
          Transform your writing with intelligent AI that understands context, tone, and style. 
          From professional emails to creative content — elevate every word with precision and flair.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button
            ref={buttonRef}
            onClick={onInstallClick}
            className="btn-primary text-lg px-10 py-4 opacity-0 group shadow-glow"
          >
            <span className="flex items-center gap-3">
              <Chrome className="w-5 h-5 icon-thin transition-transform group-hover:scale-110" />
              Install Chrome Extension
              <Zap className="w-4 h-4 icon-thin" />
            </span>
          </button>

          <button 
            onClick={onTryWebVersion} 
            className="btn-secondary px-8 py-4 text-lg group"
          >
            <span className="flex items-center gap-2">
              Try Web Version
              <Sparkles className="w-4 h-4 icon-thin group-hover:animate-spin" />
            </span>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1500 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { icon: '🚀', text: 'Lightning Fast', desc: 'Instant AI processing' },
            { icon: '🎯', text: 'Perfect Tone', desc: '10+ writing styles' },
            { icon: '✨', text: 'Smart Context', desc: 'Understands nuance' },
            { icon: '🔥', text: 'Chrome Ready', desc: 'Works everywhere' }
          ].map((feature, index) => (
            <div
              key={feature.text}
              className="group elevated-card px-6 py-4 text-center transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${1.8 + index * 0.15}s` }}
            >
              <div className="text-2xl mb-2 group-hover:animate-bounce">{feature.icon}</div>
              <div className="text-sm font-medium text-foreground font-sans">{feature.text}</div>
              <div className="text-xs text-muted-foreground mt-1">{feature.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}