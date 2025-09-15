import { useEffect, useRef } from "react";
import { Code, Database, Smartphone, Cloud, Users } from "lucide-react";

interface TechnologyItemProps {
  name: string;
  logoPath: string;
  delay: number;
}

interface TechnologyCategoryProps {
  title: string;
  icon: React.ComponentType<any>;
  technologies: Array<{
    name: string;
    logoPath: string;
  }>;
  startDelay: number;
  color: string;
}

const TechnologyItem = ({ name, logoPath, delay }: TechnologyItemProps) => {
  return (
    <div 
      className="flex flex-col items-center opacity-0 translate-y-8 tech-item group" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-20 h-20 flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-2xl mb-4 border border-white/10 shadow-lg hover:border-orbit-cyan/50 transition-all duration-300 p-4 group-hover:scale-110 group-hover:bg-white/10">
        <img src={logoPath} alt={`${name} Logo`} className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300" />
      </div>
      <p className="text-white font-medium text-center text-sm group-hover:text-orbit-cyan transition-colors duration-300">{name}</p>
    </div>
  );
};

const TechnologyCategory = ({ title, icon: Icon, technologies, startDelay, color }: TechnologyCategoryProps) => {
  return (
    <div className="mb-12">
      <div className="  transition-all duration-300">
        <div className="flex items-center mb-8">
          <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white gradient-text">{title}</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <TechnologyItem
              key={tech.name}
              name={tech.name}
              logoPath={tech.logoPath}
              delay={startDelay + (index * 100)}
            />
          ))}
        </div>
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

  const frontendTech = [
    {
      name: "HTML5",
      logoPath: "/tech-logos/html5.svg"
    },
    {
      name: "CSS3",
      logoPath: "/tech-logos/css3.svg"
    },
    {
      name: "JavaScript",
      logoPath: "/tech-logos/javascript.svg"
    },
    {
      name: "TypeScript",
      logoPath: "/tech-logos/typescript.svg"
    },
    {
      name: "React",
      logoPath: "/tech-logos/react.svg"
    },
    {
      name: "Tailwind CSS",
      logoPath: "/tech-logos/tailwind.svg"
    }
  ];

  const backendTech = [
    {
      name: "Node.js",
      logoPath: "/tech-logos/nodejs.svg"
    },
    {
      name: "Laravel",
      logoPath: "/tech-logos/laravel.svg"
    },
    {
      name: "MySQL",
      logoPath: "/tech-logos/mysql.svg"
    },
    {
      name: "MongoDB",
      logoPath: "/tech-logos/mongodb.svg"
    },
    {
      name: "PostgreSQL",
      logoPath: "/tech-logos/postgresql.svg"
    },
    {
      name: "Redis",
      logoPath: "/tech-logos/redis.svg"
    }
  ];

  const mobileTech = [
    {
      name: "React Native",
      logoPath: "/tech-logos/react-native.svg"
    },
    {
      name: "Flutter",
      logoPath: "/tech-logos/flutter.svg"
    },
    {
      name: "Swift",
      logoPath: "/tech-logos/swift.svg"
    },
    {
      name: "Kotlin",
      logoPath: "/tech-logos/kotlin.svg"
    }
  ];
  // add social media marketing
  const socialMediaTech = [
    {
      name: "Facebook",
      logoPath: "/tech-logos/facebook.svg"
    },{
      name: "Instagram",
      logoPath: "/tech-logos/instagram.svg"
    },
    {
      name: "YouTube",
      logoPath: "/tech-logos/youtube.svg"
    },
    {
      name: "LinkedIn",
      logoPath: "/tech-logos/linkedin.svg"
    },
  ];

  const cloudTech = [
    {
      name: "AWS",
      logoPath: "/tech-logos/aws.svg"
    },
    {
      name: "Firebase",
      logoPath: "/tech-logos/firebase.svg"
    },
    {
      name: "Docker",
      logoPath: "/tech-logos/docker.svg"
    },
    {
      name: "GraphQL",
      logoPath: "/tech-logos/graphql.svg"
    }
  ];

  return (
    <section id="technologies" className="py-20 bg-gradient-to-br from-orbit-slate-dark via-orbit-dark to-orbit-slate-dark relative overflow-hidden" ref={sectionRef}>
      {/* Background orbital elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-orbit-purple/5 animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-32 w-56 h-56 rounded-full bg-orbit-cyan/5 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 rounded-full bg-orbit-cyan/40 animate-orbit"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-orbit-purple-light/50 animate-orbit" style={{ animationDelay: '0.5s', animationDuration: '15s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technologies We Master</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            We leverage cutting-edge technologies and industry-leading tools to deliver exceptional, scalable solutions that drive your business forward.
          </p>
        </div>
        
        <div className="space-y-8">
          <TechnologyCategory 
            title="Frontend Development" 
            icon={Code}
            technologies={frontendTech} 
            startDelay={100}
            color="bg-blue-500"
          />
          
          <TechnologyCategory 
            title="Backend & Database" 
            icon={Database}
            technologies={backendTech} 
            startDelay={300}
            color="bg-green-500"
          />
          
          <TechnologyCategory 
            title="Mobile Development" 
            icon={Smartphone}
            technologies={mobileTech} 
            startDelay={500}
            color="bg-purple-500"
          />
          <TechnologyCategory 
            title="Social Media Marketing"
            icon={Users}
            technologies={socialMediaTech} 
            startDelay={500}
            color="bg-pink-500"
          />
          <TechnologyCategory 
            title="Cloud & DevOps" 
            icon={Cloud}
            technologies={cloudTech} 
            startDelay={700}
            color="bg-orange-500"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orbit-cyan/10 to-orbit-purple/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">Ready to Build Something Amazing?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's discuss how our technology expertise can transform your ideas into powerful digital solutions.
            </p>
            <button className="bg-gradient-to-r from-orbit-cyan to-orbit-purple hover:from-orbit-cyan/80 hover:to-orbit-purple/80 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
