import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  // This effect runs once when the component mounts
  useEffect(() => {
    setMounted(true);

    // Get the current theme from localStorage or default to dark
    const theme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = theme || "dark";

    // Set the theme in state
    setCurrentTheme(initialTheme);

    // Make sure the correct class is on the html element
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Function to toggle the theme
  function handleToggle() {
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Update the theme in localStorage
    localStorage.setItem("theme", newTheme);

    // Update the theme in state
    setCurrentTheme(newTheme);

    // Update the class on the html element
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    console.log("Theme toggled to:", newTheme);
  }

  // Don't render anything until the component has mounted
  // This prevents hydration errors
  if (!mounted) return null;

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <button
        onClick={handleToggle}
        className="relative flex items-center justify-center w-9 h-9 bg-background text-foreground hover:text-primary rounded-full shadow-lg transition-all duration-300 hover:shadow-accent/50"
        aria-label={currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {currentTheme === "dark" ? (
          <Sun className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:rotate-12" />
        )}
      </button>
    </div>
  );
}
