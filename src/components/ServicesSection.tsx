import { Link } from "react-router-dom";
import { services } from "@/lib/data";
import { Code, Smartphone, Search, Users, MousePointerClick, ExternalLink } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const ServicesSection = () => {
  const serviceIcons: { [key: string]: React.ReactNode } = {
    "web-solutions": <Code size={32} />,
    "app-development": <Smartphone size={32} />,
    "seo-optimization": <Search size={32} />,
    "social-media-marketing": <Users size={32} />,
    "pay-per-click-marketing": <MousePointerClick size={32} />,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Auto-advance carousel
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-orbit-dark to-orbit-blue relative overflow-hidden">
      {/* Background orbital elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-orbit-cyan/8 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-orbit-purple/6 animate-pulse-slow blur-3xl" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 
            className={`section-title text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="gradient-text">Our Services</span>
          </h2>
          <p 
            className={`text-xl text-gray-300 max-w-3xl mx-auto mt-8 leading-relaxed transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            We provide comprehensive IT solutions to empower your business with cutting-edge technology and strategies.
          </p>
        </div>
        
        {/* Services Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`service-card group transition-all duration-500 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Service Icon */}
                <div className="flex-shrink-0 mb-6">
                  <div className="text-orbit-cyan p-4 rounded-xl bg-gradient-to-br from-orbit-cyan/10 to-orbit-purple/10 backdrop-blur-sm border border-orbit-cyan/20">
                    {serviceIcons[service.id]}
                  </div>
                </div>
                
                {/* Service Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orbit-cyan transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      to={`/services/${service.id}`}
                      className="orbit-btn group inline-flex items-center justify-center"
                    >
                      Learn More
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="orbit-btn-outline group inline-flex items-center justify-center"
                    >
                      Get Quote
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Services Carousel - Mobile & Tablet */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="service-card mx-4">
                    <div className="flex flex-col items-center text-center h-full">
                      {/* Service Icon */}
                      <div className="flex-shrink-0 mb-6">
                        <div className="text-orbit-cyan p-4 rounded-xl bg-gradient-to-br from-orbit-cyan/10 to-orbit-purple/10 backdrop-blur-sm border border-orbit-cyan/20">
                          {serviceIcons[service.id]}
                        </div>
                      </div>
                      
                      {/* Service Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-4">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-col gap-3 justify-center">
                          <Link
                            to={`/services/${service.id}`}
                            className="orbit-btn group inline-flex items-center justify-center"
                          >
                            Learn More
                            <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                          </Link>
                          <Link
                            to="/contact"
                            className="orbit-btn-outline group inline-flex items-center justify-center"
                          >
                            Get Quote
                            <ExternalLink className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orbit-dark/80 border border-orbit-cyan/30 text-orbit-cyan hover:bg-orbit-cyan/10 transition-colors duration-300 flex items-center justify-center"
              aria-label="Previous service"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orbit-dark/80 border border-orbit-cyan/30 text-orbit-cyan hover:bg-orbit-cyan/10 transition-colors duration-300 flex items-center justify-center"
              aria-label="Next service"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-orbit-cyan scale-110' : 'bg-orbit-cyan/30 hover:bg-orbit-cyan/60'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link
            to="/services"
            className="orbit-btn text-lg px-8 py-4 group inline-flex items-center"
          >
            View All Services
            <ExternalLink className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
