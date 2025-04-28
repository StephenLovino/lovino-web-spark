import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "fixed top-4 right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all",
        theme === "dark" 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
