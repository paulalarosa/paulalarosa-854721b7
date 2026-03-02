import { ReactNode } from "react";
import { akad } from "./akad-theme";

interface PhoneFrameProps {
  children: ReactNode;
  dark?: boolean;
}

export function PhoneFrame({ children, dark = false }: PhoneFrameProps) {
  return (
    <div
      className="w-full h-full overflow-hidden relative flex flex-col"
      style={{
        background: dark ? akad.darkBg : akad.bg,
        fontFamily: akad.font,
      }}
    >
      {/* iOS Status Bar */}
      <div className="flex items-center justify-between shrink-0" style={{ paddingTop: "max(env(safe-area-inset-top, 0px), 8px)", paddingLeft: "max(env(safe-area-inset-left, 0px), 24px)", paddingRight: "max(env(safe-area-inset-right, 0px), 24px)", paddingBottom: "2px" }}>
        <span
          style={{ color: dark ? "rgba(255,255,255,0.5)" : akad.textSecondary, fontSize: "14px", fontWeight: 600, letterSpacing: "-0.2px" }}
          aria-hidden="true"
        >
          9:41
        </span>
        <div
          className="w-[100px] h-[28px] rounded-full mx-auto absolute left-1/2 -translate-x-1/2"
          style={{ background: dark ? "#000" : "#0D0826", top: "max(env(safe-area-inset-top, 0px), 6px)" }}
          role="presentation"
        />
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <rect x="0" y="3" width="2.5" height="8" rx="0.8" fill={dark ? "rgba(255,255,255,0.3)" : akad.textTertiary} />
            <rect x="4" y="1.5" width="2.5" height="9.5" rx="0.8" fill={dark ? "rgba(255,255,255,0.3)" : akad.textTertiary} />
            <rect x="8" y="0" width="2.5" height="11" rx="0.8" fill={dark ? "rgba(255,255,255,0.5)" : akad.textSecondary} />
          </svg>
          <div className="w-[20px] h-[10px] rounded-[2.5px] border flex items-center p-[1.5px]"
            style={{ borderColor: dark ? "rgba(255,255,255,0.25)" : akad.textTertiary }}>
            <div className="h-full w-[70%] rounded-[1px]"
              style={{ background: dark ? "rgba(255,255,255,0.5)" : akad.textSecondary }} />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
