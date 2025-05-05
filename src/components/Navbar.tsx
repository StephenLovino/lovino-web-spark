
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { FileText, ChevronDown, Calendar, Sun, Moon } from "lucide-react";
import CalendarDialog from "@/components/CalendarDialog";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Define navigation links
  const navLinks = [
    { name: "Home", href: "#home", disabled: false },
    { name: "Work", href: "#projects", disabled: false },
    { name: "About", href: "#about", disabled: false },
    { name: "Contact", href: "#contact", disabled: false },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.replace('#', ''));

      // Find the current section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in view (with some buffer for better UX)
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (href: string) => {
    // Extract the section name from the href (remove the # symbol)
    const section = href.replace('#', '');
    setActiveLink(section);
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-0 w-full z-50 transition-all duration-300 ease-in-out px-2 md:px-0",
        isScrolled
          ? "shadow-md"
          : ""
      )}
    >
      {/* Main navigation bar with logo and links */}
      <div className="max-w-[700px] w-[90%] mx-auto flex items-center justify-between py-3 px-3 md:px-6 dark:bg-black/30 bg-white/20 backdrop-blur-md rounded-[28px] border dark:border-white/10 border-gray-200/20 shadow-lg">
        {/* Logo - Left */}
        <div className="flex items-center">
          <a href="#home" className="text-xl font-bold text-gradient flex items-center gap-1.5 pl-1">
            <span className="text-accent">SL</span>
          </a>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-0.5 px-1 py-1 mx-auto">
            {navLinks.map((link) => {
              // Extract section name from href
              const section = link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.disabled ? "#" : link.href}
                  onClick={() => !link.disabled && handleLinkClick(link.href)}
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full transition-all duration-200",
                    link.disabled
                      ? "text-foreground/40 cursor-not-allowed"
                      : activeLink === section
                        ? "text-foreground/90 dark:bg-white/10 bg-black/5 hover:bg-black/10 dark:hover:bg-white/15"
                        : "text-foreground/90 hover:bg-black/5 dark:hover:bg-white/10 hover:text-accent"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="relative" ref={moreMenuRef}>
              <button
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
                  isMoreMenuOpen
                    ? 'dark:bg-white/15 bg-black/10 text-accent'
                    : 'text-foreground/90 hover:bg-black/5 dark:hover:bg-white/10 hover:text-accent'
                }`}
              >
                More
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                className={`absolute right-0 mt-2 w-48 dark:bg-black/50 bg-white/30 backdrop-blur-lg rounded-[20px] shadow-lg border dark:border-white/10 border-gray-200/20 overflow-hidden transition-all duration-200 ${
                  isMoreMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <button
                  onClick={() => {
                    window.location.href = '/resume';
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/10 hover:text-accent transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Resume</span>
                </button>
                <div className="px-4 py-3 border-t dark:border-white/10 border-gray-200 flex items-center justify-between">
                  <span className="text-sm text-foreground/80">Theme</span>
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons - Right */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground focus:outline-none dark:bg-black/60 bg-white/50 backdrop-blur-sm dark:border-white/10 border-gray-200/20 border rounded-full p-2 shadow-md"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Book a Call button */}
          <div className="hidden md:block relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <CalendarDialog>
              <button
                type="button"
                className="relative flex items-center gap-2 dark:bg-black/40 bg-white/30 text-foreground hover:text-primary rounded-full shadow-lg transition-all duration-300 hover:shadow-accent/50 md:px-3 md:py-1.5 p-2 border dark:border-white/10 border-gray-200/20"
              >
                <Calendar className="h-5 w-5" />
                <span className="hidden md:inline font-medium">Book a Call</span>
              </button>
            </CalendarDialog>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden flex items-start justify-center pt-16 px-4">
          <div className="w-full max-w-[300px] mx-auto dark:bg-black/60 bg-white/40 backdrop-blur-lg rounded-[28px] shadow-xl overflow-hidden border dark:border-white/20 border-gray-200/20">
            {/* Header with close button */}
            <div className="flex items-center justify-between dark:bg-black/40 bg-white/30 rounded-t-[28px] px-4 py-3 border-b dark:border-white/10 border-gray-200/20">
              {/* Close button - left side */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground/70 hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Menu title - center */}
              <span className="text-base font-medium">Menu</span>

              {/* Empty div for spacing */}
              <div className="w-6"></div>
            </div>

            {/* Navigation links */}
            <div className="px-4 py-2">
              <div className="flex flex-col">
                {navLinks.map((link, index) => {
                  // Extract section name from href
                  const section = link.href.replace('#', '');
                  return (
                    <a
                      key={link.name}
                      href={link.disabled ? "#" : link.href}
                      className={cn(
                        "py-3.5 px-2 w-full transition-colors text-base font-medium text-center",
                        index !== navLinks.length - 1 ? "border-b dark:border-white/10 border-gray-200" : "",
                        link.disabled
                          ? "text-foreground/40 cursor-not-allowed"
                          : activeLink === section
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                      )}
                      onClick={() => {
                        if (!link.disabled) {
                          handleLinkClick(link.href);
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              {/* Theme toggle */}
              <div className="flex justify-center mt-4 mb-2 px-2">
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full dark:bg-black/30 bg-white/20">
                  <button
                    onClick={() => {
                      const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
                      document.documentElement.classList.remove('dark', 'light');
                      document.documentElement.classList.add(newTheme);
                      localStorage.setItem('theme', newTheme);
                    }}
                    className="flex items-center justify-center gap-2"
                  >
                    {document.documentElement.classList.contains('dark') ? (
                      <>
                        <Sun className="h-5 w-5" />
                        <span className="text-sm">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5" />
                        <span className="text-sm">Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 mt-6 px-2 pb-4">
                {/* Resume button */}
                <button
                  onClick={() => {
                    window.location.href = '/resume';
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full dark:bg-black/40 bg-white/30 hover:bg-opacity-80 dark:hover:bg-opacity-80 transition-colors border dark:border-white/10 border-gray-200/20"
                >
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Resume</span>
                </button>

                {/* Book a Call button */}
                <div className="relative group w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <a
                    href="/calendar"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative w-full flex items-center justify-center gap-2 py-3 rounded-full dark:bg-black/40 bg-white/30 backdrop-blur-sm border dark:border-white/10 border-gray-200/20 group-hover:border-white/20 transition-all"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">Book a Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </nav>
  );
};

export default Navbar;
