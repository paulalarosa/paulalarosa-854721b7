import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import {
  CloudRain,
  TrendingDown,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { hapticTick, hapticLight } from "./haptics";

interface Insight {
  id: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  tag: string;
  title: string;
  description: string;
  action?: string;
}

const insights: Insight[] = [
  {
    id: "weather",
    icon: CloudRain,
    gradient: "from-blue-500/8 to-cyan-500/4",
    iconColor: "#0EA5E9",
    tag: "Aviso de Sinistralidade",
    title: "Alerta de Alagamento - Zona Sul",
    description: "Sua Apólice Compreensiva (Auto) garante indenização integral por submersão em água doce. Acione o guincho via app 24h se necessário.",
    action: "Ver franquia",
  },
  {
    id: "savings",
    icon: TrendingDown,
    gradient: "from-emerald-500/8 to-teal-500/4",
    iconColor: "#0D9488",
    tag: "Classe de Bônus",
    title: "Bônus Classe 6 atingido",
    description: "Mais um ano sem sinistros! Seu Prêmio Líquido sofreu redução de 25% na renovação endossada do HB20.",
    action: "Visualizar endosso",
  },
  {
    id: "tip",
    icon: Sparkles,
    gradient: "from-violet-500/8 to-indigo-500/4",
    iconColor: "#6366F1",
    tag: "Agravamento de Risco",
    title: "Mudou de residência?",
    description: "Atualize o CEP de pernoite no Questionário de Perfil para evitar declínio de indenização em caso de sinistro (Art. 766, CC).",
    action: "Atualizar PERN",
  },
  {
    id: "protection",
    icon: ShieldCheck,
    gradient: "from-teal-500/8 to-emerald-500/4",
    iconColor: "#0D9488",
    tag: "Coberturas RCF-V",
    title: "Limites Maximos de Indenização (LMI)",
    description: "Sua cobertura de Responsabilidade Civil Facultativa Veicular está com LMI de R$ 300.000 para Danos Materiais e Corporais.",
  },
];

const SWIPE_THRESHOLD = 40;
const SWIPE_VELOCITY = 300;

export function ContextInsight() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % insights.length);
    }, 8000);
  }, []);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [resetAutoPlay]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      hapticTick();
      resetAutoPlay();
    },
    [currentIndex, resetAutoPlay]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % insights.length);
    hapticLight();
    resetAutoPlay();
  }, [resetAutoPlay]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length);
    hapticLight();
    resetAutoPlay();
  }, [resetAutoPlay]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      if (
        offset.x < -SWIPE_THRESHOLD ||
        velocity.x < -SWIPE_VELOCITY
      ) {
        goNext();
      } else if (
        offset.x > SWIPE_THRESHOLD ||
        velocity.x > SWIPE_VELOCITY
      ) {
        goPrev();
      }
    },
    [goNext, goPrev]
  );

  const current = insights[currentIndex];
  const Icon = current.icon;

  // Slide variants with direction-aware enter/exit
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="relative overflow-hidden">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5 mb-3 px-0.5">
        {insights.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="focus-visible:outline-2 focus-visible:outline-[#0D9488] rounded-full"
            aria-label={`Insight ${i + 1} de ${insights.length}`}
          >
            <motion.div
              className="h-[3px] rounded-full"
              animate={{
                width: i === currentIndex ? 20 : 6,
                backgroundColor:
                  i === currentIndex ? "#0F172A" : "rgba(0,0,0,0.08)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          </button>
        ))}
        {/* Swipe hint on first render */}
        <motion.span
          initial={{ opacity: 0.6, x: 0 }}
          animate={{ opacity: [0.6, 0, 0], x: [0, -8, -8] }}
          transition={{ duration: 2, delay: 3 }}
          className="ml-auto text-[8px] text-gray-300 tracking-wider pointer-events-none"
        >
          ← deslize
        </motion.span>
      </div>

      {/* Swipeable card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className={`rounded-2xl p-4 bg-gradient-to-br ${current.gradient} border border-white/60 backdrop-blur-sm cursor-grab active:cursor-grabbing touch-pan-y`}
          style={{ touchAction: "pan-y" }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentIndex + 1} de ${insights.length}: ${current.title}`}
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-10 h-10 rounded-[14px] bg-white/70 flex items-center justify-center flex-shrink-0 shadow-sm"
            >
              <Icon size={18} style={{ color: current.iconColor }} strokeWidth={1.6} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md bg-white/50"
                  style={{ color: current.iconColor }}
                >
                  {current.tag}
                </span>
              </div>
              <p className="text-[13px] text-[#0F172A] tracking-tight mb-0.5">
                {current.title}
              </p>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {current.description}
              </p>
              {current.action && (
                <button
                  className="flex items-center gap-1 mt-2.5 group"
                  onClick={() => hapticTick()}
                >
                  <span
                    className="text-[11px] tracking-wide"
                    style={{ color: current.iconColor }}
                  >
                    {current.action}
                  </span>
                  <ChevronRight
                    size={12}
                    style={{ color: current.iconColor }}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}