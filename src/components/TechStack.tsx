import React from 'react';
import { cn } from "@/lib/utils";

interface TechStackProps {
  className?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

interface TechItem {
  name: string;
  icon: string;
  color?: string;
}

const TechStack: React.FC<TechStackProps> = ({ className }) => {
  const categories: TechCategory[] = [
    {
      title: "Frontend",
      items: [
        { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "#E34F26" },
        { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "#1572B6" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#61DAFB" },
        { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", color: "#4FC08D" },
        { name: "Tailwind", icon: "/icons/tailwind.svg", color: "#06B6D4" },
        { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", color: "#7952B3" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" }
      ]
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#339933" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#007396" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#3776AB" },
        { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "#4479A1" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "#47A248" }
      ]
    },
    {
      title: "Tools",
      items: [
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "#F05032" },
        { name: "GitHub", icon: "/icons/github.svg", color: "#FFFFFF" },
        { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", color: "#007ACC" },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "#F24E1E" }
      ]
    }
  ];

  return (
    <div className={cn("space-y-16", className)}>
      {categories.map((category, index) => (
        <div key={index} className="space-y-8">
          <h3 className="text-xl font-medium text-center">{category.title}</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {category.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStack;
