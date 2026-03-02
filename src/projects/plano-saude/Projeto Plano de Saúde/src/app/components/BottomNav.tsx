import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";

const navItems = [
  {
    path: "/",
    label: "Início",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={a ? "0" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        {!a && <polyline points="9 22 9 12 15 12 15 22" />}
      </svg>
    ),
  },
  {
    path: "/agenda",
    label: "Agenda",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={a ? "0" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        {!a && <><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></>}
      </svg>
    ),
  },
  { path: "/sos", label: "SOS", icon: () => null },
  {
    path: "/coberturas",
    label: "Plano",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={a ? "0" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
  {
    path: "/perfil",
    label: "Perfil",
    icon: (a: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={a ? "currentColor" : "none"} stroke="currentColor" strokeWidth={a ? "0" : "1.7"} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 z-50"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div
        className="mx-3 mb-3 px-2 py-2 flex items-center justify-around"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 2px 24px rgba(15,15,35,0.06), 0 0 0 0.5px rgba(0,0,0,0.03)",
        }}
      >
        {navItems.map((item) => {
          // SOS center button
          if (item.path === "/sos") {
            return (
              <button
                key="sos"
                onClick={() => navigate("/sos")}
                className="relative -mt-7 outline-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
                aria-label="Emergência SOS"
              >
                <motion.div
                  className="w-[48px] h-[48px] rounded-[15px] flex items-center justify-center"
                  style={{
                    background: "linear-gradient(145deg, #FF6B6B, #EE5252)",
                    boxShadow: "0 4px 16px rgba(255,107,107,0.35)",
                  }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </motion.div>
                <span
                  className="block text-center mt-0.5"
                  style={{ fontSize: "8px", fontWeight: 700, color: "#FF6B6B", letterSpacing: "0.04em" }}
                >
                  SOS
                </span>
              </button>
            );
          }

          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center gap-0.5 min-w-[44px] py-1 outline-none"
              style={{
                color: active ? "#6C5CE7" : "#B0B0C4",
                WebkitTapHighlightColor: "transparent",
              }}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute -top-1 w-4 h-[3px] rounded-full"
                  style={{ background: "#6C5CE7" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <div className="w-7 h-6 flex items-center justify-center">
                {item.icon(active)}
              </div>
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: active ? 700 : 500,
                  letterSpacing: "0.02em",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
