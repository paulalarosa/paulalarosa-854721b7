import { motion } from "framer-motion";

const BrandLoader = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Carregando"
    className="h-screen w-full grid place-items-center bg-background"
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="flex flex-col items-center gap-6"
    >
      <motion.div
        className="relative w-12 h-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute inset-0 rounded-full border border-foreground/10" />
        <span className="absolute inset-0 rounded-full border-t border-foreground/80" />
      </motion.div>
      <span className="font-serif text-xs uppercase tracking-[0.4em] text-muted-foreground select-none">
        Paula La Rosa
      </span>
    </motion.div>
  </div>
);

export default BrandLoader;
