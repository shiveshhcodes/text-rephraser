import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { ToneSelector } from './ToneSelector';
import { rewriteText } from '@/lib/gemini';

export interface Tone {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
}

const TONES: Tone[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clear, formal, and business-appropriate',
    icon: '💼',
    prompt: 'Rewrite this text in a professional, formal, and business-appropriate tone. Make it clear, concise, and suitable for workplace communication.'
  },
  {
    id: 'friendly',
    name: 'Friendly',
    description: 'Warm, approachable, and conversational',
    icon: '😊',
    prompt: 'Rewrite this text in a warm, friendly, and conversational tone. Make it approachable and engaging while maintaining clarity.'
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Precise, analytical, and domain-specific',
    icon: '🧑🏻‍💻',
    prompt: 'Rewrite this text using technical terminology and precise language. Make it suitable for expert audiences with domain-specific knowledge.'
  }
  // Commented out unused blocks as requested
  // {
  //   id: 'persuasive',
  //   name: 'Persuasive',
  //   description: 'Compelling, convincing, and motivating',
  //   icon: '🎯',
  //   prompt: 'Rewrite this text in a persuasive and compelling tone. Make it convincing and motivating to encourage action or agreement.'
  // },
  // {
  //   id: 'concise',
  //   name: 'Concise',
  //   description: 'Brief, direct, and to-the-point',
  //   icon: '⚡',
  //   prompt: 'Rewrite this text to be concise, brief, and direct. Remove unnecessary words while preserving all important information.'
  // },
  // {
  //   id: 'creative',
  //   name: 'Creative',
  //   description: 'Imaginative, expressive, and engaging',
  //   icon: '🎨',
  //   prompt: 'Rewrite this text in a creative, imaginative, and expressive way. Make it more engaging and interesting while keeping the core message.'
  // }
];

export function TextRewriter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<Tone>(TONES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRewrite = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Add the text you want to rewrite first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const rewritten = await rewriteText(inputText, selectedTone);
      setOutputText(rewritten);
      toast({
        title: "Text rewritten successfully!",
        description: `Applied ${selectedTone.name.toLowerCase()} tone.`,
      });
    } catch (error) {
      toast({
        title: "Failed to rewrite text",
        description: "Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Text has been copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy text to clipboard.",
        variant: "destructive"
      });
    }
  };

  const resetText = () => {
    setInputText('');
    setOutputText('');
  };

  const clearInput = () => {
    setInputText('');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Text Rewriter</span>
        </div>
        <h1 className="text-4xl font-bold gradient-text">
          Transform Your Text Instantly
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your desired tone and watch as AI rewrites your text to match your exact needs.
          Perfect for emails, content, and professional communication.
        </p>
      </div>

      {/* Tone Selector */}
      <ToneSelector
        tones={TONES}
        selectedTone={selectedTone}
        onToneSelect={setSelectedTone}
      />

      {/* Text Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="p-6 space-y-4 elevated-card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Original Text</h3>
            <Badge variant="secondary" className="text-xs">
              {inputText.length} characters
            </Badge>
          </div>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="min-h-[300px] resize-none border-0 bg-transparent text-base leading-relaxed focus-visible:ring-0"
          />
          <div className="flex gap-2">
            <Button
              onClick={clearInput}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!inputText}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Input
            </Button>
            <Button
              onClick={() => copyToClipboard(inputText)}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!inputText}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6 space-y-4 elevated-card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">AI Enhanced Text</h3>
            <div className="flex items-center gap-2">
              {outputText && (
                <Badge variant="default" className="text-xs">
                  {outputText.length} characters
                </Badge>
              )}
              {selectedTone && (
                <Badge variant="outline" className="text-xs">
                  {selectedTone.icon} {selectedTone.name}
                </Badge>
              )}
            </div>
          </div>
          <div className="min-h-[300px] relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Rewriting with {selectedTone.name.toLowerCase()} tone...</span>
                </div>
              </div>
            ) : outputText ? (
              <Textarea
                value={outputText}
                readOnly
                className="min-h-[300px] resize-none border-0 bg-transparent text-base leading-relaxed focus-visible:ring-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <div className="relative">
                    <Wand2 className="h-12 w-12 mx-auto opacity-50 animate-pulse" />
                  </div>
                  <p>Your rewritten text will appear here</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setOutputText('')}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!outputText}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Output
            </Button>
            <Button
              onClick={() => copyToClipboard(outputText)}
              variant="outline"
              size="sm"
              className="flex-1"
              disabled={!outputText}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </Card>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleRewrite}
          disabled={!inputText.trim() || isLoading}
          size="lg"
          className="px-8 py-6 text-lg font-semibold glow-effect"
        >
          <Wand2 className="h-5 w-5 mr-2" />
          {isLoading ? 'Rewriting...' : 'Rewrite Text'}
        </Button>
      </div>
    </div>
  );
}