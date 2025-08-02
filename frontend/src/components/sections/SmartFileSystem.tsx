import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ContentBlock {
  id: string;
  title: string;
  description: string;
  color: string;
}

const contentBlocks: ContentBlock[] = [
  {
    id: '1',
    title: 'Why You Should Use Prompt10X in Daily Life',
    description: 'Most people write prompts the hard way. Vague, time-wasting, and hit or miss. PromptNX fixes that. It sharpens your intent, rewrites your inputs, and pulls out exactly what AI needs to deliver high-quality results. It works like an expert in your corner, every single time. If you\'re still guessing your way through prompts, you\'re already falling behind.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    title: 'What Changes You\'ll See When Using Prompt10X',
    description: 'You stop settling for good enough. Prompts feel like they actually understand you. The AI sounds smarter, more helpful, more aligned with your goals. No fluff, no confusion, just clear and confident output that feels like your voice, only sharper. Once you see what Prompt10X unlocks, there\'s no going back to plain and underpowered inputs ever again.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    title: 'Why Use Prompt10X Every Time for Best Results',
    description: 'Great results are not a one-time thing. They\'re a habit. Prompt10X builds that habit for you. Every session feels polished, every task gets done faster, and the quality stays high no matter the use case. Skipping it means wasting time and potential. This is not just a tool. It is the difference between trying AI and actually owning it.',
    color: 'from-green-500 to-emerald-500'
  }
];

export function SmartFileSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.content-block', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="file-system" className="section-padding bg-gradient-to-br from-background via-surface/50 to-background">
      <div className="container-premium" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="text-section-title gradient-text mb-6 font-bold">
            Master Your Prompt Game
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Stop wasting time on trial-and-error. Our intelligent prompt engine refines your input to match exactly what the AI needs. It learns how you work, adapts on the fly, and delivers sharper, more accurate results every time you create, ask, or build.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {contentBlocks.map((block, index) => (
            <div
              key={block.id}
              className={`content-block card-premium group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-glow flex flex-col h-full`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-8 flex flex-col h-full">
                {/* Gradient accent line */}
                <div className={`w-16 h-1 bg-gradient-to-r ${block.color} rounded-full mb-6`}></div>
                
                {/* Title - Fixed height area */}
                <div className="h-20 mb-6 flex items-start">
                  <h3 className="text-2xl font-bold text-foreground leading-tight">
                    {block.title}
                  </h3>
                </div>
                
                {/* Description - Equal height area */}
                <div className="flex-1 flex items-start">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {block.description}
                  </p>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}