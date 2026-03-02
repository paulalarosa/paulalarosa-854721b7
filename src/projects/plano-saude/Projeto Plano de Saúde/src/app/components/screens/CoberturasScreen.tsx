import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HealthRing, MiniRing } from "../HealthRing";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ringData = [
  { label: "Consultas", value: 8, max: 24, color: "#6C5CE7" },
  { label: "Exames", value: 3, max: 12, color: "#00C48C" },
  { label: "Terapias", value: 16, max: 44, color: "#FFB347" },
];

interface Category {
  id: string;
  name: string;
  description: string;
  used: number;
  total: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    id: "1", name: "Consultas", description: "Clínico, especialistas, retornos",
    used: 8, total: 24, unit: "consultas", color: "#6C5CE7",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /></svg>,
  },
  {
    id: "2", name: "Exames", description: "Laboratoriais, imagem, diagnóstico",
    used: 3, total: 12, unit: "exames", color: "#00C48C",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /></svg>,
  },
  {
    id: "3", name: "Telemedicina", description: "Consultas por vídeo, chat médico",
    used: 2, total: 12, unit: "consultas", color: "#4DA6FF",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>,
  },
  {
    id: "4", name: "Fisioterapia", description: "Sessões, RPG, hidroterapia",
    used: 10, total: 20, unit: "sessões", color: "#FFB347",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  },
  {
    id: "5", name: "Psicoterapia", description: "Psicólogo, psiquiatra",
    used: 6, total: 24, unit: "sessões", color: "#FF6B6B",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
  },
  {
    id: "6", name: "Odontologia", description: "Limpeza, tratamentos, urgência",
    used: 1, total: 6, unit: "procedimentos", color: "#8F8FA3",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5.5c-1.5-1.5-4-1.5-5 .5s0 4 1.5 6c1 1.3 2.2 3.5 2.5 5.5.3 2 1 3 1 3s.7-1 1-3c.3-2 1.5-4.2 2.5-5.5 1.5-2 2.5-4 1.5-6s-3.5-2-5-.5z" /></svg>,
  },
];

