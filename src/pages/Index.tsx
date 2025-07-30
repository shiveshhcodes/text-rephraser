import { useState, useEffect } from 'react';
import { TextRewriter } from '@/components/TextRewriter';
import { ApiKeySetup } from '@/components/ApiKeySetup';
import { HeroSection } from '@/components/HeroSection';
import { WebVersion } from '@/components/WebVersion';

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
      {showWebVersion ? (
        <WebVersion onBack={handleBackToHome} />
      ) : !showApp ? (
        <HeroSection onInstallClick={handleInstallClick} onTryWebVersion={handleTryWebVersion} />
      ) : (
        <div className="app-section opacity-0">
          {/* Navigation Bar */}
          <nav className="border-b border-border bg-surface/50 backdrop-blur-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold gradient-text">prompt10X</h1>
                  <div className="hidden sm:block text-sm text-muted-foreground">
                    AI-Powered Text Rewriter
                  </div>
                </div>
                <button
                  onClick={handleInstallClick}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  Install Extension
                </button>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* API Key Setup */}
              <div className="glass-card p-8 fade-in-up">
                <ApiKeySetup 
                  onApiKeySet={handleApiKeySet}
                  hasValidApiKey={!!hasValidApiKey}
                />
              </div>

              {/* Text Rewriter */}
              <div className="glass-card p-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
                <TextRewriter />
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border bg-surface/30 backdrop-blur-lg mt-20">
            <div className="container mx-auto px-6 py-8">
              <div className="text-center text-muted-foreground">
                <p className="mb-4">Built with ❤️ for better writing</p>
                <div className="flex justify-center gap-6 text-sm">
                  <button className="hover:text-primary transition-colors">About</button>
                  <button className="hover:text-primary transition-colors">Privacy</button>
                  <button className="hover:text-primary transition-colors">Terms</button>
                  <button 
                    onClick={handleInstallClick}
                    className="hover:text-primary transition-colors"
                  >
                    Chrome Extension
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
