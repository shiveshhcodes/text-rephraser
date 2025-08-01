import { useState, useEffect } from 'react';
import { TextRewriter } from '@/components/TextRewriter';
import { ApiKeySetup } from '@/components/ApiKeySetup';
import { WebVersion } from '@/components/WebVersion';
import { ParticleBackground } from '@/components/ParticleBackground';
import { SmartFileSystem } from '@/components/sections/SmartFileSystem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhatMakesDifferent } from '@/components/sections/WhatMakesDifferent';
import { BeforeAfterResults } from '@/components/sections/BeforeAfterResults';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { Chrome, Menu, X, Sparkles, Zap } from 'lucide-react';

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem('gemini-api-key')
  );
  const [showApp, setShowApp] = useState(false);
  const [showWebVersion, setShowWebVersion] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini-api-key', key);
    if (!showApp) {
      setShowApp(true);
    }
  };

  const handleInstallClick = () => {
    window.open('https://google.com', '_blank');
  };

  const handleTryWebVersion = () => {
    setShowWebVersion(true);
  };

  const handleBackToHome = () => {
    setShowWebVersion(false);
    setShowApp(false);
  };

  const hasValidApiKey = apiKey && apiKey !== 'demo-mode';

  useEffect(() => {
    if (!apiKey) {
      setApiKey('demo-mode');
      localStorage.setItem('gemini-api-key', 'demo-mode');
    }
  }, [apiKey]);

  if (showWebVersion) {
    return <WebVersion onBack={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      
      {/* Premium Navigation */}
      <nav className="navbar-glass fixed top-0 left-0 right-0 z-50">
        <div className="container-premium">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-hanken gradient-text font-semibold">
                Prompt10X
              </h1>
              <div className="hidden md:flex items-center gap-6">
                <a href="#file-system" className="nav-link text-sm font-satoshi">Features</a>
                <a href="#how-it-works" className="nav-link text-sm font-satoshi">How It Works</a>
                <a href="#before-after" className="nav-link text-sm font-satoshi">Results</a>
                <a href="#why-choose" className="nav-link text-sm font-satoshi">Why Choose</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={handleTryWebVersion}
                  className="btn-secondary text-sm font-satoshi"
                >
                  Try Free
                </button>
                <button
                  onClick={handleInstallClick}
                  className="btn-premium text-sm px-6 py-3 font-satoshi"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Install Extension
                </button>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
              <a href="#file-system" className="text-xl nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-xl nav-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#before-after" className="text-xl nav-link" onClick={() => setMobileMenuOpen(false)}>Results</a>
              <a href="#why-choose" className="text-xl nav-link" onClick={() => setMobileMenuOpen(false)}>Why Choose</a>
              <button onClick={handleTryWebVersion} className="btn-secondary">Try Free</button>
              <button onClick={handleInstallClick} className="btn-premium">Install Extension</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-glow" />
        
        <div className="container-premium text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-accent/20 mb-8">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-accent">AI-Powered Text Enhancement</span>
            </div>

            <h1 className="text-hero gradient-text mb-8 font-inter">
              <div className="block text-5xl md:text-7xl">Transform Your Text With</div>
              <div className="block text-5xl md:text-8xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mt-2">
                AI
              </div>
            </h1>
            
            <p className="text-subtitle text-muted-foreground mb-12 max-w-3xl mx-auto">
              Get 10x better results with scientifically optimized text rewriting. 
              Professional-grade enhancement that turns good content into exceptional content.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={handleTryWebVersion}
                className="btn-premium text-lg px-10 py-4 group shadow-glow font-satoshi"
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                  Try Prompt10X Free
                  <Zap className="w-4 h-4" />
                </span>
              </button>

              <button 
                onClick={handleInstallClick} 
                className="btn-secondary px-8 py-4 text-lg group font-satoshi"
              >
                <span className="flex items-center gap-2">
                  <Chrome className="w-5 h-5" />
                  Chrome Extension
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { icon: '🚀', text: 'Lightning Fast', desc: '<3s processing' },
                { icon: '🎯', text: 'Precision AI', desc: '94% success rate' },
                { icon: '✨', text: 'Smart Enhancement', desc: '10x better results' },
                { icon: '🔒', text: 'Enterprise Secure', desc: 'SOC 2 certified' }
              ].map((feature, index) => (
                <div key={index} className="elevated-card px-4 py-3 text-center">
                  <div className="text-xl mb-1">{feature.icon}</div>
                  <div className="text-sm font-medium text-foreground">{feature.text}</div>
                  <div className="text-xs text-muted-foreground">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Premium Sections */}
      <BeforeAfterResults />
      <HowItWorks />
      <WhatMakesDifferent />
      <SmartFileSystem />
      <WhyChoose />

      {/* Premium Footer */}
      <footer className="navbar-glass section-padding bg-gradient-to-br from-surface/20 via-background to-surface/20">
        <div className="container-premium text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-hanken gradient-text mb-6">Prompt10X</h3>
            <p className="text-lg text-muted-foreground mb-8 font-inter leading-relaxed">
              Transform your content workflow with professional-grade text enhancement
            </p>
            
            <div className="flex justify-center gap-8 text-sm mb-8">
              <a href="#" className="nav-link font-satoshi hover:text-accent transition-colors duration-300">About</a>
              <a href="#" className="nav-link font-satoshi hover:text-accent transition-colors duration-300">Privacy</a>
              <a href="#" className="nav-link font-satoshi hover:text-accent transition-colors duration-300">Terms</a>
              <button onClick={handleInstallClick} className="nav-link text-accent font-satoshi hover:text-primary transition-colors duration-300">
                Chrome Extension
              </button>
            </div>
            
            <div className="border-t border-border/30 pt-6">
              <p className="text-sm text-muted-foreground font-inter">
                © 2024 Prompt10X. Crafted with precision for content professionals.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;