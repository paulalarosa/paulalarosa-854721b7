import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const emergencyContacts = [
  { id: "1", name: "SAMU", number: "192", color: "#FF6B6B", desc: "Emergência médica" },
  { id: "2", name: "Bombeiros", number: "193", color: "#FFB347", desc: "Resgate e incêndio" },
  { id: "3", name: "Central Viva Saúde", number: "0800 123 4567", color: "#6C5CE7", desc: "Atendimento 24h" },
];

const quickActions = [
  {
    id: "1", title: "Pronto-socorro mais próximo", sub: "Hospital São Lucas · 1.8 km", color: "#FF6B6B",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  },
  {
    id: "2", title: "Orientação médica por chat", sub: "Tempo médio: 2 min", color: "#00C48C",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>,
  },
  {
    id: "3", title: "Ambulância", sub: "Solicitar remoção de emergência", color: "#FFB347",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 10H6" /><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>,
  },
  {
    id: "4", title: "Meus dados de emergência", sub: "Alergias, medicamentos, tipo sanguíneo", color: "#6C5CE7",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>,
  },
];

export function SOSScreen() {
  return (
    <>
      <SubHeader title="SOS Emergência" />

      {/* Emergency button */}
      <motion.div className="px-5 pb-5 flex justify-center" variants={fade(0)} initial="hidden" animate="visible">
        <button
          className="relative w-36 h-36 rounded-full outline-none"
          style={{ background: "linear-gradient(145deg, #FF6B6B, #EE5252)", boxShadow: "0 8px 32px rgba(255,107,107,0.35)" }}
          aria-label="Ligar para emergência — pressione para ligar para o SAMU"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "3px solid rgba(255,107,107,0.3)" }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(255,107,107,0.15)" }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#fff", marginTop: "6px", letterSpacing: "0.08em" }}>LIGAR</span>
          </div>
        </button>
      </motion.div>

      {/* Emergency contacts */}
      <motion.div className="px-5 pb-5" variants={fade(1)} initial="hidden" animate="visible">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          CONTATOS DE EMERGÊNCIA
        </p>
        <div className="space-y-2">
          {emergencyContacts.map((c) => (
            <button
              key={c.id}
              className="w-full text-left flex items-center gap-3 p-3.5 rounded-2xl outline-none transition-transform active:scale-[0.98]"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
              aria-label={`Ligar para ${c.name}: ${c.number}`}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${c.color}10` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23" }}>{c.name}</p>
                <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{c.desc}</p>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 800, color: c.color, letterSpacing: "-0.01em" }}>{c.number}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quick actions */}
      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          AÇÕES RÁPIDAS
        </p>
        {quickActions.map((a, i) => (
          <motion.button
            key={a.id}
            variants={fade(2 + i)}
            initial="hidden"
            animate="visible"
            className="w-full text-left flex items-center gap-3 p-3.5 rounded-2xl mb-2 outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            aria-label={`${a.title}: ${a.sub}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${a.color}10`, color: a.color }}>
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F0F23" }}>{a.title}</p>
              <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{a.sub}</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </motion.button>
        ))}
      </div>
    </>
  );
}
