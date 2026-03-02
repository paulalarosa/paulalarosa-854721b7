import { motion } from "motion/react";

const navItems = [
  {
    id: "home",
    label: "INICIO",
    paths: (a: boolean) => (
      <path d="M3 9.5L11 3L19 9.5V19C19 19.55 18.55 20 18 20H14V14H8V20H4C3.45 20 3 19.55 3 19V9.5Z" stroke="currentColor" strokeWidth="1.3" fill={a ? "currentColor" : "none"} strokeLinejoin="round" />
    ),
  },
  {
    id: "explore",
    label: "EXPLORAR",
    paths: (_a: boolean) => (
      <>
        <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M15 15L19 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "drops",
    label: "DROPS",
    paths: (a: boolean) => (
      <path d="M11 2L13.5 8.5L20 11L13.5 13.5L11 20L8.5 13.5L2 11L8.5 8.5Z" stroke="currentColor" strokeWidth="1.3" fill={a ? "currentColor" : "none"} strokeLinejoin="round" />
    ),
  },
  {
    id: "bag",
    label: "SACOLA",
    paths: (a: boolean) => (
      <>
        <path d="M5 7L3.5 19.5H18.5L17 7H5Z" stroke="currentColor" strokeWidth="1.3" fill={a ? "currentColor" : "none"} strokeLinejoin="round" />
        <path d="M8 7V5.5C8 3.57 9.34 2 11 2C12.66 2 14 3.57 14 5.5V7" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "perfil",
    label: "PERFIL",
    paths: (a: boolean) => (
      <>
        <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3" fill={a ? "currentColor" : "none"} />
        <path d="M4 20C4 16 7.13 13 11 13C14.87 13 18 16 18 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      role="navigation"
      aria-label="Navegacao principal"
    >
      <div
        className="h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }}
      />
      <div
        className="flex items-center justify-around px-2 pt-2"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 20px)",
          background: "rgba(8,8,8,0.98)",
          backdropFilter: "blur(24px)",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center gap-[5px] relative px-3 py-1.5 cursor-pointer"
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <motion.div
                animate={{ color: isActive ? "#fff" : "#333" }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 22 22" fill="none" className="w-[20px] h-[20px]" aria-hidden="true">
                  {item.paths(isActive)}
                </svg>
              </motion.div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "7.5px",
                  letterSpacing: "0.15em",
                  color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 w-5 h-[1.5px] rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
