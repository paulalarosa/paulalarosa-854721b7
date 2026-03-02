import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroBannerProps {
  image: string;
}

export function HeroBanner({ image }: HeroBannerProps) {
  return (
    <section className="relative w-full h-[85vh] max-h-[600px] sm:max-h-[700px] overflow-hidden" aria-label="Banner principal">
      <ImageWithFallback
        src={image}
        alt="Colecao Caos Control SS26"
        className="w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0) 30%, rgba(8,8,8,0.8) 75%, rgba(8,8,8,1) 100%)",
        }}
      />

      {/* Subtle Y2K accent */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-24 right-8 opacity-[0.04]"
        aria-hidden="true"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M30 0L34 26L60 30L34 34L30 60L26 34L0 30L26 26Z" fill="white" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-8 pb-8 max-w-[1200px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/25 uppercase mb-3"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", letterSpacing: "0.35em" }}
        >
          COLECAO 2026 &bull; EDICAO LIMITADA
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(42px, 10vw, 72px)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
          }}
        >
          CAOS
          <br />
          <span className="text-white/20">CONTROL</span>
          <sup style={{ fontSize: "clamp(11px, 2vw, 16px)", fontFamily: "'Space Grotesk', sans-serif", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginLeft: "8px" }}>
            SS26
          </sup>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <button
            className="px-7 py-3 flex items-center gap-2.5 cursor-pointer transition-opacity hover:opacity-90"
            style={{
              background: "white",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "#080808",
            }}
            aria-label="Ver colecao Caos Control"
          >
            VER COLECAO
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="#080808" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
