import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  ChevronRight,
  Zap,
  Eye,
  Heart,
  X,
} from "lucide-react";
import { hapticLight, hapticMedium, hapticSuccess } from "./haptics";

const STORAGE_KEY = "shield-onboarding-seen";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: typeof Shield;
  iconColor: string;
  iconBg: string;
  visual: "gauge" | "breath" | "status" | "done";
}

const steps: OnboardingStep[] = [
  {
    id: "intro",
    title: "Seu Shield Score",
    description:
      "Este numero representa o quanto voce esta protegido. Ele calcula suas apolices, pagamentos e coberturas em uma unica metrica visual.",
    icon: Shield,
    iconColor: "#0D9488",
    iconBg: "rgba(13, 148, 136, 0.08)",
    visual: "gauge",
  },
  {
    id: "breath",
    title: "Respira com voce",
    description:
      "O Shield Score pulsa suavemente — rapido quando precisa de atencao, calmo quando tudo esta ok. E uma forma organica de sentir sua protecao.",
    icon: Eye,
    iconColor: "#6366F1",
    iconBg: "rgba(99, 102, 241, 0.08)",
    visual: "breath",
  },
  {
    id: "status",
    title: "Status em tempo real",
    description:
      "Verde significa excelente, amarelo pede atencao, vermelho e urgente. As cores do app inteiro reagem ao seu nivel de protecao.",
    icon: Zap,
    iconColor: "#D97706",
    iconBg: "rgba(217, 119, 6, 0.08)",
    visual: "status",
  },
  {
    id: "done",
    title: "Voce esta protegido",
    description:
      "Toque no Shield Score a qualquer momento para ver suas apolices. Deslize os cards de insight para dicas personalizadas.",
    icon: Heart,
    iconColor: "#0D9488",
    iconBg: "rgba(13, 148, 136, 0.08)",
    visual: "done",
  },
];

interface ShieldOnboardingProps {
  onComplete: () => void;
}

export function ShieldOnboarding({ onComplete }: ShieldOnboardingProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const isLast = step === steps.length - 1;
  const progress = ((step + 1) / steps.length) * 100;

  const handleNext = useCallback(() => {
    hapticMedium();
    if (isLast) {
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch (err) {
        // Silently fail if localStorage is not available
      }
      hapticSuccess();
      onComplete();
    } else {
      setStep((s) => s + 1);
    }
  }, [isLast, onComplete]);

  const handleSkip = useCallback(() => {
    hapticLight();
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch (err) {
      // Silently fail if localStorage is not available
    }
    onComplete();
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Tutorial do Shield Score"
    >
      {/* Backdrop with dynamic blur */}
      <motion.div
        className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* Skip button */}
      <div className="relative z-10 flex justify-end pt-12 sm:pt-14 pr-5 sm:pr-6">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSkip}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Pular tutorial"
        >
          <span className="text-[11px] text-white/60 tracking-wide">Pular</span>
          <X size={12} className="text-white/40" />
        </motion.button>
      </div>

      {/* Visual area */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            {current.visual === "gauge" && <GaugeVisual />}
            {current.visual === "breath" && <BreathVisual />}
            {current.visual === "status" && <StatusVisual />}
            {current.visual === "done" && <DoneVisual />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom content card */}
      <div className="relative z-10 px-5 sm:px-6 pb-8 sm:pb-10">
        {/* Progress bar */}
        <div className="h-[2px] w-full bg-white/10 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-white/60 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: current.iconBg }}
              >
                <current.icon
                  size={15}
                  style={{ color: current.iconColor }}
                  strokeWidth={1.8}
                />
              </div>
              <span className="text-[9px] text-white/30 uppercase tracking-[0.15em]">
                {step + 1}/{steps.length}
              </span>
            </div>

            <h2 className="text-[20px] text-white tracking-tight mb-2">
              {current.title}
            </h2>
            <p className="text-[13px] text-white/50 leading-relaxed mb-8">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onClick={handleNext}
          className="w-full h-[52px] rounded-2xl bg-white flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="text-[14px] text-[#0F172A] tracking-tight">
            {isLast ? "Comecar" : "Proximo"}
          </span>
          {!isLast && (
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight size={16} className="text-[#0F172A]" />
            </motion.div>
          )}
        </motion.button>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === step ? 16 : 4,
                backgroundColor:
                  i === step ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="h-[4px] rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Visual sub-components ─────────────────────────────

function GaugeVisual() {
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75;
  const startAngle = 135;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#0D9488"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${circumference}`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: arcLength * 0.13 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
          style={{
            filter: "drop-shadow(0 0 8px rgba(13, 148, 136, 0.4))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Shield size={18} className="text-[#0D9488] mb-1" strokeWidth={1.5} />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[32px] text-white tabular-nums tracking-tighter"
          style={{ lineHeight: 1 }}
        >
          87
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="text-[9px] text-white tracking-[0.12em] uppercase mt-1"
        >
          Otima
        </motion.span>
      </div>
    </div>
  );
}

function BreathVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      {/* Outer ring 1 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.06, 0.15, 0.06],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[150px] h-[150px] rounded-full border border-[#0D9488]"
      />
      {/* Outer ring 2 */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.1, 0.04],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute w-[130px] h-[130px] rounded-full border border-[#6366F1]"
      />
      {/* Core glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80px] h-[80px] rounded-full bg-[#0D9488] blur-[30px]"
      />
      {/* Center icon */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10"
      >
        <Shield size={22} className="text-[#0D9488]" strokeWidth={1.5} />
      </motion.div>
      {/* Label */}
      <motion.span
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-2 text-[9px] text-white/40 tracking-[0.15em] uppercase"
      >
        respirando
      </motion.span>
    </div>
  );
}

function StatusVisual() {
  const colors = [
    { label: "Excelente", color: "#0D9488", score: 92 },
    { label: "Atencao", color: "#D97706", score: 55 },
    { label: "Urgente", color: "#DC2626", score: 28 },
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % colors.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [colors.length]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-4">
        {colors.map((c, i) => (
          <motion.div
            key={c.label}
            animate={{
              scale: i === active ? 1.15 : 0.85,
              opacity: i === active ? 1 : 0.3,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{
                backgroundColor: `${c.color}15`,
                borderColor: `${c.color}30`,
                boxShadow:
                  i === active ? `0 0 24px ${c.color}30` : "none",
              }}
            >
              <span
                className="text-[18px] tabular-nums"
                style={{ color: c.color, lineHeight: 1 }}
              >
                {c.score}
              </span>
            </div>
            <span
              className="text-[9px] tracking-wider uppercase"
              style={{ color: i === active ? c.color : "rgba(255,255,255,0.3)" }}
            >
              {c.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DoneVisual() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
      {/* Celebration rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 2 + i * 0.5],
            opacity: [0.15, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
          className="absolute w-[60px] h-[60px] rounded-full border border-[#0D9488]"
        />
      ))}
      {/* Center check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: 0.3,
        }}
        className="relative w-16 h-16 rounded-2xl bg-[#0D9488] flex items-center justify-center shadow-[0_0_40px_rgba(13,148,136,0.3)]"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Shield size={28} className="text-white" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// Hook to check if onboarding should show
export function useShieldOnboarding() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        // Small delay so the app renders first
        const timer = setTimeout(() => setShouldShow(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available, don't show
    }
  }, []);

  const dismiss = useCallback(() => {
    setShouldShow(false);
  }, []);

  return { shouldShow, dismiss };
}