import { Bell, TrendingUp, AlertTriangle, Users, FileText, ArrowUpRight } from "lucide-react";
import { akad } from "./akad-theme";
import { PhoneFrame } from "./PhoneFrame";
import { TabBar, TabId } from "./TabBar";
import { motion } from "motion/react";

const chartData = [32, 45, 28, 55, 42, 68, 52, 78, 62, 85, 72, 95];

function MiniBarChart() {
  const max = Math.max(...chartData);
  return (
    <div className="flex items-end gap-[2px] h-full w-full" role="img" aria-label="Vendas 12 meses">
      {chartData.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-[3px]"
          style={{
            background: i >= chartData.length - 3 ? akad.pink : "rgba(230, 0, 126, 0.12)",
          }}
          initial={{ height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.35, delay: i * 0.03, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function CommissionChart() {
  const points = [10, 35, 25, 60, 45, 80, 55, 90, 70, 95];
  const max = 100;
  const w = 200;
  const h = 55;

  const getPoint = (i: number) => ({
    x: (i / (points.length - 1)) * w,
    y: h - (points[i] / max) * h,
  });

  let path = `M ${getPoint(0).x} ${getPoint(0).y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = getPoint(i - 1);
    const curr = getPoint(i);
    const cpx = (prev.x + curr.x) / 2;
    path += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const lastPt = getPoint(points.length - 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: "55px" }} fill="none" role="img" aria-label="Comissões">
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={akad.blue} stopOpacity="0.2" />
          <stop offset="100%" stopColor={akad.pink} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="ca" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={akad.pink} stopOpacity="0.08" />
          <stop offset="100%" stopColor={akad.pink} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L ${w} ${h} L 0 ${h} Z`} fill="url(#ca)" />
      <path d={path} stroke="url(#cg)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={lastPt.x} cy={lastPt.y} r="3" fill={akad.pink} />
      <circle cx={lastPt.x} cy={lastPt.y} r="6" fill={akad.pink} fillOpacity="0.15" />
    </svg>
  );
}

interface DashboardScreenProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
  onOpenNotifications: () => void;
  onOpenReport: () => void;
}

export function DashboardScreen({ activeTab, onNavigate, onOpenNotifications, onOpenReport }: DashboardScreenProps) {
  return (
    <PhoneFrame dark>
      <header className="px-5 pt-2 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <p style={{ color: akad.textOnDarkTertiary, fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 500 }}>
              Akad Seguros
            </p>
            <h1 style={{ color: akad.textOnDark, fontSize: "26px", fontWeight: 700, lineHeight: 1.2, marginTop: "1px", letterSpacing: "-0.8px" }}>
              Dashboard
            </h1>
          </div>
          <button onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(255,255,255,0.05)" }}
            aria-label="Notificações — 3 novas">
            <Bell size={18} color="rgba(255,255,255,0.5)" />
            <motion.span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: akad.pink, boxShadow: `0 0 6px ${akad.pink}` }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} aria-hidden="true" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 pb-1 overflow-y-auto" style={{ scrollbarWidth: "none" }} role="region" aria-label="Métricas">
        <div className="grid grid-cols-2 gap-2">
          {/* Sales Hero */}
          <motion.article className="col-span-2 rounded-[18px] p-4 relative overflow-hidden"
            style={{ background: akad.gradientPrimary, border: "1px solid rgba(230,0,126,0.12)" }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            aria-label="Vendas totais">
            <div className="absolute top-0 right-0 w-[140px] h-[140px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(230,0,126,0.08) 0%, transparent 70%)" }} aria-hidden="true" />
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1 min-w-0">
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>
                  Vendas Totais
                </p>
                <p style={{ color: "#fff", fontSize: "36px", fontWeight: 800, lineHeight: 1, letterSpacing: "-2px", marginTop: "4px" }}>
                  R$ 2.4M
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full"
                    style={{ background: "rgba(0,196,140,0.15)", color: akad.success, fontSize: "10px", fontWeight: 600 }}>
                    <TrendingUp size={10} /> +18.2%
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>vs. mês anterior</span>
                </div>
              </div>
              <div className="w-[90px] h-[65px] shrink-0 ml-2">
                <MiniBarChart />
              </div>
            </div>
          </motion.article>

          {/* Comissões */}
          <motion.article className="col-span-1 rounded-[16px] p-3.5 flex flex-col justify-between"
            style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.08 }}
            aria-label="Comissões">
            <div>
              <p style={{ color: akad.textOnDarkTertiary, fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Comissões</p>
              <p style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginTop: "2px", letterSpacing: "-0.8px" }}>R$ 184K</p>
            </div>
            <CommissionChart />
          </motion.article>

          {/* Clientes */}
          <motion.button onClick={() => onNavigate("clients")}
            className="col-span-1 rounded-[16px] p-3.5 flex flex-col justify-between text-left cursor-pointer"
            style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.08 }}
            aria-label="Clientes — ver todos">
            <div className="flex items-center justify-between">
              <p style={{ color: akad.textOnDarkTertiary, fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Clientes</p>
              <Users size={13} color="rgba(230,0,126,0.35)" aria-hidden="true" />
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: "32px", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1 }}>847</p>
              <p style={{ color: akad.success, fontSize: "10px", fontWeight: 500, marginTop: "3px" }}>+23 este mês</p>
            </div>
          </motion.button>

          {/* Renovações */}
          <motion.button onClick={() => onNavigate("policies")}
            className="col-span-2 rounded-[16px] p-3.5 flex items-center gap-3 cursor-pointer text-left"
            style={{ background: "linear-gradient(135deg, rgba(230,0,126,0.05) 0%, rgba(59,34,184,0.03) 100%)", border: "1px solid rgba(230,0,126,0.08)" }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.12 }}
            aria-label="12 renovações pendentes">
            <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0"
              style={{ background: "rgba(230,0,126,0.08)" }}>
              <AlertTriangle size={17} color={akad.pink} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>Renovações Pendentes</p>
              <p style={{ color: akad.textOnDarkTertiary, fontSize: "11px" }}>12 apólices vencem esta semana</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background: akad.gradientAccent }}>
              <span style={{ color: "#fff", fontSize: "13px", fontWeight: 800 }}>12</span>
            </div>
          </motion.button>

          {/* Apólices */}
          <motion.button onClick={() => onNavigate("policies")}
            className="col-span-1 rounded-[16px] p-3.5 flex flex-col justify-between cursor-pointer text-left"
            style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.16 }}
            aria-label="Apólices — ver todas">
            <div className="flex items-center justify-between">
              <p style={{ color: akad.textOnDarkTertiary, fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Apólices</p>
              <FileText size={13} color="rgba(230,0,126,0.35)" aria-hidden="true" />
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: "28px", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1 }}>1.2K</p>
              <p style={{ color: akad.pink, fontSize: "10px", fontWeight: 500, marginTop: "3px" }}>98% ativas</p>
            </div>
          </motion.button>

          {/* Conversão */}
          <motion.article className="col-span-1 rounded-[16px] p-3.5 flex flex-col justify-between relative overflow-hidden"
            style={{ background: akad.gradientAccent }}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.16 }}
            aria-label="Conversão 73%">
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }} aria-hidden="true" />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Conversão</p>
            <div>
              <p style={{ color: "#fff", fontSize: "32px", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1 }}>73%</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", marginTop: "3px" }}>Meta: 70%</p>
            </div>
          </motion.article>

          {/* Relatório */}
          <motion.button onClick={onOpenReport}
            className="col-span-2 rounded-[16px] p-3.5 flex items-center justify-between cursor-pointer"
            style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.2 }}
            aria-label="Relatório mensal">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                style={{ background: "rgba(59,34,184,0.12)" }}>
                <TrendingUp size={16} color={akad.blueLight} />
              </div>
              <div className="text-left">
                <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>Relatório Mensal</p>
                <p style={{ color: akad.textOnDarkTertiary, fontSize: "10px" }}>Fevereiro 2026</p>
              </div>
            </div>
            <ArrowUpRight size={16} color="rgba(255,255,255,0.2)" />
          </motion.button>
        </div>
        <div className="h-1" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} dark />
    </PhoneFrame>
  );
}
