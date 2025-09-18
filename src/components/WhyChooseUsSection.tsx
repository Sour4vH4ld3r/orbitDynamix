import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Target,
  TrendingUp,
  Users,
  Shield,
  Clock,
  Zap,
  Trophy,
  Star
} from "lucide-react";

const WhyChooseUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Results-Driven Approach",
      metric: "98%",
      metricLabel: "Success Rate",
      description: "We focus on measurable outcomes that directly impact your business growth and ROI.",
      benefits: ["Data-driven strategies", "Performance optimization", "ROI tracking"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Team",
      metric: "10+",
      metricLabel: "Years Experience",
      description: "Seasoned professionals with deep expertise across all modern technologies.",
      benefits: ["Senior developers", "Certified specialists", "Continuous learning"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      metric: "99.9%",
      metricLabel: "Uptime SLA",
      description: "Bank-grade security measures and infrastructure reliability you can trust.",
      benefits: ["ISO certified", "GDPR compliant", "24/7 monitoring"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Rapid Delivery",
      metric: "2x",
      metricLabel: "Faster Launch",
      description: "Accelerated development cycles without compromising on quality or security.",
      benefits: ["Agile methodology", "Continuous deployment", "Quick iterations"]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: <Trophy className="w-5 h-5" /> },
    { number: "150+", label: "Happy Clients", icon: <Users className="w-5 h-5" /> },
    { number: "24/7", label: "Support Available", icon: <Clock className="w-5 h-5" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="w-5 h-5" /> }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Initialize section when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="why-choose-us" 
      className="py-20 bg-gradient-to-b from-orbit-slate-dark via-orbit-dark to-orbit-blue relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,229,255,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(123,58,171,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orbit-cyan/10 border border-orbit-cyan/30 text-orbit-cyan px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <Star className="w-4 h-4 fill-current" />
            Why Choose OrbitDynamix
          </div>
          
          <h2 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="bg-gradient-to-r from-white via-orbit-cyan to-orbit-purple bg-clip-text text-transparent">
              Built for
            </span>
            <br />
            <span className="text-white">Excellence</span>
          </h2>
          
          <p className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            We don't just deliver projects — we build partnerships that drive your business forward
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left: Interactive Feature Showcase */}
          <div className={`space-y-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-orbit-blue/40 border-orbit-cyan/50 shadow-2xl'
                      : 'bg-orbit-slate-dark/30 border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-orbit-cyan/20 text-orbit-cyan'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {feature.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            activeFeature === index ? 'text-orbit-cyan' : 'text-gray-400'
                          }`}>
                            {feature.metric}
                          </div>
                          <div className="text-xs text-gray-500">{feature.metricLabel}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {activeFeature === index && (
                        <div className="space-y-2 animate-fade-in">
                          {feature.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-orbit-cyan">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats & Value Proposition */}
          <div className={`space-y-8 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-orbit-blue/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:bg-orbit-blue/40 transition-all duration-300"
                >
                  <div className="flex justify-center mb-3 text-orbit-cyan">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-br from-orbit-cyan/10 to-orbit-purple/10 border border-orbit-cyan/20 rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Your Success is Our Mission
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Every project we undertake is backed by our commitment to excellence, 
                innovation, and your business growth. We're not just service providers — 
                we're your technology partners.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a 
                  href="/contact" 
                  className="orbit-btn group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a 
                  href="/services" 
                  className="text-orbit-cyan hover:text-orbit-cyan-bright transition-colors duration-200 font-medium"
                >
                  View Services
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-orbit-slate-dark/50 backdrop-blur-sm border border-white/10 rounded-full px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Ready to get started?</span>
            </div>
            <a 
              href="/contact" 
              className="text-orbit-cyan hover:text-orbit-cyan-bright transition-colors duration-200 font-semibold text-sm"
            >
              Let's talk →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;