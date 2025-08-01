import { useEffect, useRef, useState } from 'react';
import { Brain, Zap, Target, Shield, Sparkles, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Advanced AI Engine',
    description: 'Trained on millions of high-performing texts across industries',
    details: 'Our proprietary AI understands context, intent, and optimization patterns that deliver 10x better results',
    color: 'from-blue-500 to-cyan-500',
    metric: '94% Success Rate'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Lightning Fast Processing',
    description: 'Get enhanced text in under 3 seconds, not minutes',
    details: 'Advanced optimization algorithms provide instant results without compromising quality',
    color: 'from-purple-500 to-pink-500',
    metric: '<3s Processing'
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Precision Targeting',
    description: 'Tailored optimization for specific use cases and industries',
    details: 'Whether marketing, technical, or creative content - we optimize for your exact requirements',
    color: 'from-green-500 to-emerald-500',
    metric: '15+ Industries'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Enterprise Security',
    description: 'Your content stays private with end-to-end encryption',
    details: 'Zero data retention, SOC 2 compliance, and military-grade security protocols',
    color: 'from-orange-500 to-red-500',
    metric: 'SOC 2 Certified'
  }
];

const comparisonData = [
  { feature: 'Processing Speed', us: 'Lightning Fast (<3s)', others: 'Slow (30s+)', advantage: true },
  { feature: 'Industry Support', us: '15+ Industries', others: '2-3 Industries', advantage: true },
  { feature: 'Security', us: 'Enterprise Grade', others: 'Basic', advantage: true },
  { feature: 'Text Library', us: '10,000+ Templates', others: 'Limited', advantage: true },
  { feature: 'Success Rate', us: '94%', others: '67%', advantage: true },
];

export function WhatMakesDifferent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'comparison'>('features');
  const [sliderStyle, setSliderStyle] = useState({});
  const featuresRef = useRef<HTMLButtonElement>(null);
  const comparisonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.differentiator-card', 
        { 
          opacity: 0, 
          y: 40,
          rotationX: 5
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.comparison-row', 
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.comparison-table',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'features' && featuresRef.current) {
      setSliderStyle({
        width: featuresRef.current.offsetWidth,
        transform: `translateX(${featuresRef.current.offsetLeft - 8}px)`
      });
    } else if (activeTab === 'comparison' && comparisonRef.current) {
      setSliderStyle({
        width: comparisonRef.current.offsetWidth,
        transform: `translateX(${comparisonRef.current.offsetLeft - 8}px)`
      });
    }
  }, [activeTab]);

  return (
    <section id="what-makes-different" className="section-padding bg-gradient-to-br from-background via-surface/20 to-background">
      <div className="container-premium" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="text-section-title gradient-text mb-6">
            What Makes Prompt10X Different
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            While others offer basic text editing, we deliver AI-powered transformation 
            that consistently produces superior results.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-surface/50 backdrop-blur-xl border border-border/50 rounded-2xl p-2 relative">
            {/* Sliding Background */}
            <div 
              className="absolute top-2 bottom-2 bg-gradient-to-r from-accent to-primary rounded-xl transition-all duration-300 ease-out shadow-lg"
              style={sliderStyle}
            />
            <button
              ref={featuresRef}
              onClick={() => setActiveTab('features')}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 z-10 ${
                activeTab === 'features'
                  ? 'text-white font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Key Features
            </button>
            <button
              ref={comparisonRef}
              onClick={() => setActiveTab('comparison')}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 z-10 ${
                activeTab === 'comparison'
                  ? 'text-white font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              vs Competition
            </button>
          </div>
        </div>

        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="differentiator-card card-premium group hover:scale-105 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                        {item.metric}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="comparison-table max-w-4xl mx-auto">
            <div className="card-premium">
              <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-border/50">
                <div></div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold gradient-text">Prompt10X</h3>
                  <p className="text-sm text-muted-foreground mt-1">Premium AI Tool</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-muted-foreground">Others</h3>
                  <p className="text-sm text-muted-foreground mt-1">Basic Solutions</p>
                </div>
              </div>

              <div className="space-y-4">
                {comparisonData.map((row, index) => (
                  <div
                    key={index}
                    className="comparison-row grid grid-cols-3 gap-6 py-4 rounded-lg hover:bg-surface/50 transition-colors duration-300"
                  >
                    <div className="font-medium text-foreground">
                      {row.feature}
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm">
                        {row.us}
                        <Sparkles className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-muted-foreground">
                        {row.others}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="btn-premium group">
            <span className="flex items-center gap-3">
              Experience the Difference
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}