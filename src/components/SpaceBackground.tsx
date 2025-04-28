import { useEffect, useRef, useState, useCallback, memo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  element: HTMLDivElement;
}

// Throttle function to limit how often a function can be called
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const SpaceBackground = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);

  // Throttled resize handler to improve performance
  const handleResize = useCallback(throttle(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    isMobileRef.current = width < 768; // Check if mobile

    setWindowSize({
      width,
      height,
    });
  }, 200), []); // Throttle to once per 200ms

  useEffect(() => {
    // Initial size
    handleResize();

    // Listen for size changes
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      // Clean up animation frame if component unmounts
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleResize]);

  // Create particle with optimized parameters
  const createParticle = useCallback((container: HTMLDivElement) => {
    const element = document.createElement("div");
    element.className = "particle";

    // Smaller particles and fewer on mobile for better performance
    const size = Math.random() * (isMobileRef.current ? 3 : 5) + 1;
    const x = Math.random() * windowSize.width;
    const y = Math.random() * windowSize.height;
    const speed = Math.random() * 0.8 + 0.2; // Slightly reduced speed range for better performance

    // Create a more varied opacity for a space-like effect
    const opacity = Math.random() * 0.7 + 0.1;
    
    // Add some color variation for a more space-like effect
    // Use colors that match your theme - purples, blues, and teals
    const colors = [
      'rgba(180, 120, 255, 0.8)', // Purple (primary)
      'rgba(100, 200, 255, 0.8)', // Blue
      'rgba(80, 230, 230, 0.8)',  // Teal (accent)
      'rgba(255, 255, 255, 0.9)', // White (stars)
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Apply styles
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.opacity = opacity.toString();
    element.style.background = color;
    element.style.boxShadow = `0 0 ${size * 2}px ${color}`; // Add glow effect
    element.style.transform = `translate(${x}px, ${y}px)`;

    container.appendChild(element);

    const particle: Particle = {
      x,
      y,
      size,
      speed,
      opacity,
      color,
      element,
    };

    particlesRef.current.push(particle);
  }, [windowSize]);

  useEffect(() => {
    if (!containerRef.current || windowSize.width === 0) return;

    const container = containerRef.current;

    // Increase particle count for a more space-like effect
    const baseCount = isMobileRef.current ? 50 : 100;
    const particleCount = Math.min(baseCount, Math.floor(windowSize.width / (isMobileRef.current ? 30 : 20)));

    // Clear existing particles
    container.innerHTML = "";
    particlesRef.current = [];

    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(container);
    }
    
    // Add a subtle background gradient for a space effect
    container.style.background = "radial-gradient(ellipse at center, rgba(20, 10, 30, 0.4) 0%, rgba(10, 10, 20, 0) 70%)";

    // Optimized animation loop with frame skipping for better performance
    let frameCount = 0;
    const framesToSkip = isMobileRef.current ? 2 : 1; // Skip more frames on mobile

    const animateParticles = () => {
      frameCount++;

      // Only update particles every N frames based on device capability
      if (frameCount % framesToSkip === 0) {
        particlesRef.current.forEach((particle) => {
          if (!particle || !particle.element) return;

          // Move particles upward with slight horizontal drift for a more natural space effect
          particle.y -= particle.speed;
          particle.x += Math.sin(frameCount * 0.01 + particle.x * 0.01) * 0.2;

          // Slightly vary opacity for twinkling effect
          if (Math.random() > 0.99) {
            const newOpacity = Math.max(0.1, Math.min(0.9, particle.opacity + (Math.random() - 0.5) * 0.2));
            particle.opacity = newOpacity;
            particle.element.style.opacity = newOpacity.toString();
          }

          // Reset particle if it goes out of screen
          if (particle.y < -particle.size * 2 || 
              particle.x < -particle.size * 2 || 
              particle.x > windowSize.width + particle.size * 2) {
            particle.y = windowSize.height + particle.size;
            particle.x = Math.random() * windowSize.width;
            
            // Occasionally change color when resetting
            if (Math.random() > 0.7) {
              const colors = [
                'rgba(180, 120, 255, 0.8)', // Purple (primary)
                'rgba(100, 200, 255, 0.8)', // Blue
                'rgba(80, 230, 230, 0.8)',  // Teal (accent)
                'rgba(255, 255, 255, 0.9)', // White (stars)
              ];
              particle.color = colors[Math.floor(Math.random() * colors.length)];
              particle.element.style.background = particle.color;
              particle.element.style.boxShadow = `0 0 ${particle.size * 2}px ${particle.color}`;
            }
          }

          particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
      }

      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    animationFrameRef.current = requestAnimationFrame(animateParticles);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [windowSize, createParticle]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

// Wrap with memo to prevent unnecessary re-renders
export default memo(SpaceBackground);
