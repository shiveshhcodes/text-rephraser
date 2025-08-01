import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Copy, Check, Sparkles, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { useCounter } from '@/hooks/use-counter';

const promptExamples = [
  {
    id: 1,
    category: 'Marketing Copy',
    before: "Write a product description for a new smartphone.",
    after: "Create a compelling product description for a premium smartphone that emphasizes innovative camera technology, all-day battery life, and sleek design. Target tech-savvy professionals aged 25-40 who value performance and style. Include emotional triggers around capturing life's moments and staying connected. Format as engaging web copy with clear benefits and a strong call-to-action.",
    improvement: "312% more specific",
    metrics: { engagement: "+125%", conversions: "+156%", clarity: "+240%" }
  },
  {
    id: 2,
    category: 'Technical Analysis',
    before: "Analyze this code for bugs.",
    after: "Perform a comprehensive code review focusing on: 1) Security vulnerabilities (SQL injection, XSS, authentication flaws), 2) Performance bottlenecks (inefficient algorithms, memory leaks), 3) Code quality issues (adherence to best practices, maintainability), 4) Logic errors and edge cases. Provide specific line-by-line feedback with severity ratings and actionable improvement suggestions.",
    improvement: "480% more thorough",
    metrics: { accuracy: "+145%", depth: "+280%", actionability: "+195%" }
  },
  {
    id: 3,
    category: 'Creative Writing',
    before: "Write a story about a time traveler.",
    after: "Write a 1,500-word science fiction story about a quantum physicist who accidentally discovers time travel through a laboratory accident. Set in 2045, explore themes of consequence and responsibility as they witness the butterfly effect of their actions across different timelines. Use a third-person limited perspective, maintain a thoughtful and mysterious tone, and include vivid sensory details to immerse readers in each time period visited.",
    improvement: "550% more detailed",
    metrics: { creativity: "+167%", structure: "+203%", engagement: "+289%" }
  }
];

export function BeforeAfterResults() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeExample, setActiveExample] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({});
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.before-after-title', 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.comparison-container', 
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.comparison-container',
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const activeButton = buttonRefs.current[activeExample];
    if (activeButton) {
      setSliderStyle({
        width: activeButton.offsetWidth,
        transform: `translateX(${activeButton.offsetLeft - 8}px)`
      });
    }
  }, [activeExample]);

  const handleCopy = async (text: string, type: 'before' | 'after') => {
    await navigator.clipboard.writeText(text);
    setCopiedText(`${activeExample}-${type}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const currentExample = promptExamples[activeExample];

  return (
    <section id="before-after" className="section-padding bg-gradient-to-br from-surface/30 via-background to-surface/30 overflow-hidden">
      <div className="container-premium" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="before-after-title text-section-title gradient-text mb-6">
            See the Transformation
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Real text, real improvements. Watch ordinary content become extraordinary 
            with our AI enhancement technology.
          </p>
        </div>

        {/* Example Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface/50 backdrop-blur-xl border border-border/50 rounded-2xl p-2 relative">
            {/* Sliding Background */}
            <div 
              className="absolute top-2 bottom-2 bg-gradient-to-r from-accent to-primary rounded-xl transition-all duration-300 ease-out shadow-lg"
              style={sliderStyle}
            />
            {promptExamples.map((example, index) => (
              <button
                key={example.id}
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={() => setActiveExample(index)}
                className={`relative px-5 py-3 rounded-xl font-medium transition-all duration-300 z-10 ${
                  activeExample === index
                    ? 'text-white font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {example.category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Comparison */}
        <div className="comparison-container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Before */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-muted-foreground">
                  Before Enhancement
                </h3>
                <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  Basic Text
                </span>
              </div>
              
              <div className="card-premium bg-muted/30 border-muted-foreground/20 relative group">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleCopy(currentExample.before, 'before')}
                    className="p-2 rounded-lg bg-surface/80 hover:bg-surface transition-colors duration-200"
                  >
                    {copiedText === `${activeExample}-before` ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                
                <p className="text-muted-foreground leading-relaxed pr-12">
                  "{currentExample.before}"
                </p>
                
                <div className="mt-6 flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Length:</span>
                  <span className="font-medium">{currentExample.before.length} characters</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold gradient-text">
                  After Enhancement
                </h3>
                <span className="text-sm bg-gradient-to-r from-accent to-primary text-white px-3 py-1 rounded-full">
                  Prompt10X Enhanced
                </span>
              </div>
              
              <div className="card-premium relative group border-accent/30 shadow-glow">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleCopy(currentExample.after, 'after')}
                    className="p-2 rounded-lg bg-surface/80 hover:bg-surface transition-colors duration-200"
                  >
                    {copiedText === `${activeExample}-after` ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-foreground" />
                    )}
                  </button>
                </div>
                
                <p className="text-foreground leading-relaxed pr-12">
                  "{currentExample.after}"
                </p>
                
                <div className="mt-6 flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">Length:</span>
                  <span className="font-medium">{currentExample.after.length} characters</span>
                  <span className="text-green-500 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {currentExample.improvement}
                  </span>
                </div>
              </div>
            </div>
          </div>



          {/* Performance Metrics */}
          <div className="card-premium bg-gradient-to-r from-surface/50 to-surface-elevated/50">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Performance Impact
              </h3>
              <p className="text-muted-foreground">
                Real metrics from enhanced prompts in production
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(currentExample.metrics).map(([key, value], index) => {
                const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
                const { count } = useCounter({
                  end: numericValue,
                  duration: 2000,
                  delay: index * 300
                });
                
                return (
                  <div key={key} className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      +{Math.floor(count)}%
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key} Improvement
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="btn-premium group">
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              Transform Your Text Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}