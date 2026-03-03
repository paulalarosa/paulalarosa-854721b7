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
  icon: React.ElementType;
  label: string;
  path: string;
  highlight?: boolean;
}

const myPlanTiles: QuickTile[] = [
  { icon: Video, label: "Telemedicina", path: "/appointments", highlight: true },
  { icon: Search, label: "Rede\nCredenciada", path: "/search" },
  { icon: Hourglass, label: "Carências", path: "/waiting-periods" },
  { icon: Headphones, label: "Suporte", path: "/support" },
];

const servicesTiles: QuickTile[] = [
  { icon: CalendarDays, label: "Consultas", path: "/appointments" },
  { icon: Hash, label: "Guias", path: "/tokens" },
  { icon: FileText, label: "Solicitações", path: "/requests" },
];

const statementsTiles: QuickTile[] = [
  { icon: DollarSign, label: "Coparticipação", path: "/co-participation" },
  { icon: Activity, label: "Utilização", path: "/usage" },
];

function BentoTile({ icon: Icon, label, path, highlight, index }: QuickTile & { index: number }) {
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
        className="w-10 h-10 rounded-[14px] flex items-center justify-center transition-colors duration-200"
        style={{
          backgroundColor: highlight ? "#2D9F93" : "rgba(45,159,147,0.07)",
        }}
      >
        <Icon size={20} style={{ color: highlight ? "white" : "#2D9F93" }} strokeWidth={1.7} />
      </div>
      <span
        className={`text-[13px] leading-[1.3] whitespace-pre-line tracking-[-0.01em] ${highlight ? "text-[#2D9F93] font-medium" : "text-[#3a3a4a]"
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
        className="px-6 pt-14 pb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1A7A70 0%, #2D9F93 45%, #3DBDB0 100%)",
        }}
      >
        <div className="absolute top-[-40px] right-[-30px] w-[160px] h-[160px] rounded-full bg-white/[0.06]" />
        <div className="absolute bottom-[-20px] left-[-20px] w-[100px] h-[100px] rounded-full bg-white/[0.04]" />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1.5px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span className="text-white text-[13px] font-semibold tracking-wide">PR</span>
            </div>
            <div>
              <p className="text-white/70 text-[12px] tracking-wide">Olá, Paula 👋</p>
              <h1 className="text-white text-[18px] font-semibold tracking-[-0.03em] mt-0.5 leading-tight">
                Como você está hoje?
              </h1>
            </div>
          </div>
          <button
            onClick={() => navigate("/notifications")}
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 cursor-pointer"
            aria-label="Notificações"
          >
            <Bell size={18} className="text-white" strokeWidth={1.8} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-5 rounded-[18px] p-4 flex items-center gap-4 cursor-pointer"
          style={{
            background: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          onClick={() => navigate("/appointments")}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-12 h-12 rounded-[14px] flex flex-col items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <span className="text-white text-[9px] uppercase tracking-widest font-medium leading-none">Fev</span>
            <span className="text-white text-[20px] font-bold leading-tight">27</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-[10px] uppercase tracking-widest font-medium mb-0.5">
              Próxima Consulta
            </p>
            <p className="text-white text-[14px] font-semibold leading-tight truncate">
              Dr. Marcelo Furtado
            </p>
            <p className="text-white/70 text-[12px] mt-0.5">Psiquiatria · 09:20 · Barra da Tijuca</p>
          </div>

          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span className="text-emerald-300 text-[10px] font-medium">Confirmada</span>
            </div>
            <ChevronRight size={14} className="text-white/40" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-3 rounded-[18px] p-4 relative overflow-hidden"
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
            <div className="flex items-center gap-2">
              <div className="w-[6px] h-[6px] rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-white/80 text-[11px] tracking-widest uppercase">Ativo</span>
            </div>
            <span className="text-white/50 text-[10px] tracking-wider">KLINI</span>
          </div>

          <div className="mt-3">
            <p className="text-white/50 text-[10px] tracking-wider uppercase mb-0.5">Carteirinha Digital</p>
            <div className="flex items-center gap-2">
              <p className="text-white text-[15px] tracking-widest font-medium">0144 0672 2300</p>
              <button
                onClick={handleCopy}
                aria-label="Copiar número do cartão"
                className="text-white/40 hover:text-white/70 transition-colors cursor-pointer"
              >
                <Copy size={12} />
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
            className="mt-3 flex items-center gap-1 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
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
          <div className="grid grid-cols-4 gap-2">
            {myPlanTiles.map((tile, i) => (
              <BentoTile key={tile.path + tile.label} {...tile} index={i} />
            ))}
          </div>
        </section>

        <section aria-label="Serviços Online" className="pt-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[#1a1a2e] text-[15px] tracking-[-0.02em]">Serviços Online</h3>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {servicesTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i + 4} />
            ))}
          </div>
        </section>

        <section aria-label="Extratos" className="pt-5">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[#1a1a2e] text-[15px] tracking-[-0.02em]">Extratos</h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {statementsTiles.map((tile, i) => (
              <BentoTile key={tile.path} {...tile} index={i + 7} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}