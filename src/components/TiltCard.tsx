import { useState, useRef, ReactNode, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltFactor?: number; // Controls the intensity of the tilt effect
  perspective?: number; // Controls the 3D perspective
  glareEnabled?: boolean; // Whether to show a glare effect
  glareMaxOpacity?: number; // Maximum opacity of the glare
  scale?: number; // Scale factor on hover
  transitionDuration?: number; // Duration of the transition in seconds
}

const TiltCard = ({
  children,
  className = "",
  tiltFactor = 10,
  perspective = 1000,
  glareEnabled = true,
  glareMaxOpacity = 0.2,
  scale = 1.02,
  transitionDuration = 0.2,
}: TiltCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for the tilt effect
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltFactor, -tiltFactor]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltFactor, tiltFactor]), springConfig);

  // Glare effect position
  const glareX = useSpring(mouseX, springConfig);
  const glareY = useSpring(mouseY, springConfig);

  // Pre-compute the glare transform values
  const glareTransformX = useTransform(glareX, [0, 1], ["-25%", "0%"]);
  const glareTransformY = useTransform(glareY, [0, 1], ["-25%", "0%"]);

  // Border highlight effect
  const borderOpacity = useSpring(
    useTransform(
      [mouseX, mouseY],
      ([latestX, latestY]) => {
        const distance = Math.sqrt(
          Math.pow(latestX - 0.5, 2) + Math.pow(latestY - 0.5, 2)
        );
        return isHovering ? Math.min(distance * 0.7, 0.2) : 0;
      }
    ),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to the card (0 to 1)
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    // Update motion values
    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset to neutral position
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovering ? scale : 1,
      }}
      transition={{
        duration: transitionDuration,
      }}
    >
      {/* Border highlight effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: "0 0 0 1px rgba(99, 102, 241, 0.8)",
          opacity: borderOpacity,
        }}
      />

      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          duration: transitionDuration,
        }}
      >
        {children}

        {/* Glare effect */}
        {glareEnabled && isHovering && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
              opacity: glareMaxOpacity,
              top: 0,
              left: 0,
              width: "200%",
              height: "200%",
              transform: "translate(-25%, -25%)",
              x: glareTransformX,
              y: glareTransformY,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
