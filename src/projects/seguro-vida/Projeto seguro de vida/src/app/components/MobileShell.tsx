import { ReactNode, useMemo } from "react";
import { motion } from "motion/react";

interface MobileShellProps {
  children: ReactNode;
}

export function StatusBar() {
  return (
    <div
      className="relative z-20 flex items-center justify-between px-6 sm:px-7 pt-3 pb-1 shrink-0"
      aria-hidden="true"
    >
      <span className="text-[13px] text-gray-900 tracking-tight">9:41</span>
      <div className="w-[100px] sm:w-[120px] h-[26px] sm:h-[28px] bg-black rounded-full" />
      <div className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <rect x="0" y="5" width="3" height="7" rx="1" fill="#1D1D1F" />
          <rect x="4.5" y="3.5" width="3" height="8.5" rx="1" fill="#1D1D1F" />
          <rect x="9" y="1.5" width="3" height="10.5" rx="1" fill="#1D1D1F" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#1D1D1F" fillOpacity="0.25" />
        </svg>
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden="true">
          <path d="M7.5 3.5C9.16 3.5 10.65 4.18 11.73 5.27L13 4C11.55 2.55 9.62 1.67 7.5 1.67C5.38 1.67 3.45 2.55 2 4L3.27 5.27C4.35 4.18 5.84 3.5 7.5 3.5Z" fill="#1D1D1F" />
          <path d="M7.5 6.33C8.6 6.33 9.6 6.76 10.33 7.47L11.6 6.2C10.52 5.13 9.08 4.5 7.5 4.5C5.92 4.5 4.48 5.13 3.4 6.2L4.67 7.47C5.4 6.76 6.4 6.33 7.5 6.33Z" fill="#1D1D1F" />
          <circle cx="7.5" cy="10" r="1.5" fill="#1D1D1F" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden="true">
          <rect x="0" y="1" width="21" height="10" rx="2" stroke="#1D1D1F" strokeWidth="1" />
          <rect x="22" y="4" width="2" height="4" rx="0.5" fill="#1D1D1F" fillOpacity="0.4" />
          <rect x="1.5" y="2.5" width="15" height="7" rx="1" fill="#1D1D1F" />
        </svg>
      </div>
    </div>
  );
}

export function MobileShell({ children }: MobileShellProps) {
  const hour = useMemo(() => new Date().getHours(), []);

  const ambientConfig = useMemo(() => {
    if (hour >= 5 && hour < 12) {
      return {
        primary: "rgba(245, 158, 11, 0.03)",
        secondary: "rgba(13, 148, 136, 0.02)",
        accent: "rgba(99, 102, 241, 0.015)",
      };
    }
    if (hour >= 12 && hour < 18) {
      return {
        primary: "rgba(13, 148, 136, 0.03)",
        secondary: "rgba(99, 102, 241, 0.02)",
        accent: "rgba(245, 158, 11, 0.015)",
      };
    }
    return {
      primary: "rgba(99, 102, 241, 0.04)",
      secondary: "rgba(13, 148, 136, 0.02)",
      accent: "rgba(15, 23, 42, 0.02)",
    };
  }, [hour]);

  return (
    <div
      className="w-full h-full overflow-hidden flex flex-col relative"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "linear-gradient(180deg, rgba(13, 148, 136, 0.08) 0%, rgba(13, 148, 136, 0.02) 40%, #F8F8FA 100%)" }}
    >
      {/* Ambient lighting — shifts with time of day */}
      <motion.div
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[80%] max-w-[350px] h-[200px] rounded-full blur-[100px]"
          style={{ backgroundColor: ambientConfig.primary }}
        />
        <div
          className="absolute bottom-[25%] right-[-10%] w-[40%] max-w-[200px] aspect-square rounded-full blur-[80px]"
          style={{ backgroundColor: ambientConfig.secondary }}
        />
        <div
          className="absolute top-[40%] left-[-8%] w-[30%] max-w-[150px] aspect-square rounded-full blur-[70px]"
          style={{ backgroundColor: ambientConfig.accent }}
        />
      </motion.div>

      {/* Subtle mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(13,148,136,0.02) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(99,102,241,0.02) 0%, transparent 50%)",
        }}
      />

      <StatusBar />
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
