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

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`cursor-pointer group ${tall ? "row-span-2" : ""}`}
      onClick={onPress}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onPress?.()}
      aria-label={`${name} — ${price}`}
    >
      {/* Imagem — fundo branco puro */}
      <div
        className={`relative overflow-hidden w-full ${tall ? "aspect-[2/3]" : "aspect-[3/4]"}`}
        style={{ background: "#FFFFFF" }}
      >
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {tag && (
          <div
            className="absolute top-0 left-0 px-2 py-1"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "7px",
              letterSpacing: "0.16em",
              fontWeight: 500,
              color: tag === "ESGOTANDO" ? "#fff" : "#0A0A0A",
              background: tag === "ESGOTANDO" ? "#B91C1C" : "rgba(245,244,240,0.88)",
            }}
          >{tag}</div>
        )}

        {/* Botão + no hover */}
        <button
          className="absolute bottom-0 right-0 w-9 h-9 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "#0A0A0A" }}
          onClick={(e) => {
            e.stopPropagation();
            setAdded(true);
            onAdd?.();
            setTimeout(() => setAdded(false), 1500);
          }}
          aria-label={added ? "Adicionado" : "Adicionar à sacola"}
        >
          <span style={{ fontSize: "15px", color: "#F5F4F0", lineHeight: 1 }}>
            {added ? "✓" : "+"}
          </span>
        </button>
      </div>

      {/* Info abaixo — off-white, não sobre a imagem */}
      <div className="pt-2 pb-3 px-0.5">
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "10px",
          letterSpacing: "0.02em",
          color: "rgba(10,10,10,0.42)",
          fontWeight: 300,
          lineHeight: 1.4,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}>{name}</p>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "11px",
          color: "#0A0A0A",
          fontWeight: 500,
          marginTop: "2px",
        }}>{price}</p>
      </div>
    </motion.article>
  );
}
