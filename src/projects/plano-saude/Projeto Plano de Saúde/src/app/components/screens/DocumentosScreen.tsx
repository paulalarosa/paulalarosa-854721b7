import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const docs = [
  { id: "1", title: "Boleto — Março 2026", date: "Venc. 10 Mar", status: "pendente", value: "R$ 890,00", color: "#FFB347" },
  { id: "2", title: "Boleto — Fevereiro 2026", date: "Pago 08 Fev", status: "pago", value: "R$ 890,00", color: "#00C48C" },
  { id: "3", title: "Boleto — Janeiro 2026", date: "Pago 09 Jan", status: "pago", value: "R$ 890,00", color: "#00C48C" },
  { id: "4", title: "Contrato do Plano", date: "Desde 01 Jan 2023", status: "documento", value: "", color: "#6C5CE7" },
  { id: "5", title: "Declaração IR 2025", date: "Ano-calendário 2025", status: "documento", value: "", color: "#6C5CE7" },
];

const statusMap: Record<string, { label: string; bg: string; text: string }> = {
  pendente: { label: "Pendente", bg: "#FFF3E8", text: "#FFB347" },
  pago: { label: "Pago", bg: "#E8FAF2", text: "#00C48C" },
  documento: { label: "PDF", bg: "#F3F1FE", text: "#6C5CE7" },
};

export function DocumentosScreen() {
  return (
    <>
      <SubHeader title="Documentos" subtitle="Boletos, contratos e declarações" />
      <div className="px-5 pb-6">
        {docs.map((d, i) => {
          const st = statusMap[d.status];
          return (
            <motion.button key={d.id} variants={fade(i)} initial="hidden" animate="visible"
              className="w-full text-left rounded-2xl p-4 mb-2 outline-none transition-transform active:scale-[0.98]"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
              aria-label={`${d.title}, ${st.label}${d.value ? `, ${d.value}` : ""}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${d.color}10` }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={d.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23" }}>{d.title}</p>
                  <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{d.date}</p>
                </div>
                <div className="shrink-0 text-right">
                  {d.value && <p style={{ fontSize: "13px", fontWeight: 800, color: "#0F0F23", marginBottom: "2px" }}>{d.value}</p>}
                  <span className="px-1.5 py-0.5 rounded" style={{ background: st.bg, fontSize: "9px", fontWeight: 700, color: st.text }}>{st.label}</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </>
  );
}
