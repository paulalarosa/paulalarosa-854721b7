import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./BottomNav";
import { AnimatePresence, motion } from "motion/react";

const mainRoutes = ["/", "/agenda", "/coberturas", "/perfil"];

export function Layout() {
  const location = useLocation();
  const showBottomNav = mainRoutes.includes(location.pathname);

  return (
    <div
      className="w-full h-full overflow-hidden flex justify-center"
      style={{
        background: "#FAFAFD",
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="w-full max-w-lg relative h-full flex flex-col">
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl"
          style={{ background: "#6C5CE7", color: "#fff" }}
        >
          Pular para o conteúdo
        </a>

        {/* Status bar */}
        <div className="px-7 pt-3 pb-0.5 flex items-center justify-between shrink-0" aria-hidden="true">
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#0F0F23" }}>9:41</span>
          <div className="flex items-center gap-1.5">
            <svg width="15" height="11" viewBox="0 0 16 12" fill="#0F0F23">
              <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.25" />
              <rect x="4.5" y="5" width="3" height="7" rx="0.5" opacity="0.45" />
              <rect x="9" y="2.5" width="3" height="9.5" rx="0.5" opacity="0.7" />
              <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 15 11" fill="none" stroke="#0F0F23" strokeWidth="1.4">
              <path d="M1 8.5C3.5 5 6 3 7.5 2c1.5 1 4 3 6.5 6.5" strokeLinecap="round" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 24 12" fill="#0F0F23">
              <rect x="0" y="1" width="20" height="10" rx="2" fill="none" stroke="#0F0F23" strokeWidth="1" />
              <rect x="21" y="3.5" width="2" height="5" rx="1" opacity="0.35" />
              <rect x="1.5" y="2.5" width="14" height="7" rx="1" />
            </svg>
          </div>
        </div>

        <main
          id="main-content"
          className={`flex-1 overflow-y-auto overflow-x-hidden ${showBottomNav ? "pb-24" : "pb-8"}`}
          role="main"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {showBottomNav && <BottomNav />}
      </div>
    </div>
  );
}
