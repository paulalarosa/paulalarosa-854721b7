import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>

      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: "#0a0a0a",
          transformOrigin: "bottom",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{
          duration: 0.4,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
      <motion.div
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{
          background: "#0a0a0a",
          transformOrigin: "top",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.15,
        }}
      />
    </>
  );
};

export default PageTransition;
