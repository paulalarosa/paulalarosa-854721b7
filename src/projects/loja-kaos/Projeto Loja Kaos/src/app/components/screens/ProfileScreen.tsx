import { motion } from "motion/react";
import type { ScreenType } from "../data";

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  wishlistCount: number;
}

const menuSections = [
  {
    section: "CONTA",
    items: [
      { label: "Meus Pedidos", detail: "3 pedidos", screen: "orders" as ScreenType, icon: "M3 2H17V18H3V2ZM7 7H13M7 10H11" },
      { label: "Enderecos", detail: "1 salvo", screen: "addresses" as ScreenType, icon: "M10 2C6.69 2 4 4.69 4 8C4 12.5 10 18 10 18C10 18 16 12.5 16 8C16 4.69 13.31 2 10 2Z" },
      { label: "Pagamento", detail: "**** 4832", screen: "payment" as ScreenType, icon: "M2 4H18V16H2V4ZM2 8H18" },
    ],
  },
  {
    section: "PREFERENCIAS",
    items: [
      { label: "Notificacoes", detail: "Ativado", screen: "notifications" as ScreenType, icon: "M10 2C7.24 2 5 4.24 5 7V11L3 14H17L15 11V7C15 4.24 12.76 2 10 2Z" },
      { label: "Tamanho Preferido", detail: "M / 40", screen: "sizes-pref" as ScreenType, icon: "M4 16L16 4M16 4H10M16 4V10" },
      { label: "Lista de Desejos", detail: "", screen: "wishlist" as ScreenType, icon: "M10 17C10 17 2 12 2 7C2 4.24 4.24 2 7 2C8.4 2 9.6 2.6 10 3.5C10.4 2.6 11.6 2 13 2C15.76 2 18 4.24 18 7C18 12 10 17 10 17Z" },
    ],
  },
  {
    section: "SUPORTE",
    items: [
      { label: "Central de Ajuda", detail: "", screen: "help" as ScreenType, icon: "M10 10C10 7 14 7 14 10C14 12 11 12 11 14M11 17H11.01" },
      { label: "Trocas e Devolucoes", detail: "", screen: "returns" as ScreenType, icon: "M4 10L10 4L16 10M10 4V18" },
      { label: "Termos e Privacidade", detail: "", screen: "terms" as ScreenType, icon: "M4 2H16V18H4V2ZM7 6H13M7 9H13M7 12H10" },
    ],
  },
];

export function ProfileScreen({ onNavigate, wishlistCount }: ProfileScreenProps) {
  return (
    <main className="pt-24 pb-28 lg:pb-12 px-5 sm:px-8 max-w-[700px] mx-auto" role="main">
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 mb-8"
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-white/30" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px" }}>VX</span>
        </div>
        <div>
          <h2
            className="text-white/85 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "20px", lineHeight: 1.1 }}
          >
            VISITANTE
          </h2>
          <p className="text-white/15" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", letterSpacing: "0.08em" }}>
            Membro desde Fev 2026
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-[1px] mb-8" style={{ background: "rgba(255,255,255,0.04)" }}>
        {[
          { value: "3", label: "PEDIDOS" },
          { value: String(wishlistCount), label: "DESEJOS" },
          { value: "VX", label: "NIVEL" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 * i }}
            className="flex flex-col items-center py-5"
            style={{ background: "#080808" }}
          >
            <span className="text-white/60" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "22px", lineHeight: 1 }}>
              {stat.value}
            </span>
            <span className="text-white/12 mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", letterSpacing: "0.2em" }}>
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Menu */}
      {menuSections.map((section, si) => (
        <div key={section.section} className="mb-2">
          <h3
            className="text-white/8 uppercase mb-1 mt-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px", letterSpacing: "0.25em" }}
          >
            {section.section}
          </h3>
          {section.items.map((item, i) => {
            const detail = item.screen === "wishlist" ? `${wishlistCount} itens` : item.detail;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.04 * (si * 3 + i) }}
                onClick={() => onNavigate(item.screen)}
                className="w-full flex items-center gap-3 py-3.5 cursor-pointer text-left group"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                aria-label={`${item.label}${detail ? `, ${detail}` : ""}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d={item.icon} stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p
                    className="text-white/50 transition-colors group-hover:text-white/70"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}
                  >
                    {item.label}
                  </p>
                  {detail && (
                    <p className="text-white/12 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                      {detail}
                    </p>
                  )}
                </div>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M3 1.5L5.5 4L3 6.5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            );
          })}
        </div>
      ))}

      {/* Version */}
      <p className="text-center mt-6 text-white/[0.05]" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px", letterSpacing: "0.15em" }}>
        VRTX v2.6.0
      </p>
    </main>
  );
}
