import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const prescriptions = [
  {
    id: "1", medicine: "Losartana 50mg", dosage: "1 comp. manhã", doctor: "Dr. Roberto Almeida",
    date: "25 Fev 2026", valid: "25 Mar 2026", status: "ativa", refills: 2, color: "#6C5CE7",
  },
  {
    id: "2", medicine: "Sinvastatina 20mg", dosage: "1 comp. noite", doctor: "Dr. Roberto Almeida",
    date: "25 Fev 2026", valid: "25 Mai 2026", status: "ativa", refills: 5, color: "#00C48C",
  },
  {
    id: "3", medicine: "Dipirona 500mg", dosage: "1 comp. se dor", doctor: "Dra. Ana Ribeiro",
    date: "10 Jan 2026", valid: "10 Fev 2026", status: "expirada", refills: 0, color: "#8F8FA3",
  },
];

export function ReceitasScreen() {
  return (
    <>
      <SubHeader title="Receitas" subtitle="Prescrições digitais" />

      {/* Info card */}
      <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "#F3F1FE", border: "1px solid #EDEAFD" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#6C5CE7" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2h6v4H9z" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            </svg>
          </div>
          <div className="flex-1">
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#6C5CE7" }}>Receitas digitais com validade jurídica</p>
            <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3", marginTop: "1px" }}>Apresente o QR Code na farmácia</p>
          </div>
        </div>
      </motion.div>

      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          SUAS RECEITAS
        </p>
        {prescriptions.map((rx, i) => (
          <motion.button
            key={rx.id}
            variants={fade(1 + i)}
            initial="hidden"
            animate="visible"
            className="w-full text-left rounded-2xl mb-2.5 p-4 outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            aria-label={`${rx.medicine}, ${rx.dosage}, prescrito por ${rx.doctor}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${rx.color}10` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={rx.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
                  <path d="m8.5 8.5 7 7" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>{rx.medicine}</p>
                  <span
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      background: rx.status === "ativa" ? "#E8FAF2" : "#F0F0F5",
                      fontSize: "8px", fontWeight: 700,
                      color: rx.status === "ativa" ? "#00C48C" : "#8F8FA3",
                    }}
                  >
                    {rx.status === "ativa" ? "ATIVA" : "EXPIRADA"}
                  </span>
                </div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "#6C5CE7" }}>{rx.dosage}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>{rx.doctor}</span>
                  <span style={{ fontSize: "10px", fontWeight: 400, color: "#C8C8D4" }}>·</span>
                  <span style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>Válida até {rx.valid}</span>
                </div>
                {rx.refills > 0 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00C48C" }} />
                    <span style={{ fontSize: "10px", fontWeight: 600, color: "#00C48C" }}>{rx.refills} retiradas restantes</span>
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
}
