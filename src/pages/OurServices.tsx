import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Smartphone, 
  Search, 
  Users, 
  MousePointerClick, 
  ArrowRight, 
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Target
} from 'lucide-react';

const OurServices = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.service-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-fade-in');
            }, index * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const serviceIcons: { [key: string]: React.ReactNode } = {
    "web-solutions": <Code size={48} />,
    "app-development": <Smartphone size={48} />,
    "seo-optimization": <Search size={48} />,
    "social-media-marketing": <Users size={48} />,
    "pay-per-click-marketing": <MousePointerClick size={48} />,
  };

  const features = [
    { icon: <Shield className="w-6 h-6" />, text: "100% Secure & Reliable" },
    { icon: <Zap className="w-6 h-6" />, text: "Fast Delivery" },
    { icon: <Target className="w-6 h-6" />, text: "Targeted Solutions" },
    { icon: <TrendingUp className="w-6 h-6" />, text: "Proven Results" },
  ];

  return (
    <div className="min-h-screen bg-orbit-slate">
      <section className="relative py-20 bg-gradient-to-br from-orbit-slate-dark via-orbit-slate to-orbit-slate-dark overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Our Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive IT solutions designed to transform your business with cutting-edge technology.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-orbit-cyan/20">
                  <div className="text-orbit-cyan mb-2">{feature.icon}</div>
                  <span className="text-sm text-gray-300 text-center">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="orbit-btn group px-8 py-3">
                  Get Started Today
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="border-orbit-cyan text-orbit-cyan hover:bg-orbit-cyan hover:text-orbit-slate px-8 py-3">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-13 bg-orbit-slate-dark" ref={heroRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">What We Offer</span>
            </h2>
            <div className="w-24 h-1 bg-orbit-cyan mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From web development to digital marketing, we provide end-to-end solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.id} className="service-card opacity-0 translate-y-8 bg-orbit-slate border-orbit-cyan/20 hover:border-orbit-cyan/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-orbit-cyan/10">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 text-orbit-cyan group-hover:scale-110 transition-transform duration-300">
                    {serviceIcons[service.id]}
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-orbit-cyan transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-center leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="pt-4 border-t border-orbit-cyan/20">
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {service.detailedDescription}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link to={`/services/${service.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-orbit-cyan/30 text-orbit-cyan hover:bg-orbit-cyan hover:text-orbit-slate text-sm">
                          View Details
                        </Button>
                      </Link>
                      <Link to="/contact" className="flex-1">
                        <Button className="w-full bg-orbit-cyan hover:bg-orbit-cyan/80 text-orbit-slate text-sm">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-orbit-slate">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Why Choose OrbitDynamix?</span>
            </h2>
            <div className="w-24 h-1 bg-orbit-cyan mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                {[
                  "Expert team with 5+ years experience",
                  "Custom solutions tailored to your needs",
                  "24/7 support and maintenance",
                  "Proven track record of success"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-orbit-cyan flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6">
                {[
                  "Latest technologies and frameworks",
                  "Transparent pricing with no hidden costs",
                  "Fast delivery and quick turnaround",
                  "Post-launch support and optimization"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="w-6 h-6 text-orbit-cyan flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-orbit-cyan/10 to-orbit-purple/10 border-y border-orbit-cyan/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a solution that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="orbit-btn group px-8 py-3">
                Start Your Project
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" className="border-orbit-cyan text-orbit-cyan hover:bg-orbit-cyan hover:text-orbit-slate px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices; 