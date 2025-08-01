import { useEffect, useRef } from 'react';
import { Upload, Wand2, Download, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    icon: <Upload className="w-8 h-8" />,
    title: 'Input Your Prompt',
    description: 'Paste or type your existing prompt into our intelligent editor. Our AI immediately begins analyzing structure, clarity, and potential improvements.',
    color: 'from-blue-500 to-cyan-500',
    delay: 0
  },
  {
    id: 2,
    icon: <Wand2 className="w-8 h-8" />,
    title: 'AI Enhancement Magic',
    description: 'Our advanced AI engine applies proven prompt engineering techniques, optimizing for clarity, context, and specific outcomes.',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    id: 3,
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Review & Refine',
    description: 'See side-by-side comparisons, understand the improvements, and make final adjustments with AI-guided suggestions.',
    color: 'from-green-500 to-emerald-500',
    delay: 0.4
  },
  {
    id: 4,
    icon: <Download className="w-8 h-8" />,
    title: 'Deploy & Succeed',
    description: 'Copy your enhanced prompt and watch as AI models deliver significantly better, more precise results than ever before.',
    color: 'from-orange-500 to-red-500',
    delay: 0.6
  }
];

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main heading
      gsap.fromTo('.how-it-works-title', 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate steps with stagger
      gsap.fromTo('.step-card', 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate connection lines
      gsap.fromTo('.connection-line', 
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
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
            Transform any prompt from good to exceptional in seconds. Our AI-powered enhancement 
            process is designed for professionals who demand results.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto" ref={stepsRef}>
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px">
            {steps.slice(0, -1).map((_, index) => (
              <div 
                key={index}
                className="connection-line absolute h-px bg-gradient-to-r from-accent to-primary"
                style={{
                  left: `${(index + 1) * 25 - 12.5}%`,
                  width: '25%',
                  transformOrigin: 'left center'
                }}
              />
            ))}
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
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Progress Indicator */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${step.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${(step.id / steps.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-surface/80 to-surface-elevated/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Ready to transform your prompts?
              </h3>
              <p className="text-muted-foreground">
                Join thousands of professionals getting better AI results
              </p>
            </div>
            <button className="btn-premium shrink-0">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}