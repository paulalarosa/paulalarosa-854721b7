import { Home, FileText, Users, GraduationCap, Settings } from "lucide-react";
import { akad } from "./akad-theme";
import { motion } from "motion/react";

export type TabId = "dashboard" | "policies" | "clients" | "academy" | "settings";

const tabs: { id: TabId; icon: typeof Home; label: string }[] = [
  { id: "dashboard", icon: Home, label: "Início" },
  { id: "policies", icon: FileText, label: "Apólices" },
  { id: "clients", icon: Users, label: "Clientes" },
  { id: "academy", icon: GraduationCap, label: "Academy" },
  { id: "settings", icon: Settings, label: "Config" },
];

interface TabBarProps {
  active: TabId;
  onNavigate: (tab: TabId) => void;
  dark?: boolean;
}

export function TabBar({ active, onNavigate, dark = false }: TabBarProps) {
  return (
    <nav
      className="flex items-center justify-around shrink-0"
      style={{
        paddingTop: "8px",
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 20px)",
        paddingLeft: "max(env(safe-area-inset-left, 0px), 8px)",
        paddingRight: "max(env(safe-area-inset-right, 0px), 8px)",
        background: dark ? "rgba(13, 8, 38, 0.95)" : "rgba(250, 250, 252, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: `1px solid ${dark ? akad.darkBorder : akad.border}`,
      }}
      role="tablist"
      aria-label="Navegação principal"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl cursor-pointer relative"
            style={{ minWidth: "48px", flex: 1, maxWidth: "72px" }}
            role="tab"
            aria-selected={isActive}
            aria-label={tab.label}
            tabIndex={isActive ? 0 : -1}
          >
            {isActive && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: dark ? "rgba(230, 0, 126, 0.08)" : akad.pinkSubtle,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <motion.div
              animate={{ scale: isActive ? 1 : 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative z-10"
            >
              <tab.icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.6}
                color={
                  isActive
                    ? akad.pink
                    : dark
                    ? "rgba(255,255,255,0.28)"
                    : akad.textTertiary
                }
              />
            </motion.div>
            <span
              className="relative z-10"
              style={{
                fontSize: "9px",
                fontWeight: isActive ? 600 : 400,
                color: isActive
                  ? akad.pink
                  : dark
                  ? "rgba(255,255,255,0.28)"
                  : akad.textTertiary,
                letterSpacing: "0.3px",
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
