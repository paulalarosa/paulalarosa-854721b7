import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { DigitalIDCard } from "../DigitalIDCard";
import { HealthRing } from "../HealthRing";
import { StoryBubbles } from "../StoryBubbles";
import { DynamicIsland } from "../DynamicIsland";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const healthRings = [
  { label: "Consultas", value: 8, max: 24, color: "#6C5CE7" },
  { label: "Exames", value: 3, max: 12, color: "#00C48C" },
  { label: "Terapias", value: 16, max: 44, color: "#FFB347" },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <motion.header
        className="px-7 pt-4 pb-3"
        initial="hidden" animate="visible" variants={fadeUp} custom={0}
      >
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "#8F8FA3" }}>
              {getGreeting()},
            </p>
            <h1 style={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.2, color: "#0F0F23", letterSpacing: "-0.03em" }}>
              Mariana
            </h1>
          </div>
          <button
            onClick={() => navigate("/perfil/notificacoes")}
            className="w-10 h-10 rounded-[13px] flex items-center justify-center relative outline-none transition-transform active:scale-90"
            style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.05)" }}
            aria-label="Notificações — 2 novas"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F23" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <div className="absolute top-2 right-2 w-[6px] h-[6px] rounded-full" style={{ background: "#FF6B6B", boxShadow: "0 0 0 2px #FAFAFD" }} aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      {/* Dynamic Island */}
      <motion.div
        className="pb-4"
        initial="hidden" animate="visible" variants={fadeUp} custom={1}
      >
        <DynamicIsland />
      </motion.div>

      {/* ID Card with parallax */}
      <motion.section
        className="px-5 pb-5"
        initial="hidden" animate="visible" variants={fadeUp} custom={2}
        aria-label="Cartão digital"
      >
        <DigitalIDCard />
      </motion.section>

      {/* Story Bubbles */}
      <motion.section
        className="pb-5"
        initial="hidden" animate="visible" variants={fadeUp} custom={3}
        aria-label="Ações rápidas"
      >
        <StoryBubbles />
      </motion.section>

      {/* Health Engagement Section */}
      <motion.section
        className="px-5 pb-5"
        initial="hidden" animate="visible" variants={fadeUp} custom={4}
        aria-label="Engajamento de saúde"
      >
        <div
          className="rounded-[24px] p-5"
          style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.04), 0 8px 28px rgba(15,15,35,0.04)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#8F8FA3" }}>
                SEU ENGAJAMENTO
              </p>
              <p style={{ fontSize: "16px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.02em", marginTop: "2px" }}>
                Saúde em dia
              </p>
            </div>
            <button
              onClick={() => navigate("/coberturas")}
              className="px-3 py-1.5 rounded-full outline-none transition-transform active:scale-95"
              style={{ background: "#F3F1FE", fontSize: "11px", fontWeight: 600, color: "#6C5CE7" }}
            >
              Ver plano
            </button>
          </div>

          <div className="flex items-center gap-5">
            {/* Ring */}
            <HealthRing rings={healthRings} score={78} size={150} />

            {/* Legend */}
            <div className="flex-1 flex flex-col gap-3">
              {healthRings.map((ring) => (
                <div key={ring.label} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ring.color }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "12px", fontWeight: 600, color: "#0F0F23" }}>{ring.label}</p>
                    <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>
                      {ring.value}/{ring.max} usados
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services — Magazine Editorial Layout */}
      <motion.div
        className="px-7 pb-2"
        initial="hidden" animate="visible" variants={fadeUp} custom={5}
      >
        <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#8F8FA3" }}>
          SERVIÇOS
        </p>
      </motion.div>

      <div className="px-5 pb-2">
        {/* Featured large card */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={6}
          className="mb-3"
        >
          <button
            onClick={() => navigate("/telemedicina")}
            className="w-full text-left rounded-[22px] overflow-hidden relative outline-none group transition-transform active:scale-[0.98]"
            style={{ background: "linear-gradient(155deg, #6C5CE7 0%, #8B7CF0 50%, #A78BFA 100%)" }}
            aria-label="Telemedicina: Consulte online em minutos com especialistas"
          >
            {/* Decorative */}
            <svg className="absolute top-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 128 128">
              <circle cx="128" cy="0" r="80" fill="none" stroke="white" strokeWidth="0.8" />
              <circle cx="128" cy="0" r="55" fill="none" stroke="white" strokeWidth="0.8" />
            </svg>
            <div className="relative z-10 p-6 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-[11px] flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 8-6 4 6 4V8Z" />
                      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)" }}>
                    DISPONÍVEL AGORA
                  </span>
                </div>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Telemedicina
                </p>
                <p style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>
                  Consulte online em minutos
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </button>
        </motion.div>

        {/* Two-column compact cards */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={7}>
            <button
              onClick={() => navigate("/encontrar-medico")}
              className="w-full text-left rounded-[20px] p-5 outline-none group transition-transform active:scale-[0.97]"
              style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.04), 0 6px 20px rgba(15,15,35,0.04)" }}
              aria-label="Encontrar médico: busque especialistas por perto"
            >
              <div className="w-10 h-10 rounded-[12px] flex items-center justify-center mb-3" style={{ background: "#E8FAF2" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C48C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>
                Encontrar Médico
              </p>
              <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3", marginTop: "2px" }}>
                Perto de você
              </p>
            </button>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={8}>
            <button
              onClick={() => navigate("/exames")}
              className="w-full text-left rounded-[20px] p-5 outline-none group transition-transform active:scale-[0.97]"
              style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.04), 0 6px 20px rgba(15,15,35,0.04)" }}
              aria-label="Exames: 2 resultados disponíveis"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ background: "#FFF3E8" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "#FF6B6B", fontSize: "10px", fontWeight: 700, color: "#fff" }}
                >
                  2
                </div>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>
                Exames
              </p>
              <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3", marginTop: "2px" }}>
                Resultados prontos
              </p>
            </button>
          </motion.div>
        </div>

        {/* Insight card — unique, editorial style */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={9}>
          <button
            onClick={() => navigate("/agendar")}
            className="w-full text-left rounded-[20px] p-5 outline-none transition-transform active:scale-[0.98] flex items-center gap-4"
            style={{ background: "#FFFBF5", border: "1px solid #FFF3E0" }}
            aria-label="Dica inteligente: Você tem 16 consultas disponíveis este ano. Agende um check-up."
          >
            <div className="w-11 h-11 rounded-[13px] flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #FFB347, #FFA020)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>
                Insight inteligente
              </p>
              <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3", lineHeight: 1.5, marginTop: "1px" }}>
                Você tem <span style={{ fontWeight: 700, color: "#FFB347" }}>16 consultas</span> disponíveis. Que tal agendar um check-up?
              </p>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </>
  );
}