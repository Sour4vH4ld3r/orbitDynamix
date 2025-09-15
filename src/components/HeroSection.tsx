import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";

const HeroSection = () => {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = clientX / innerWidth - 0.7;
      const moveY = clientY / innerHeight - 0.7;
      
      orbitRef.current.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-orbit-dark via-orbit-blue to-orbit-dark">
      {/* Orbital background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-orbit-purple/10 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-orbit-cyan/5 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div ref={orbitRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-orbit-cyan animate-orbit"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-orbit-purple-light animate-orbit" style={{ animationDelay: '0.5s', animationDuration: '15s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-white animate-orbit" style={{ animationDelay: '1s', animationDuration: '10s' }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-8 animate-fade-in [animation-delay:200ms]">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <TypeAnimation
                sequence={[
                  'Innovate with OrbitDynamix',
                  2000,
                  'Transform with OrbitDynamix',
                  2000,
                  'Accelerate with OrbitDynamix',
                  2000,
                  'Evolve with OrbitDynamix',
                  2000,
                ]}
                wrapper="span"
                speed={30}
                repeat={Infinity}
                className="gradient-text"
              />
            </h1>
            <div className="animate-fade-in [animation-delay:400ms]">
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
                <TypeAnimation
                  sequence={[
                    'Propelling businesses forward with cutting-edge IT solutions',
                    1000,
                    'Propelling businesses forward with cutting-edge IT solutions designed to transform your digital presence',
                    1000,
                    'Propelling businesses forward with cutting-edge IT solutions designed to transform your digital presence and accelerate growth.',
                    3000,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                  style={{ display: 'inline-block' }}
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-4 animate-fade-in [animation-delay:600ms]">
              <Link to="/contact" className="orbit-btn group">
               Contact Us
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="orbit-btn-outline">
                Our Services
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center animate-fade-in [animation-delay:800ms]">
            <div className="relative">
              <img src="/logo.svg" alt="OrbitDynamix Logo" className="w-64 h-64 lg:w-96 lg:h-96 animate-float" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-orbit-purple/30 blur-xl animate-pulse-slow"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-orbit-cyan/30 blur-xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
