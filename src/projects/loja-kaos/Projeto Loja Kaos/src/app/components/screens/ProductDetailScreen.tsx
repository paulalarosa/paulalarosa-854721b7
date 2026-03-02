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

export function ProductDetailScreen({ product, onAddToCart, isWishlisted, onToggleWishlist }: ProductDetailScreenProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="pt-20 sm:pt-24 pb-32 lg:pb-12" role="main">
      {/* Desktop: side-by-side | Mobile: stacked */}
      <div className="lg:flex lg:gap-0 lg:max-w-[1200px] lg:mx-auto">
        {/* Image gallery */}
        <div className="lg:w-[55%] lg:sticky lg:top-24 lg:self-start">
          {/* Main image */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden bg-[#0c0c0c]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
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
                className="absolute top-4 left-4 px-3 py-1.5"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "8px",
                  letterSpacing: "0.2em",
                  color: product.tag === "ESGOTANDO" ? "#fff" : "#080808",
                  background: product.tag === "ESGOTANDO" ? "rgba(200,40,40,0.9)" : "white",
                }}
              >
                {product.tag}
              </div>
            )}

            {/* Wishlist button */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
              }}
              aria-label={isWishlisted ? "Remover dos desejos" : "Adicionar aos desejos"}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M10 17C10 17 2 12 2 7C2 4.24 4.24 2 7 2C8.4 2 9.6 2.6 10 3.5C10.4 2.6 11.6 2 13 2C15.76 2 18 4.24 18 7C18 12 10 17 10 17Z"
                  stroke="white"
                  strokeWidth="1.2"
                  fill={isWishlisted ? "white" : "none"}
                />
              </svg>
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-1 px-4 mt-2 lg:px-0 lg:mt-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="relative overflow-hidden cursor-pointer flex-1 max-w-[80px] aspect-square"
                  style={{
                    opacity: activeImage === i ? 1 : 0.4,
                    border: activeImage === i ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
                    transition: "all 0.2s",
                  }}
                  aria-label={`Imagem ${i + 1}`}
                >
                  <ImageWithFallback src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="lg:w-[45%] lg:pl-12 lg:pr-8 px-5 sm:px-8 mt-6 lg:mt-0">
          {/* Breadcrumb */}
          <p
            className="text-white/20 uppercase mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.2em",
            }}
          >
            {product.category}
          </p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white uppercase mb-2"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(28px, 5vw, 40px)",
              lineHeight: 1,
              letterSpacing: "0.02em",
            }}
          >
            {product.name}
          </motion.h1>

          {/* Price */}
          <p
            className="text-white/50 mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "14px",
              letterSpacing: "0.03em",
            }}
          >
            {product.price}
          </p>

          {/* Color */}
          <div className="mb-6">
            <p
              className="text-white/20 uppercase mb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.2em",
              }}
            >
              COR &mdash; {product.color}
            </p>
            <div
              className="w-6 h-6 rounded-full"
              style={{
                background: product.color === "PRATA" ? "#888" : product.color === "PRETO/BRANCO" ? "linear-gradient(135deg, #111 50%, #eee 50%)" : "#111",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              aria-label={`Cor: ${product.color}`}
            />
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <p
              className="text-white/20 uppercase mb-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.2em",
              }}
            >
              TAMANHO {selectedSize && <span className="text-white/50">&mdash; {selectedSize}</span>}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.05em",
                    color: selectedSize === size ? "#080808" : "rgba(255,255,255,0.5)",
                    background: selectedSize === size ? "white" : "transparent",
                    border: selectedSize === size ? "1px solid white" : "1px solid rgba(255,255,255,0.1)",
                  }}
                  aria-label={`Tamanho ${size}`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p
              className="text-white/35"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "12px",
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* Details accordion */}
          <div className="mb-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between py-4 cursor-pointer"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              aria-expanded={showDetails}
            >
              <span
                className="text-white/50 uppercase"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                }}
              >
                DETALHES
              </span>
              <motion.svg
                animate={{ rotate: showDetails ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"
              >
                <path d="M6 2V10M2 6H10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
              </motion.svg>
            </button>
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <ul className="py-3 flex flex-col gap-2">
                    {product.details.map((d, i) => (
                      <li
                        key={i}
                        className="text-white/25 flex items-center gap-2"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "11px",
                        }}
                      >
                        <span className="w-1 h-1 rounded-full bg-white/15 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              disabled={!selectedSize}
              className="flex-1 py-3.5 cursor-pointer transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                background: added ? "rgba(120,255,150,0.15)" : selectedSize ? "white" : "rgba(255,255,255,0.06)",
                color: added ? "rgba(120,255,150,0.8)" : selectedSize ? "#080808" : "rgba(255,255,255,0.2)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.2em",
                border: added ? "1px solid rgba(120,255,150,0.2)" : "1px solid transparent",
              }}
              aria-label={
                !selectedSize ? "Selecione um tamanho" :
                added ? "Adicionado a sacola" :
                `Adicionar ${product.name} a sacola`
              }
            >
              {added ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  ADICIONADO
                </>
              ) : !selectedSize ? (
                "SELECIONE O TAMANHO"
              ) : (
                "ADICIONAR A SACOLA"
              )}
            </motion.button>
          </div>

          {/* Info */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              "Frete gratis acima de R$ 299",
              "Troca gratuita em 30 dias",
              "Parcele em ate 12x sem juros",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6L5 9L10 3" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  className="text-white/20"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "10px",
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
