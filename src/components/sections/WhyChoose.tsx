import { useEffect, useRef, useState } from 'react';
import { Star, Users, Shield, Zap, TrendingUp, Award, Clock, Target } from 'lucide-react';
import { gsap } from 'gsap';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    quote: "Prompt10X transformed our content strategy. Our AI-generated marketing copy now converts 3x better.",
    rating: 5,
    metric: "+300% conversion rate"
  },
  {
    name: "Michael Rodriguez",
    role: "Senior Developer",
    company: "DevCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "The code review prompts are incredible. I catch bugs and optimization opportunities I would have missed.",
    rating: 5,
    metric: "+40% code quality"
  },
  {
    name: "Emily Johnson",
    role: "Content Creator",
    company: "Creative Studios",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "My creative writing prompts now generate stories that truly captivate my audience. Game-changing tool.",
    rating: 5,
    metric: "+250% engagement"
  }
];

const trustSignals = [
  { icon: <Users className="w-6 h-6" />, value: "50,000+", label: "Active Users" },
  { icon: <Star className="w-6 h-6" />, value: "4.9/5", label: "User Rating" },
  { icon: <Shield className="w-6 h-6" />, value: "99.9%", label: "Uptime" },
  { icon: <Zap className="w-6 h-6" />, value: "<3s", label: "Processing Time" },
];

const benefits = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "10x Better Results",
    description: "Get dramatically improved AI outputs with scientifically optimized prompts",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Save Hours Daily",
    description: "Stop struggling with prompt engineering - get perfect prompts instantly",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Precision Targeting",
    description: "Tailored optimization for your specific industry and use case",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Professional Edge",
    description: "Join elite professionals who use AI to accelerate their success",
    color: "from-orange-500 to-red-500"
  }
];

export function WhyChoose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-signal', 
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.trust-signals',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.benefit-card', 
        { opacity: 0, y: 40, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.benefits-grid',
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo('.testimonial-card', 
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="why-choose" className="section-padding bg-gradient-to-br from-background via-surface/20 to-background">
      <div className="container-premium" ref={containerRef}>
        <div className="text-center mb-20">
          <h2 className="text-section-title gradient-text mb-6">
            Why Choose Prompt10X
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Join thousands of professionals who've already transformed their AI workflow 
            and achieved remarkable results.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="trust-signals grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="trust-signal text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                {signal.icon}
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {signal.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {signal.label}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card card-premium group hover:scale-105 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${benefit.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-section max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold text-center text-foreground mb-12">
            Trusted by Industry Leaders
          </h3>

          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="testimonial-card w-full flex-shrink-0 card-premium bg-gradient-to-br from-surface/80 to-surface-elevated/80"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-accent/20"
                    />
                    
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <p className="text-lg text-foreground mb-4 italic">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="font-semibold text-foreground">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                        
                        <div className="mt-2 md:mt-0">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm">
                            <TrendingUp className="w-3 h-3" />
                            {testimonial.metric}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTestimonial === index
                    ? 'bg-gradient-to-r from-accent to-primary'
                    : 'bg-muted hover:bg-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-surface/80 to-surface-elevated/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Ready to join the elite?
              </h3>
              <p className="text-muted-foreground">
                Transform your AI workflow today and see results immediately
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-premium">
                Start Free Trial
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}