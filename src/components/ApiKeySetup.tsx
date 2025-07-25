import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Key, ExternalLink, CheckCircle } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
  hasValidApiKey: boolean;
}

export function ApiKeySetup({ onApiKeySet, hasValidApiKey }: ApiKeySetupProps) {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  if (hasValidApiKey) {
    return (
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-primary">API Key Configured</h3>
            <p className="text-sm text-muted-foreground">
              You're all set! The text rewriter is ready to use.
            </p>
          </div>
          <Badge variant="default" className="ml-auto">
            Active
          </Badge>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 space-y-6 elevated-card border-destructive/20">
      <div className="text-center space-y-2">
        <Key className="h-12 w-12 mx-auto text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Setup Gemini API</h2>
        <p className="text-muted-foreground">
          Enter your Google Gemini API key to start rewriting text
        </p>
      </div>

      <Alert>
        <AlertDescription className="space-y-2">
          <p>
            <strong>Currently in demo mode.</strong> To use the full functionality:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Get your free API key from Google AI Studio</li>
            <li>Enter it below to enable real AI text rewriting</li>
            <li>Your key is stored locally and never sent to our servers</li>
          </ol>
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="apiKey" className="text-sm font-medium">
            Gemini API Key
          </label>
          <div className="relative">
            <Input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1" disabled={!apiKey.trim()}>
            <Key className="h-4 w-4 mr-2" />
            Set API Key
          </Button>
          <Button
            type="button"
            variant="outline"
            asChild
          >
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Get API Key
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </form>

      <div className="text-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onApiKeySet('demo-mode')}
          className="text-xs text-muted-foreground"
        >
          Continue with demo mode
        </Button>
      </div>
    </Card>
  );
}