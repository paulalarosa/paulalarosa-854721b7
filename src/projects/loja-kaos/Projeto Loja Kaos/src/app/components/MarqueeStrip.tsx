import { motion } from "motion/react";

export function MarqueeStrip() {
  const text = "NOVA COLECAO SS26  ·  FRETE GRATIS ACIMA DE R$299  ·  DROP EXCLUSIVO  ·  EDICAO LIMITADA  ·  ";

  return (
    <div
      className="w-full overflow-hidden py-3"
      style={{ borderTop: "1px solid rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="text-white/[0.08] uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", letterSpacing: "0.3em" }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
