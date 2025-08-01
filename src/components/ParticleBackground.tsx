import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: 'light' | 'glow' | 'pulse';
  opacity: number;
}

interface WordParticle {
  x: number;
  y: number;
  word: string;
  progress: number;
  speed: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const wordParticlesRef = useRef<WordParticle[]>([]);
  const animationRef = useRef<number>();

  const words = ['Transform', 'Magic', 'Flow', 'Create', 'Inspire', 'Enhance'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particlesRef.current = [];
      // Create floating particles with optimized performance
      for (let i = 0; i < 30; i++) { // Reduced from 50 to 30 for better performance
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Reduced velocity for smoother movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1, // Reduced size range
          type: Math.random() < 0.7 ? 'light' : Math.random() < 0.85 ? 'glow' : 'pulse',
          opacity: Math.random() * 0.4 + 0.2 // Reduced opacity range
        });
      }

      // Initialize word particles
      wordParticlesRef.current = [];
    };

    const createWordParticle = () => {
      if (wordParticlesRef.current.length < 2) { // Reduced from 3 to 2
        wordParticlesRef.current.push({
          x: Math.random() * (canvas.width - 200) + 100,
          y: canvas.height + 50,
          word: words[Math.floor(Math.random() * words.length)],
          progress: 0,
          speed: 0.002 + Math.random() * 0.001 // Reduced speed
        });
      }
    };

    const updateParticles = () => {
      // Update floating particles with smoother movement
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges with smoother transitions
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Smoother opacity oscillation
        particle.opacity = 0.2 + Math.sin(Date.now() * 0.0005 + particle.x * 0.005) * 0.2;
      });

      // Update word particles
      wordParticlesRef.current.forEach((wordParticle, index) => {
        wordParticle.progress += wordParticle.speed;
        wordParticle.y = canvas.height - (wordParticle.progress * (canvas.height + 100));

        if (wordParticle.progress > 1) {
          wordParticlesRef.current.splice(index, 1);
        }
      });

      // Reduced frequency of new word particles
      if (Math.random() < 0.003) { // Reduced from 0.005
        createWordParticle();
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw floating particles with optimized rendering
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        switch (particle.type) {
          case 'light':
            ctx.fillStyle = 'hsl(240, 30%, 85%)';
            break;
          case 'glow':
            ctx.fillStyle = 'hsl(273, 100%, 72%)';
            ctx.shadowBlur = 15; // Reduced shadow blur
            ctx.shadowColor = 'hsl(273, 100%, 72%)';
            break;
          case 'pulse':
            ctx.fillStyle = 'hsl(150, 90%, 52%)';
            ctx.shadowBlur = 10; // Reduced shadow blur
            ctx.shadowColor = 'hsl(150, 90%, 52%)';
            break;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw word particles with optimized rendering
      wordParticlesRef.current.forEach(wordParticle => {
        const opacity = wordParticle.progress < 0.1 
          ? wordParticle.progress * 10 
          : wordParticle.progress > 0.9 
          ? (1 - wordParticle.progress) * 10 
          : 1;

        ctx.save();
        ctx.globalAlpha = opacity * 0.5; // Reduced opacity
        ctx.fillStyle = 'hsl(273, 100%, 72%)';
        ctx.font = '300 20px Space Grotesk, sans-serif'; // Reduced font size
        ctx.textAlign = 'center';
        
        // Reduced glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'hsl(273, 100%, 72%)';
        
        ctx.fillText(wordParticle.word, wordParticle.x, wordParticle.y);
        ctx.restore();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
}