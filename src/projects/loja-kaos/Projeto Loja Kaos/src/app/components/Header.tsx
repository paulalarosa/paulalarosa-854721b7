import { motion } from "motion/react";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
  cartCount: number;
  onBack?: () => void;
  onCartPress: () => void;
  onLogoPress: () => void;
}

export function Header({ showBack, title, cartCount, onBack, onCartPress, onLogoPress }: HeaderProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
      style={{
        background: "#F5F4F0",
        borderBottom: "1px solid rgba(10,10,10,0.07)",
      }}
    >
      <div
        className="flex items-center justify-between px-5"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top, 0px), 12px) + 4px)",
          paddingBottom: "13px",
        }}
      >
        <div className="w-10 flex justify-start">
          {showBack ? (
            <button onClick={onBack} className="cursor-pointer" aria-label="Voltar">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 4L7 10L12.5 16" stroke="#0A0A0A" strokeWidth="1.3"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : <div />}
        </div>

        <motion.div
          key={title || "logo"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          {title ? (
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.32em",
              color: "rgba(10,10,10,0.4)",
              fontWeight: 300,
            }}>{title}</span>
          ) : (
            <button onClick={onLogoPress} className="cursor-pointer" aria-label="KAOS — Início">
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "26px",
                lineHeight: 1,
                letterSpacing: "0.32em",
                color: "#0A0A0A",
              }}>KAOS</span>
            </button>
          )}
        </motion.div>

        <div className="w-10 flex justify-end">
          <button onClick={onCartPress} className="relative cursor-pointer"
            aria-label={`Sacola — ${cartCount} itens`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 8L4 22H20L18 8H6Z" stroke="#0A0A0A" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M9 8V5.5C9 3.57 10.34 2 12 2C13.66 2 15 3.57 15 5.5V8"
                stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1.5 w-4 h-4 flex items-center justify-center"
                style={{
                  background: "#0A0A0A",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "7px",
                  fontWeight: 600,
                  color: "#F5F4F0",
                }}
              >{cartCount}</motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
