import { motion } from "motion/react";
import { useState } from "react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

type Tab = "resultados" | "pendentes" | "historico";

interface Exam {
  id: string;
  name: string;
  lab: string;
  date: string;
  status: "pronto" | "pendente" | "coletado";
  category: string;
  color: string;
}

const exams: Exam[] = [
  { id: "1", name: "Hemograma Completo", lab: "Lab Fleury", date: "28 Fev", status: "pronto", category: "Sangue", color: "#FF6B6B" },
  { id: "2", name: "Colesterol Total + Frações", lab: "Lab Fleury", date: "28 Fev", status: "pronto", category: "Sangue", color: "#FFB347" },
  { id: "3", name: "Ressonância Magnética", lab: "Delboni Auriemo", date: "05 Mar", status: "pendente", category: "Imagem", color: "#4DA6FF" },
  { id: "4", name: "Eletrocardiograma", lab: "Clínica Bem Estar", date: "10 Mar", status: "pendente", category: "Cardio", color: "#6C5CE7" },
  { id: "5", name: "TSH + T4 Livre", lab: "Lab Fleury", date: "15 Jan", status: "coletado", category: "Hormonal", color: "#00C48C" },
  { id: "6", name: "Glicemia em Jejum", lab: "Lab Fleury", date: "15 Jan", status: "coletado", category: "Sangue", color: "#FF6B6B" },
];

const statusLabel: Record<string, string> = {
  pronto: "Resultado pronto",
  pendente: "Agendado",
  coletado: "Realizado",
};

const statusColor: Record<string, { bg: string; text: string }> = {
  pronto: { bg: "#E8FAF2", text: "#00C48C" },
  pendente: { bg: "#FFF3E8", text: "#FFB347" },
  coletado: { bg: "#F0F0F5", text: "#8F8FA3" },
};

export function ExamesScreen() {
  const [tab, setTab] = useState<Tab>("resultados");

  const filtered = exams.filter((e) => {
    if (tab === "resultados") return e.status === "pronto";
    if (tab === "pendentes") return e.status === "pendente";
    return e.status === "coletado";
  });

  return (
    <>
      <SubHeader
        title="Exames"
        subtitle={`${exams.filter((e) => e.status === "pronto").length} resultados prontos`}
        action={
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center outline-none transition-transform active:scale-90"
            style={{ background: "#0F0F23" }}
            aria-label="Solicitar novo exame"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
          </button>
        }
      />

      {/* Tabs */}
      <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#F0F0F5" }} role="tablist">
          {([
            { key: "resultados" as Tab, label: "Prontos", count: exams.filter((e) => e.status === "pronto").length },
            { key: "pendentes" as Tab, label: "Agendados", count: exams.filter((e) => e.status === "pendente").length },
            { key: "historico" as Tab, label: "Realizados", count: exams.filter((e) => e.status === "coletado").length },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 py-2 rounded-lg outline-none transition-all flex items-center justify-center gap-1"
              style={{
                background: tab === t.key ? "#fff" : "transparent",
                boxShadow: tab === t.key ? "0 1px 3px rgba(0,0,0,0.04)" : "none",
              }}
              role="tab"
              aria-selected={tab === t.key}
            >
              <span style={{ fontSize: "11px", fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? "#0F0F23" : "#8F8FA3" }}>
                {t.label}
              </span>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  background: tab === t.key ? "#0F0F23" : "rgba(0,0,0,0.05)",
                  fontSize: "8px",
                  fontWeight: 700,
                  color: tab === t.key ? "#fff" : "#8F8FA3",
                }}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Exam list */}
      <div className="px-5 pb-6">
        {filtered.map((exam, i) => (
          <motion.button
            key={exam.id}
            variants={fade(1 + i)}
            initial="hidden"
            animate="visible"
            className="w-full text-left rounded-2xl mb-2.5 p-4 outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            aria-label={`${exam.name}, ${statusLabel[exam.status]}, ${exam.date}`}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${exam.color}10` }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={exam.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>{exam.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{exam.lab}</span>
                  <span style={{ fontSize: "11px", fontWeight: 400, color: "#C8C8D4" }}>·</span>
                  <span style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{exam.date}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{
                      background: statusColor[exam.status].bg,
                      fontSize: "9px",
                      fontWeight: 700,
                      color: statusColor[exam.status].text,
                    }}
                  >
                    {statusLabel[exam.status]}
                  </span>
                  <span className="px-2 py-0.5 rounded-md" style={{ background: "#F0F0F5", fontSize: "9px", fontWeight: 600, color: "#8F8FA3" }}>
                    {exam.category}
                  </span>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1.5">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
}
