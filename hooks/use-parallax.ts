import { useState, useEffect } from 'react';

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

export function useParallaxTransform(factor: number = 0.5) {
  const scrollY = useParallax();
  return `translateY(${scrollY * factor}px)`;
}

export function useParallaxOpacity(startOpacity: number = 1, fadeFactor: number = 0.002) {
  const scrollY = useParallax();
  const opacity = Math.max(0, startOpacity - scrollY * fadeFactor);
  return opacity;
}
