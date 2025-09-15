import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  size?: number;
  speed?: number;
  showText?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 200,
  speed = 3000,
  showText = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scale = size / 200; // Scale factor based on original 200px design

  return (
    <div 
      className={`relative flex items-center justify-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      style={{ width: size, height: showText ? size * 1.2 : size }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        {/* Outer orbit - animated rotation */}
        <ellipse 
          cx="100" 
          cy="100" 
          rx="80" 
          ry="50" 
          stroke="#00E5FF" 
          strokeWidth="2" 
          transform="rotate(30 100 100)" 
          opacity="0.8"
          className="animate-spin-slow"
          style={{ 
            animation: `orbitRotate ${speed}ms linear infinite`,
            transformOrigin: '100px 100px'
          }}
        />
        
        {/* Inner orbit - animated rotation (opposite direction) */}
        <ellipse 
          cx="100" 
          cy="100" 
          rx="60" 
          ry="35" 
          stroke="#7A4EAB" 
          strokeWidth="2" 
          transform="rotate(-15 100 100)" 
          opacity="0.8"
          style={{ 
            animation: `orbitRotateReverse ${speed * 0.7}ms linear infinite`,
            transformOrigin: '100px 100px'
          }}
        />
        
        {/* Central Sphere/Planet with pulsing effect */}
        <circle 
          cx="100" 
          cy="100" 
          r="30" 
          fill="url(#planetGradient)"
          className="animate-pulse"
        />
        
        {/* Orbiting circle 1 - moves along outer ellipse */}
        <circle 
          cx="160" 
          cy="80" 
          r="8" 
          fill="#00E5FF"
          style={{ 
            animation: `orbitDot1 ${speed}ms linear infinite`,
            transformOrigin: '100px 100px'
          }}
        />
        
        {/* Orbiting circle 2 - moves along inner ellipse */}
        <circle 
          cx="55" 
          cy="125" 
          r="6" 
          fill="#7A4EAB"
          style={{ 
            animation: `orbitDot2 ${speed * 0.8}ms linear infinite`,
            transformOrigin: '100px 100px'
          }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="planetGradient" x1="70" y1="70" x2="130" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E3A5F"/>
            <stop offset="50%" stopColor="#40E0FF" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#5B3E8E"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Company Name */}
      {showText && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <h3 
            className="font-space-grotesk font-bold gradient-text whitespace-nowrap"
            style={{ fontSize: `${scale * 18}px` }}
          >
            ORBITDYNAMIX
          </h3>
        </div>
      )}
    </div>
  );
};

export default AnimatedLogo; 