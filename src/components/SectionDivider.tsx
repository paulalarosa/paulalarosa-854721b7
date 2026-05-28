import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  className?: string;
}

const SectionDivider = ({ label, className }: SectionDividerProps) => (
  <div
    aria-hidden="true"
    className={`flex items-center justify-center gap-6 py-8 select-none ${className ?? ""}`}
  >
    <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-border" />
    <motion.span
      className="text-muted-foreground/60"
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      style={{ fontSize: "1.25rem" }}
    >
      ✦
    </motion.span>
    {label && (
      <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground/50">
        {label}
      </span>
    )}
    <motion.span
      className="text-muted-foreground/60"
      animate={{ rotate: -360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      style={{ fontSize: "1.25rem" }}
    >
      ✦
    </motion.span>
    <span className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-border" />
  </div>
);

export default SectionDivider;
