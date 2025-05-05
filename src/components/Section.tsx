
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, title, subtitle, children, className }: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "section-padding container-padding scroll-mt-20",
        className
      )}
    >
      <div className="container h-full">
        <div className="mb-12 text-center">
          {typeof title === 'string' ? (
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-300 light:from-gray-800 light:to-black">
              {title}
            </h2>
          ) : (
            title
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              {subtitle}
            </p>
          )}
        </div>
        <div className="h-full">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
