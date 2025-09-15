import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-orbit-dark pt-16 pb-8 border-t border-orbit-slate-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.svg" alt="OrbitDynamix Logo" className="h-10 w-auto mr-3" />
              <h3 className="text-xl font-bold text-white">OrbitDynamix</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Propelling businesses forward with cutting-edge IT solutions designed to transform your digital presence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors p-2 border border-transparent hover:border-orbit-cyan rounded-full" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors p-2 border border-transparent hover:border-orbit-cyan rounded-full" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors p-2 border border-transparent hover:border-orbit-cyan rounded-full" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors p-2 border border-transparent hover:border-orbit-cyan rounded-full" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors p-2 border border-transparent hover:border-orbit-cyan rounded-full" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4 gradient-text">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.id}`} className="text-gray-400 hover:text-orbit-cyan transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4 gradient-text">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-orbit-cyan transition-colors">About Us</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors">Blog</a></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orbit-cyan transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4 gradient-text">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Mukundapur, Kolkata 700099</li>
              <li>West Bengal, India</li>
              <li>official@orbitdynamix.com</li>
              <li>+91 79080 99602</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-orbit-slate-light pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OrbitDynamix. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-orbit-cyan transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    
    </footer>
  );
};

export default Footer;
