import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function SimpleThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.add(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Update DOM
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
      aria-label="Toggle theme"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '9999px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(262, 80%, 50%)',
        color: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {theme === 'dark' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}
