
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Link } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  className?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  className,
}: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "glass-effect overflow-hidden flex flex-col md:flex-row group",
        className
      )}
    >
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <span>Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          {githubUrl && (
            <Button variant="outline" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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

export default ProjectCard;
