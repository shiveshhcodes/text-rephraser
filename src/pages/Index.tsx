import { useState, useEffect } from 'react';
import { TextRewriter } from '@/components/TextRewriter';
import { ApiKeySetup } from '@/components/ApiKeySetup';
import { HeroSection } from '@/components/HeroSection';
import { WebVersion } from '@/components/WebVersion';
import { ParticleBackground } from '@/components/ParticleBackground';

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem('gemini-api-key')
  );
  const [showApp, setShowApp] = useState(false);
  const [showWebVersion, setShowWebVersion] = useState(false);

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
    // Set demo mode if no API key exists
    if (!apiKey) {
      setApiKey('demo-mode');
      localStorage.setItem('gemini-api-key', 'demo-mode');
    }
  }, [apiKey]);

  useEffect(() => {
    if (showApp) {
      // CSS-based animation
      const appSection = document.querySelector('.app-section');
      if (appSection) {
        (appSection as HTMLElement).style.animation = 'fadeInUp 0.8s ease-out forwards';
      }
    }
  }, [showApp]);

  return (
    <div className="min-h-screen bg-background">
      <ParticleBackground />
      {showWebVersion ? (
        <WebVersion onBack={handleBackToHome} />
      ) : !showApp ? (
        <HeroSection onInstallClick={handleInstallClick} onTryWebVersion={handleTryWebVersion} />
      ) : (
        <div className="app-section opacity-0">
          {/* Premium Navigation Bar */}
          <nav className="navbar-glass sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h1 className="text-2xl font-display gradient-text">prompt10X</h1>
                  <div className="hidden sm:block text-sm text-muted-foreground font-sans">
                    AI-Powered Text Rewriter
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="nav-link text-sm text-muted-foreground">
                    Features
                  </button>
                  <button className="nav-link text-sm text-muted-foreground">
                    Pricing
                  </button>
                  <button
                    onClick={handleInstallClick}
                    className="btn-secondary text-sm px-6 py-2"
                  >
                    Install Extension
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-5xl mx-auto space-y-16">
              {/* Welcome Section */}
              <div className="text-center mb-12 fade-in-up">
                <h2 className="text-4xl font-display gradient-text mb-4">
                  Ready to Transform Your Writing?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-body">
                  Experience the power of AI-driven text transformation with our premium tools.
                </p>
              </div>

              {/* API Key Setup */}
              <div className="glass-card fade-in-up">
                <ApiKeySetup 
                  onApiKeySet={handleApiKeySet}
                  hasValidApiKey={!!hasValidApiKey}
                />
              </div>

              {/* Text Rewriter */}
              <div className="glass-card fade-in-up" style={{ animationDelay: '0.2s' }}>
                <TextRewriter />
              </div>
            </div>
          </div>

          {/* Premium Footer */}
          <footer className="navbar-glass mt-24">
            <div className="container mx-auto px-6 py-12">
              <div className="text-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-display gradient-text mb-2">prompt10X</h3>
                  <p className="text-muted-foreground font-body">Transforming writing with AI precision</p>
                </div>
                <div className="flex justify-center gap-8 text-sm mb-6">
                  <button className="nav-link">About</button>
                  <button className="nav-link">Privacy</button>
                  <button className="nav-link">Terms</button>
                  <button 
                    onClick={handleInstallClick}
                    className="nav-link text-accent"
                  >
                    Chrome Extension
                  </button>
                </div>
                <p className="text-xs text-muted-foreground-secondary font-body">
                  © 2024 prompt10X. Built with precision and care.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
