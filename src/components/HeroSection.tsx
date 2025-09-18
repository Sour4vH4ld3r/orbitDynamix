import { ArrowRight, Play, Star, Shield, Zap, Users, TrendingUp, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { Link } from "react-router-dom";

// Custom hook for animated counter
const useAnimatedCounter = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return count;
};

const HeroSection = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [showDemo, setShowDemo] = useState(false);

  // Animated stats
  const projectsCount = useAnimatedCounter(150, 2000, 800);
  const clientsCount = useAnimatedCounter(95, 2000, 1000);
  const uptimeCount = useAnimatedCounter(99, 2000, 1200);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = clientX / innerWidth - 0.5;
      const moveY = clientY / innerHeight - 0.5;
      
      orbitRef.current.style.transform = `translate(${moveX * 15}px, ${moveY * 15}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-orbit-dark via-orbit-blue to-orbit-blue-warm">
      {/* Orbital background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-orbit-purple/15 animate-pulse-slow blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-orbit-cyan/8 animate-pulse-slow blur-xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-orbit-emerald/10 animate-pulse-slow blur-2xl" style={{ animationDelay: '2s' }}></div>
        <div ref={orbitRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-orbit-cyan"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-orbit-purple-light"></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-white"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Dynamic Content */}
          <div className="space-y-8 animate-fade-in [animation-delay:200ms]">
            {/* Trust Badge */}
            <div className="flex items-center gap-3 animate-fade-in [animation-delay:100ms]">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orbit-amber text-orbit-amber" />
                ))}
              </div>
              <span className="text-sm text-gray-300 font-medium">Trusted by 95+ Businesses</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-shadow tracking-tight">
                <span className="block mb-2">
                  <TypeAnimation
                    sequence={[
                      'Transform Your',
                      1000,
                      'Accelerate Your',
                      1000,
                      'Elevate Your',
                      1000,
                      'Revolutionize Your',
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="gradient-text"
                  />
                </span>
                <span className="text-white">Digital Presence</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-xl">
                <TypeAnimation
                  sequence={[
                    'Cutting-edge IT solutions that propel your business forward',
                    1500,
                    'Expert web development, digital marketing, and strategic consulting',
                    1500,
                    'Your trusted partner in digital transformation and growth',
                    1500,
                  ]}
                  wrapper="span"
                  speed={60}
                  repeat={Infinity}
                  style={{ display: 'inline-block' }}
                />
              </p>
            </div>

            {/* Smart CTA System */}
            <div className="space-y-4 animate-fade-in [animation-delay:600ms]">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="orbit-btn group text-base font-semibold px-6 sm:px-8 py-4 justify-center sm:justify-start">
                  Get Started Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <button
                  onClick={() => setShowDemo(true)}
                  className="orbit-btn-outline group text-base font-semibold px-6 sm:px-8 py-4 justify-center sm:justify-start"
                >
                  <Play className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  View Demo
                </button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 text-sm">
                <Link to="/services" className="inline-flex items-center justify-center sm:justify-start gap-2 text-orbit-cyan hover:text-orbit-cyan-bright transition-colors duration-200 py-2">
                  <Zap className="w-4 h-4" />
                  Explore Services
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center sm:justify-start gap-2 text-orbit-cyan hover:text-orbit-cyan-bright transition-colors duration-200 py-2">
                  <Shield className="w-4 h-4" />
                  Free Consultation
                </Link>
              </div>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 border-t border-white/10 animate-fade-in [animation-delay:800ms]">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orbit-cyan mb-1">
                  {projectsCount}+
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Projects Delivered</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orbit-purple-light mb-1">
                  {clientsCount}+
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Happy Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orbit-emerald mb-1">
                  {uptimeCount}.9%
                </div>
                <div className="text-xs sm:text-sm text-gray-400 font-medium">Uptime SLA</div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Visual */}
          <div className="relative animate-fade-in [animation-delay:400ms]">
            {/* Main Visual Container */}
            <div className="relative">
              {/* Central Logo */}
              <div className="relative z-10 flex justify-center">
                <img 
                  src="/logo.svg" 
                  alt="OrbitDynamix Logo" 
                  className="w-80 h-80 lg:w-96 lg:h-96 drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Interactive Orbital Elements */}
              <div className="absolute inset-0">
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full bg-orbit-purple/40 blur-xl animate-pulse-slow"></div>
                <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-orbit-cyan/40 blur-xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-orbit-emerald/30 blur-lg animate-pulse-slow" style={{ animationDelay: '2.5s' }}></div>
              </div>

              {/* Floating Service Badges */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-4 sm:right-8 glass-effect px-3 py-2 rounded-lg">
                  <div className="text-xs font-semibold text-orbit-cyan flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" />
                    <span className="hidden sm:inline">SEO Optimized</span>
                    <span className="sm:hidden">SEO</span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-4 sm:left-8 glass-effect px-3 py-2 rounded-lg">
                  <div className="text-xs font-semibold text-orbit-purple-light flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span className="hidden sm:inline">Secure & Fast</span>
                    <span className="sm:hidden">Secure</span>
                  </div>
                </div>
                <div className="absolute top-1/2 left-2 sm:left-4 glass-effect px-3 py-2 rounded-lg hidden sm:flex">
                  <div className="text-xs font-semibold text-orbit-emerald flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 space-y-4 animate-fade-in [animation-delay:1000ms]">
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-orbit-amber" />
                  <span>ISO Certified</span>
                </div>
                <div className="w-px h-4 bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orbit-cyan" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in [animation-delay:1200ms]">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs text-gray-400 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orbit-cyan rounded-full animate-bounce mt-2"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-orbit-slate-dark border border-orbit-cyan/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Play className="w-8 h-8 text-orbit-cyan mr-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Interactive Demo</h3>
              </div>
              <p className="text-gray-300 mb-6 text-sm sm:text-base">Experience our cutting-edge solutions in action and see how we can transform your business.</p>
              
              {/* Demo Features Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="glass-effect p-4 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orbit-cyan mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">SEO Analytics</div>
                </div>
                <div className="glass-effect p-4 rounded-lg">
                  <Shield className="w-6 h-6 text-orbit-purple-light mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">Security Dashboard</div>
                </div>
                <div className="glass-effect p-4 rounded-lg">
                  <Users className="w-6 h-6 text-orbit-emerald mx-auto mb-2" />
                  <div className="text-xs font-semibold text-white">Team Collaboration</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/services" className="orbit-btn" onClick={() => setShowDemo(false)}>
                  Explore Services
                </Link>
                <button 
                  className="orbit-btn-outline" 
                  onClick={() => setShowDemo(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
