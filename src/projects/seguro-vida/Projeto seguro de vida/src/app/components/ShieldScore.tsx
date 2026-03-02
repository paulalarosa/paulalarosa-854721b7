import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Shield, Check, AlertTriangle } from "lucide-react";
import { hapticSuccess, hapticTick } from "./haptics";

interface ShieldScoreProps {
  score: number; // 0-100
  onTap?: () => void;
  /** If true, dims slightly so onboarding overlay can highlight */
  dimmed?: boolean;
}

export function ShieldScore({ score, onTap, dimmed }: ShieldScoreProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scoreReacted, setScoreReacted] = useState(false);
  const prevScore = useRef(score);
  const progress = useMotionValue(0);
  const displayScore = useTransform(progress, (v) => Math.round(v));
  const [displayVal, setDisplayVal] = useState(0);

  // Arc parameters
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees
  const startAngle = 135;

  const dashOffset = useTransform(progress, (v) => {
    const filled = (v / 100) * arcLength;
    return arcLength - filled;
  });

  useEffect(() => {
    const unsub = displayScore.on("change", (v) => setDisplayVal(v));
    return unsub;
  }, [displayScore]);

  // Initial entrance animation
  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        animate(progress, score, {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          onComplete: () => {
            if (score >= 80) hapticSuccess();
          },
        });
        setHasAnimated(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [score, hasAnimated, progress]);

  // React to score changes after initial animation
  useEffect(() => {
    if (hasAnimated && prevScore.current !== score) {
      setScoreReacted(true);
      hapticTick();
      animate(progress, score, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onComplete: () => {
          if (score >= 80) hapticSuccess();
          setTimeout(() => setScoreReacted(false), 600);
        },
      });
      prevScore.current = score;
    }
  }, [score, hasAnimated, progress]);

  const getScoreColor = () => {
    if (score >= 80) return "#0D9488";
    if (score >= 50) return "#D97706";
    return "#DC2626";
  };

  const getScoreGlow = () => {
    if (score >= 80) return "rgba(13, 148, 136, 0.15)";
    if (score >= 50) return "rgba(217, 119, 6, 0.15)";
    return "rgba(220, 38, 38, 0.15)";
  };

  const getScoreLabel = () => {
    if (score >= 90) return "Excelente";
    if (score >= 80) return "Otima";
    if (score >= 60) return "Boa";
    if (score >= 40) return "Regular";
    return "Baixa";
  };

  // Breathing speed based on score level — higher score = calmer breath
  const breathDuration = score >= 80 ? 4.5 : score >= 50 ? 3 : 2;
  const breathIntensity = score >= 80 ? 1.03 : score >= 50 ? 1.06 : 1.1;

  const color = getScoreColor();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: dimmed ? 0.3 : 1,
        scale: 1,
      }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center relative"
      onClick={onTap}
      role="meter"
      aria-label={`Nivel de protecao: ${score} porcento`}
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Ambient glow — breathes with score rhythm */}
      <motion.div
        animate={{
          scale: scoreReacted ? [1, 1.4, 1] : [1, breathIntensity, 1],
          opacity: scoreReacted ? [0.15, 0.4, 0.15] : [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: scoreReacted ? 0.6 : breathDuration,
          repeat: scoreReacted ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full blur-[60px] pointer-events-none"
        style={{ backgroundColor: getScoreGlow() }}
      />

      {/* Outer breathing ring 1 */}
      <motion.div
        animate={{
          scale: scoreReacted ? [1, 1.5, 1] : [1, breathIntensity + 0.04, 1],
          opacity: scoreReacted ? [0.08, 0.25, 0] : [0.04, 0.08, 0.04],
        }}
        transition={{
          duration: scoreReacted ? 0.8 : breathDuration + 1,
          repeat: scoreReacted ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border"
        style={{
          width: size + 30,
          height: size + 30,
          borderColor: color,
        }}
      />

      {/* Outer breathing ring 2 (staggered) */}
      <motion.div
        animate={{
          scale: scoreReacted ? [1, 1.8, 1] : [1, breathIntensity + 0.02, 1],
          opacity: scoreReacted ? [0.05, 0.15, 0] : [0.02, 0.05, 0.02],
        }}
        transition={{
          duration: scoreReacted ? 1 : breathDuration + 2,
          repeat: scoreReacted ? 0 : Infinity,
          ease: "easeInOut",
          delay: scoreReacted ? 0.15 : breathDuration * 0.3,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border"
        style={{
          width: size + 50,
          height: size + 50,
          borderColor: color,
        }}
      />

      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG gauge */}
        <motion.svg
          width={size}
          height={size}
          animate={{
            scale: scoreReacted ? [1, 1.04, 1] : 1,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 12px ${getScoreGlow()})` }}
        >
          {/* Background arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
          />
          {/* Progress arc — stroke width breathes */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            animate={{
              strokeWidth: scoreReacted
                ? [strokeWidth, strokeWidth + 4, strokeWidth]
                : [strokeWidth, strokeWidth + 1, strokeWidth],
            }}
            transition={{
              duration: scoreReacted ? 0.6 : breathDuration,
              repeat: scoreReacted ? 0 : Infinity,
              ease: "easeInOut",
            }}
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            style={{ strokeDashoffset: dashOffset }}
            transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
          />
          {/* Tick marks */}
          {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
            const angle = startAngle + tick * 270;
            const rad = (angle * Math.PI) / 180;
            const outerR = radius + strokeWidth / 2 + 4;
            const innerR = radius + strokeWidth / 2 + 1;
            return (
              <line
                key={i}
                x1={size / 2 + Math.cos(rad) * innerR}
                y1={size / 2 + Math.sin(rad) * innerR}
                x2={size / 2 + Math.cos(rad) * outerR}
                y2={size / 2 + Math.sin(rad) * outerR}
                stroke="rgba(0,0,0,0.08)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            );
          })}
        </motion.svg>

        {/* Center content with breathing icon */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            animate={{
              scale: scoreReacted
                ? [1, 1.3, 0.95, 1.05, 1]
                : [1, breathIntensity, 1],
              opacity: scoreReacted
                ? [0.6, 1, 0.8, 1, 0.6]
                : [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: scoreReacted ? 0.8 : breathDuration,
              repeat: scoreReacted ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="w-8 h-8 rounded-xl flex items-center justify-center mb-1"
            style={{ backgroundColor: `${color}10` }}
          >
            <Shield size={16} style={{ color }} strokeWidth={1.8} />
          </motion.div>

          {/* Score number with reactive scale */}
          <motion.span
            animate={{
              scale: scoreReacted ? [1, 1.15, 1] : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-[36px] tracking-tighter text-[#0F172A] tabular-nums"
            style={{ lineHeight: 1 }}
          >
            {displayVal}
          </motion.span>

          {/* Label with breathing opacity */}
          <motion.span
            animate={{
              opacity: scoreReacted ? [0.4, 1, 0.4] : [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: scoreReacted ? 0.6 : breathDuration,
              repeat: scoreReacted ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="text-[10px] text-gray-400 tracking-[0.12em] uppercase mt-1"
          >
            {getScoreLabel()}
          </motion.span>
        </div>
      </div>

      {/* Bottom status pills */}
      <div className="flex items-center gap-4 mt-2">
        {[
          { label: "3 apolices", ok: true },
          { label: "Em dia", ok: true },
          { label: "Renovar Jan", ok: false },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            animate={{
              opacity: scoreReacted ? [0.4, 1, 0.4] : 1,
            }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="flex items-center gap-1"
          >
            {item.ok ? (
              <Check size={10} className="text-[#0D9488]" strokeWidth={2.5} />
            ) : (
              <AlertTriangle size={10} className="text-amber-500" strokeWidth={2} />
            )}
            <span className="text-[9px] text-gray-400">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
