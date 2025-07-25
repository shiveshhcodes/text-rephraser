import { useState } from 'react';
import { TextRewriter } from '@/components/TextRewriter';
import { ApiKeySetup } from '@/components/ApiKeySetup';

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem('gemini-api-key')
  );

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    localStorage.setItem('gemini-api-key', key);
  };

  const hasValidApiKey = apiKey && apiKey !== 'demo-mode';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {!apiKey ? (
          <div className="max-w-2xl mx-auto">
            <ApiKeySetup 
              onApiKeySet={handleApiKeySet}
              hasValidApiKey={!!hasValidApiKey}
            />
          </div>
        ) : (
          <div className="space-y-8">
            <ApiKeySetup 
              onApiKeySet={handleApiKeySet}
              hasValidApiKey={!!hasValidApiKey}
            />
            <TextRewriter />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
