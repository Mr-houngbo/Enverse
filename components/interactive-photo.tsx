import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface InteractivePhotoProps {
  src: string;
  alt: string;
  size?: 'default' | 'large';
}

export function InteractivePhoto({ src, alt, size = 'default' }: InteractivePhotoProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Vérifier si on est sur mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    // Désactiver les animations sur mobile
    if (isMobile) return;

    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <div className="relative group">
      <div
        ref={cardRef}
        className={`relative mx-auto transition-transform duration-200 ease-out ${
          size === 'large' ? 'w-[36rem] h-96' : 'w-[28rem] h-80'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Elegant frame with shadow and halo effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-purple-600/20 rounded-3xl border-2 border-orange-500/40 shadow-2xl shadow-orange-500/20 backdrop-blur-sm"></div>
        <div className="absolute -inset-2 bg-gradient-to-br from-orange-400/10 to-purple-600/10 rounded-3xl blur-xl opacity-50"></div>
        <div className="absolute inset-2 bg-gradient-to-br from-white/15 to-orange-500/10 rounded-2xl border border-orange-400/30"></div>

        {/* Profile image with elegant styling */}
        <div className="absolute inset-4 rounded-2xl overflow-hidden border-3 border-white/40 shadow-inner shadow-black/20">
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 28rem, (max-width: 1024px) 36rem, 28rem"
              priority
              className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-105"
            />
            {/* Subtle overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-orange-500/15 rounded-2xl"></div>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Decorative corners with enhanced styling */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-3 border-t-3 border-orange-400 rounded-tl-xl shadow-lg"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-3 border-t-3 border-orange-400 rounded-tr-xl shadow-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-3 border-b-3 border-orange-400 rounded-bl-xl shadow-lg"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-3 border-b-3 border-orange-400 rounded-br-xl shadow-lg"></div>

        {/* Enhanced floating accent elements */}
        <div className="absolute -top-4 left-1/3 w-3 h-3 bg-orange-400 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute -bottom-3 right-1/4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce delay-200 shadow-lg"></div>
        <div className="absolute top-1/2 -right-5 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping delay-500 shadow-lg"></div>
        <div className="absolute -left-4 top-1/4 w-2 h-2 bg-orange-300 rounded-full animate-pulse delay-700 shadow-lg"></div>
      </div>
    </div>
  );
}
