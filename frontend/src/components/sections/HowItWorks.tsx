import { useEffect, useRef } from 'react';
import { Upload, Wand2, Download, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: <Upload className="w-8 h-8" />,
    title: 'Input Your Text',
    description: 'Paste your text into our editor. AI instantly analyzes structure and identifies areas for improvement.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    id: 2,
    icon: <Wand2 className="w-8 h-8" />,
    title: 'AI Enhancement Magic',
    description: 'Our AI applies optimization techniques to enhance clarity, context, and achieve specific outcomes.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    id: 3,
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Review & Refine',
    description: 'Compare before and after versions. Make final adjustments with AI-guided suggestions.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.4
  },
  {
    id: 4,
    icon: <Download className="w-8 h-8" />,
    title: 'Deploy & Succeed',
    description: 'Copy your enhanced text and achieve significantly better results than ever before.',
    color: 'from-orange-500 to-red-500',
    delay: 0.6
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main heading with smoother timing
      gsap.fromTo('.how-it-works-title', 
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

      // Animate steps with smoother stagger
      gsap.fromTo('.step-card', 
        { 
          opacity: 0, 
          y: 40,
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
            trigger: stepsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate progressive line based on scroll position
      gsap.fromTo('.progressive-line', 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              const line = document.querySelector('.progressive-line') as HTMLElement;
              if (line) {
                line.style.transform = `scaleX(${progress})`;
              }
            }
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-br from-surface/30 via-background to-surface/30">
      <div className="container-premium" ref={containerRef}>
        <div className="text-center mb-20">
          <h2 className="how-it-works-title text-section-title gradient-text mb-6">
            How Prompt10X Works
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Transform any text from good to exceptional in seconds. Our AI-powered enhancement 
            process is designed for professionals who demand results.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto" ref={stepsRef}>
          {/* Progressive Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px">
            <div 
              className="progressive-line absolute h-px bg-gradient-to-r from-accent to-primary"
              style={{
                left: '0%',
                width: '100%',
                transformOrigin: 'left center'
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="step-card relative"
                style={{ animationDelay: `${step.delay}s` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  {step.id}
                </div>

                <div className="card-premium text-center h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6">
                    <div className="w-full bg-muted rounded-full h-2 relative overflow-hidden">
                      <div 
                        className={`h-2 bg-gradient-to-r ${step.color} rounded-full`}
                        style={{ 
                          width: '0%',
                          animation: `progressFill${step.id} 2s ease-out ${index * 0.3 + 1}s forwards`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}