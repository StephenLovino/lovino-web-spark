import { useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

interface Feature {
  text: string;
}

interface Technology {
  name: string;
  icon?: React.ReactNode;
}

interface EnhancedProjectCardProps {
  title: string;
  description: string;
  image: string;
  features: Feature[];
  technologies: Technology[];
  liveUrl: string;
  githubUrl?: string;
  className?: string;
  accentColor?: string;
}

const EnhancedProjectCard = ({
  title,
  description,
  image,
  features,
  technologies,
  liveUrl,
  githubUrl,
  className,
  accentColor = "#8b5cf6", // Default purple color
}: EnhancedProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer to detect when card is in viewport
  useEffect(() => {
    // Create a safe element ID
    const elementId = `project-${title.replace(/\s+/g, '-').toLowerCase()}`;

    // Set a small timeout to ensure the DOM is ready
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );

      const currentElement = document.getElementById(elementId);
      if (currentElement) {
        observer.observe(currentElement);
      } else {
        // If element not found, still set isInView to true to load the image
        setIsInView(true);
      }

      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [title]);

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      id={`project-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className={cn(
        "relative overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left side: Project description */}
        <div className="w-full lg:w-1/2 p-8 relative">
          {/* Accent color line */}
          <div 
            className="absolute left-0 top-0 w-1 h-full" 
            style={{ backgroundColor: accentColor }}
          ></div>
          
          <div className="ml-4">
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground mb-6">{description}</p>
            
            {/* Features list */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center mt-1" style={{ backgroundColor: accentColor }}>
                    <span className="text-white text-xs">+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.text}</p>
                </div>
              ))}
            </div>
            
            {/* View project link */}
            <Button 
              variant="link" 
              asChild 
              className="p-0 h-auto font-normal text-foreground hover:text-primary flex items-center gap-2"
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
        
        {/* Right side: Project image */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
          {/* Placeholder while main image loads */}
          {!imageLoaded && (
            <div className="w-full h-full bg-secondary/20 animate-pulse absolute inset-0"></div>
          )}

          {/* Main image with lazy loading */}
          {isInView && (
            <img
              src={image}
              alt={`${title} project screenshot`}
              className={cn(
                "w-full h-full object-cover transition-all duration-500 hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              loading="lazy"
              onLoad={handleImageLoad}
            />
          )}
        </div>
      </div>
      
      {/* Technologies */}
      <div className="p-4 border-t border-white/10 flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center bg-black/20 dark:bg-white/10 rounded-full p-2 h-8 w-8"
            title={tech.name}
          >
            {tech.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

// Wrap with memo to prevent unnecessary re-renders
export default memo(EnhancedProjectCard);
