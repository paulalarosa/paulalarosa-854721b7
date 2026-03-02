import { motion } from "motion/react";
import { ShieldAlert, ChevronRight, Phone } from "lucide-react";
import { hapticHeavy } from "./haptics";

interface EmergencyPulseProps {
  onActivate: () => void;
}

export function EmergencyPulse({ onActivate }: EmergencyPulseProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onTapStart={() => hapticHeavy()}
      onClick={onActivate}
      className="w-full relative overflow-hidden rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DC2626]"
      aria-label="Abrir sinistro de emergencia"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DC2626] via-[#B91C1C] to-[#991B1B]" />

      {/* Animated pulse rings */}
      <motion.div
        animate={{
          scale: [1, 2.5],
          opacity: [0.15, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        className="absolute top-1/2 left-8 -translate-y-1/2 w-12 h-12 rounded-full bg-white"
      />
      <motion.div
        animate={{
          scale: [1, 2.5],
          opacity: [0.1, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
        className="absolute top-1/2 left-8 -translate-y-1/2 w-12 h-12 rounded-full bg-white"
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      {/* Content */}
      <div className="relative z-10 flex items-center p-5">
        <div className="flex items-center gap-4 flex-1">
          {/* Pulsing icon container */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 rounded-[16px] bg-white/[0.15] flex items-center justify-center border border-white/[0.1] backdrop-blur-sm"
            >
              <ShieldAlert size={22} className="text-white" strokeWidth={1.8} />
            </motion.div>
            {/* Live indicator */}
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-white border-2 border-[#DC2626]"
            />
          </div>

          <div>
            <p className="text-[16px] text-white tracking-tight">Emergencia</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Phone size={10} className="text-white/50" strokeWidth={2} />
              <p className="text-[11px] text-white/50">Sinistro rapido · 24h</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-white/30 tracking-wide uppercase">Sos</span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronRight size={16} className="text-white/40" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}