import { useNavigate } from "react-router";
import {
  CalendarDays,
  Search,
  Hash,
  Headphones,
  Hourglass,
  FileText,
  DollarSign,
  Activity,
  ChevronRight,
  Bell,
  Copy,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";

interface QuickTile {
  icon: React.ElementType;
  label: string;
  path: string;
  accentColor: string;
  accentBg: string;
}

const myPlanTiles: QuickTile[] = [
  { icon: Search, label: "Rede\nCredenciada", path: "/search", accentColor: "#2D9F93", accentBg: "rgba(45,159,147,0.07)" },
  { icon: Hourglass, label: "Carências", path: "/waiting-periods", accentColor: "#2D9F93", accentBg: "rgba(45,159,147,0.07)" },
  { icon: Headphones, label: "Suporte", path: "/support", accentColor: "#2D9F93", accentBg: "rgba(45,159,147,0.07)" },
];

const servicesTiles: QuickTile[] = [
  { icon: CalendarDays, label: "Consultas", path: "/appointments", accentColor: "#4A7FD9", accentBg: "rgba(74,127,217,0.07)" },
  { icon: Hash, label: "Guias", path: "/tokens", accentColor: "#4A7FD9", accentBg: "rgba(74,127,217,0.07)" },
  { icon: FileText, label: "Solicitações", path: "/requests", accentColor: "#4A7FD9", accentBg: "rgba(74,127,217,0.07)" },
];

const statementsTiles: QuickTile[] = [
  { icon: DollarSign, label: "Coparticipação", path: "/co-participation", accentColor: "#D4944A", accentBg: "rgba(212,148,74,0.07)" },
  { icon: Activity, label: "Utilização", path: "/usage", accentColor: "#D4944A", accentBg: "rgba(212,148,74,0.07)" },
];

function BentoTile({ icon: Icon, label, path, accentColor, accentBg, index }: QuickTile & { index: number }) {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.06 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(path)}
      className="bg-white rounded-[20px] p-4 flex flex-col items-start gap-4 text-left cursor-pointer group relative overflow-hidden transition-shadow duration-300"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)" }}
      aria-label={label.replace("\n", " ")}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${accentColor}08 0%, transparent 70%)` }}
      />
      <div
        className="w-10 h-10 rounded-[14px] flex items-center justify-center transition-colors duration-200 relative z-10"
        style={{ backgroundColor: accentBg }}
      >
        <Icon size={20} style={{ color: accentColor }} strokeWidth={1.7} />
      </div>
      <span className="text-[13px] text-[#3a3a4a] leading-[1.3] whitespace-pre-line tracking-[-0.01em] relative z-10">
        {label}
      </span>
    </motion.button>
  );
}

function HealthRing({ percentage }: { percentage: number }) {
  const radius = 52;
  const stroke = 7;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center"
    >
      <div className="relative w-[132px] h-[132px]">
        <svg width="132" height="132" viewBox="0 0 132 132" className="-rotate-90">
          <circle
            cx="66" cy="66" r={radius}
            fill="none" stroke="rgba(255,255,255,0.12)"
            strokeWidth={stroke} strokeLinecap="round"
          />
          <motion.circle
            cx="66" cy="66" r={radius}
            fill="none" stroke="url(#healthGradient)"
            strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <defs>
            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EEBD6" />
              <stop offset="100%" stopColor="#2D9F93" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-white text-[28px] tracking-[-0.03em] leading-none"
            style={{ fontWeight: 600 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {percentage}%
          </motion.span>
          <span className="text-white/50 text-[10px] tracking-wider uppercase mt-1">utilizado</span>
        </div>
      </div>
    </motion.div>
  );
}

function useGreeting() {
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Bom dia", emoji: "☀️" };
    if (hour < 18) return { text: "Boa tarde", emoji: "🌤" };
    return { text: "Boa noite", emoji: "🌙" };
  }, []);
}

export function HomeDashboard() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const greeting = useGreeting();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="pb-4">
      <div
        className="px-6 pt-14 pb-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #2A9B8F 0%, #35A99D 35%, #D4944A 75%, #D07048 100%)",
        }}
      >
        <div className="absolute top-[-40px] right-[-30px] w-[160px] h-[160px] rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-[-20px] left-[-20px] w-[100px] h-[100px] rounded-full bg-white/[0.04]" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-white/70 text-[13px] tracking-wide flex items-center gap-1.5">
              {greeting.text} <span className="text-[12px]">{greeting.emoji}</span>
            </p>
            <h1 className="text-white tracking-[-0.03em] mt-0.5">Paula Rosa</h1>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer"
            aria-label="Notificações"
          >
            <Bell size={18} className="text-white" strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex items-center justify-center mt-5 mb-2">
          <HealthRing percentage={32} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 rounded-[22px] p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.10) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.30)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          }}
          role="region"
          aria-label="Carteirinha Digital"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-white/80 text-[11px] tracking-widest uppercase">Ativo</span>
            </div>
            <span className="text-white/50 text-[10px] tracking-wider">KLINI</span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="text-white/50 text-[10px] tracking-wider uppercase mb-0.5">Nº Cartão</p>
              <div className="flex items-center gap-1.5">
                <p className="text-white text-[13px] tracking-wider">0144 0672 2300</p>
                <button
                  onClick={handleCopy}
                  aria-label="Copiar número do cartão"
                  className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
                >
                  <Copy size={11} />
                </button>
              </div>
              {copied && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-emerald-300 text-[9px]"
                >
                  Copiado
                </motion.span>
              )}
            </div>
            <div>
              <p className="text-white/50 text-[10px] tracking-wider uppercase mb-0.5">Plano</p>
              <p className="text-white text-[13px]">Klini Start PJ QC</p>
            </div>
            <div>
              <p className="text-white/50 text-[10px] tracking-wider uppercase mb-0.5">Tipo</p>
              <p className="text-white text-[13px]">Empresarial</p>
            </div>
            <div>
              <p className="text-white/50 text-[10px] tracking-wider uppercase mb-0.5">Rede</p>
              <p className="text-white text-[13px]">Cobertura Total</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/card")}
            className="mt-4 flex items-center gap-1 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
            aria-label="Ver carteirinha completa"
          >
            <span className="text-[11px] tracking-wide">Ver carteirinha completa</span>
            <ChevronRight size={12} />
          </button>
        </motion.div>
      </div>

      <div className="px-5 -mt-1">
        <section aria-label="Meu Plano" className="pt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[#1a1a2e] text-[15px] tracking-[-0.02em]">Meu Plano</h3>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {myPlanTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i} />
            ))}
          </div>
        </section>

        <section aria-label="Serviços Online" className="pt-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[#1a1a2e] text-[15px] tracking-[-0.02em]">Serviços Online</h3>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {servicesTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i + 3} />
            ))}
          </div>
        </section>

        <section aria-label="Extratos" className="pt-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[#1a1a2e] text-[15px] tracking-[-0.02em]">Extratos</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {statementsTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i + 6} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}