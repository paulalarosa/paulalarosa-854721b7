import { Bell, TrendingUp, AlertTriangle, Users, FileText, ArrowUpRight } from "lucide-react";
import { akad } from "./akad-theme";
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
    <div className="flex flex-col h-full bg-[#0D0826]">
      <header className="px-5 pt-12 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p style={{ color: akad.textOnDarkTertiary, fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 500 }}>
              Akad Seguros
            </p>
            <h1 style={{ color: akad.textOnDark, fontSize: "28px", fontWeight: 700, lineHeight: 1.2, marginTop: "2px", letterSpacing: "-0.8px" }}>
              Dashboard
            </h1>
          </div>
          <button onClick={onOpenNotifications}
            className="relative w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.05)" }}
            aria-label="Notificações — 3 novas">
            <Bell size={20} color="rgba(255,255,255,0.7)" />
            <motion.span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full"
              style={{ background: akad.pink, boxShadow: `0 0 8px ${akad.pink}` }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="px-5 py-3 flex items-center gap-4 border-b border-white/5 mx-5 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: akad.success, boxShadow: `0 0 4px ${akad.success}` }} />
          <span style={{ color: akad.textOnDarkSecondary, fontSize: "11px", letterSpacing: "0.5px", fontWeight: 500 }}>
            CORRETOR ATIVO
          </span>
        </div>
        <div style={{ width: "1px", height: "12px", background: akad.darkBorder }} />
        <span style={{ color: akad.textOnDarkSecondary, fontSize: "11px", fontWeight: 500 }}>
          Região Sul · SP
        </span>
      </div>

      <main className="flex-1 px-5 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }} role="region" aria-label="Métricas">
        <div className="grid grid-cols-2 gap-3">
          {/* Sales Hero */}
          <motion.article className="col-span-2 rounded-[24px] p-5 relative overflow-hidden"
            style={{ background: akad.gradientPrimary, border: "1px solid rgba(230,0,126,0.15)", boxShadow: "0 8px 32px rgba(230,0,126,0.15)" }}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            aria-label="Vendas totais">
            <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full blur-3xl opacity-50"
              style={{ background: akad.pink }} aria-hidden="true" />
            <div className="flex items-start justify-between relative z-10">
              <div className="flex-1 min-w-0">
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600 }}>
                  Volume de Prêmios
                </p>
                <p style={{ color: "#fff", fontSize: "40px", fontWeight: 800, lineHeight: 1, letterSpacing: "-1.5px", marginTop: "8px" }}>
                  R$ 2.4M
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10"
                    style={{ color: akad.success, fontSize: "11px", fontWeight: 600, backdropFilter: "blur(4px)" }}>
                    <TrendingUp size={12} /> +18.2%
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>vs. mês anterior</span>
                </div>
              </div>
              <div className="w-[100px] h-[75px] shrink-0 ml-3">
                <MiniBarChart />
              </div>
            </div>
          </motion.article>

          {/* Comissões */}
          <motion.article className="col-span-1 rounded-[20px] p-4 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`, backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.08 }}
            aria-label="Comissões">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5">
                  <TrendingUp size={12} color={akad.pinkLight} />
                </div>
                <p style={{ color: akad.textOnDarkSecondary, fontSize: "11px", fontWeight: 600 }}>Comissões</p>
              </div>
              <p style={{ color: "#fff", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>R$ 184K</p>
            </div>
            <CommissionChart />
          </motion.article>

          {/* Clientes */}
          <motion.button onClick={() => onNavigate("clients")}
            className="col-span-1 rounded-[20px] p-4 flex flex-col justify-between text-left cursor-pointer"
            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`, backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.08 }}
            aria-label="Clientes — ver todos">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5">
                <Users size={12} color={akad.pinkLight} />
              </div>
              <p style={{ color: akad.textOnDarkSecondary, fontSize: "11px", fontWeight: 600 }}>Clientes</p>
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1 }}>847</p>
              <p className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5" style={{ color: akad.success, fontSize: "10px", fontWeight: 600 }}>
                +23 novos
              </p>
            </div>
          </motion.button>

          {/* Renovações */}
          <motion.button onClick={() => onNavigate("policies")}
            className="col-span-2 rounded-[20px] p-4 flex items-center gap-4 cursor-pointer text-left overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, rgba(230,0,126,0.08) 0%, rgba(59,34,184,0.05) 100%)", border: "1px solid rgba(230,0,126,0.15)" }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.12 }}
            aria-label="12 renovações pendentes">
            <div className="absolute right-0 top-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl transform translate-x-12 -translate-y-8" />
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(230,0,126,0.15)", border: "1px solid rgba(230,0,126,0.2)" }}>
              <AlertTriangle size={20} color={akad.pinkLight} />
            </div>
            <div className="flex-1 min-w-0 z-10">
              <p style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>Renovações Pendentes</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginTop: "2px" }}>12 apólices vencem esta semana</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10"
              style={{ background: akad.gradientAccent, boxShadow: "0 4px 12px rgba(230,0,126,0.3)" }}>
              <span style={{ color: "#fff", fontSize: "15px", fontWeight: 800 }}>12</span>
            </div>
          </motion.button>

          {/* Apólices */}
          <motion.button onClick={() => onNavigate("policies")}
            className="col-span-1 rounded-[20px] p-4 flex flex-col justify-between text-left cursor-pointer"
            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`, backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.16 }}
            aria-label="Apólices — ver todas">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/5">
                <FileText size={12} color={akad.pinkLight} />
              </div>
              <p style={{ color: akad.textOnDarkSecondary, fontSize: "11px", fontWeight: 600 }}>Apólices</p>
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: "32px", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1 }}>1.2K</p>
              <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: "98%", background: akad.pink }} />
              </div>
              <p style={{ color: akad.pinkLight, fontSize: "10px", fontWeight: 500, marginTop: "6px" }}>98% de retenção</p>
            </div>
          </motion.button>

          {/* Conversão */}
          <motion.article className="col-span-1 rounded-[20px] p-4 flex flex-col justify-between relative overflow-hidden"
            style={{ background: akad.gradientAccent, boxShadow: "0 8px 24px rgba(59,34,184,0.2)" }}
            initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25, delay: 0.16 }}
            aria-label="Conversão 73%">
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }} aria-hidden="true" />
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-white/20">
                <TrendingUp size={12} color="#fff" />
              </div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", fontWeight: 600 }}>Conversão</p>
            </div>
            <div className="relative z-10 mt-4">
              <p style={{ color: "#fff", fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1 }}>73%</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", marginTop: "4px", fontWeight: 500 }}>Meta: 70%</p>
            </div>
          </motion.article>

          {/* Relatório */}
          <motion.button onClick={onOpenReport}
            className="col-span-2 rounded-[20px] p-4 flex items-center justify-between cursor-pointer group"
            style={{ background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.06)`, backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.2 }}
            aria-label="Relatório mensal">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center transition-colors group-hover:bg-white/10"
                style={{ background: "rgba(59,34,184,0.15)", border: "1px solid rgba(59,34,184,0.3)" }}>
                <FileText size={20} color={akad.blueLight} />
              </div>
              <div className="text-left">
                <p style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>Relatório Mensal</p>
                <p style={{ color: akad.textOnDarkTertiary, fontSize: "12px", marginTop: "2px" }}>Fevereiro 2026 emitido</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowUpRight size={18} color="rgba(255,255,255,0.4)" />
            </div>
          </motion.button>
        </div>
        <div className="h-6" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} dark />
    </div>
  );
}
