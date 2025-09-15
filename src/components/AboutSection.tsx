
import { useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.reveal-element');
          elements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 200);
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

  const timelineItems = [
    {
      year: "",
      title: "Company Founded",
      description: "OrbitDynamix was established with a vision to provide innovative IT solutions."
    },
    {
      year: "",
      title: "Expansion Phase",
      description: "Expanded service offerings to include mobile app development and cloud solutions."
    },
    {
      year: "",
      title: "Global Reach",
      description: "Extended operations internationally with clients across three continents."
    },
    {
      year: "2025",
      title: "Innovation Leader",
      description: "Recognized as a leading technology innovator in digital transformation."
    }
  ];

  return (
    <section id="about" className="py-20 bg-orbit-dark" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 reveal-element opacity-0">
              <span className="gradient-text">About OrbitDynamix</span>
            </h2>
            <div className="w-24 h-1 bg-orbit-cyan reveal-element opacity-0"></div>
            
            <div className="mt-8 space-y-4">
              <p className="text-gray-300 reveal-element opacity-0">
                OrbitDynamix is a forward-thinking IT solutions agency committed to delivering exceptional digital experiences that drive business growth. Founded in 2018, we combine technical expertise with creative innovation to help businesses thrive in the digital landscape.
              </p>
              <p className="text-gray-300 reveal-element opacity-0">
                Our team of skilled professionals specializes in web development, mobile applications, SEO strategies, and cloud services, offering comprehensive solutions tailored to meet the unique needs of each client.
              </p>
              <p className="text-gray-300 reveal-element opacity-0">
                We believe in building long-term partnerships with our clients, working collaboratively to understand their goals and deliver solutions that exceed expectations.
              </p>
            </div>
            
            <div className="mt-8 reveal-element opacity-0">
              <button className="orbit-btn">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-orbit-cyan/30 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {timelineItems.map((item, index) => (
                <div key={index} className="reveal-element opacity-0">
                  <div className={`relative flex items-start gap-4 ${index % 2 === 0 ? 'text-left' : 'flex-row-reverse text-right'}`}>
                    <div className="flex-1">
                      <div className="bg-orbit-slate-dark p-5 rounded-lg border border-orbit-slate-light">
                        <h3 className="text-xl font-bold text-orbit-cyan mb-2">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-orbit-cyan z-10"></div>
                      <div className="text-orbit-cyan font-bold mt-2">{item.year}</div>
                    </div>
                    
                    <div className="flex-1"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
