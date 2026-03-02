import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const benefits = [
  {
    id: "1", title: "Academias", desc: "Smart Fit, Bio Ritmo, e mais 200+ unidades", discount: "Incluso no plano",
    color: "#6C5CE7",
    image: "https://images.unsplash.com/photo-1658501819662-056f3c66dbd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbGlmZXN0eWxlJTIwbW9ybmluZyUyMHlvZ2ElMjB3b21hbnxlbnwxfHx8fDE3NzE5NDAzODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    partners: ["Smart Fit", "Bio Ritmo", "Bodytech", "Bluefit"],
  },
  {
    id: "2", title: "Bem-estar", desc: "Yoga, meditação guiada, pilates online", discount: "Incluso no plano",
    color: "#00C48C",
    image: "https://images.unsplash.com/photo-1759585187514-e28f1c4f7e62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwbWVkaXRhdGlvbiUyMG5hdHVyZSUyMGdyZWVufGVufDF8fHx8MTc3MTk0MDM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    partners: ["Zen App", "Yoga Flow", "Headspace"],
  },
  {
    id: "3", title: "Nutrição", desc: "Consultas online com nutricionistas", discount: "4 consultas/ano",
    color: "#FFB347",
    image: "",
    partners: ["Nutri Online", "Vida Saudável"],
  },
  {
    id: "4", title: "Farmácia", desc: "Descontos em medicamentos com receita", discount: "Até 30% off",
    color: "#FF6B6B",
    image: "https://images.unsplash.com/photo-1617881770125-6fb0d039ecde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lJTIwcGlsbHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzE5NDAzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    partners: ["Droga Raia", "Drogasil", "Pacheco"],
  },
];

export function BeneficiosScreen() {
  return (
    <>
      <SubHeader title="Benefícios" subtitle="Vantagens do plano Premium" />

      <div className="px-5 pb-6">
        {benefits.map((b, i) => (
          <motion.button
            key={b.id} variants={fade(i)} initial="hidden" animate="visible"
            className="w-full text-left rounded-2xl mb-3 overflow-hidden outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}
            aria-label={`${b.title}: ${b.desc}`}
          >
            {b.image && (
              <div className="relative h-28 overflow-hidden">
                <ImageWithFallback src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                <span className="absolute bottom-3 left-4 px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", fontSize: "10px", fontWeight: 700, color: "#fff" }}>
                  {b.discount}
                </span>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.01em" }}>{b.title}</p>
              </div>
              <p style={{ fontSize: "12px", fontWeight: 400, color: "#8F8FA3", marginBottom: "8px" }}>{b.desc}</p>
              {!b.image && (
                <span className="inline-block px-2 py-0.5 rounded-md mb-2" style={{ background: `${b.color}10`, fontSize: "10px", fontWeight: 700, color: b.color }}>{b.discount}</span>
              )}
              <div className="flex flex-wrap gap-1.5">
                {b.partners.map((p) => (
                  <span key={p} className="px-2 py-0.5 rounded-md" style={{ background: "#F0F0F5", fontSize: "10px", fontWeight: 500, color: "#8F8FA3" }}>{p}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
}
