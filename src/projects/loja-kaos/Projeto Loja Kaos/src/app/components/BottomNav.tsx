import { motion } from "motion/react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", label: "INÍCIO" },
  { id: "explore", label: "CATÁLOGO" },
  { id: "drops", label: "DROPS" },
  { id: "bag", label: "SACOLA" },
  { id: "perfil", label: "CONTA" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ background: "#F5F4F0", borderTop: "1px solid rgba(10,10,10,0.07)" }}
    >
      <div
        className="flex items-center justify-around px-2"
        style={{
          paddingTop: "10px",
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 18px)",
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center cursor-pointer"
              style={{ background: "transparent", border: "none" }}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-line"
                  className="absolute -top-2.5 left-0 right-0"
                  style={{ height: "1.5px", background: "#0A0A0A" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "7.5px",
                letterSpacing: "0.22em",
                fontWeight: isActive ? 500 : 300,
                color: isActive ? "#0A0A0A" : "rgba(10,10,10,0.28)",
                transition: "color 0.2s",
              }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
