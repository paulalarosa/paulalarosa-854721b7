import { motion } from "motion/react";
import { useState } from "react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

interface Toggle {
  id: string;
  label: string;
  desc: string;
  defaultOn: boolean;
}

const sections: { title: string; items: Toggle[] }[] = [
  {
    title: "CONSULTAS",
    items: [
      { id: "reminder", label: "Lembretes", desc: "24h e 1h antes da consulta", defaultOn: true },
      { id: "confirm", label: "Confirmações", desc: "Quando agendamento for confirmado", defaultOn: true },
      { id: "cancel", label: "Cancelamentos", desc: "Se houver alteração pelo médico", defaultOn: true },
    ],
  },
  {
    title: "EXAMES",
    items: [
      { id: "results", label: "Resultados prontos", desc: "Quando exames forem liberados", defaultOn: true },
      { id: "prep", label: "Preparo", desc: "Instruções antes do exame", defaultOn: true },
    ],
  },
  {
    title: "GERAL",
    items: [
      { id: "tips", label: "Dicas de saúde", desc: "Conteúdo personalizado", defaultOn: false },
      { id: "promo", label: "Promoções", desc: "Descontos e benefícios", defaultOn: false },
      { id: "news", label: "Novidades", desc: "Novas funcionalidades do app", defaultOn: true },
    ],
  },
  {
    title: "CANAIS",
    items: [
      { id: "push", label: "Push", desc: "Notificações no celular", defaultOn: true },
      { id: "email", label: "E-mail", desc: "mariana.silva@email.com", defaultOn: true },
      { id: "sms", label: "SMS", desc: "(11) 98765-4321", defaultOn: false },
    ],
  },
];

function ToggleSwitch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-6 rounded-full outline-none transition-colors shrink-0"
      style={{ background: on ? "#6C5CE7" : "#E0E0EC" }}
      role="switch"
      aria-checked={on}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white"
        animate={{ left: on ? "18px" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      />
    </button>
  );
}

export function NotificacoesScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    sections.forEach((s) => s.items.forEach((item) => { init[item.id] = item.defaultOn; }));
    return init;
  });

  const toggle = (id: string) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <SubHeader title="Notificações" />
      {sections.map((section, si) => (
        <div key={section.title}>
          <motion.div className="px-7 pt-4 pb-1.5" variants={fade(si * 0.3)} initial="hidden" animate="visible">
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>{section.title}</p>
          </motion.div>
          <motion.div className="px-5 pb-1" variants={fade(si * 0.3 + 0.2)} initial="hidden" animate="visible">
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
              {section.items.map((item, ii) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: ii < section.items.length - 1 ? "1px solid #F5F5FA" : "none" }}>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F0F23" }}>{item.label}</p>
                    <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>{item.desc}</p>
                  </div>
                  <ToggleSwitch on={toggles[item.id]} onToggle={() => toggle(item.id)} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
      <div className="h-6" />
    </>
  );
}
