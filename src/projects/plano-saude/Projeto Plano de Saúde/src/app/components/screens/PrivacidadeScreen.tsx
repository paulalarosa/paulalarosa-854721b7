import { motion } from "motion/react";
import { useState } from "react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

function ToggleSwitch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="relative w-10 h-6 rounded-full outline-none transition-colors shrink-0" style={{ background: on ? "#6C5CE7" : "#E0E0EC" }} role="switch" aria-checked={on}>
      <motion.div className="absolute top-0.5 w-5 h-5 rounded-full bg-white" animate={{ left: on ? "18px" : "2px" }} transition={{ type: "spring", stiffness: 500, damping: 30 }} style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />
    </button>
  );
}

export function PrivacidadeScreen() {
  const [consents, setConsents] = useState<Record<string, boolean>>({
    analytics: true, marketing: false, sharing: false, biometric: true,
  });
  const toggle = (id: string) => setConsents((p) => ({ ...p, [id]: !p[id] }));

  return (
    <>
      <SubHeader title="Privacidade" subtitle="Controle seus dados" />

      {/* Data info */}
      <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: "#E8FAF2", border: "1px solid #D1F5E6" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#00C48C" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <div className="flex-1">
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#00856A" }}>Seus dados estão protegidos</p>
            <p style={{ fontSize: "10px", fontWeight: 400, color: "#00856A", opacity: 0.7 }}>Conformidade com LGPD</p>
          </div>
        </div>
      </motion.div>

      {/* Consents */}
      <motion.div className="px-7 pt-2 pb-1.5" variants={fade(1)} initial="hidden" animate="visible">
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>CONSENTIMENTOS</p>
      </motion.div>
      <motion.div className="px-5 pb-4" variants={fade(1.5)} initial="hidden" animate="visible">
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
          {[
            { id: "analytics", label: "Análise de uso", desc: "Melhorar sua experiência no app" },
            { id: "marketing", label: "Marketing personalizado", desc: "Ofertas e conteúdo relevante" },
            { id: "sharing", label: "Compartilhar com parceiros", desc: "Academias e farmácias conveniadas" },
            { id: "biometric", label: "Biometria", desc: "Login com impressão digital ou face" },
          ].map((item, i, arr) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: i < arr.length - 1 ? "1px solid #F5F5FA" : "none" }}>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F0F23" }}>{item.label}</p>
                <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>{item.desc}</p>
              </div>
              <ToggleSwitch on={consents[item.id]} onToggle={() => toggle(item.id)} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div className="px-7 pt-2 pb-1.5" variants={fade(2)} initial="hidden" animate="visible">
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>AÇÕES</p>
      </motion.div>
      <motion.div className="px-5 pb-6" variants={fade(2.5)} initial="hidden" animate="visible">
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
          {[
            { label: "Baixar meus dados", desc: "Exportar em formato JSON", color: "#6C5CE7" },
            { label: "Excluir minha conta", desc: "Ação irreversível", color: "#FF6B6B" },
          ].map((a, i) => (
            <button key={a.label} className="w-full text-left flex items-center gap-3 px-4 py-3.5 outline-none active:bg-[#F8F8FC]" style={{ borderBottom: i === 0 ? "1px solid #F5F5FA" : "none" }}>
              <div className="flex-1">
                <p style={{ fontSize: "13px", fontWeight: 600, color: a.color }}>{a.label}</p>
                <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>{a.desc}</p>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
