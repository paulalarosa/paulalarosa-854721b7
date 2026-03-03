import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Search, Calendar, User } from "lucide-react";
import { motion } from "motion/react";

const tabs = [
  { icon: Home, label: "Início", path: "/" },
  { icon: Search, label: "Buscar", path: "/search" },
  { icon: Calendar, label: "Agenda", path: "/appointments" },
  { icon: User, label: "Perfil", path: "/profile" },
];

export function MobileShell() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden relative"
      style={{ background: "#FAFBFC" }}
      role="application"
      aria-label="Klini - Plano de Saúde Digital"
    >
      <main className="flex-1 overflow-y-auto overscroll-contain" id="main-content">
        <Outlet />
      </main>

      <nav
        className="bg-white/90 backdrop-blur-xl border-t border-[#f0f0f2] px-2 flex justify-around relative shrink-0"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))", paddingTop: "0.375rem" }}
        role="tablist"
        aria-label="Navegação principal"
      >
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <motion.button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              role="tab"
              aria-selected={active}
              aria-label={tab.label}
              whileTap={{ scale: 0.88 }}
              className="flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-all duration-200 relative min-w-[64px] cursor-pointer"
            >
              {active && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "rgba(45,159,147,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <tab.icon
                size={22}
                strokeWidth={active ? 2.2 : 1.5}
                className={`transition-colors duration-200 relative z-10 ${active ? "text-[#2D9F93]" : "text-[#C0C4CC]"
                  }`}
              />
              <span
                className={`text-[10px] tracking-wide transition-all duration-200 relative z-10 ${active ? "text-[#2D9F93] font-medium" : "text-[#C0C4CC]"
                  }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
