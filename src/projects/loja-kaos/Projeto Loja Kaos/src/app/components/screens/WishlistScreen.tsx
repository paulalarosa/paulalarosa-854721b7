import { motion } from "motion/react";
import { products, type Product } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface WishlistScreenProps {
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onProductPress: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export function WishlistScreen({ wishlist, onToggleWishlist, onProductPress, onAddToCart }: WishlistScreenProps) {
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="pt-24 pb-32 lg:pb-12 px-5 sm:px-8 max-w-[1000px] mx-auto" role="main">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white uppercase mb-1"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(30px, 5vw, 40px)",
          lineHeight: 1,
        }}
      >
        LISTA DE <span className="text-white/20">DESEJOS</span>
      </motion.h2>
      <p
        className="text-white/25 mb-8"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "11px",
        }}
      >
        {items.length} {items.length === 1 ? "item salvo" : "itens salvos"}
      </p>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-20"
        >
          <svg width="40" height="40" viewBox="0 0 20 20" fill="none" className="mb-3 opacity-10" aria-hidden="true">
            <path d="M10 17C10 17 2 12 2 7C2 4.24 4.24 2 7 2C8.4 2 9.6 2.6 10 3.5C10.4 2.6 11.6 2 13 2C15.76 2 18 4.24 18 7C18 12 10 17 10 17Z" stroke="white" strokeWidth="1.2" />
          </svg>
          <p className="text-white/15" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>
            Nenhum item na lista.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[6px] sm:gap-3">
          {items.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i }}
              className="relative group cursor-pointer"
              onClick={() => onProductPress(product.id)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.9) 100%)",
                  }}
                />

                {/* Remove from wishlist */}
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-10"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(6px)",
                  }}
                  aria-label={`Remover ${product.name} dos desejos`}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 3L11 11M11 3L3 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3
                    className="text-white/90 uppercase"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "15px",
                      lineHeight: 1.15,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-white/40 mt-0.5"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "11px",
                    }}
                  >
                    {product.price}
                  </p>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                className="w-full py-2.5 mt-[1px] cursor-pointer transition-colors hover:bg-white/8"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.4)",
                }}
                aria-label={`Adicionar ${product.name} a sacola`}
              >
                ADICIONAR
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
