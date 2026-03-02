import { motion } from "motion/react";
import { drops } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function DropsScreen() {
  return (
    <main className="pt-24 pb-28 lg:pb-12 px-5 sm:px-8 max-w-[1000px] mx-auto" role="main">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white uppercase mb-1"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px, 5vw, 44px)", lineHeight: 1 }}
      >
        DROPS
      </motion.h2>
      <p className="text-white/20 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>
        Lancamentos exclusivos com edicoes limitadas.
      </p>

      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-3">
        {drops.map((drop, i) => (
          <motion.article
            key={drop.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="relative overflow-hidden cursor-pointer group"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4]">
              <ImageWithFallback src={drop.image} alt={`${drop.title} ${drop.subtitle}`} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.15) 0%, transparent 30%, rgba(8,8,8,0.9) 85%, rgba(8,8,8,0.98) 100%)" }} />

              {/* Status */}
              <div
                className="absolute top-3 right-3 px-2.5 py-1 flex items-center gap-1.5"
                style={{
                  background: drop.status === "live" ? "rgba(40,200,80,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${drop.status === "live" ? "rgba(40,200,80,0.2)" : "rgba(255,255,255,0.05)"}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {drop.status === "live" && (
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-[4px] h-[4px] rounded-full bg-green-400" />
                )}
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7.5px", letterSpacing: "0.15em", color: drop.status === "live" ? "rgba(120,255,150,0.8)" : "rgba(255,255,255,0.35)" }}>
                  {drop.status === "live" ? "AO VIVO" : "EM BREVE"}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "28px", lineHeight: 0.95 }}>
                  {drop.title}<br /><span className="text-white/20">{drop.subtitle}</span>
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-white/30" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", letterSpacing: "0.08em" }}>{drop.date}</span>
                  <span className="text-white/15" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px", letterSpacing: "0.08em" }}>{drop.pieces} PECAS</span>
                </div>
                <button
                  className="mt-3 px-4 py-2 cursor-pointer transition-all"
                  style={{
                    background: drop.status === "live" ? "white" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${drop.status === "live" ? "white" : "rgba(255,255,255,0.08)"}`,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "8px",
                    letterSpacing: "0.18em",
                    color: drop.status === "live" ? "#080808" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {drop.status === "live" ? "COMPRAR AGORA" : "ATIVAR LEMBRETE"}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* How it works */}
      <section className="mt-10" aria-label="Como funciona">
        <h3 className="text-white/60 uppercase mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", lineHeight: 1 }}>
          COMO <span className="text-white/12">FUNCIONA</span>
        </h3>
        <div className="grid sm:grid-cols-3 gap-0 sm:gap-6">
          {[
            { n: "01", t: "ATIVE O LEMBRETE", d: "Receba notificacao quando o drop abrir." },
            { n: "02", t: "ENTRE NA FILA", d: "Acesso por ordem de chegada." },
            { n: "03", t: "GARANTA A SUA", d: "Pecas limitadas, sem reposicao." },
          ].map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + 0.08 * i }}
              className="flex items-start gap-3 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
            >
              <span className="text-white/[0.06] shrink-0" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "26px", lineHeight: 1 }}>{item.n}</span>
              <div>
                <h4 className="text-white/50 uppercase mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", letterSpacing: "0.12em" }}>{item.t}</h4>
                <p className="text-white/18" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px" }}>{item.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
