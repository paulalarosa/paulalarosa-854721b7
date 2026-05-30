import { motion } from "framer-motion";

const BRAND = "PAULA LA ROSA";

const BrandLoader = () => {
  const chars = BRAND.split("");

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Carregando"
      className="h-screen w-full grid place-items-center"
      style={{ background: "#0a0a0a" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center" aria-hidden="true">
        {chars.map((char, i) =>
          char === " " ? (
            <span key={i} className="w-3 md:w-4" />
          ) : (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-3xl md:text-4xl font-semibold text-white select-none"
            >
              {char}
            </motion.span>
          )
        )}
      </div>
    </motion.div>
  );
};

export default BrandLoader;
