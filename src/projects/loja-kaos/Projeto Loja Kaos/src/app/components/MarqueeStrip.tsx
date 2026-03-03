import { motion } from "motion/react";

export function MarqueeStrip() {
  const text = "KAOS STORE  ·  SS26  ·  EDIÇÃO LIMITADA  ·  FRETE GRÁTIS R$299+  ·  DROP EXCLUSIVO  ·  ";
  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{
        borderTop: "1px solid rgba(10,10,10,0.06)",
        borderBottom: "1px solid rgba(10,10,10,0.06)",
        background: "#F5F4F0",
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ x: [0, -1400] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.3em",
            color: "rgba(10,10,10,0.16)",
            fontWeight: 300,
          }}>{text}</span>
        ))}
      </motion.div>
    </div>
  );
}
