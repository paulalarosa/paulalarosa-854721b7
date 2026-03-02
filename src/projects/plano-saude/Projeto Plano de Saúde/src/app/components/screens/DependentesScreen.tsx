import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const dependents = [
  { id: "1", name: "Lucas Silva", relation: "Filho", age: "8 anos", plan: "Premium Kids", color: "#4DA6FF", initial: "LS" },
  { id: "2", name: "Pedro Silva", relation: "Filho", age: "5 anos", plan: "Premium Kids", color: "#00C48C", initial: "PS" },
];

export function DependentesScreen() {
  return (
    <>
      <SubHeader
        title="Dependentes"
        subtitle={`${dependents.length} ativos`}
        action={
          <button className="w-9 h-9 rounded-xl flex items-center justify-center outline-none transition-transform active:scale-90" style={{ background: "#0F0F23" }} aria-label="Adicionar dependente">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
          </button>
        }
      />
      <div className="px-5 pb-6">
        {dependents.map((d, i) => (
          <motion.button key={d.id} variants={fade(i)} initial="hidden" animate="visible"
            className="w-full text-left rounded-2xl p-4 mb-2.5 outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }} aria-label={`${d.name}, ${d.relation}, ${d.age}`}>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${d.color}12` }}>
                <span style={{ fontSize: "14px", fontWeight: 800, color: d.color }}>{d.initial}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F0F23" }}>{d.name}</p>
                <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3" }}>{d.relation} · {d.age}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 rounded" style={{ background: `${d.color}10`, fontSize: "9px", fontWeight: 700, color: d.color }}>{d.plan}</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          </motion.button>
        ))}
      </div>
    </>
  );
}
