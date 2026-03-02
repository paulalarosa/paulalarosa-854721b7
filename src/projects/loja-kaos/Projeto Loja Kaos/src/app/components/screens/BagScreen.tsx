import { motion, AnimatePresence } from "motion/react";
import { type CartItem } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BagScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onProductPress: (id: string) => void;
}

export function BagScreen({ cart, onUpdateQuantity, onRemove, onProductPress }: BagScreenProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.priceNum * item.quantity, 0);
  const freeShipping = subtotal >= 299;

  return (
    <main className="pt-24 pb-28 lg:pb-12 px-5 sm:px-8 max-w-[800px] mx-auto" role="main">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white uppercase mb-1"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px, 5vw, 40px)", lineHeight: 1 }}
      >
        SACOLA
      </motion.h2>
      <p className="text-white/20 mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>
        {cart.length === 0 ? "Sua sacola esta vazia." : `${cart.length} ${cart.length === 1 ? "item" : "itens"}`}
      </p>

      {cart.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" className="mb-4 opacity-[0.06]" aria-hidden="true">
            <path d="M6 8L4.5 21H19.5L18 8H6Z" stroke="white" strokeWidth="1" fill="none" strokeLinejoin="round" />
            <path d="M9 8V6C9 3.79 10.34 2 12 2C13.66 2 15 3.79 15 6V8" stroke="white" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
          <p className="text-white/12" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>Nenhum produto adicionado.</p>
        </motion.div>
      ) : (
        <div className="lg:flex lg:gap-12">
          {/* Items */}
          <div className="flex-1">
            <div className="flex flex-col gap-0" role="list">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="flex gap-3 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    role="listitem"
                  >
                    <div
                      className="w-[70px] sm:w-[80px] aspect-[3/4] overflow-hidden shrink-0 cursor-pointer"
                      onClick={() => onProductPress(item.product.id)}
                    >
                      <ImageWithFallback src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <h3
                          className="text-white/80 uppercase cursor-pointer"
                          onClick={() => onProductPress(item.product.id)}
                          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", lineHeight: 1.2 }}
                        >
                          {item.product.name}
                        </h3>
                        <p className="text-white/18 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px" }}>
                          Tam: {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white/40" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>{item.product.price}</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-7 h-7 flex items-center justify-center cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                            aria-label="Diminuir quantidade"
                          >
                            <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M3 7H11" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" /></svg>
                          </button>
                          <span className="text-white/60 w-4 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-7 h-7 flex items-center justify-center cursor-pointer"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                            aria-label="Aumentar quantidade"
                          >
                            <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 3V11M3 7H11" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="self-start mt-1 p-1.5 cursor-pointer"
                      aria-label={`Remover ${item.product.name}`}
                    >
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" /></svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary sidebar */}
          <div className="lg:w-[300px] lg:shrink-0 mt-6 lg:mt-0 lg:sticky lg:top-24 lg:self-start">
            {/* Shipping progress */}
            <div className="mb-5">
              <span className="text-white/18" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px", letterSpacing: "0.15em" }}>
                {freeShipping ? "FRETE GRATIS ATIVADO" : `FALTA R$ ${(299 - subtotal).toFixed(0)} P/ FRETE GRATIS`}
              </span>
              <div className="h-[2px] mt-2 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }} role="progressbar" aria-valuenow={Math.min(subtotal, 299)} aria-valuemax={299}>
                <motion.div
                  className="h-full"
                  style={{ background: freeShipping ? "rgba(120,255,150,0.4)" : "white" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((subtotal / 299) * 100, 100)}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className="h-[1px] my-4" style={{ background: "rgba(255,255,255,0.04)" }} />

            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <span className="text-white/20" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>Subtotal</span>
                <span className="text-white/45" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/20" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>Frete</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", color: freeShipping ? "rgba(120,255,150,0.5)" : "rgba(255,255,255,0.45)" }}>
                  {freeShipping ? "GRATIS" : "R$ 19,90"}
                </span>
              </div>
            </div>

            <div className="h-[1px] my-4" style={{ background: "rgba(255,255,255,0.04)" }} />

            <div className="flex justify-between items-end mb-6">
              <span className="text-white/30" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>Total</span>
              <span className="text-white/85" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", lineHeight: 1 }}>
                R$ {(subtotal + (freeShipping ? 0 : 19.9)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 cursor-pointer transition-opacity hover:opacity-90"
              style={{ background: "white", fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#080808" }}
            >
              FINALIZAR COMPRA
            </motion.button>
            <p className="text-center mt-3 text-white/10" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
              Parcele em ate 12x sem juros
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
