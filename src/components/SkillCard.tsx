
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  title: string;
  skills: string[];
  icon: LucideIcon;
  className?: string;
}

const SkillCard = ({ title, skills, icon: Icon, className }: SkillCardProps) => {
  return (
    <div
      className={cn(
        "glass-effect p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group",
        className
      )}
    >
      <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <li 
            key={index} 
            className="text-muted-foreground flex items-center text-base group-hover:text-foreground/90 transition-colors"
          >
            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-3 group-hover:bg-primary transition-colors"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
