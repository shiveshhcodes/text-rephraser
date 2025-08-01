import type { Tone } from '@/components/TextRewriter';

export const rewriteText = async (
  text: string,
  tone: Tone
): Promise<string> => {
  // The URL of your new backend server
  const backendUrl = 'http://localhost:5001/api/v1/rewrite';

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, tone: tone.id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Backend request failed');
    }

    const data = await response.json();
    return data.rewrittenText;
    
  } catch (error) {
    console.error("Error calling backend:", error);
    // Fallback to mock rewrite if backend is unavailable
    return generateMockRewrite(text, tone);
  }
};

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