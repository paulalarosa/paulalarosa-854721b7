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
        className="bg-white border-t border-[#f0f0f2] px-3 flex justify-around relative shrink-0"
        style={{
          paddingBottom: "max(1.75rem, env(safe-area-inset-bottom))",
          paddingTop: "0.5rem",
          boxShadow: "0 -1px 0 rgba(0,0,0,0.04), 0 -4px 16px rgba(0,0,0,0.03)",
        }}
        role="tablist"
        aria-label="Navegação principal"
      >
        {tabs.map((tab) => {
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              role="tab"
              aria-selected={active}
              aria-label={tab.label}
              className="flex flex-col items-center gap-1 px-5 py-1.5 rounded-2xl transition-all duration-200 relative min-w-[60px] cursor-pointer"
            >
              {active && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-[1px] w-6 h-[2.5px] rounded-full"
                  style={{ background: "#2D9F93" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <tab.icon
                size={21}
                strokeWidth={active ? 2.3 : 1.6}
                className={`transition-colors duration-200 ${active ? "text-[#2D9F93]" : "text-[#C0C4CC]"
                  }`}
              />
              <span
                className={`text-[10px] tracking-wide transition-all duration-200 ${active ? "text-[#2D9F93] font-semibold" : "text-[#C0C4CC] font-normal"
                  }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
