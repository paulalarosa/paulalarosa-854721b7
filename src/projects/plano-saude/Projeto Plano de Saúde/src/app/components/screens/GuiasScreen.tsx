import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const guides = [
  { id: "1", type: "Consulta", doctor: "Dr. Roberto Almeida", date: "25 Fev 2026", number: "GC-20260225-001", status: "autorizada", color: "#00C48C" },
  { id: "2", type: "Exame", doctor: "Lab Fleury", date: "28 Fev 2026", number: "GE-20260228-003", status: "autorizada", color: "#00C48C" },
  { id: "3", type: "Internação", doctor: "Hospital São Lucas", date: "05 Mar 2026", number: "GI-20260305-001", status: "em_analise", color: "#FFB347" },
  { id: "4", type: "Consulta", doctor: "Dra. Camila Santos", date: "10 Jan 2026", number: "GC-20260110-002", status: "utilizada", color: "#8F8FA3" },
];

const statusMap: Record<string, { label: string; bg: string; text: string }> = {
  autorizada: { label: "Autorizada", bg: "#E8FAF2", text: "#00C48C" },
  em_analise: { label: "Em análise", bg: "#FFF3E8", text: "#FFB347" },
  utilizada: { label: "Utilizada", bg: "#F0F0F5", text: "#8F8FA3" },
};

export function GuiasScreen() {
  return (
    <>
      <SubHeader
        title="Guias"
        subtitle="Autorizações e procedimentos"
        action={
          <button
            className="px-3 py-1.5 rounded-lg outline-none transition-transform active:scale-95"
            style={{ background: "#0F0F23", fontSize: "10px", fontWeight: 700, color: "#fff" }}
          >
            Nova guia
          </button>
        }
      />

      {/* Stats */}
      <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Autorizadas", value: "2", color: "#00C48C" },
            { label: "Em análise", value: "1", color: "#FFB347" },
            { label: "Utilizadas", value: "1", color: "#8F8FA3" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3 rounded-xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
              <span style={{ fontSize: "22px", fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</span>
              <span style={{ fontSize: "9px", fontWeight: 500, color: "#8F8FA3", marginTop: "1px" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* List */}
      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>TODAS AS GUIAS</p>
        {guides.map((g, i) => {
          const st = statusMap[g.status];
          return (
            <motion.button
              key={g.id} variants={fade(1 + i)} initial="hidden" animate="visible"
              className="w-full text-left rounded-2xl p-4 mb-2 outline-none transition-transform active:scale-[0.98]"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
              aria-label={`Guia ${g.number}, ${g.type}, ${st.label}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${g.color}10` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={g.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23" }}>{g.type}</p>
                    <span className="px-1.5 py-0.5 rounded" style={{ background: st.bg, fontSize: "8px", fontWeight: 700, color: st.text }}>{st.label}</span>
                  </div>
                  <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3", marginTop: "2px" }}>{g.doctor}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span style={{ fontSize: "10px", fontWeight: 500, color: "#B0B0C4", fontVariantNumeric: "tabular-nums" }}>{g.number}</span>
                    <span style={{ fontSize: "10px", fontWeight: 400, color: "#B0B0C4" }}>{g.date}</span>
                  </div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
