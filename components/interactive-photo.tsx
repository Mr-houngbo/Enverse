import { useRef, useEffect } from 'react';
import Image from 'next/image';

interface InteractivePhotoProps {
  src: string;
  alt: string;
}

export function InteractivePhoto({ src, alt }: InteractivePhotoProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className="relative group">
      <div
        ref={cardRef}
        className="relative w-40 h-40 mx-auto transition-transform duration-200 ease-out preserve-3d"
      >
        {/* Animated ring */}
        <div className="absolute inset-0 rounded-full border-4 border-orange-500/30 animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border-2 border-orange-400/50 animate-pulse"></div>

        {/* Profile image with 3D effect */}
        <div className="absolute inset-3 rounded-full overflow-hidden border-3 border-white/20 backdrop-blur-sm shadow-2xl">
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hologram effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-400/5 rounded-full"></div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-orange-300 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 -right-3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse delay-500"></div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
