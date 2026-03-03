import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products, type Product } from "../data";
import { ProductCard } from "../ProductCard";

interface ExploreScreenProps {
  onAddToCart: (product: Product) => void;
  onProductPress: (id: string) => void;
}

export function ExploreScreen({ onAddToCart, onProductPress }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("TUDO");

  const filters = ["TUDO", "MOLETONS", "JAQUETAS", "CALÇAS", "TÊNIS", "ACESSÓRIOS"];
  const catMap: Record<string, string> = {
    "MOLETONS": "moletons", "JAQUETAS": "jaquetas", "CALÇAS": "calcas", "TÊNIS": "tenis", "ACESSÓRIOS": "acessorios"
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "TUDO" || p.category === catMap[activeFilter];
    return matchSearch && matchFilter;
  });

  return (
    <main className="pt-24 pb-28" style={{ background: "#F5F4F0" }} role="main">

      {/* Busca — underline style */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3" style={{ borderBottom: "1px solid rgba(10,10,10,0.1)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="10.5" cy="10.5" r="7" stroke="rgba(10,10,10,0.28)" strokeWidth="1.3" />
            <path d="M16 16L21 21" stroke="rgba(10,10,10,0.28)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            type="search" placeholder="buscar" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-3 outline-none bg-transparent"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.04em",
              color: "#0A0A0A",
              fontWeight: 300,
            }}
            aria-label="Buscar produtos"
          />
        </div>
      </div>

      {/* Filtros — underline animado */}
      <div className="px-5 flex gap-6 overflow-x-auto scrollbar-hide pb-1 mb-6">
        {filters.map((f) => {
          const isActive = activeFilter === f;
          return (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="relative whitespace-nowrap shrink-0 cursor-pointer pb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.2em",
                fontWeight: isActive ? 500 : 300,
                color: isActive ? "#0A0A0A" : "rgba(10,10,10,0.26)",
                background: "transparent",
                border: "none",
                transition: "color 0.2s",
              }}
            >
              {f}
              {isActive && (
                <motion.div
                  layoutId="filter-line"
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: "1.5px", background: "#0A0A0A" }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Categoria como tipografia gigante de fundo */}
      <div className="relative px-5 mb-4 overflow-hidden h-8">
        <div
          className="absolute -top-4 inset-x-0 text-center select-none pointer-events-none"
          aria-hidden="true"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(60px, 18vw, 110px)",
            color: "rgba(10,10,10,0.04)",
            lineHeight: 1,
            letterSpacing: "0.04em",
          }}
        >{activeFilter}</div>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "9px",
          letterSpacing: "0.16em",
          color: "rgba(10,10,10,0.28)",
          fontWeight: 300,
          position: "relative",
          zIndex: 1,
        }}>{filteredProducts.length} peças</p>
      </div>

      {/* Grid 2 colunas */}
      <div className="px-3 grid grid-cols-2 gap-[3px]">
        {filteredProducts.map((p, i) => (
          <ProductCard key={p.id} image={p.image} name={p.name}
            price={p.price} tag={p.tag} tall={i % 5 === 0} delay={0.03 * i}
            onAdd={() => onAddToCart(p)} onPress={() => onProductPress(p.id)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="px-5 py-20 text-center">
          <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "28px", color: "rgba(10,10,10,0.12)" }}>
            SEM RESULTADOS
          </p>
        </div>
      )}
    </main>
  );
}
