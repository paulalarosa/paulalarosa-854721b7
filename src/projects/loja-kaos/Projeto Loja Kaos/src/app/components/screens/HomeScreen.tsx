import { motion } from "motion/react";
import { HeroBanner } from "../HeroBanner";
import { ProductCard } from "../ProductCard";
import { MarqueeStrip } from "../MarqueeStrip";
import { products, type Product } from "../data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface HomeScreenProps {
  onAddToCart: (product: Product) => void;
  onProductPress: (id: string) => void;
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onAddToCart, onProductPress, onNavigate }: HomeScreenProps) {
  return (
    <main className="pb-28" style={{ background: "#F5F4F0" }} role="main">
      <HeroBanner
        image="/img/kaos/kaos_hero.webp"
        onShop={() => onNavigate("explore")}
      />
      <MarqueeStrip />

      {/* ── NOVIDADES ── */}
      <section className="px-4 pt-12" aria-label="Novidades">
        <div className="flex items-baseline justify-between mb-6">
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 12vw, 64px)",
            lineHeight: 0.86,
            color: "#0A0A0A",
          }}>NOVIDADES</h2>
          <button onClick={() => onNavigate("explore")} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.22em",
            color: "rgba(10,10,10,0.28)",
            fontWeight: 300,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}>VER TUDO</button>
        </div>

        {/* Grid assimétrico: col esq tall, col dir dois pequenos */}
        <div className="grid grid-cols-2 gap-[3px]">
          <div className="row-span-2">
            {products[0] && (
              <ProductCard
                image={products[0].image} name={products[0].name}
                price={products[0].price} tag={products[0].tag} tall
                onAdd={() => onAddToCart(products[0])}
                onPress={() => onProductPress(products[0].id)}
              />
            )}
          </div>
          {products.slice(1, 3).map((p, i) => (
            <ProductCard key={p.id} image={p.image} name={p.name}
              price={p.price} tag={p.tag} delay={0.08 * (i + 1)}
              onAdd={() => onAddToCart(p)} onPress={() => onProductPress(p.id)}
            />
          ))}
        </div>
      </section>

      {/* ── DROP — ÚNICO bloco preto, contraste intencional ── */}
      <section className="mx-4 mt-12" aria-label="Próximo drop">
        <div style={{ background: "#0A0A0A", padding: "28px 22px 32px" }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.38em",
            color: "rgba(255,255,255,0.22)",
            fontWeight: 300,
            marginBottom: "8px",
          }}>PRÓXIMO DROP</p>
          <h3 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(42px, 13vw, 60px)",
            lineHeight: 0.86,
            color: "white",
          }}>
            VOID<br />
            <span style={{ color: "rgba(255,255,255,0.1)" }}>COLLECTION</span>
          </h3>
          <div className="flex gap-6 mt-5" role="timer">
            {[{ v: "02", l: "DIAS" }, { v: "14", l: "HRS" }, { v: "37", l: "MIN" }].map(item => (
              <div key={item.l} className="flex flex-col">
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "36px", lineHeight: 1, color: "rgba(255,255,255,0.85)" }}>{item.v}</span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "7px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>{item.l}</span>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate("drops")} className="mt-6 cursor-pointer" style={{
            border: "1px solid rgba(255,255,255,0.14)",
            padding: "9px 20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.26em",
            color: "rgba(255,255,255,0.38)",
            fontWeight: 300,
            background: "transparent",
          }}>ATIVAR LEMBRETE</button>
        </div>
      </section>

      {/* ── EM DESTAQUE — 3 colunas ── */}
      <section className="px-4 mt-12" aria-label="Em destaque">
        <div className="flex items-baseline justify-between mb-6">
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(32px, 9vw, 50px)",
            lineHeight: 0.86,
            color: "#0A0A0A",
          }}>EM DESTAQUE</h2>
          <button onClick={() => onNavigate("explore")} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.22em",
            color: "rgba(10,10,10,0.28)",
            fontWeight: 300,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}>CATÁLOGO</button>
        </div>
        <div className="grid grid-cols-3 gap-[3px]">
          {products.slice(3, 6).map((p, i) => (
            <ProductCard key={p.id} image={p.image} name={p.name}
              price={p.price} tag={p.tag} delay={0.04 * i}
              onAdd={() => onAddToCart(p)} onPress={() => onProductPress(p.id)}
            />
          ))}
        </div>
      </section>

      {/* Watermark fantasma */}
      <div className="mt-16 overflow-hidden" aria-hidden="true">
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(80px, 30vw, 180px)",
          lineHeight: 0.82,
          color: "rgba(10,10,10,0.04)",
          letterSpacing: "0.06em",
          textAlign: "center",
        }}>KAOS</div>
      </div>
    </main>
  );
}
