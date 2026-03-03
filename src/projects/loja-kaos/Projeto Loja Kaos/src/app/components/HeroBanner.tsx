import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroBanner({ image, onShop }: { image: string; onShop?: () => void }) {
  return (
    <section aria-label="Hero principal" style={{ background: "#F5F4F0" }}>

      {/* Foto — portrait, sem overlay, sem gradiente */}
      <div className="relative w-full overflow-hidden" style={{ height: "62vh", maxHeight: "500px" }}>
        <ImageWithFallback
          src={image}
          alt="Kaos — Coleção SS26"
          className="w-full h-full object-cover object-top"
        />
        {/* Badge SS26 — canto superior direito, sobre branco translúcido */}
        <div
          className="absolute top-4 right-4 px-3 py-1.5"
          style={{ background: "rgba(245,244,240,0.85)", backdropFilter: "blur(6px)" }}
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "7px",
            letterSpacing: "0.3em",
            color: "rgba(10,10,10,0.45)",
            fontWeight: 300,
          }}>SS26</span>
        </div>
      </div>

      {/* Texto ABAIXO da foto — fundo off-white, tipografia preta dominante */}
      <div className="px-5 pt-7 pb-9" style={{ background: "#F5F4F0" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.42em",
            color: "rgba(10,10,10,0.28)",
            fontWeight: 300,
            marginBottom: "10px",
          }}
        >
          COLEÇÃO 2026 · EDIÇÃO LIMITADA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(62px, 19vw, 100px)",
            lineHeight: 0.85,
            color: "#0A0A0A",
            letterSpacing: "0.01em",
          }}
        >
          KAOS<br />
          <span style={{ color: "rgba(10,10,10,0.1)" }}>CONTROL</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-7 flex items-center gap-5"
        >
          <button
            onClick={onShop}
            className="cursor-pointer transition-all duration-200 hover:bg-[#0A0A0A] hover:text-[#F5F4F0]"
            style={{
              border: "1px solid rgba(10,10,10,0.25)",
              padding: "10px 22px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.28em",
              color: "#0A0A0A",
              fontWeight: 400,
              background: "transparent",
            }}
          >
            VER COLEÇÃO
          </button>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.14em",
            color: "rgba(10,10,10,0.2)",
            fontWeight: 300,
          }}>
            12 peças restantes
          </span>
        </motion.div>
      </div>
    </section>
  );
}
