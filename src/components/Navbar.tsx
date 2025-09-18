import { useState, useEffect, useCallback, useRef } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((currentScrollY / docHeight) * 100, 100) : 0;
      
      // Enhanced scroll behavior with better thresholds
      setScrolled(currentScrollY > 20);
      setScrollProgress(progress);
      
      // Improved hide/show logic with smoother transitions
      if (currentScrollY > 120) {
        const scrollingUp = currentScrollY < lastScrollY;
        const nearTop = currentScrollY < 300;
        setIsVisible(scrollingUp || nearTop);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    }, 16); // ~60fps throttling
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Logo Designer", href: "/demo-logo" },
    { name: "Contact Us", href: "/contact" }
  ];
  
  // Enhanced scroll to services with better UX
  const handleScrollToServices = useCallback(() => {
    setIsOpen(false);
    if (isHomePage) {
      const element = document.querySelector("#services");
      if (element) {
        const yOffset = -100; // Better offset for fixed navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      // Navigate to home page and then scroll
      window.location.href = "/#services";
    }
  }, [isHomePage]);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const navbar = document.querySelector('[data-navbar]');
      if (navbar && !navbar.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return (
    <nav 
      data-navbar
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-out",
        scrolled || !isHomePage 
          ? "bg-orbit-dark/98 backdrop-blur-xl shadow-2xl border-b border-orbit-slate-light/30" 
          : "bg-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Enhanced Scroll Progress Indicator */}
      <div 
        className="navbar-progress-bar absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orbit-cyan via-orbit-purple to-orbit-cyan-bright transition-all duration-300 ease-out"
        style={{ 
          width: `${scrollProgress}%`
        }}
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          <div className="flex items-center">
            <RouterLink 
              to="/" 
              className="group flex-shrink-0 flex items-center transition-all duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright rounded-lg"
              aria-label="OrbitDynamix - Go to homepage"
            >
              <div className="relative">
                <img 
                  width={64}
                  height={64}
                  src="/logo.svg" 
                  alt="OrbitDynamix Logo" 
                  className="h-16 w-auto mr-4 transition-all duration-300 group-hover:drop-shadow-lg group-hover:brightness-110 will-change-transform" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orbit-cyan/20 to-orbit-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10" />
              </div>
              <span className="text-2xl font-bold gradient-text hidden sm:block transition-all duration-300 group-hover:tracking-wide will-change-transform">
                OrbitDynamix
              </span>
            </RouterLink>
          </div>
          <div className="hidden lg:block">
            <div className="ml-12 flex items-center space-x-2">
              {navLinks.map((link) => (
                <RouterLink
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group will-change-transform",
                    "text-gray-300 hover:text-white hover:bg-orbit-slate-dark/60 backdrop-blur-sm",
                    "border border-transparent hover:border-orbit-slate-light/30",
                    "hover:shadow-lg hover:shadow-orbit-cyan/10 hover:scale-[1.02]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright",
                    location.pathname === link.href && "bg-orbit-slate-dark/80 text-orbit-cyan-bright border-orbit-cyan/30"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orbit-cyan/10 to-orbit-purple/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </RouterLink>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 group will-change-transform",
                  "text-gray-300 hover:text-white hover:bg-orbit-slate-dark/60 backdrop-blur-sm",
                  "border border-transparent hover:border-orbit-slate-light/30",
                  "hover:shadow-lg hover:shadow-orbit-cyan/10 hover:scale-[1.02]",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright",
                  location.pathname.startsWith('/services') && "bg-orbit-slate-dark/80 text-orbit-cyan-bright border-orbit-cyan/30"
                )}
                aria-label="Services menu">
                  <span className="relative z-10">Services</span>
                  <ChevronDown className="ml-1.5 h-4 w-4 transition-all duration-300 group-hover:rotate-180 group-hover:text-orbit-cyan-bright relative z-10" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orbit-cyan/10 to-orbit-purple/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-orbit-dark/98 backdrop-blur-xl border-orbit-slate-light/40 text-gray-300 shadow-2xl shadow-orbit-dark/50 min-w-[200px] mt-2">
                  <DropdownMenuItem asChild>
                    <RouterLink 
                      to="/services" 
                      className="hover:!bg-orbit-slate-dark/80 hover:!text-orbit-cyan-bright cursor-pointer transition-all duration-300 hover:!shadow-lg hover:!shadow-orbit-cyan/10 rounded-lg mx-1 font-medium"
                    >
                      All Services
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onSelect={handleScrollToServices} 
                    className="hover:!bg-orbit-slate-dark/80 hover:!text-orbit-cyan-bright cursor-pointer transition-all duration-300 hover:!shadow-lg hover:!shadow-orbit-cyan/10 rounded-lg mx-1 font-medium"
                  >
                    Services Section
                  </DropdownMenuItem>
                  <div className="border-t border-orbit-slate-light/20 my-1" />
                  {services.map((service) => (
                    <DropdownMenuItem key={service.id} asChild>
                      <RouterLink 
                        to={`/services/${service.id}`} 
                        className="hover:!bg-orbit-slate-dark/80 hover:!text-orbit-cyan-bright cursor-pointer transition-all duration-300 hover:!shadow-lg hover:!shadow-orbit-cyan/10 rounded-lg mx-1 text-sm"
                      >
                        {service.title}
                      </RouterLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center space-x-3 ml-6">
                <a 
                  href="tel:+917908099602"
                  className="hidden xl:flex items-center gap-2 text-gray-400 hover:text-orbit-cyan-bright transition-all duration-300 text-sm font-medium hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright rounded-lg p-1 will-change-transform"
                  aria-label="Call us at +91 7908099602"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 7908099602</span>
                </a>
                <RouterLink 
                  to="/contact" 
                  className="orbit-btn flex items-center gap-2 text-sm font-semibold px-8 py-3 hover:shadow-2xl hover:shadow-orbit-purple/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright"
                  aria-label="Get started - Contact us"
                >
                  <Mail className="h-4 w-4" />
                  Get Started
                </RouterLink>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "inline-flex items-center justify-center p-3 rounded-xl transition-all duration-300 group will-change-transform",
                "text-gray-400 hover:text-white hover:bg-orbit-slate-dark/60 backdrop-blur-sm border border-transparent hover:border-orbit-slate-light/30",
                "hover:shadow-lg hover:shadow-orbit-cyan/10 hover:scale-105 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright",
                isOpen && "bg-orbit-slate-dark/80 text-orbit-cyan-bright border-orbit-cyan/30"
              )}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <div className="relative">
                {isOpen ? 
                  <X size={22} className="transition-all duration-300 rotate-90" /> : 
                  <Menu size={22} className="transition-all duration-300 group-hover:scale-110" />
                }
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <div 
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out will-change-transform",
          isOpen 
            ? "max-h-screen opacity-100 transform translate-y-0" 
            : "max-h-0 opacity-0 transform -translate-y-4"
        )}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-4 pb-6 space-y-3 bg-orbit-dark/98 backdrop-blur-xl shadow-2xl border-t border-orbit-slate-light/30">
          {/* Mobile Contact Info */}
          <div className="flex flex-col space-y-2 pb-4 border-b border-orbit-slate-light/20">
            <a 
              href="tel:+917908099602"
              className="flex items-center gap-3 text-gray-400 hover:text-orbit-cyan-bright transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-orbit-slate-dark/60 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright"
              aria-label="Call us at +91 7908099602"
            >
              <Phone className="h-4 w-4" />
              <span>+91 7908099602</span>
            </a>
            <a 
              href="mailto:official@orbitdynamix.com"
              className="flex items-center gap-3 text-gray-400 hover:text-orbit-cyan-bright transition-all duration-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-orbit-slate-dark/60 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright"
              aria-label="Email us at official@orbitdynamix.com"
            >
              <Mail className="h-4 w-4" />
              <span>official@orbitdynamix.com</span>
            </a>
          </div>
          {navLinks.map((link, index) => (
            <RouterLink
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 will-change-transform",
                "text-gray-300 hover:text-white hover:bg-orbit-slate-dark/60 backdrop-blur-sm",
                "border border-transparent hover:border-orbit-slate-light/30",
                "hover:shadow-lg hover:shadow-orbit-cyan/10 hover:translate-x-2",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright",
                location.pathname === link.href && "bg-orbit-slate-dark/80 text-orbit-cyan-bright border-orbit-cyan/30 translate-x-2"
              )}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {link.name}
            </RouterLink>
          ))}
          <div className="space-y-2">
            <div className="text-gray-300 px-4 py-2 text-base font-semibold border-b border-orbit-slate-light/20">Services</div>
            <RouterLink
              to="/services"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 will-change-transform",
                "text-gray-400 hover:text-white hover:bg-orbit-slate-dark/60 backdrop-blur-sm",
                "border border-transparent hover:border-orbit-slate-light/30",
                "hover:shadow-lg hover:shadow-orbit-cyan/10 hover:translate-x-2",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright",
                location.pathname === '/services' && "bg-orbit-slate-dark/80 text-orbit-cyan-bright border-orbit-cyan/30 translate-x-2"
              )}
            >
              All Services
            </RouterLink>
            <div className="grid gap-1 pl-2">
              {services.map((service, index) => (
                <RouterLink
                  key={service.id}
                  to={`/services/${service.id}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 will-change-transform",
                    "text-gray-500 hover:text-orbit-cyan-bright hover:bg-orbit-slate-dark/40",
                    "hover:translate-x-1 hover:shadow-md hover:shadow-orbit-cyan/5",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright",
                    location.pathname === `/services/${service.id}` && "bg-orbit-slate-dark/60 text-orbit-cyan-bright translate-x-1"
                  )}
                  style={{
                    animationDelay: `${(index + navLinks.length + 1) * 0.1}s`
                  }}
                >
                  {service.title}
                </RouterLink>
              ))}
            </div>
          </div>
          <RouterLink 
            to="/contact" 
            className="orbit-btn w-full mt-6 justify-center flex items-center gap-2 text-base font-semibold py-4 hover:shadow-2xl hover:shadow-orbit-purple/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orbit-cyan-bright" 
            onClick={() => setIsOpen(false)}
            aria-label="Get started - Contact us"
          >
            <Mail className="h-5 w-5" />
            Get Started
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
