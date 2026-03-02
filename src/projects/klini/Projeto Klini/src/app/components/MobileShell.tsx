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
        className="bg-white/90 backdrop-blur-xl border-t border-[#f0f0f2] px-3 flex justify-around relative shrink-0"
        style={{ paddingBottom: "max(1.75rem, env(safe-area-inset-bottom))", paddingTop: "0.5rem" }}
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
                  className="absolute -top-2 w-5 h-[3px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #2D9F93, #3DB4A7)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                size={21}
                strokeWidth={active ? 2.3 : 1.6}
                className={`transition-colors duration-200 ${
                  active ? "text-[#2D9F93]" : "text-[#C0C4CC]"
                }`}
              />
              <span
                className={`text-[10px] tracking-wide transition-colors duration-200 ${
                  active ? "text-[#2D9F93]" : "text-[#C0C4CC]"
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
