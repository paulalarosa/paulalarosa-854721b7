import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";
import { DigitalIDCard } from "../DigitalIDCard";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

export function CartaoVirtualScreen() {
  return (
    <>
      <SubHeader title="Cartão Virtual" />

      <motion.div className="px-5 pb-5" variants={fade(0)} initial="hidden" animate="visible">
        <DigitalIDCard />
      </motion.div>

      {/* QR Code area */}
      <motion.div className="px-5 pb-5 flex justify-center" variants={fade(1)} initial="hidden" animate="visible">
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 rounded-2xl flex items-center justify-center mb-3" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
            {/* Simulated QR pattern */}
            <svg width="100" height="100" viewBox="0 0 100 100">
              <rect x="0" y="0" width="30" height="30" rx="4" fill="#0F0F23" />
              <rect x="70" y="0" width="30" height="30" rx="4" fill="#0F0F23" />
              <rect x="0" y="70" width="30" height="30" rx="4" fill="#0F0F23" />
              <rect x="8" y="8" width="14" height="14" rx="2" fill="#FAFAFD" />
              <rect x="78" y="8" width="14" height="14" rx="2" fill="#FAFAFD" />
              <rect x="8" y="78" width="14" height="14" rx="2" fill="#FAFAFD" />
              <rect x="12" y="12" width="6" height="6" rx="1" fill="#0F0F23" />
              <rect x="82" y="12" width="6" height="6" rx="1" fill="#0F0F23" />
              <rect x="12" y="82" width="6" height="6" rx="1" fill="#0F0F23" />
              {/* Pattern squares */}
              {[35, 42, 49, 56, 63].map((x) =>
                [0, 7, 14, 35, 42, 49, 56, 63, 70, 77, 84, 91].map((y) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="0.5" fill="#0F0F23" opacity={Math.random() > 0.4 ? 1 : 0.1} />
                ))
              )}
              {[0, 7, 14, 21, 28].map((x) =>
                [35, 42, 49, 56, 63].map((y) => (
                  <rect key={`b${x}-${y}`} x={x} y={y} width="5" height="5" rx="0.5" fill="#0F0F23" opacity={Math.random() > 0.3 ? 1 : 0.1} />
                ))
              )}
              <rect x="70" y="70" width="20" height="20" rx="3" fill="#6C5CE7" />
              <rect x="75" y="75" width="10" height="10" rx="2" fill="#FAFAFD" />
            </svg>
          </div>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "#0F0F23" }}>Apresente na recepção</p>
          <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3", marginTop: "2px" }}>QR Code válido por 5 minutos</p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div className="px-5 pb-6" variants={fade(2)} initial="hidden" animate="visible">
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { label: "Compartilhar", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg> },
            { label: "Baixar PDF", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg> },
          ].map((a) => (
            <button key={a.label} className="flex items-center justify-center gap-2 py-3 rounded-2xl outline-none transition-transform active:scale-95" style={{ background: "#F3F1FE" }}>
              {a.icon}
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#6C5CE7" }}>{a.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
