import { Home, FileText, ShieldAlert, Bell, User, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export type TabId = "inicio" | "apolices" | "sinistro" | "alertas" | "perfil";

interface Tab {
  id: TabId;
  label: string;
  icon: LucideIcon;
  ariaLabel: string;
  isCenter?: boolean;
  badge?: number;
}

const tabs: Tab[] = [
  { id: "inicio", label: "Inicio", icon: Home, ariaLabel: "Tela inicial" },
  { id: "apolices", label: "Apolices", icon: FileText, ariaLabel: "Minhas apolices" },
  { id: "sinistro", label: "", icon: ShieldAlert, ariaLabel: "Abrir sinistro", isCenter: true },
  { id: "alertas", label: "Alertas", icon: Bell, ariaLabel: "Notificacoes", badge: 3 },
  { id: "perfil", label: "Perfil", icon: User, ariaLabel: "Meu perfil" },
];

interface BottomTabBarProps {
  active: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomTabBar({ active, onTabChange }: BottomTabBarProps) {
  return (
    <nav
      className="relative z-20 shrink-0"
      role="tablist"
      aria-label="Menu principal"
    >
      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F8FA] via-[#F8F8FA]/95 to-transparent pointer-events-none" />

      <div className="relative flex items-end justify-around px-2 pb-3 pt-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          if (tab.isCenter) {
            return (
              <motion.button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                aria-label={tab.ariaLabel}
                onClick={() => onTabChange(tab.id)}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="relative -mt-4 w-[50px] h-[50px] sm:w-[52px] sm:h-[52px] rounded-2xl bg-[#0F172A] flex items-center justify-center shadow-[0_6px_24px_rgba(15,23,42,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
              >
                <ShieldAlert size={20} className="text-white" strokeWidth={1.8} />
              </motion.button>
            );
          }

          const isActive = active === tab.id;
          return (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.ariaLabel}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="flex flex-col items-center gap-[3px] py-2 px-3 sm:px-4 relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488] rounded-xl"
            >
              <div className="relative">
                <tab.icon
                  size={20}
                  className={`transition-colors duration-200 ${isActive ? "text-[#0D9488]" : "text-gray-300"}`}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {tab.badge && tab.badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-[#EF4444] flex items-center justify-center"
                    aria-label={`${tab.badge} notificacoes`}
                  >
                    <span className="text-[8px] text-white">{tab.badge}</span>
                  </span>
                )}
              </div>
              <span
                className={`text-[9px] sm:text-[10px] tracking-wide transition-colors duration-200 ${isActive ? "text-[#0D9488]" : "text-gray-300"}`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-[#0D9488]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
