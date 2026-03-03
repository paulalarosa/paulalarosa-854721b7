import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { type Product } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

// Constantes de tema para o product detail (invertido — fundo claro)
const PD = {
  bg: "#FFFFFF",
  text: "#0A0A0A",
  textMuted: "rgba(10,10,10,0.42)",
  textGhost: "rgba(10,10,10,0.15)",
  border: "rgba(10,10,10,0.08)",
  btnBg: "#0A0A0A",
  btnText: "#F5F4F0",
};

export function ProductDetailScreen({ product, onAddToCart, isWishlisted, onToggleWishlist }: ProductDetailScreenProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main
      className="pt-20 pb-32 min-h-screen"
      style={{ background: PD.bg }}
      role="main"
    >
      {/* Imagem principal — sem bordas, full width */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={product.images[activeImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Tag */}
        {product.tag && (
          <div
            className="absolute top-0 left-0 px-2.5 py-1"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "7px",
              letterSpacing: "0.2em",
              fontWeight: 500,
              color: product.tag === "ESGOTANDO" ? "#F2F1EF" : "#0A0A0A",
              background: product.tag === "ESGOTANDO" ? "#C8102E" : "rgba(10,10,10,0.08)",
            }}
          >
            {product.tag}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-4 cursor-pointer"
          aria-label={isWishlisted ? "Remover dos desejos" : "Adicionar aos desejos"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21C12 21 3 15.5 3 9C3 6.24 5.24 4 8 4C9.58 4 11 4.8 12 6C13 4.8 14.42 4 16 4C18.76 4 21 6.24 21 9C21 15.5 12 21 12 21Z"
              stroke={PD.text}
              strokeWidth="1.2"
              fill={isWishlisted ? PD.text : "none"}
            />
          </svg>
        </button>

        {/* Thumbnails — linha de pontos se múltiplas imagens */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="cursor-pointer"
                style={{
                  width: i === activeImage ? "16px" : "5px",
                  height: "5px",
                  background: i === activeImage ? PD.text : PD.textGhost,
                  transition: "all 0.3s",
                }}
                aria-label={`Imagem ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info do produto */}
      <div className="px-5 mt-6">

        {/* Categoria + nome */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "8px",
          letterSpacing: "0.28em",
          color: PD.textMuted,
          fontWeight: 300,
          marginBottom: "6px",
          textTransform: "uppercase",
        }}>
          {product.category}
        </p>

        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(32px, 9vw, 48px)",
          lineHeight: 0.9,
          color: PD.text,
          letterSpacing: "0.01em",
        }}>
          {product.name.toUpperCase()}
        </h1>

        {/* Preço */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "18px",
          fontWeight: 400,
          color: PD.text,
          marginTop: "12px",
        }}>
          {product.price}
        </p>

        {/* Parcelas */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "10px",
          color: PD.textMuted,
          fontWeight: 300,
          marginTop: "2px",
        }}>
          em até 12× sem juros
        </p>

        {/* Divisor */}
        <div style={{ height: "1px", background: PD.border, margin: "20px 0" }} />

        {/* Seletor de tamanho — texto puro, sem pills */}
        <div>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.25em",
            color: PD.textMuted,
            fontWeight: 300,
            marginBottom: "12px",
          }}>
            TAMANHO {selectedSize ? `— ${selectedSize}` : ""}
          </p>

          <div className="flex gap-4 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="cursor-pointer relative pb-0.5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                  fontWeight: selectedSize === size ? 500 : 300,
                  color: selectedSize === size ? PD.text : PD.textMuted,
                  background: "transparent",
                  border: "none",
                  transition: "all 0.15s",
                }}
                aria-pressed={selectedSize === size}
              >
                {size}
                {/* Underline para tamanho selecionado */}
                {selectedSize === size && (
                  <motion.div
                    layoutId="size-indicator"
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: "1px", background: PD.text }}
                    transition={{ type: "spring", stiffness: 600, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: "1px", background: PD.border, margin: "20px 0" }} />

        {/* Descrição */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "13px",
          lineHeight: 1.7,
          color: PD.textMuted,
          fontWeight: 300,
        }}>
          {product.description}
        </p>

        {/* Detalhes — accordion */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-5 flex items-center justify-between w-full cursor-pointer"
          style={{ background: "transparent", border: "none" }}
          aria-expanded={showDetails}
        >
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.22em",
            color: PD.textMuted,
            fontWeight: 300,
          }}>
            DETALHES
          </span>
          <motion.span
            animate={{ rotate: showDetails ? 45 : 0 }}
            style={{ fontSize: "18px", color: PD.textMuted, lineHeight: 1 }}
          >
            +
          </motion.span>
        </button>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <ul className="mt-3 space-y-1.5 list-none m-0 p-0">
                {product.details.map((d) => (
                  <li
                    key={d}
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "12px",
                      color: PD.textMuted,
                      fontWeight: 300,
                    }}
                  >
                    — {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA fixo na base */}
      <div
        className="fixed bottom-0 left-0 right-0 px-5 z-50"
        style={{
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 24px)",
          paddingTop: "16px",
          background: `linear-gradient(0deg, ${PD.bg} 70%, transparent 100%)`,
        }}
      >
        <motion.button
          onClick={handleAdd}
          disabled={!selectedSize}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 cursor-pointer transition-all"
          style={{
            background: selectedSize ? PD.btnBg : "rgba(10,10,10,0.08)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.28em",
            fontWeight: 500,
            color: selectedSize ? PD.btnText : PD.textGhost,
            border: "none",
            transition: "all 0.2s",
          }}
        >
          {!selectedSize
            ? "SELECIONE O TAMANHO"
            : added
              ? "ADICIONADO ✓"
              : "ADICIONAR À SACOLA"}
        </motion.button>
      </div>
    </main>
  );
}
