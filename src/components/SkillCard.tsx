
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
        "glass-effect p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group",
        className
      )}
    >
      <div className="w-12 h-12 bg-primary/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/50 transition-colors">
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="text-muted-foreground flex items-center">
            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
