import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car,
  Heart,
  ShieldCheck,
  Wrench,
  Ambulance,
  Scale,
  X,
} from "lucide-react";
import { hapticLight } from "./haptics";

interface CoverageNode {
  id: string;
  icon: typeof Car;
  label: string;
  detail: string;
  color: string;
  angle: number;
  size: "lg" | "md" | "sm";
}

const coverages: CoverageNode[] = [
  { id: "collision", icon: Car, label: "Colisao", detail: "Cobertura total contra colisao com franquia de R$ 3.200", color: "#0D9488", angle: 0, size: "lg" },
  { id: "theft", icon: ShieldCheck, label: "Roubo", detail: "Protecao contra roubo e furto com rastreamento 24h", color: "#0D9488", angle: 60, size: "md" },
  { id: "repair", icon: Wrench, label: "Oficina", detail: "Rede credenciada com 340+ oficinas em todo Brasil", color: "#6366F1", angle: 120, size: "md" },
  { id: "health", icon: Heart, label: "Vida", detail: "Cobertura de R$ 500.000 com assistencia completa", color: "#6366F1", angle: 180, size: "lg" },
  { id: "rescue", icon: Ambulance, label: "Guincho", detail: "Guincho ilimitado 24h em todo territorio nacional", color: "#D97706", angle: 240, size: "sm" },
  { id: "legal", icon: Scale, label: "Juridico", detail: "Assistencia juridica em sinistros com advogado incluso", color: "#0F172A", angle: 300, size: "sm" },
];

export function CoverageOrbit() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedCoverage = coverages.find((c) => c.id === selected);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] text-[#0F172A] tracking-tight">Suas coberturas</h2>
        <span className="text-[10px] text-gray-300 tracking-wide">{coverages.length} ativas</span>
      </div>

      <div
        className="relative rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-100/60 overflow-hidden"
        style={{ height: 240, aspectRatio: "auto" }}
      >
        {/* Orbit ring */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 260 220">
          <circle
            cx={130}
            cy={110}
            r={90}
            fill="none"
            stroke="rgba(0,0,0,0.03)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <circle
            cx={130}
            cy={110}
            r={45}
            fill="none"
            stroke="rgba(0,0,0,0.02)"
            strokeWidth={1}
            strokeDasharray="2 4"
          />
        </svg>

        {/* Center shield */}
        <motion.div
          animate={{
            scale: selected ? [1, 0.9] : [1, 1.04, 1],
            opacity: selected ? 0.3 : 1,
          }}
          transition={
            selected
              ? { duration: 0.2 }
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute"
          style={{
            left: "calc(50% - 18px)",
            top: "calc(50% - 18px - 10px)",
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-[#0F172A]/[0.04] flex items-center justify-center">
            <ShieldCheck size={16} className="text-[#0F172A]/30" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Orbiting nodes */}
        {coverages.map((node, i) => {
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const baseRadius = 90;
          const r = node.size === "lg" ? baseRadius : node.size === "md" ? baseRadius * 0.85 : baseRadius * 0.65;
          const nodeSize = node.size === "lg" ? 40 : node.size === "md" ? 34 : 28;
          const iconSize = node.size === "lg" ? 16 : node.size === "md" ? 14 : 11;
          const isSelected = selected === node.id;

          // Use percentage-based positioning
          const xPercent = 50 + (Math.cos(rad) * r / 130) * 50;
          const yPercent = 50 + (Math.sin(rad) * r / 110) * 50 - 4.5;

          return (
            <motion.button
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: selected && !isSelected ? 0.3 : 1,
                scale: isSelected ? 1.15 : 1,
              }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { type: "spring", stiffness: 400, damping: 25 },
              }}
              onClick={() => {
                hapticLight();
                setSelected(isSelected ? null : node.id);
              }}
              className="absolute focus-visible:outline-2 focus-visible:outline-[#0D9488] rounded-full"
              style={{
                width: nodeSize,
                height: nodeSize,
                left: `calc(${xPercent}% - ${nodeSize / 2}px)`,
                top: `calc(${yPercent}% - ${nodeSize / 2}px)`,
              }}
              aria-label={`Cobertura ${node.label}`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
                whileTap={{ scale: 0.85 }}
                className="w-full h-full rounded-full flex items-center justify-center border shadow-sm"
                style={{
                  backgroundColor: isSelected ? node.color : `${node.color}08`,
                  borderColor: isSelected ? node.color : `${node.color}15`,
                }}
              >
                <node.icon
                  size={iconSize}
                  style={{ color: isSelected ? "white" : node.color }}
                  strokeWidth={1.8}
                />
              </motion.div>
            </motion.button>
          );
        })}

        {/* Floating labels */}
        {coverages.map((node) => {
          const rad = ((node.angle - 90) * Math.PI) / 180;
          const baseRadius = 90;
          const r = node.size === "lg" ? baseRadius : node.size === "md" ? baseRadius * 0.85 : baseRadius * 0.65;
          const nodeSize = node.size === "lg" ? 40 : node.size === "md" ? 34 : 28;

          if (selected && selected !== node.id) return null;

          const xPercent = 50 + (Math.cos(rad) * r / 130) * 50;
          const yPercent = 50 + (Math.sin(rad) * r / 110) * 50 - 4.5;

          return (
            <motion.span
              key={`label-${node.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: selected === node.id ? 1 : 0.6 }}
              className="absolute text-[8px] text-gray-400 tracking-wide pointer-events-none whitespace-nowrap"
              style={{
                left: `calc(${xPercent}% - 20px)`,
                top: `calc(${yPercent}% + ${nodeSize / 2 + 4}px)`,
                textAlign: "center",
                width: 40,
              }}
            >
              {node.label}
            </motion.span>
          );
        })}

        {/* Detail panel */}
        <AnimatePresence>
          {selectedCoverage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 left-0 right-0 p-3.5 bg-white/95 backdrop-blur-sm border-t border-gray-100/60"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedCoverage.color}10` }}
                  >
                    <selectedCoverage.icon
                      size={13}
                      style={{ color: selectedCoverage.color }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#0F172A] tracking-tight">{selectedCoverage.label}</p>
                    <p className="text-[10px] text-gray-400 leading-relaxed max-w-[200px]">
                      {selectedCoverage.detail}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => { hapticLight(); setSelected(null); }}
                  className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center"
                  aria-label="Fechar detalhe"
                >
                  <X size={11} className="text-gray-400" strokeWidth={2} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
