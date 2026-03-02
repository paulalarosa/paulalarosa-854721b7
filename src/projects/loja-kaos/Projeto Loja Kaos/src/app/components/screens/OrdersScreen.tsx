import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { products } from "../data";

const orders = [
  {
    id: "#VX-2841",
    date: "18 Fev 2026",
    status: "Entregue",
    total: "R$ 489,00",
    items: [{ productId: "1", size: "M", qty: 1 }],
    tracking: "BR2841VRTX26",
  },
  {
    id: "#VX-2756",
    date: "02 Fev 2026",
    status: "Em transito",
    total: "R$ 1.199,00",
    items: [{ productId: "4", size: "G", qty: 1 }],
    tracking: "BR2756VRTX26",
  },
  {
    id: "#VX-2680",
    date: "15 Jan 2026",
    status: "Entregue",
    total: "R$ 549,00",
    items: [{ productId: "5", size: "40", qty: 1 }],
    tracking: "BR2680VRTX26",
  },
];

export function OrdersScreen() {
  return (
    <main className="pt-24 pb-32 lg:pb-12 px-5 sm:px-8 max-w-[800px] mx-auto" role="main">
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
        MEUS <span className="text-white/20">PEDIDOS</span>
      </motion.h2>
      <p
        className="text-white/25 mb-8"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "11px",
        }}
      >
        {orders.length} pedidos realizados
      </p>

      <div className="flex flex-col gap-4">
        {orders.map((order, i) => {
          const product = products.find((p) => p.id === order.items[0].productId);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i }}
              className="p-4 sm:p-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="text-white/70"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    {order.id}
                  </p>
                  <p
                    className="text-white/20 mt-0.5"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "10px",
                    }}
                  >
                    {order.date}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full"
                  style={{
                    background: order.status === "Entregue" ? "rgba(120,255,150,0.08)" : "rgba(255,200,80,0.08)",
                    border: `1px solid ${order.status === "Entregue" ? "rgba(120,255,150,0.12)" : "rgba(255,200,80,0.12)"}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "8px",
                      letterSpacing: "0.15em",
                      color: order.status === "Entregue" ? "rgba(120,255,150,0.7)" : "rgba(255,200,80,0.7)",
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Product */}
              {product && (
                <div className="flex gap-3 mb-4">
                  <div className="w-[60px] h-[75px] overflow-hidden shrink-0">
                    <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p
                      className="text-white/70 uppercase"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "15px",
                        lineHeight: 1.2,
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      className="text-white/20 mt-0.5"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "10px",
                      }}
                    >
                      Tam: {order.items[0].size} &bull; Qtd: {order.items[0].qty}
                    </p>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div
                className="flex items-center justify-between pt-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span
                  className="text-white/30"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "12px",
                  }}
                >
                  {order.total}
                </span>
                <button
                  className="px-4 py-1.5 cursor-pointer transition-colors hover:bg-white/8"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "8px",
                    letterSpacing: "0.18em",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  aria-label={`Rastrear pedido ${order.id}`}
                >
                  RASTREAR
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
