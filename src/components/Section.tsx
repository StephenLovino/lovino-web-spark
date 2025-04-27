
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
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
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
