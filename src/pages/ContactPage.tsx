import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    // Here you would typically send the form data to a server
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Office Address",
      details: ["Mukundapur, Kolkata 700099", "West Bengal, India"],
      color: "bg-blue-500"
    },
    {
      icon: Phone,
      title: "Call Us Anytime",
      details: ["+91 79080 99602", "+91 79080 99602"],
      color: "bg-green-500"
    },
    {
      icon: Mail,
      title: "Send An Email",
      details: ["official@orbitdynamix.com", "official@orbitdynamix.com"],
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="bg-orbit-slate-dark text-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orbit-dark via-orbit-blue to-orbit-dark pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Get In Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business? Let's discuss your project and bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-12 bg-orbit-slate-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-orbit-cyan/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <info.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-white">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-400 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="gradient-text">Send Us A Message</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <Input 
                      id="name" 
                      {...register("name")} 
                      type="text" 
                      placeholder="Enter your full name"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orbit-cyan focus:ring-orbit-cyan h-11"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      id="email" 
                      {...register("email")} 
                      type="email" 
                      placeholder="Enter your email address"
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orbit-cyan focus:ring-orbit-cyan h-11"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <Textarea 
                    id="message" 
                    {...register("message")} 
                    rows={5} 
                    placeholder="Tell us about your project or ask us anything..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-orbit-cyan focus:ring-orbit-cyan resize-none"
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>
                
                <div className="text-center pt-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-gradient-to-r from-orbit-cyan to-orbit-purple hover:from-orbit-cyan/80 hover:to-orbit-purple/80 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default ContactPage; 