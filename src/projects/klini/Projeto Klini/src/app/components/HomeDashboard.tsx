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
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";

interface QuickTile {
  icon: any;
  label: string;
  path: string;
  highlight?: boolean;
}

const myPlanTiles: QuickTile[] = [
  { icon: Video, label: "Telemed.", path: "/appointments", highlight: true },
  { icon: Search, label: "Rede Cred.", path: "/search" },
  { icon: Hourglass, label: "Carências", path: "/waiting-periods" },
  { icon: Headphones, label: "Suporte", path: "/support" },
];

const servicesTiles: QuickTile[] = [
  { icon: CalendarDays, label: "Consultas", path: "/appointments" },
  { icon: Hash, label: "Guias", path: "/tokens" },
  { icon: FileText, label: "Solicitação", path: "/requests" },
];

const statementsTiles: QuickTile[] = [
  { icon: DollarSign, label: "Coparticipação", path: "/co-participation" },
  { icon: Activity, label: "Utilização", path: "/usage" },
];

function BentoTile({ icon: Icon, label, path, highlight, index }: QuickTile & { index: number }) {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.04 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(path)}
      className="bg-white rounded-2xl p-2.5 xs:p-3 flex flex-col items-center gap-2 text-center cursor-pointer relative transition-shadow duration-300"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)" }}
      aria-label={label.replace("\n", " ")}
    >
      <div
        className="w-9 h-9 xs:w-10 xs:h-10 rounded-xl xs:rounded-[14px] flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: highlight ? "#2D9F93" : "rgba(45,159,147,0.07)",
        }}
      >
        <Icon size={18} style={{ color: highlight ? "white" : "#2D9F93" }} strokeWidth={1.7} />
      </div>
      <span
        className={`text-[10px] xs:text-[11px] leading-[1.25] whitespace-pre-line tracking-[-0.01em] ${highlight ? "text-[#2D9F93] font-medium" : "text-[#3a3a4a]"
          }`}
      >
        {label}
      </span>
    </motion.button>
  );
}

function useGreeting() {
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
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
        className="px-4 xs:px-5 pt-10 xs:pt-12 pb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1A7A70 0%, #2D9F93 45%, #3DBDB0 100%)",
        }}
      >
        <div className="absolute top-[-40px] right-[-30px] w-[140px] h-[140px] rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-[-20px] left-[-20px] w-[90px] h-[90px] rounded-full bg-white/[0.04]" />

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.35)",
              }}
            >
              <span className="text-white text-[12px] font-semibold tracking-wide">PR</span>
            </div>
            <div className="min-w-0">
              <p className="text-white/70 text-[11px] tracking-wide">Olá, Paula 👋</p>
              <h1 className="text-white text-[16px] xs:text-[18px] font-semibold tracking-[-0.03em] mt-0.5 leading-tight">
                {greeting}, como vai?
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer flex-shrink-0"
            aria-label="Notificações"
          >
            <Bell size={16} className="text-white" strokeWidth={1.8} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 rounded-2xl p-3.5 cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          onClick={() => navigate("/appointments")}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/50 text-[9px] uppercase tracking-[0.14em] font-medium">
              Próxima Consulta
            </p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span className="text-emerald-300 text-[9px] font-medium">Confirmada</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-11 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.18)" }}
            >
              <span className="text-white text-[8px] uppercase tracking-widest font-medium leading-none">Fev</span>
              <span className="text-white text-[18px] font-bold leading-tight">27</span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white text-[13px] font-semibold leading-tight truncate">
                Dr. Marcelo Furtado
              </p>
              <p className="text-white/65 text-[11px] mt-0.5 truncate">
                Psiquiatria · 09:20 · Barra da Tijuca
              </p>
            </div>

            <ChevronRight size={14} className="text-white/30 flex-shrink-0" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-2.5 rounded-2xl p-3.5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
          role="region"
          aria-label="Carteirinha Digital"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-[5px] h-[5px] rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-white/80 text-[9px] tracking-widest uppercase font-medium">Ativo</span>
            </div>
            <span className="text-white/40 text-[9px] tracking-wider font-semibold">KLINI</span>
          </div>

          <div className="mt-2.5">
            <p className="text-white/45 text-[9px] tracking-wider uppercase mb-0.5">Carteirinha Digital</p>
            <div className="flex items-center gap-2">
              <p className="text-white text-[14px] tracking-[0.12em] font-medium">0144 0672 2300</p>
              <button
                onClick={handleCopy}
                aria-label="Copiar número do cartão"
                className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
              >
                <Copy size={11} />
              </button>
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
          </div>

          <button
            onClick={() => navigate("/card")}
            className="mt-2.5 flex items-center gap-1 text-white/55 hover:text-white/80 transition-colors cursor-pointer"
            aria-label="Ver carteirinha completa"
          >
            <span className="text-[10px] tracking-wide">Ver carteirinha completa</span>
            <ChevronRight size={11} />
          </button>
        </motion.div>
      </div>

      <div className="px-3.5 xs:px-4 -mt-1">
        <section aria-label="Meu Plano" className="pt-5">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h3 className="text-[#1a1a2e] text-[14px] font-semibold tracking-[-0.02em]">Meu Plano</h3>
          </div>
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2">
            {myPlanTiles.map((tile, i) => (
              <BentoTile key={tile.path + tile.label} {...tile} index={i} />
            ))}
          </div>
        </section>

        <section aria-label="Serviços Online" className="pt-4">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h3 className="text-[#1a1a2e] text-[14px] font-semibold tracking-[-0.02em]">Serviços Online</h3>
          </div>
          <div className="grid grid-cols-3 gap-1.5 xs:gap-2">
            {servicesTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i + 4} />
            ))}
          </div>
        </section>

        <section aria-label="Extratos" className="pt-4">
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <h3 className="text-[#1a1a2e] text-[14px] font-semibold tracking-[-0.02em]">Extratos</h3>
          </div>
          <div className="grid grid-cols-2 gap-1.5 xs:gap-2">
            {statementsTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i + 7} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}