import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { services } from "@/lib/data";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Logo Designer", href: "/demo-logo" },
    { name: "Contact Us", href: "/contact" }
  ];
  
  const handleScrollToServices = () => {
    setIsOpen(false);
    if (isHomePage) {
      const element = document.querySelector("#services");
      if (element) {
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      // If not on home page, maybe navigate to home and then scroll?
      // For now, we'll just navigate to the services section of the homepage.
      window.location.href = "/#services";
    }
  };
  
  return (
    <nav 
      className={cn(
        "fixed top-0 w-full z-40 transition-all duration-300",
        scrolled || !isHomePage ? "bg-orbit-dark/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <RouterLink to="/" className="flex-shrink-0 flex items-center">
              <img style={{width: '70px', height: '70px'}} src="/logo.svg" alt="OrbitDynamix Logo" className="h-10 w-auto mr-3" />
              <span className="text-2xl font-bold gradient-text hidden sm:block">OrbitDynamix</span>
            </RouterLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.name}
                  to={link.href}
                  className="text-gray-300 hover:text-orbit-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </RouterLink>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-orbit-cyan px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orbit-dark border-orbit-slate-light text-gray-300">
                  <DropdownMenuItem asChild>
                    <RouterLink to="/services" className="hover:!bg-orbit-slate-dark hover:!text-orbit-cyan cursor-pointer">
                      All Services
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleScrollToServices} className="hover:!bg-orbit-slate-dark hover:!text-orbit-cyan cursor-pointer">
                    Services Section
                  </DropdownMenuItem>
                  {services.map((service) => (
                    <DropdownMenuItem key={service.id} asChild>
                      <RouterLink to={`/services/${service.id}`} className="hover:!bg-orbit-slate-dark hover:!text-orbit-cyan cursor-pointer">
                        {service.title}
                      </RouterLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <RouterLink to="/contact" className="orbit-btn ml-4 flex items-center gap-2">
                Get Started
              </RouterLink>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-orbit-slate-dark shadow-lg">
          {navLinks.map((link) => (
            <RouterLink
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-orbit-cyan block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              {link.name}
            </RouterLink>
          ))}
          <div className="text-gray-300 px-3 py-2 text-base font-medium">Services</div>
          <div className="pl-4">
            <RouterLink
              to="/services"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-orbit-cyan block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              All Services
            </RouterLink>
            {services.map((service) => (
              <RouterLink
                key={service.id}
                to={`/services/${service.id}`}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-orbit-cyan block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {service.title}
              </RouterLink>
            ))}
          </div>
          <RouterLink to="/contact" className="orbit-btn w-full mt-4" onClick={() => setIsOpen(false)}>
            Get Started
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
