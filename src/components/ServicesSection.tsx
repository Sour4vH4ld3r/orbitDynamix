import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { services } from "@/lib/data";
import { Code, Smartphone, Search, Users, MousePointerClick } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard = ({ id, title, description, icon, delay }: ServiceCardProps) => {
  return (
    <Link to={`/services/${id}`} className="service-card opacity-0 translate-y-8 block" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-6 text-orbit-cyan">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </Link>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.service-card');
          cards.forEach(card => {
            card.classList.add('animate-fade-in');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const serviceIcons: { [key: string]: React.ReactNode } = {
    "web-solutions": <Code size={36} />,
    "app-development": <Smartphone size={36} />,
    "seo-optimization": <Search size={36} />,
    "social-media-marketing": <Users size={36} />,
    "pay-per-click-marketing": <MousePointerClick size={36} />,
  };

  return (
    <section id="services" className="py-20 bg-orbit-slate-dark" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Our Services</span>
          </h2>
          <div className="w-24 h-1 bg-orbit-cyan mx-auto"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            We provide comprehensive IT solutions to empower your business with cutting-edge technology and strategies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              id={service.id}
              title={service.title}
              description={service.description}
              icon={serviceIcons[service.id]}
              delay={(index + 1) * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
