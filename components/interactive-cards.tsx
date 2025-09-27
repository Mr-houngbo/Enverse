import Link from 'next/link';
import { ArrowRight, Code, Brain, Coffee, Sparkles } from 'lucide-react';

interface InteractiveCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  gradient: string;
  delay?: number;
}

function InteractiveCard({ icon: Icon, title, description, href, gradient, delay = 0 }: InteractiveCardProps) {
  return (
    <div
      className={`group relative w-full ${delay === 0 ? 'animate-delay-0' : delay === 200 ? 'animate-delay-200' : 'animate-delay-400'}`}
    >
      <Link href={href}>
        <div className="relative h-48 perspective-1000 cursor-pointer">
          {/* Card front */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${gradient} bg-opacity-10 border border-orange-500/20 backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:rotate-y-180 preserve-3d`}>
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="p-4 rounded-full bg-white/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-8 w-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-300 text-sm opacity-80">{description}</p>
            </div>
          </div>

          {/* Card back */}
          <div className={`absolute inset-0 w-full h-full bg-gradient-to-br ${gradient} bg-opacity-20 border border-orange-500/30 backdrop-blur-sm rounded-2xl transition-all duration-500 rotate-y-180 backface-hidden`}>
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Sparkles className="h-12 w-12 text-orange-300 mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">Découvrez</h3>
              <p className="text-gray-200 text-sm mb-4">Cliquez pour explorer</p>
              <ArrowRight className="h-6 w-6 text-orange-400 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .animate-delay-0 {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-delay-200 {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
        }
        .animate-delay-400 {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export function InteractiveCards() {
  const cards = [
    {
      icon: Code,
      title: "Projets",
      description: "Découvrez mes réalisations en développement",
      href: "/projects",
      gradient: "from-orange-500 to-orange-600",
      delay: 0,
    },
    {
      icon: Brain,
      title: "Articles",
      description: "Plongez dans mes réflexions sur l'IA et la tech",
      href: "/blog",
      gradient: "from-orange-400 to-orange-500",
      delay: 200,
    },
    {
      icon: Coffee,
      title: "À propos",
      description: "En savoir plus sur mon parcours",
      href: "/about",
      gradient: "from-orange-300 to-orange-400",
      delay: 400,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
      {cards.map((card, index) => (
        <InteractiveCard key={index} {...card} />
      ))}
    </div>
  );
}
