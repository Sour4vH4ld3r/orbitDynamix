import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import PortfolioSection from "@/components/PortfolioSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { Helmet } from "react-helmet-async";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ScrollToTop from "@/components/ScrollToTop";

const HomePage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>OrbitDynamix | Innovative IT Solutions</title>
        <meta name="description" content="OrbitDynamix provides cutting-edge IT solutions including web development, app development, SEO, and cloud services to propel your business forward." />
        <meta name="keywords" content="IT solutions, web development, app development, SEO, cloud services, digital transformation" />
        <meta property="og:title" content="OrbitDynamix | Innovative IT Solutions" />
        <meta property="og:description" content="OrbitDynamix provides cutting-edge IT solutions including web development, app development, SEO, and cloud services to propel your business forward." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://orbitdynamix.com" />
      </Helmet>
      <div>
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TechnologiesSection />
        <AboutSection />
        <PortfolioSection />
        <ContactSection />
        <FloatingContactButtons />
        <ScrollToTop />
      </div>
    </>
  );
};

export default HomePage;
