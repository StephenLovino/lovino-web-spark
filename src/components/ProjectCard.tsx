
import { useState, useEffect, memo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Link, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  thumbnailImage?: string; // Optional smaller image for initial loading
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  thumbnailImage,
  tags,
  liveUrl,
  githubUrl,
  className,
}: ProjectCardProps) => {
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
        "glass-effect overflow-hidden flex flex-col md:flex-row group",
        className
      )}
    >
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>

        {/* Placeholder or thumbnail while main image loads */}
        {!imageLoaded && (
          <div className="w-full h-full bg-secondary/20 animate-pulse absolute inset-0"></div>
        )}

        {/* Main image with lazy loading */}
        {isInView && (
          <img
            src={image}
            alt={`${title} project screenshot`}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={handleImageLoad}
          />
        )}
      </div>

      <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-secondary rounded-full px-3 py-1 text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label={`View live demo of ${title}`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>

          {githubUrl && (
            <Button variant="outline" asChild>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
                aria-label={`View source code for ${title} on GitHub`}
              >
                <Github className="w-4 h-4" />
                <span>View Code</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Wrap with memo to prevent unnecessary re-renders
export default memo(ProjectCard);
