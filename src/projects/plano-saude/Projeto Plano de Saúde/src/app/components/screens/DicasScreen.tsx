import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const tips = [
  {
    id: "1", title: "Meditação para iniciantes", sub: "5 min por dia transformam sua semana",
    category: "Bem-estar", readTime: "3 min", color: "#6C5CE7",
    image: "https://images.unsplash.com/photo-1759585187514-e28f1c4f7e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMG5hdHVyZSUyMGdyZWVufGVufDF8fHx8MTc3MTk0MDM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
  },
  {
    id: "2", title: "Hidratação: quanto beber?", sub: "O guia definitivo para cada biotipo",
    category: "Nutrição", readTime: "4 min", color: "#4DA6FF",
    image: "",
  },
  {
    id: "3", title: "Sono reparador em 7 passos", sub: "Técnicas aprovadas por especialistas",
    category: "Sono", readTime: "5 min", color: "#00C48C",
    image: "",
  },
  {
    id: "4", title: "Exercícios no escritório", sub: "Alongamentos para quem trabalha sentado",
    category: "Movimento", readTime: "2 min", color: "#FFB347",
    image: "",
  },
  {
    id: "5", title: "Alimentos que fortalecem a imunidade", sub: "O que incluir no dia a dia",
    category: "Nutrição", readTime: "3 min", color: "#FF6B6B",
    image: "",
  },
];

export function DicasScreen() {
  const featured = tips.find((t) => t.featured);
  const rest = tips.filter((t) => !t.featured);

  return (
    <>
      <SubHeader title="Dicas de Saúde" subtitle="Conteúdo curado para você" />

      {/* Featured */}
      {featured && (
        <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
          <button
            className="w-full text-left rounded-2xl overflow-hidden relative outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#0F0F23", height: "180px" }}
            aria-label={`${featured.title}: ${featured.sub}`}
          >
            <ImageWithFallback src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(15,15,35,0.9) 0%, rgba(15,15,35,0.2) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <span className="inline-block px-2 py-0.5 rounded-md mb-2" style={{ background: `${featured.color}20`, fontSize: "9px", fontWeight: 700, color: featured.color }}>
                {featured.category}
              </span>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {featured.title}
              </p>
              <p style={{ fontSize: "12px", fontWeight: 400, color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                {featured.readTime} de leitura
              </p>
            </div>
          </button>
        </motion.div>
      )}

      {/* List */}
      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          MAIS DICAS
        </p>
        {rest.map((tip, i) => (
          <motion.button
            key={tip.id}
            variants={fade(1 + i)}
            initial="hidden"
            animate="visible"
            className="w-full text-left flex items-center gap-3 p-3.5 rounded-2xl mb-2 outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            aria-label={`${tip.title}: ${tip.sub}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${tip.color}10` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tip.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" /><path d="M10 22h4" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F0F23" }}>{tip.title}</p>
              <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3", marginTop: "1px" }}>{tip.sub}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="px-1.5 py-0.5 rounded" style={{ background: `${tip.color}10`, fontSize: "8px", fontWeight: 700, color: tip.color }}>{tip.category}</span>
                <span style={{ fontSize: "9px", fontWeight: 400, color: "#B0B0C4" }}>{tip.readTime}</span>
              </div>
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
