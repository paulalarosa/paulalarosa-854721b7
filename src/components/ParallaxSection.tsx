import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Speed multiplier: <1 = slower (background feel), >1 = faster, 1 = normal */
  speed?: number;
  /** Whether to apply fade-in/out at section edges */
  fade?: boolean;
  /** Whether to apply a subtle scale effect */
  scale?: boolean;
  id?: string;
}

const ParallaxSection = ({
  children,
  className = "",
  speed = 1,
  fade = true,
  scale = false,
  id,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const baseOffset = (speed - 1) * 100;
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [baseOffset, 0, -baseOffset]
  );

  const opacityFade = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const opacityNoFade = useTransform(scrollYProgress, [0, 0.05], [0.9, 1]);
  const opacity = fade ? opacityFade : opacityNoFade;

  const scaleValActive = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const scaleValFixed = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const scaleVal = scale ? scaleValActive : scaleValFixed;

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        y,
        opacity,
        scale: scaleVal,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
