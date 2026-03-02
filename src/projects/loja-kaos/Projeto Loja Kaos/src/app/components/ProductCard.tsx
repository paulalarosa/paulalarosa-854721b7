import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  tag?: string;
  tall?: boolean;
  delay?: number;
  onAdd?: () => void;
  onPress?: () => void;
}

export function ProductCard({ image, name, price, tag, tall = false, delay = 0, onAdd, onPress }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    onAdd?.();
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 1, 0.5, 1] }}
      className={`relative overflow-hidden cursor-pointer group ${tall ? "row-span-2" : ""}`}
      onClick={onPress}
      tabIndex={0}
      aria-label={`${name}, ${price}`}
      onKeyDown={(e) => e.key === "Enter" && onPress?.()}
    >
      <div className={`relative w-full overflow-hidden ${tall ? "h-full min-h-[340px] sm:min-h-[400px]" : "aspect-[3/4]"}`}>
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.03]"
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 45%, rgba(8,8,8,0.9) 100%)" }}
        />

        {tag && (
          <div
            className="absolute top-0 left-0 px-2 py-1 z-10"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "7.5px",
              letterSpacing: "0.15em",
              color: tag === "ESGOTANDO" ? "#fff" : "#080808",
              background: tag === "ESGOTANDO" ? "rgba(200,40,40,0.85)" : "rgba(255,255,255,0.85)",
            }}
          >
            {tag}
          </div>
        )}

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <h3
            className="text-white/90 uppercase mb-0.5"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: tall ? "18px" : "15px",
              lineHeight: 1.15,
              letterSpacing: "0.01em",
            }}
          >
            {name}
          </h3>
          <p
            className="text-white/35"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}
          >
            {price}
          </p>
        </div>

        {/* Add button */}
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.92 }}
          className="absolute bottom-3 right-2.5 z-20 w-8 h-8 flex items-center justify-center cursor-pointer"
          style={{
            background: added ? "white" : "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "background 0.25s",
          }}
          aria-label={added ? "Adicionado" : `Adicionar ${name}`}
        >
          {added ? (
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10.5L11.5 3.5" stroke="#080808" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M7 3V11M3 7H11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
        </motion.button>
      </div>
    </motion.article>
  );
}
