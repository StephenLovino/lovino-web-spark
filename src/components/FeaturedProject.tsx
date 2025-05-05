import { useState, useEffect, memo, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import TiltCard from "./TiltCard";

interface FeaturePoint {
  text: string;
}

interface TechBadge {
  name: string;
  icon: ReactNode;
}

interface FeaturedProjectProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: FeaturePoint[];
  technologies: TechBadge[];
  accentColor?: string;
  className?: string;
  liveUrl?: string;
  tagline?: string; // Short descriptive text for the project
}

const FeaturedProject = ({
  title,
  subtitle,
  description,
  image,
  features,
  technologies,
  accentColor = "#ff3366", // Default accent color
  className,
  liveUrl,
  tagline,
}: FeaturedProjectProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer to detect when card is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentElement = document.getElementById(`project-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (currentElement) {
      observer.observe(currentElement);
    } else {
      setIsInView(true);
    }

    return () => observer.disconnect();
  }, [title]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      id={`project-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className={cn("mb-24", className)}
    >
      {/* Project header with accent color */}
      <div className="mb-6 flex items-center">
        <div
          className="w-8 h-0.5 mr-3"
          style={{ backgroundColor: accentColor }}
        ></div>
        <h3
          className="text-lg font-bold"
          style={{ color: accentColor }}
        >
          {title}
        </h3>
      </div>

      {/* Main project content */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left side: Project content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{subtitle}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>

          {/* Feature points */}
          <div className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                >
                  <span className="text-white text-xs font-bold">+</span>
                </div>
                <p className="text-sm text-muted-foreground">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Technology badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 bg-black/10 dark:bg-white/10 rounded-md px-2.5 py-1.5 text-xs"
              >
                <span className="text-primary">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Project image with stylized frame */}
        <div className="w-full lg:w-1/2">
          {!imageLoaded && (
            <div className="w-full h-full min-h-[300px] bg-secondary/20 animate-pulse rounded-xl"></div>
          )}

          {isInView && (
            <div className="relative">
              {/* Descriptive text above the image */}
              {tagline && (
                <div className="mb-4 pl-4 border-l-2" style={{ borderColor: accentColor }}>
                  <p className="text-sm text-foreground/80 italic">
                    {tagline}
                  </p>
                </div>
              )}

              {/* Stylized background frame */}
              <div
                className="absolute -inset-4 rounded-2xl z-0 opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}40 0%, transparent 100%)`,
                  transform: "rotate(-1deg)"
                }}
              ></div>

              {/* Arrow indicator */}
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-6 h-6 text-foreground/60" />
              </div>

              {/* Project image with tilt effect */}
              <TiltCard
                className="rounded-xl overflow-hidden shadow-lg relative z-10"
                tiltFactor={5}
                perspective={1200}
                glareEnabled={true}
                glareMaxOpacity={0.15}
                scale={1.02}
              >
                <div className="relative group">
                  {/* Browser-like frame */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 flex items-center justify-between px-3 z-10">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-5 w-40 bg-gray-700/50 rounded-md mx-2 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mx-0.5"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mx-0.5"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mx-0.5"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-4 h-4 rounded-full bg-gray-700/70 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                      </div>
                    </div>
                  </div>

                  <img
                    src={image}
                    alt={`${title} project screenshot`}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-500 pt-8", // Added padding-top for the browser frame
                      imageLoaded ? "opacity-100" : "opacity-0"
                    )}
                    loading="lazy"
                    onLoad={handleImageLoad}
                  />

                  {/* Circular view details button */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-24 h-24 rounded-full bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white text-xs font-medium">
                      <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="2" />
                          <path d="M2 12s3.5-4 5-4 .5 2 2 2 2.5-6 4-6 1.5 2 3 2 2.5-4 4-4 3 4 3 4" />
                        </svg>
                      </div>
                      <span>VIEW</span>
                      <span>DETAILS</span>
                    </div>
                  </div>

                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                    >
                      {/* Link is full overlay, the view details button is shown via the parent div */}
                    </a>
                  )}
                </div>
              </TiltCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(FeaturedProject);
