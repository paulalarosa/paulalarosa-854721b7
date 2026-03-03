import { motion } from "motion/react";
import { drops } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function DropsScreen() {
  return (
    <main className="pt-24 pb-28" style={{ background: "#0A0A0A" }} role="main">

      {/* Header da seção */}
      <div className="px-5 mb-8">
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "8px",
          letterSpacing: "0.38em",
          color: "rgba(255,255,255,0.2)",
          fontWeight: 300,
          marginBottom: "6px",
        }}>
          EDIÇÕES LIMITADAS
        </p>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(44px, 14vw, 72px)",
          lineHeight: 0.88,
          color: "white",
        }}>
          DROPS
        </h1>
      </div>

      {/* Lista de drops */}
      <div className="flex flex-col gap-[1px]">
        {drops.map((drop, i) => (
          <motion.article
            key={drop.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 * i }}
            className="relative overflow-hidden cursor-pointer group"
          >
            {/* Imagem full bleed */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: drop.status === "live" ? "4/5" : "16/9" }}
            >
              <ImageWithFallback
                src={drop.image}
                alt={`${drop.title} ${drop.subtitle}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: drop.status === "live"
                    ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.8) 75%, rgba(0,0,0,0.97) 100%)"
                    : "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)",
                }}
              />

              {/* Status badge — top right */}
              <div className="absolute top-4 right-4">
                {drop.status === "live" ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ background: "#C8102E" }}>
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ width: "4px", height: "4px", borderRadius: "50%", background: "white" }}
                    />
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "7.5px",
                      letterSpacing: "0.2em",
                      color: "white",
                      fontWeight: 500,
                    }}>
                      AO VIVO
                    </span>
                  </div>
                ) : (
                  <div className="px-2.5 py-1" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                    <span style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "7px",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.35)",
                      fontWeight: 300,
                    }}>
                      {drop.date}
                    </span>
                  </div>
                )}
              </div>

              {/* Conteúdo do drop */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "7px",
                  letterSpacing: "0.25em",
                  color: "rgba(255,255,255,0.3)",
                  fontWeight: 300,
                  marginBottom: "4px",
                }}>
                  {drop.pieces} PEÇAS
                </p>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: drop.status === "live" ? "clamp(40px, 12vw, 56px)" : "32px",
                  lineHeight: 0.9,
                  color: "white",
                }}>
                  {drop.title}<br />
                  <span style={{ color: "rgba(255,255,255,0.18)" }}>{drop.subtitle}</span>
                </h3>

                <button
                  className="mt-5 cursor-pointer transition-all hover:bg-white hover:text-black"
                  style={{
                    background: drop.status === "live" ? "white" : "transparent",
                    border: drop.status === "live" ? "none" : "1px solid rgba(255,255,255,0.18)",
                    padding: "10px 20px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "8.5px",
                    letterSpacing: "0.24em",
                    fontWeight: drop.status === "live" ? 500 : 300,
                    color: drop.status === "live" ? "#000" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {drop.status === "live" ? "COMPRAR AGORA" : "ATIVAR LEMBRETE"}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </main>
  );
}
