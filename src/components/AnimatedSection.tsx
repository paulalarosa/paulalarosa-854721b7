import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** 0 = no parallax, 1 = subtle, 2 = medium */
  parallaxIntensity?: number;
}

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  parallaxIntensity = 1,
}: AnimatedSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yOffset = parallaxIntensity * 25;
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [yOffset, 0, -yOffset]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.15, 1, 1, 0.85]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        y: parallaxIntensity > 0 ? y : undefined,
        opacity: parallaxIntensity > 0 ? opacity : undefined,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
