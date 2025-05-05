
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { FileText, Code } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Blog", href: "#blog", disabled: true },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/20 backdrop-blur-lg shadow-sm"
          : "bg-black/10 backdrop-blur-md"
      )}
    >
      {/* Main navigation bar with logo and links */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        {/* Logo - Left */}
        <div className="flex items-center">
          <a href="#home" className="text-xl font-bold text-gradient flex items-center gap-1.5">
            <span className="flex items-center gap-1">
              <Code className="h-5 w-5 text-accent" />
              <span>SL</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-1 py-1 border border-white/10 mx-auto">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.disabled ? "#" : link.href}
                className={cn(
                  "text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200",
                  link.disabled
                    ? "text-foreground/40 cursor-not-allowed"
                    : index === 0
                      ? "text-foreground/90 bg-white/10 hover:bg-white/15"
                      : "text-foreground/90 hover:bg-white/10 hover:text-accent"
                )}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Action buttons - Right */}
        <div className="hidden md:flex items-center space-x-3">
          <DarkModeToggle />
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <button
              onClick={() => window.location.href = '/resume'}
              className="relative flex items-center gap-2 bg-background/50 text-foreground hover:text-primary rounded-full shadow-lg transition-all duration-300 hover:shadow-accent/50 md:px-4 md:py-2 p-2"
            >
              <FileText className="h-5 w-5" />
              <span className="hidden md:inline font-medium">Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden absolute top-4 right-4 text-foreground focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black/80 backdrop-blur-lg shadow-lg py-4 md:hidden">
          <div className="flex flex-col space-y-2 px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.disabled ? "#" : link.href}
                className={cn(
                  "py-2 px-3 rounded-lg transition-colors",
                  link.disabled
                    ? "text-foreground/40 cursor-not-allowed"
                    : "text-foreground/90 hover:bg-white/10 hover:text-accent"
                )}
                onClick={() => !link.disabled && setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <DarkModeToggle />
              <div className="relative group inline-flex">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <button
                  onClick={() => {
                    window.location.href = '/resume';
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative flex items-center justify-center gap-2 bg-background/50 text-foreground hover:text-primary rounded-full shadow-lg transition-all duration-300 hover:shadow-accent/50 px-4 py-2"
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </nav>
  );
};

export default Navbar;
