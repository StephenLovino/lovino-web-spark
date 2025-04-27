
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  element: HTMLDivElement;
}

const ParticleBackground = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const particlesRef = useRef<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial size
    handleResize();

    // Listen for size changes
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || windowSize.width === 0) return;

    const container = containerRef.current;
    const particleCount = Math.min(50, Math.floor(windowSize.width / 25)); // Responsive particle count

    // Clear existing particles
    container.innerHTML = "";
    particlesRef.current = [];

    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      createParticle(container);
    }

    // Animation loop
    const animateParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.y -= particle.speed;

        // Reset particle if it goes out of screen
        if (particle.y < -particle.size * 2) {
          particle.y = windowSize.height + particle.size;
          particle.x = Math.random() * windowSize.width;
        }

        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
      });

      requestAnimationFrame(animateParticles);
    };

    const animationId = requestAnimationFrame(animateParticles);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [windowSize]);

  const createParticle = (container: HTMLDivElement) => {
    const element = document.createElement("div");
    element.className = "particle";

    const size = Math.random() * 4 + 1;
    const x = Math.random() * windowSize.width;
    const y = Math.random() * windowSize.height;
    const speed = Math.random() * 1 + 0.2;
    const opacity = Math.random() * 0.5 + 0.1;

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.opacity = opacity.toString();
    element.style.transform = `translate(${x}px, ${y}px)`;

    container.appendChild(element);

    const particle: Particle = {
      x,
      y,
      size,
      speed,
      opacity,
      element,
    };

    particlesRef.current.push(particle);
  };

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
