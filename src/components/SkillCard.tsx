
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
        "bg-secondary/20 dark:bg-secondary/10 backdrop-blur-md p-8 rounded-xl border border-white/10 dark:border-white/5 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/20 ring-1 ring-transparent hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 group text-center",
        className
      )}
    >
      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300 mx-auto">
        <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="text-muted-foreground flex items-center justify-center text-base group-hover:text-foreground/90 transition-colors"
          >
            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
