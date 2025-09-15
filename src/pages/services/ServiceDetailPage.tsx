import { useParams } from "react-router-dom";
import { services } from "../../lib/data";
import NotFound from "../NotFound";
import ScrollToTop from "../../components/ScrollToTop";

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find(
    (s) => s.id === serviceId
  );

  if (!service) {
    return <NotFound />;
  }

  return (
    <div className="bg-orbit-slate-dark text-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{service.title}</span>
          </h1>
          <div className="w-32 h-1 bg-orbit-cyan mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <p className="text-lg text-gray-400 leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img 
              src={service.image} 
              alt={service.title}
              className="rounded-lg shadow-2xl w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default ServiceDetailPage; 