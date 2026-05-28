import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface TextRevealProps {
  children: string;
  delay?: number;
  className?: string;
  as?: ElementType;
  stagger?: number;
}

const TextReveal = ({
  children,
  delay = 0,
  className,
  as = "span",
  stagger = 0.05,
}: TextRevealProps) => {
  const words = children.split(/(\s+)/);
  const Wrapper = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <Wrapper
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) return <span key={i}>{word}</span>;
        return (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.6,
                  delay: delay + i * stagger,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
          >
            {word as ReactNode}
          </motion.span>
        );
      })}
    </Wrapper>
  );
};

export default TextReveal;
