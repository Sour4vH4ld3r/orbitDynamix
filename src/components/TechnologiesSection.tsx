import { useEffect, useRef } from "react";

interface TechnologyItemProps {
  name: string;
  logoPath: string;
  delay: number;
}

const TechnologyItem = ({ name, logoPath, delay }: TechnologyItemProps) => {
  return (
    <div 
      className="opacity-0 translate-y-8 tech-item group w-full" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-3 shadow-xl hover:border-orbit-cyan/50 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/15 hover:shadow-2xl hover:shadow-orbit-cyan/25 hover:backdrop-blur-xl w-full min-w-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex items-center justify-center flex-shrink-0">
          <img src={logoPath} alt={`${name} Logo`} className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300" />
        </div>
        <p className="text-white font-medium text-[10px] sm:text-xs lg:text-sm group-hover:text-orbit-cyan-bright transition-colors duration-300 text-shadow truncate flex-1 min-w-0">{name}</p>
      </div>
    </div>
  );
};

const TechnologiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.tech-item');
          items.forEach(item => {
            item.classList.add('animate-fade-in');
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

  // Row 1: 6 technologies
  const row1Tech = [
    { name: "HTML5", logoPath: "/tech-logos/html5.svg" },
    { name: "CSS3", logoPath: "/tech-logos/css3.svg" },
    { name: "JavaScript", logoPath: "/tech-logos/javascript.svg" },
    { name: "TypeScript", logoPath: "/tech-logos/typescript.svg" },
    { name: "React", logoPath: "/tech-logos/react.svg" },
    { name: "Tailwind CSS", logoPath: "/tech-logos/tailwind.svg" }
  ];

  // Row 2: 7 technologies
  const row2Tech = [
    { name: "Node.js", logoPath: "/tech-logos/nodejs.svg" },
    { name: "Laravel", logoPath: "/tech-logos/laravel.svg" },
    { name: "MySQL", logoPath: "/tech-logos/mysql.svg" },
    { name: "MongoDB", logoPath: "/tech-logos/mongodb.svg" },
    { name: "PostgreSQL", logoPath: "/tech-logos/postgresql.svg" },
    { name: "Redis", logoPath: "/tech-logos/redis.svg" },
    { name: "React Native", logoPath: "/tech-logos/react-native.svg" }
  ];

  // Row 3: 5 technologies
  const row3Tech = [
    { name: "Flutter", logoPath: "/tech-logos/flutter.svg" },
    { name: "Swift", logoPath: "/tech-logos/swift.svg" },
    { name: "AWS", logoPath: "/tech-logos/aws.svg" },
    { name: "Firebase", logoPath: "/tech-logos/firebase.svg" },
    { name: "Docker", logoPath: "/tech-logos/docker.svg" }
  ];

  return (
    <section id="technologies" className="py-20 bg-gradient-to-br from-orbit-slate-dark via-orbit-dark to-orbit-blue-warm relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-orbit-purple/5 animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-32 w-56 h-56 rounded-full bg-orbit-cyan/5 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-orbit-cyan/40"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-orbit-purple-light/50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow tracking-tight">
            <span className="gradient-text">Technologies We Master</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed tracking-wide">
            We leverage cutting-edge technologies and industry-leading tools to deliver exceptional, scalable solutions that drive your business forward.
          </p>
        </div>
        
        {/* Technologies Grid - Row-wise Layout */}
        <div className="space-y-2 sm:space-y-3">
          
          {/* Row 1: 6 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 sm:gap-2 lg:gap-3 justify-items-stretch">
            {row1Tech.map((tech, index) => (
              <TechnologyItem
                key={tech.name}
                name={tech.name}
                logoPath={tech.logoPath}
                delay={100 + (index * 100)}
              />
            ))}
          </div>

          {/* Row 2: 7 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-2 lg:gap-3 justify-items-stretch">
            {row2Tech.map((tech, index) => (
              <TechnologyItem
                key={tech.name}
                name={tech.name}
                logoPath={tech.logoPath}
                delay={300 + (index * 100)}
              />
            ))}
          </div>

          {/* Row 3: 5 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-3 justify-items-stretch">
            {row3Tech.map((tech, index) => (
              <TechnologyItem
                key={tech.name}
                name={tech.name}
                logoPath={tech.logoPath}
                delay={500 + (index * 100)}
              />
            ))}
          </div>

        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orbit-cyan/10 to-orbit-purple/10 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/20 card-hover hover:border-orbit-cyan/40">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 gradient-text text-shadow tracking-tight">Ready to Build Something Amazing?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
              Let's discuss how our technology expertise can transform your ideas into powerful digital solutions.
            </p>
            <button className="orbit-btn text-base font-semibold px-8 py-3.5 shadow-xl">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
