import { useState, useEffect, useRef } from 'react';

interface UseCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  start?: number;
}

export function useCounter({ end, duration = 2000, delay = 0, start = 0 }: UseCounterProps) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsAnimating(false);
      }
    };

    const timer = setTimeout(() => {
      setIsAnimating(true);
      startTimeRef.current = undefined;
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [end, duration, delay, start]);

  return { count, isAnimating };
} 