import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products, type Product } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ExploreScreenProps {
  onAddToCart: (product: Product) => void;
  onProductPress: (id: string) => void;
}

const lookbookImages = [
  {
    src: "https://images.unsplash.com/photo-1563721465742-cc3ead9deb36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWwlMjBtaW5pbWFsJTIwZGFya3xlbnwxfHx8fDE3NzE5Mzg1ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "EDITORIAL 01",
  },
  {
    src: "https://images.unsplash.com/photo-1643320477860-e903e4af260b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdCUyMG1vb2R5JTIwZGFya3xlbnwxfHx8fDE3NzE5Mzg1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "EDITORIAL 02",
  },
  {
    src: "https://images.unsplash.com/photo-1768825197238-629b1ae2dc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFzaGlvbiUyMG1vZGVsJTIwZWRpdG9yaWFsJTIwdXJiYW58ZW58MXx8fHwxNzcxOTM3Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "EDITORIAL 03",
  },
];

export function ExploreScreen({ onAddToCart, onProductPress }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = searchQuery
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  return (
    <main className="pt-24 pb-28 lg:pb-12 max-w-[1200px] mx-auto" role="main">
      <div className="px-5 sm:px-8">
        {/* Search */}
        <div className="mb-6 flex gap-2">
          <div
            className="relative flex items-center flex-1 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="ml-4 shrink-0" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
              <path d="M15.5 15.5L21 21" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-3 py-3 outline-none text-white/70 placeholder:text-white/15"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", letterSpacing: "0.03em" }}
              aria-label="Buscar produtos"
            />
          </div>

          {/* View toggle */}
          <div className="flex" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => setViewMode("grid")}
              className="w-10 h-full flex items-center justify-center cursor-pointer"
              style={{ background: viewMode === "grid" ? "rgba(255,255,255,0.06)" : "transparent" }}
              aria-label="Visualizacao em grade"
              aria-pressed={viewMode === "grid"}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="5" height="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <rect x="8" y="1" width="5" height="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <rect x="1" y="8" width="5" height="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <rect x="8" y="8" width="5" height="5" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="w-10 h-full flex items-center justify-center cursor-pointer"
              style={{ background: viewMode === "list" ? "rgba(255,255,255,0.06)" : "transparent" }}
              aria-label="Visualizacao em lista"
              aria-pressed={viewMode === "list"}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 3H13M1 7H13M1 11H13" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Lookbook */}
      {!searchQuery && (
        <section className="mb-8" aria-label="Lookbook">
          <div className="px-5 sm:px-8 mb-4">
            <h2
              className="text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1 }}
            >
              LOOK<span className="text-white/15">BOOK</span>
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-5 sm:px-8">
            {lookbookImages.map((img, i) => (
              <motion.div
                key={img.title}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i }}
                className="shrink-0 relative w-[180px] sm:w-[220px] lg:w-[260px] aspect-[3/4] overflow-hidden cursor-pointer group"
              >
                <ImageWithFallback src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(8,8,8,0.75) 100%)" }} />
                <span
                  className="absolute bottom-3 left-3 text-white/50"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7.5px", letterSpacing: "0.25em" }}
                >
                  {img.title}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Products */}
      <section className="px-5 sm:px-8" aria-label="Produtos">
        <h2
          className="text-white uppercase mb-5"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1 }}
        >
          {searchQuery ? "RESULTADOS" : "CATALOGO"} <span className="text-white/15">VRTX</span>
        </h2>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[5px] sm:gap-2">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.03 * i }}
                  className="relative group cursor-pointer"
                  onClick={() => onProductPress(product.id)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.88) 100%)" }} />
                    {product.tag && (
                      <div
                        className="absolute top-0 left-0 px-2 py-1"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif", fontSize: "7.5px", letterSpacing: "0.15em",
                          color: product.tag === "ESGOTANDO" ? "#fff" : "#080808",
                          background: product.tag === "ESGOTANDO" ? "rgba(200,40,40,0.85)" : "rgba(255,255,255,0.85)",
                        }}
                      >
                        {product.tag}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3
                        className="text-white/90 uppercase"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "15px", lineHeight: 1.15 }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-white/35 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>
                        {product.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.03 * i }}
                  className="flex gap-4 py-4 cursor-pointer group"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onClick={() => onProductPress(product.id)}
                >
                  <div className="w-[70px] sm:w-[85px] aspect-[3/4] overflow-hidden shrink-0">
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-white/85 uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "16px", lineHeight: 1.2 }}>
                      {product.name}
                    </h3>
                    <p className="text-white/25 mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}>
                      {product.price}
                    </p>
                    {product.tag && (
                      <span className="self-start mt-1.5 px-2 py-0.5" style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", letterSpacing: "0.12em",
                        color: product.tag === "ESGOTANDO" ? "rgba(255,100,100,0.7)" : "rgba(255,255,255,0.4)",
                        background: product.tag === "ESGOTANDO" ? "rgba(200,40,40,0.1)" : "rgba(255,255,255,0.03)",
                      }}>
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="self-center w-8 h-8 flex items-center justify-center shrink-0 cursor-pointer transition-colors hover:bg-white/8"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                    aria-label={`Adicionar ${product.name}`}
                  >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 3V11M3 7H11" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/15" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>
              Nenhum produto encontrado.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
