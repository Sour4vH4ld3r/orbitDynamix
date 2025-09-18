import { useState } from "react";
import { Phone, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FloatingContactButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative flex items-center">
        {/* Action buttons */}
        <div
          className={cn(
            "flex items-center space-x-3 mr-4 transition-all duration-300",
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
          )}
        >
          <a href="https://wa.me/917908099602" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp us">
            <Button size="icon" className="rounded-full bg-green-500 w-12 h-12 shadow-lg">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </a>
          <a href="tel:+917908099602" aria-label="Call us">
            <Button size="icon" className="rounded-full bg-blue-500 w-12 h-12 shadow-lg">
              <Phone className="h-5 w-5" />
            </Button>
          </a>
        </div>

        {/* Main toggle button */}
        <Button
          size="icon"
          className="rounded-full w-12 h-12 bg-orbit-cyan shadow-lg relative before:absolute before:inset-0 before:rounded-full before:bg-orbit-cyan/30 before:animate-ping before:delay-1000"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle contact buttons"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};

export default FloatingContactButtons; 