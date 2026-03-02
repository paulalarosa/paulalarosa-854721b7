import { motion } from "motion/react";
import { HeroBanner } from "../HeroBanner";
import { CategoryScroll } from "../CategoryScroll";
import { ProductCard } from "../ProductCard";
import { MarqueeStrip } from "../MarqueeStrip";
import { products, type Product } from "../data";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HomeScreenProps {
  onAddToCart: (product: Product) => void;
  onProductPress: (id: string) => void;
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onAddToCart, onProductPress, onNavigate }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : activeCategory === "new"
      ? products.filter((p) => p.tag === "NOVO")
      : products.filter((p) => p.category === activeCategory);

  const gridProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <main className="pb-28 lg:pb-12" role="main">
      <HeroBanner image="https://images.unsplash.com/photo-1768825197238-629b1ae2dc18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFzaGlvbiUyMG1vZGVsJTIwZWRpdG9yaWFsJTIwdXJiYW58ZW58MXx8fHwxNzcxOTM3Nzc0fDA&ixlib=rb-4.1.0&q=80&w=1080" />

      <MarqueeStrip />

      <div className="max-w-[1200px] mx-auto">
        <CategoryScroll activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Section heading */}
        <div className="px-5 sm:px-8 mb-5 flex items-end justify-between">
          <h2
            className="text-white uppercase"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 0.95,
            }}
          >
            EM <span className="text-white/15">DESTAQUE</span>
          </h2>
          <button
            onClick={() => onNavigate("explore")}
            className="cursor-pointer pb-1 transition-colors hover:text-white/40"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.2)",
            }}
            aria-label="Ver todos os produtos"
          >
            VER TUDO
          </button>
        </div>

        {/* Responsive product grid */}
        <div className="px-3 sm:px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[5px] sm:gap-2 auto-rows-auto">
          {gridProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              tag={product.tag}
              tall={i === 0 || i === 3}
              delay={0.04 * i}
              onAdd={() => onAddToCart(product)}
              onPress={() => onProductPress(product.id)}
            />
          ))}
        </div>

        {/* Drop countdown */}
        <section className="mt-10 mx-4 sm:mx-8" aria-label="Proximo drop">
          <div
            className="relative overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="relative p-6 sm:p-8 sm:flex sm:items-center sm:justify-between">
              <div>
                <p
                  className="text-white/20 uppercase mb-1.5"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "8px",
                    letterSpacing: "0.3em",
                  }}
                >
                  PROXIMO DROP
                </p>
                <h3
                  className="text-white uppercase"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(28px, 4vw, 36px)",
                    lineHeight: 1,
                  }}
                >
                  VOID <span className="text-white/15">COLLECTION</span>
                </h3>

                <div className="flex gap-5 mt-4" role="timer" aria-label="Contagem regressiva">
                  {[
                    { value: "02", label: "DIAS" },
                    { value: "14", label: "HRS" },
                    { value: "37", label: "MIN" },
                    { value: "52", label: "SEG" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <span
                        className="text-white/85"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "24px",
                          lineHeight: 1,
                        }}
                      >
                        {item.value}
                      </span>
                      <span
                        className="text-white/15"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "7px",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate("drops")}
                className="mt-5 sm:mt-0 px-5 py-2.5 cursor-pointer transition-all hover:bg-white hover:text-[#080808]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                VER DROPS
              </button>
            </div>
            <div
              className="absolute top-0 left-0 w-[1.5px] h-full"
              style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)" }}
              aria-hidden="true"
            />
          </div>
        </section>

        {/* Feature banner */}
        <section className="mt-8 px-3 sm:px-6" aria-label="Camisetas oversize">
          <div className="relative w-full h-[180px] sm:h-[240px] overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1582735142555-dfe7455f7dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyc2l6ZWQlMjB0c2hpcnQlMjBzdHJlZXQlMjBmYXNoaW9ufGVufDF8fHx8MTc3MTgzMDkyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Camisetas oversize"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.3) 60%, transparent 100%)" }}
            />
            <div className="absolute bottom-0 left-0 p-5 sm:p-8">
              <p
                className="text-white/20 uppercase mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px", letterSpacing: "0.3em" }}
              >
                BASICOS ESSENCIAIS
              </p>
              <h3
                className="text-white uppercase"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(24px, 3.5vw, 32px)", lineHeight: 1 }}
              >
                CAMISETAS <span className="text-white/15">OVERSIZE</span>
              </h3>
              <button
                onClick={() => onNavigate("explore")}
                className="mt-3 px-5 py-2 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  background: "white",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "8.5px",
                  letterSpacing: "0.18em",
                  color: "#080808",
                }}
              >
                EXPLORAR
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 6H9.5M7 3.5L9.5 6L7 8.5" stroke="#080808" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Footer brand */}
        <div className="mt-12 mb-4 px-5 sm:px-8">
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {["FRETE GRATIS 299+", "TROCA 30 DIAS", "PARCELE 12X"].map((t) => (
              <span
                key={t}
                className="text-white/10 text-center"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "7px", letterSpacing: "0.12em" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Oversized brand watermark */}
          <div className="mt-8 text-center overflow-hidden" aria-hidden="true">
            <span
              className="text-white/[0.03] uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(80px, 20vw, 200px)",
                lineHeight: 0.85,
                letterSpacing: "0.1em",
              }}
            >
              VRTX
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
