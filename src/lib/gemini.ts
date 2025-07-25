import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Tone } from '@/components/TextRewriter';

// For demo purposes, we'll use a mock implementation
// In production, you would set up your API key properly
const DEMO_API_KEY = 'demo-key-replace-with-real-key';

let genAI: GoogleGenerativeAI | null = null;

try {
  if (DEMO_API_KEY !== 'demo-key-replace-with-real-key') {
    genAI = new GoogleGenerativeAI(DEMO_API_KEY);
  }
} catch (error) {
  console.log('Gemini API not configured - using demo mode');
}

export async function rewriteText(text: string, tone: Tone): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // For demo purposes, return a mock rewrite
  // In production, you would use the actual Gemini API
  if (!genAI) {
    return generateMockRewrite(text, tone);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `${tone.prompt}

Original text: "${text}"

Instructions:
- Rewrite ONLY, do not add explanations or chat
- Maintain the core meaning and information
- Apply the specified tone consistently
- Return only the rewritten text, nothing else`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    return generateMockRewrite(text, tone);
  }
}

function generateMockRewrite(text: string, tone: Tone): string {
  // Mock rewrite logic for demo
  const mockRewrites = {
    professional: (text: string) => 
      `I would like to formally present the following: ${text.toLowerCase()}. This matter requires your attention and professional consideration.`,
    friendly: (text: string) => 
      `Hey there! I wanted to share this with you: ${text.toLowerCase()}. Hope this helps and looking forward to hearing your thoughts!`,
    casual: (text: string) => 
      `So basically, ${text.toLowerCase()}. Pretty straightforward stuff, right?`,
    persuasive: (text: string) => 
      `Consider this compelling point: ${text.toLowerCase()}. This is exactly why you should take action now.`,
    concise: (text: string) => 
      text.split(' ').slice(0, Math.max(5, Math.floor(text.split(' ').length * 0.6))).join(' ') + '.',
    creative: (text: string) => 
      `🌟 Imagine this: ${text.toLowerCase()} ✨ It's like watching magic unfold before your very eyes!`
  };

  const rewriter = mockRewrites[tone.id as keyof typeof mockRewrites];
  return rewriter ? rewriter(text) : text;
}