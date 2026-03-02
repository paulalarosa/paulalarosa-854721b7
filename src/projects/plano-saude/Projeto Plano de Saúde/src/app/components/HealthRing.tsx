import { motion } from "motion/react";

interface RingData {
  label: string;
  value: number;
  max: number;
  color: string;
}

interface HealthRingProps {
  rings: RingData[];
  score: number;
  size?: number;
}

export function HealthRing({ rings, score, size = 180 }: HealthRingProps) {
  const center = size / 2;
  const strokeWidth = 8;
  const gap = 14;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {rings.map((ring, i) => {
          const r = center - 16 - i * gap;
          const circ = 2 * Math.PI * r;
          const pct = Math.min(ring.value / ring.max, 1);
          const filled = circ * pct;

          return (
            <g key={ring.label}>
              {/* Track */}
              <circle
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke={`${ring.color}12`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Progress */}
              <motion.circle
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${filled} ${circ}`}
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `${filled} ${circ}` }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: "easeOut" }}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "center",
                }}
              />
              {/* End cap glow */}
              <motion.circle
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={strokeWidth + 6}
                strokeLinecap="round"
                strokeDasharray={`1 ${circ}`}
                opacity={0.2}
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `1 ${circ - 1}` }}
                transition={{ delay: 0.3 + i * 0.15, duration: 1, ease: "easeOut" }}
                style={{
                  transform: `rotate(${-90 + pct * 360}deg)`,
                  transformOrigin: "center",
                  filter: `blur(3px)`,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          style={{
            fontSize: "38px",
            fontWeight: 800,
            color: "#0F0F23",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          {score}
        </motion.span>
        <span
          style={{
            fontSize: "9px",
            fontWeight: 600,
            color: "#8F8FA3",
            letterSpacing: "0.12em",
            marginTop: "2px",
          }}
        >
          SCORE
        </span>
      </div>
    </div>
  );
}

/* Mini ring for individual items */
export function MiniRing({
  value,
  max,
  color,
  size = 40,
}: {
  value: number;
  max: number;
  color: string;
  size?: number;
}) {
  const center = size / 2;
  const r = center - 5;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const filled = circ * pct;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={`${color}15`}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          initial={{ strokeDasharray: `0 ${circ}` }}
          animate={{ strokeDasharray: `${filled} ${circ}` }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span style={{ fontSize: "10px", fontWeight: 700, color }}>
          {Math.round(pct * 100)}
        </span>
      </div>
    </div>
  );
}
