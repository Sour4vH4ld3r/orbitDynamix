import { Shield, Users, HeadphonesIcon } from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

const AboutPage = () => {
  return (
    <div className="bg-orbit-slate-dark text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Us</span>
          </h1>
          <div className="w-32 h-1 bg-orbit-cyan mx-auto"></div>
        </div>
        
        {/* Features Section */}
        <div className="text-center mb-16">
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Why Choose OrbitDynamix</span>
          </h2> */}
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer a comprehensive range of IT solutions, from web development to digital marketing. Everything you need is right here.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/5 rounded-xl p-8 text-center border border-orbit-slate-light hover:border-orbit-cyan transition-colors">
            <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Latest technologies</h3>
            <p className="text-gray-400">
              We stay ahead of the curve by utilizing cutting-edge technologies and frameworks to deliver modern, scalable solutions.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 text-center border border-orbit-slate-light hover:border-orbit-cyan transition-colors">
            <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Experienced team</h3>
            <p className="text-gray-400">
              Our skilled professionals bring years of expertise in web development, mobile apps, and digital marketing strategies.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-8 text-center border border-orbit-slate-light hover:border-orbit-cyan transition-colors">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <HeadphonesIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">Dedicated support</h3>
            <p className="text-gray-400">
              We provide ongoing support and maintenance to ensure your solutions continue to perform at their best.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-lg text-gray-400 space-y-6">
            <p>
              OrbitDynamix was founded with a simple mission: to propel businesses forward with cutting-edge IT solutions. We believe in the transformative power of technology and its ability to simplify communications, elevate experiences, and engage and inspire people everywhere.
            </p>
            <p>
              Our team is composed of passionate creators, engineers, and strategists who are dedicated to helping our clients achieve their goals. We pride ourselves on our collaborative approach, working closely with you to understand your unique challenges and develop solutions that drive real results.
            </p>
            <p>
              From web and mobile development to SEO and cloud services, we offer a comprehensive suite of services to meet your needs. We are constantly exploring new technologies and methodologies to ensure that we are providing our clients with the best possible solutions.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Our Team" 
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default AboutPage; 