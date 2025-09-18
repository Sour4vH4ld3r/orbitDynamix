import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  animationClass?: string;
  hiddenClass?: string;
}

export const useScrollAnimation = (
  options: UseScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    staggerDelay = 150,
    animationClass = 'service-flip-visible',
    hiddenClass = 'service-flip-hidden',
  } = options;

  // Responsive stagger delay based on screen size
  const getResponsiveStaggerDelay = (): number => {
    if (typeof window === 'undefined') return staggerDelay;
    
    const width = window.innerWidth;
    if (width < 768) return staggerDelay * 0.7; // Faster on mobile
    if (width < 1024) return staggerDelay * 0.85; // Slightly faster on tablet
    return staggerDelay;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Show all elements immediately if user prefers reduced motion
      const elements = Array.from(
        container.querySelectorAll('[data-animate="flip"]')
      ) as HTMLElement[];
      
      elements.forEach((element) => {
        element.classList.remove(hiddenClass);
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.filter = 'none';
      });
      return;
    }

    // Find all animatable elements
    const elements = Array.from(
      container.querySelectorAll('[data-animate="flip"]')
    ) as HTMLElement[];
    elementsRef.current = elements;

    // Initially hide all elements
    const responsiveStaggerDelay = getResponsiveStaggerDelay();
    elements.forEach((element, index) => {
      element.classList.add(hiddenClass);
      element.style.animationDelay = `${index * responsiveStaggerDelay}ms`;
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const index = elements.indexOf(element);
            
            // Remove hidden class and add animation class
            element.classList.remove(hiddenClass);
            
            // Alternate between two animation variants for visual variety
            const isAlternate = index % 2 === 1;
            const finalAnimationClass = isAlternate 
              ? `${animationClass}-alt` 
              : animationClass;
            
            element.classList.add(finalAnimationClass);
            
            // Stop observing this element once it's animated
            observer.unobserve(element);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current = observer;

    // Start observing all elements
    elements.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerDelay, animationClass, hiddenClass]);

  return containerRef;
};

export default useScrollAnimation;