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
    <header className="fixed top-0 left-0 right-0 z-50" role="banner">
      <div
        className="max-w-[1200px] mx-auto flex items-center justify-between px-5 sm:px-8 pt-[max(env(safe-area-inset-top,0px),12px)] pb-3"
        style={{
          paddingTop: "calc(max(env(safe-area-inset-top, 0px), 12px) + 8px)",
          background: "linear-gradient(180deg, rgba(8,8,8,1) 0%, rgba(8,8,8,0.97) 70%, rgba(8,8,8,0) 100%)",
        }}
      >
        {/* Left: Back or Menu */}
        <div className="w-10 flex justify-start">
          {showBack ? (
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label="Voltar"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              className="w-10 h-10 flex items-center justify-center cursor-pointer"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[4px]">
                <div className="w-[17px] h-[1.5px] bg-white/80" />
                <div className="w-[11px] h-[1.5px] bg-white/30" />
              </div>
            </button>
          )}
        </div>

        {/* Center: Logo or Title */}
        <motion.div
          key={title || "logo"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2"
        >
          {title ? (
            <span
              className="text-white/80 uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.28em",
              }}
            >
              {title}
            </span>
          ) : (
            <button onClick={onLogoPress} className="cursor-pointer flex flex-col items-center" aria-label="VRTX - Inicio">
              <span
                className="text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "22px",
                  lineHeight: 1,
                  letterSpacing: "0.2em",
                }}
              >
                VRTX
              </span>
            </button>
          )}
        </motion.div>

        {/* Right: Cart */}
        <div className="w-10 flex justify-end">
          <button
            className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label={`Sacola, ${cartCount} itens`}
            onClick={onCartPress}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 8L4.5 21H19.5L18 8H6Z" stroke="white" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
              <path d="M9 8V6C9 3.79 10.34 2 12 2C13.66 2 15 3.79 15 6V8" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            </svg>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0.5 right-0 w-[15px] h-[15px] rounded-full flex items-center justify-center"
                style={{
                  background: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "7.5px",
                  color: "#080808",
                }}
              >
                {cartCount}
              </motion.div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
