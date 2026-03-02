import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Car, Heart, ChevronUp, CreditCard, CheckCircle2 } from "lucide-react";
import { hapticLight, hapticMedium } from "./haptics";
import type { TabId } from "./BottomTabBar";

interface Policy {
  type: "auto" | "vida";
  title: string;
  subtitle: string;
  premium: string;
  nextDate: string;
  coverage: string;
  color: string;
}

const policies: Policy[] = [
  {
    type: "auto",
    title: "HB20 2024",
    subtitle: "Seguro Auto · Cobertura Total",
    premium: "R$ 389,90",
    nextDate: "05 Mar",
    coverage: "Colisao + Roubo + Terceiros",
    color: "#0D9488",
  },
  {
    type: "vida",
    title: "Premium",
    subtitle: "Seguro Vida · R$ 500k",
    premium: "R$ 157,50",
    nextDate: "12 Mar",
    coverage: "Morte + Invalidez + DG",
    color: "#6366F1",
  },
  {
    type: "auto",
    title: "Civic 2023",
    subtitle: "Seguro Auto · Cobertura Total",
    premium: "R$ 299,90",
    nextDate: "20 Mar",
    coverage: "Colisao + Roubo + Terceiros",
    color: "#0D9488",
  },
];

interface PolicyPeekProps {
  onNavigate: (tab: TabId) => void;
}

export function PolicyPeek({ onNavigate }: PolicyPeekProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] text-[#0F172A] tracking-tight">Apolices</h2>
        <button
          onClick={() => { hapticLight(); onNavigate("apolices"); }}
          className="text-[11px] text-[#0D9488] tracking-wide focus-visible:outline-2 focus-visible:outline-[#0D9488] rounded"
        >
          Ver todas
        </button>
      </div>

      <div className="space-y-2">
        {policies.map((policy, i) => {
          const Icon = policy.type === "auto" ? Car : Heart;
          const isExpanded = expanded === i;

          return (
            <motion.div
              key={i}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <motion.button
                className="w-full flex items-center justify-between p-3.5 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0D9488]"
                onClick={() => {
                  hapticMedium();
                  setExpanded(isExpanded ? null : i);
                }}
                whileTap={{ scale: 0.99 }}
                aria-expanded={isExpanded}
                aria-label={`${policy.title} - ${policy.subtitle}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-[14px] flex items-center justify-center relative"
                    style={{ backgroundColor: `${policy.color}06` }}
                  >
                    <Icon size={17} style={{ color: policy.color }} strokeWidth={1.6} />
                    {/* Active dot */}
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div>
                    <p className="text-[13px] text-[#0F172A] tracking-tight">{policy.title}</p>
                    <p className="text-[10px] text-gray-400">{policy.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-[13px] text-[#0F172A] tracking-tight">{policy.premium}</p>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronUp size={14} className="text-gray-200" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 pb-3.5 pt-0">
                      <div className="p-3 rounded-[12px] bg-gray-50/70 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="text-emerald-500" strokeWidth={2} />
                            <span className="text-[10px] text-gray-500">{policy.coverage}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <CreditCard size={11} className="text-gray-300" strokeWidth={1.8} />
                            <span className="text-[10px] text-gray-400">Proximo: {policy.nextDate}</span>
                          </div>
                          <span className="text-[11px] text-[#0F172A] tracking-tight">{policy.premium}/mes</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            hapticLight();
                            onNavigate("apolices");
                          }}
                          className="w-full py-2 rounded-[10px] bg-white border border-gray-100 text-[11px] text-[#0F172A] tracking-wide active:scale-[0.98] transition-all"
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}