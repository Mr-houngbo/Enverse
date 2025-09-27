export function AfricaMap() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Simplified Africa map SVG */}
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Africa outline - simplified */}
        <path
          d="M400 50 L450 60 L480 80 L500 120 L510 160 L500 200 L480 240 L460 280 L440 320 L420 360 L400 400 L380 440 L360 480 L340 520 L320 550 L300 570 L280 580 L260 570 L240 550 L220 520 L200 480 L180 440 L160 400 L140 360 L120 320 L100 280 L80 240 L60 200 L50 160 L40 120 L50 80 L70 60 L100 50 L140 40 L180 50 L220 60 L260 70 L300 80 L340 70 L380 60 Z"
          fill="none"
          stroke="rgba(249, 115, 22, 0.3)"
          strokeWidth="2"
          className="animate-pulse"
        />

        {/* Animated data points */}
        <circle cx="320" cy="200" r="3" fill="#f97316" className="animate-ping">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="380" cy="250" r="2" fill="#fb923c" className="animate-ping delay-300">
          <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="300" r="2.5" fill="#fdba74" className="animate-ping delay-700">
          <animate attributeName="opacity" values="1;0.4;1" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="420" cy="350" r="2" fill="#fed7aa" className="animate-ping delay-1000">
          <animate attributeName="opacity" values="1;0.6;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="400" r="3" fill="#f97316" className="animate-ping delay-500">
          <animate attributeName="opacity" values="1;0.5;1" dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* Connecting lines */}
        <path
          d="M320 200 L380 250 L280 300"
          stroke="rgba(249, 115, 22, 0.2)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
        >
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="3s" repeatCount="indefinite" />
        </path>

        <path
          d="M280 300 L420 350 L250 400"
          stroke="rgba(251, 146, 60, 0.2)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse delay-1000"
        >
          <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="4s" repeatCount="indefinite" />
        </path>
      </svg>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-orange-500/10 rotate-45 animate-spin-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-orange-400/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-orange-500/5 rotate-12 animate-bounce delay-500"></div>
    </div>
  );
}