export function CoberturasScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();

  const totalUsed = categories.reduce((s, c) => s + c.used, 0);
  const totalMax = categories.reduce((s, c) => s + c.total, 0);
  const totalPct = Math.round((totalUsed / totalMax) * 100);

  return (
    <>
      {/* Header */}
      <motion.header
        className="px-7 pt-5 pb-1"
        initial="hidden" animate="visible" variants={fadeUp} custom={0}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.03em" }}>
          Meu Plano
        </h1>
        <p style={{ fontSize: "12px", fontWeight: 500, color: "#8F8FA3", marginTop: "1px" }}>
          Viva Premium · Vigência 2026
        </p>
      </motion.header>

      {/* Activity Rings Hero */}
      <motion.section
        className="px-5 pt-5 pb-3"
        initial="hidden" animate="visible" variants={fadeUp} custom={1}
        aria-label="Visão geral de utilização do plano"
      >
        <div
          className="rounded-[24px] px-5 py-6"
          style={{
            background: "linear-gradient(160deg, #0F0F23 0%, #1A1742 40%, #2A2460 100%)",
          }}
        >
          <div className="flex items-center gap-5">
            <HealthRing rings={ringData} score={totalPct} size={145} />

            <div className="flex-1">
              <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)" }}>
                UTILIZAÇÃO ANUAL
              </p>
              <div className="flex items-end gap-1.5 mt-1 mb-4">
                <motion.span
                  style={{ fontSize: "32px", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {totalUsed}
                </motion.span>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.3)", marginBottom: "3px" }}>
                  /{totalMax}
                </span>
              </div>

              {ringData.map((r) => (
                <div key={r.label} className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart insight */}
          <div
            className="mt-5 px-4 py-3 rounded-[14px] flex items-center gap-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
              <path d="M9 18h6" />
              <path d="M10 22h4" />
            </svg>
            <p style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
              Ritmo saudável. Nos últimos 3 meses você usou <span style={{ color: "#FFB347", fontWeight: 700 }}>22%</span> a mais que a média.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Category title */}
      <motion.div
        className="px-7 pt-4 pb-2"
        initial="hidden" animate="visible" variants={fadeUp} custom={2}
      >
        <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#8F8FA3" }}>
          POR CATEGORIA
        </p>
      </motion.div>

      {/* Category List */}
      <div className="px-5 pb-4" role="list" aria-label="Categorias de cobertura">
        {categories.map((cat, i) => {
          const isExpanded = expanded === cat.id;
          const remaining = cat.total - cat.used;

          return (
            <motion.div
              key={cat.id}
              initial="hidden" animate="visible" variants={fadeUp} custom={3 + i * 0.5}
              className="mb-2"
              role="listitem"
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : cat.id)}
                className="w-full text-left rounded-[18px] outline-none transition-all overflow-hidden"
                style={{
                  background: "#fff",
                  boxShadow: isExpanded
                    ? `0 0 0 1.5px ${cat.color}20, 0 4px 16px rgba(15,15,35,0.05)`
                    : "0 1px 4px rgba(15,15,35,0.03), 0 3px 12px rgba(15,15,35,0.03)",
                }}
                aria-expanded={isExpanded}
                aria-label={`${cat.name}: ${cat.used} de ${cat.total} ${cat.unit} utilizados`}
              >
                <div className="p-4 flex items-center gap-3">
                  {/* Mini ring */}
                  <MiniRing value={cat.used} max={cat.total} color={cat.color} size={42} />

                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F0F23", letterSpacing: "-0.01em" }}>
                      {cat.name}
                    </p>
                    <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>
                      {remaining} {cat.unit} restantes
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span style={{ fontSize: "14px", fontWeight: 800, color: cat.color }}>
                      {cat.used}
                    </span>
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform"
                      style={{ transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-4 pb-4"
                  >
                    <div className="pt-3 space-y-2.5" style={{ borderTop: "1px solid #F3F3F8" }}>
                      <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>
                        {cat.description}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Usados", val: `${cat.used}`, color: cat.color },
                          { label: "Restantes", val: `${remaining}`, color: "#00C48C" },
                          { label: "Limite", val: `${cat.total}`, color: "#0F0F23" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="flex flex-col items-center py-2.5 rounded-[12px]"
                            style={{ background: "#F8F8FC" }}
                          >
                            <span style={{ fontSize: "16px", fontWeight: 800, color: stat.color, letterSpacing: "-0.02em" }}>
                              {stat.val}
                            </span>
                            <span style={{ fontSize: "9px", fontWeight: 500, color: "#8F8FA3", marginTop: "1px" }}>
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Plan benefits */}
      <motion.section
        className="px-5 pb-5"
        initial="hidden" animate="visible" variants={fadeUp} custom={7}
        aria-label="Benefícios exclusivos"
      >
        <div className="px-2 mb-3">
          <p style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.14em", color: "#8F8FA3" }}>
            BENEFÍCIOS PREMIUM
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: "🏋️", label: "Academias", sub: "Smart Fit, Bio Ritmo" },
            { icon: "🧘", label: "Bem-estar", sub: "Yoga, meditação" },
            { icon: "🥗", label: "Nutrição", sub: "Consulta online" },
            { icon: "💊", label: "Farmácia", sub: "Até 30% desconto" },
          ].map((b) => (
            <button
              key={b.label}
              className="flex items-center gap-3 p-3.5 rounded-[16px] outline-none text-left transition-transform active:scale-[0.97]"
              style={{ background: "#fff", boxShadow: "0 1px 4px rgba(15,15,35,0.03)" }}
              aria-label={`${b.label}: ${b.sub}`}
              onClick={() => navigate("/beneficios")}
            >
              <span style={{ fontSize: "22px" }}>{b.icon}</span>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#0F0F23" }}>{b.label}</p>
                <p style={{ fontSize: "10px", fontWeight: 400, color: "#8F8FA3" }}>{b.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </motion.section>
    </>
  );
}