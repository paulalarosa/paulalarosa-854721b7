import { useNavigate } from "react-router";
import { motion } from "motion/react";

interface SubHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SubHeader({ title, subtitle, action }: SubHeaderProps) {
  const navigate = useNavigate();

  return (
    <motion.header
      className="flex items-center gap-3 px-5 pt-4 pb-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => navigate(-1)}
        className="w-9 h-9 rounded-xl flex items-center justify-center outline-none shrink-0 transition-transform active:scale-90"
        style={{ background: "rgba(0,0,0,0.03)" }}
        aria-label="Voltar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F0F23" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <div className="flex-1 min-w-0">
        <h1 style={{ fontSize: "18px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "11px", fontWeight: 400, color: "#8F8FA3", marginTop: "1px" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </motion.header>
  );
}
