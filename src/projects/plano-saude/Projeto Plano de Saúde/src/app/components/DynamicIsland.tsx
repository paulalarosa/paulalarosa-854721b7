import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface IslandContent {
  type: "appointment" | "tip" | "alert";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
}

const contents: IslandContent[] = [
  {
    type: "appointment",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Consulta em 23h",
    subtitle: "Dr. Roberto · Cardio",
    accentColor: "#6C5CE7",
  },
  {
    type: "tip",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    title: "2 exames prontos",
    subtitle: "Toque para ver resultados",
    accentColor: "#00C48C",
  },
];

export function DynamicIsland() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const content = contents[currentIndex];
  const navigate = useNavigate();

  useEffect(() => {
    if (isExpanded) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isExpanded]);

  return (
    <div className="flex justify-center px-7">
      <motion.button
        onClick={() => {
          if (isExpanded) {
            navigate(content.type === "appointment" ? "/agenda" : "/exames");
          } else {
            setIsExpanded(true);
          }
        }}
        className="relative overflow-hidden outline-none"
        style={{
          background: "#0F0F23",
          borderRadius: isExpanded ? "20px" : "16px",
          WebkitTapHighlightColor: "transparent",
        }}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        aria-label={`${content.title}: ${content.subtitle}`}
        aria-expanded={isExpanded}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isExpanded}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`flex items-center gap-3 ${isExpanded ? "px-5 py-4" : "px-4 py-2.5"}`}
          >
            {/* Pulsing dot */}
            <div className="relative flex-shrink-0" style={{ color: content.accentColor }}>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: content.accentColor }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div
                className="relative w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: `${content.accentColor}25` }}
              >
                {content.icon}
              </div>
            </div>

            <div className="text-left flex-1 min-w-0">
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                {content.title}
              </p>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{
                    fontSize: "11px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "1px",
                  }}
                >
                  {content.subtitle}
                </motion.p>
              )}
            </div>

            {/* Indicator dots */}
            <div className="flex gap-1 flex-shrink-0">
              {contents.map((_, idx) => (
                <div
                  key={idx}
                  className="w-1 h-1 rounded-full transition-colors"
                  style={{
                    background: idx === currentIndex ? "#FFFFFF" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}