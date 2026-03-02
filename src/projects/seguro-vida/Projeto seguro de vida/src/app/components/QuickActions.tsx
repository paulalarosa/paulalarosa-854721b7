import { motion } from "motion/react";
import { MapPin, Wrench, FileCheck, Headphones, MessageCircle, QrCode } from "lucide-react";
import { hapticTick } from "./haptics";

export type QuickActionId = "guincho" | "oficinas" | "docs" | "suporte" | "whatsapp" | "carteira";

const actions: { id: QuickActionId; icon: typeof MapPin; label: string; color: string; desc: string }[] = [
  { id: "guincho", icon: MapPin, label: "Guincho", color: "#0D9488", desc: "24h" },
  { id: "oficinas", icon: Wrench, label: "Oficinas", color: "#6366F1", desc: "340+" },
  { id: "docs", icon: FileCheck, label: "Docs", color: "#0F172A", desc: "PDF" },
  { id: "suporte", icon: Headphones, label: "Suporte", color: "#D97706", desc: "Chat" },
  { id: "whatsapp", icon: MessageCircle, label: "WhatsApp", color: "#22C55E", desc: "Direto" },
  { id: "carteira", icon: QrCode, label: "Carteira", color: "#0F172A", desc: "Digital" },
];

interface QuickActionsProps {
  onAction?: (id: QuickActionId) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] text-[#0F172A] tracking-tight">Acesso rapido</h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {actions.map((action, i) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileTap={{ scale: 0.9 }}
            onTapStart={() => hapticTick()}
            onClick={() => onAction?.(action.id)}
            className="flex flex-col items-center gap-1.5 min-w-[64px] py-3 px-2 rounded-2xl bg-white border border-gray-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label={action.label}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${action.color}06` }}
            >
              <action.icon size={17} style={{ color: action.color }} strokeWidth={1.6} />
            </div>
            <span className="text-[10px] text-[#0F172A] tracking-wide">{action.label}</span>
            <span className="text-[8px] text-gray-300 -mt-0.5">{action.desc}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
