import { useEffect, useRef, useState } from 'react';
import { Folder, File, Star, Zap, Brain, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: React.ReactNode;
  description: string;
  color: string;
}

const fileItems: FileItem[] = [
  {
    id: '1',
    name: 'Marketing Prompts',
    type: 'folder',
    icon: <Star className="w-5 h-5" />,
    description: 'Social media, email campaigns, product descriptions',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    name: 'Creative Writing',
    type: 'folder',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Stories, poems, scripts, and creative content',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    name: 'Business Strategy',
    type: 'folder',
    icon: <Brain className="w-5 h-5" />,
    description: 'Analysis, planning, decision-making prompts',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '4',
    name: 'Enhanced_Email.prompt',
    type: 'file',
    icon: <Zap className="w-5 h-5" />,
    description: 'Professional email transformation',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: '5',
    name: 'Code_Review.prompt',
    type: 'file',
    icon: <File className="w-5 h-5" />,
    description: 'Technical code analysis and feedback',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: '6',
    name: 'Presentation_Ideas.prompt',
    type: 'file',
    icon: <File className="w-5 h-5" />,
    description: 'Compelling presentation concepts',
    color: 'from-yellow-500 to-orange-500'
  }
];

export function SmartFileSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.file-item', 
        { 
          opacity: 0, 
          y: 40,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
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
          <h2 className="text-section-title gradient-text mb-6">
            Organize Your AI Workflow
          </h2>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto">
            Never lose a perfect prompt again. Our smart file system learns from your usage patterns 
            and suggests the most effective prompts for any situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {fileItems.map((item, index) => (
            <div
              key={item.id}
              className={`file-item card-premium group cursor-pointer transition-all duration-500 ${
                hoveredItem === item.id ? 'scale-105 shadow-glow' : ''
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.type === 'folder' ? (
                    <Folder className="w-6 h-6" />
                  ) : (
                    item.icon
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${item.color} text-white`}>
                      {item.type === 'folder' ? 'Folder' : 'Prompt'}
                    </span>
                    {item.type === 'file' && (
                      <span className="text-xs text-muted-foreground">
                        Recently enhanced
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {hoveredItem === item.id && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <button className="btn-premium w-full justify-center py-2 text-sm">
                    {item.type === 'folder' ? 'Open Folder' : 'Use Prompt'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="btn-success px-8 py-4 text-lg group">
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              Start Organizing Your Prompts
              <Zap className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}