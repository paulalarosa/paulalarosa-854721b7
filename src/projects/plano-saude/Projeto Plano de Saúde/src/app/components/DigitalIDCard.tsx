import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

export function DigitalIDCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (clientX - rect.left) / rect.width;
    const py = (clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    setShine({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setShine({ x: 50, y: 50 });
  };

  return (
    <div style={{ perspective: "800px" }}>
      <motion.article
        ref={cardRef}
        className="relative w-full rounded-[24px] overflow-hidden cursor-pointer select-none"
        onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
        onMouseLeave={handleLeave}
        onTouchEnd={handleLeave}
        style={{
          background: "linear-gradient(160deg, #12102E 0%, #1E1A42 35%, #2E2660 65%, #3D3578 100%)",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        role="region"
        aria-label="Cartão digital do plano de saúde Viva Saúde"
        tabIndex={0}
      >
        {/* Holographic shine */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              radial-gradient(ellipse 40% 35% at ${shine.x}% ${shine.y}%, rgba(108,92,231,0.25) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)
            `,
            transition: "background 0.1s ease-out",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative arcs */}
        <svg className="absolute top-0 right-0 w-40 h-40 opacity-[0.06] pointer-events-none" viewBox="0 0 160 160">
          <circle cx="160" cy="0" r="100" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="160" cy="0" r="70" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="160" cy="0" r="40" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>

        <div className="relative z-20 px-6 pt-6 pb-5" style={{ transform: "translateZ(20px)" }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                style={{ background: "rgba(108,92,231,0.3)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.5)" }}>
                VIVA SAÚDE
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(0,196,140,0.12)" }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00C48C" }}>
                <motion.div
                  className="w-full h-full rounded-full"
                  style={{ background: "#00C48C" }}
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span style={{ fontSize: "9px", fontWeight: 700, color: "#00C48C", letterSpacing: "0.08em" }}>ATIVO</span>
            </div>
          </div>

          {/* Name - with layered depth */}
          <div className="mb-5" style={{ transform: "translateZ(30px)" }}>
            <p style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", marginBottom: "5px" }}>
              TITULAR
            </p>
            <p style={{ fontSize: "22px", fontWeight: 800, lineHeight: 1.1, color: "#FFFFFF", letterSpacing: "-0.03em" }}>
              Mariana Costa Oliveira
            </p>
          </div>

          {/* Bottom details */}
          <div className="flex items-end justify-between" style={{ transform: "translateZ(15px)" }}>
            <div className="flex gap-6">
              <div>
                <p style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)", marginBottom: "3px" }}>
                  Nº CARTÃO
                </p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.75)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.06em" }}>
                  0072 4819 2026 0001
                </p>
              </div>
              <div>
                <p style={{ fontSize: "8px", fontWeight: 600, letterSpacing: "0.12em", color: "rgba(255,255,255,0.2)", marginBottom: "3px" }}>
                  PLANO
                </p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>
                  Premium PJ
                </p>
              </div>
            </div>
            <button
              className="w-8 h-8 rounded-[10px] flex items-center justify-center outline-none transition-transform active:scale-90"
              style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}
              aria-label="Exibir QR Code do cartão"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="6" height="6" x="3" y="3" rx="1" />
                <rect width="6" height="6" x="15" y="3" rx="1" />
                <rect width="6" height="6" x="3" y="15" rx="1" />
                <path d="M15 15h2v2h-2z" />
                <path d="M21 15h-2v2h2v2h-2" />
                <path d="M15 21h2v-2" />
                <path d="M21 21h-2" />
              </svg>
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
