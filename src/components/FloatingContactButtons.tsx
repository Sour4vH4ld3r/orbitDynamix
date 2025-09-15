import { useState } from "react";
import { Phone, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative flex flex-col items-center">
        {/* Action buttons */}
        <div
          className={cn(
            "flex flex-col items-center space-y-2 mb-4 transition-all duration-300",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <a href="https://wa.me/917908099602" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
            <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600 w-14 h-14">
              <MessageSquare className="h-6 w-6" />
            </Button>
          </a>
          <a href="tel:+917908099602" aria-label="Call us">
            <Button size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600 w-14 h-14">
              <Phone className="h-6 w-6" />
            </Button>
          </a>
        </div>

        {/* Main toggle button */}
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-orbit-cyan hover:bg-orbit-cyan-dark animate-pulse-slow shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle contact buttons"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Phone className="h-8 w-8" />}
        </Button>
      </div>
    </div>
  );
};

export default FloatingContactButtons; 