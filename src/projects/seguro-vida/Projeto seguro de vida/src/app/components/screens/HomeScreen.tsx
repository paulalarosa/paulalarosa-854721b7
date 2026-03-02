import { Bell, Search, CalendarDays, CreditCard } from "lucide-react";
import { motion } from "motion/react";
import type { TabId } from "../BottomTabBar";
import type { QuickActionId } from "../QuickActions";
import { hapticLight, hapticTick } from "../haptics";
import { SmartGreeting } from "../SmartGreeting";
import { ShieldScore } from "../ShieldScore";
import { ContextInsight } from "../ContextInsight";
import { QuickActions } from "../QuickActions";
import { CoverageOrbit } from "../CoverageOrbit";
import { EmergencyPulse } from "../EmergencyPulse";
import { PolicyPeek } from "../PolicyPeek";

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

interface HomeScreenProps {
  onNavigate: (tab: TabId) => void;
  onOpenSearch?: () => void;
  onQuickAction?: (id: QuickActionId) => void;
}

export function HomeScreen({ onNavigate, onOpenSearch, onQuickAction }: HomeScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <motion.header
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between pt-2 pb-4"
      >
        <div onClick={() => { hapticLight(); onNavigate("perfil"); }}>
          <SmartGreeting name="Ricardo" />
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            onClick={() => { hapticLight(); onOpenSearch?.(); }}
            className="relative w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Buscar"
          >
            <Search size={17} className="text-[#0F172A]" strokeWidth={1.6} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            onClick={() => { hapticLight(); onNavigate("alertas"); }}
            className="relative w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Ver notificacoes - 3 novas"
          >
            <Bell size={17} className="text-[#0F172A]" strokeWidth={1.6} />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-2 right-2.5 w-[7px] h-[7px] rounded-full bg-[#EF4444]"
            />
          </motion.button>
        </div>
      </motion.header>

      {/* Shield Score */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-5"
        aria-label="Nivel de protecao"
      >
        <ShieldScore score={87} onTap={() => onNavigate("apolices")} />
      </motion.section>

      {/* Context Insight */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-5"
        aria-label="Insights inteligentes"
      >
        <ContextInsight />
      </motion.section>

      {/* Emergency Button */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-5"
        aria-label="Sinistro de emergencia"
      >
        <EmergencyPulse onActivate={() => onNavigate("sinistro")} />
      </motion.section>

      {/* Quick Actions */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-5"
        aria-label="Acesso rapido"
      >
        <QuickActions onAction={onQuickAction} />
      </motion.section>

      {/* Coverage Orbit */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-5"
        aria-label="Mapa de coberturas"
      >
        <CoverageOrbit />
      </motion.section>

      {/* Policies - Expandable Peek */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4"
        aria-label="Minhas apolices"
      >
        <PolicyPeek onNavigate={onNavigate} />
      </motion.section>

      {/* Payments */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.35 }}
        aria-label="Proximos pagamentos"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CalendarDays size={14} className="text-gray-300" strokeWidth={1.5} />
            <h2 className="text-[14px] text-[#0F172A] tracking-tight">Pagamentos</h2>
          </div>
          <span className="text-[11px] text-gray-400 tracking-wide">Proximos</span>
        </div>

        <div className="space-y-2">
          {[
            { policy: "Seguro Auto - HB20", amount: "R$ 389,90", date: "05 Mar", color: "#0D9488", daysLeft: 3 },
            { policy: "Seguro Vida - Premium", amount: "R$ 157,50", date: "12 Mar", color: "#6366F1", daysLeft: 10 },
            { policy: "Seguro Auto - Civic", amount: "R$ 299,90", date: "20 Mar", color: "#0D9488", daysLeft: 18 },
          ].map((payment, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
              onClick={() => hapticTick()}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${payment.color}06` }}
                  >
                    <CreditCard size={14} style={{ color: payment.color }} strokeWidth={1.6} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#0F172A] flex items-center justify-center">
                    <span className="text-[7px] text-white">{payment.daysLeft}d</span>
                  </div>
                </div>
                <div>
                  <p className="text-[12px] text-[#0F172A]">{payment.policy}</p>
                  <p className="text-[10px] text-gray-300">{payment.date}</p>
                </div>
              </div>
              <p className="text-[13px] text-[#0F172A] tracking-tight">{payment.amount}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="h-8" />
    </div>
  );
}
