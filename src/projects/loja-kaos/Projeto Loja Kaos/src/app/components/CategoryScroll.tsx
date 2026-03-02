import { motion } from "motion/react";

const categories = [
  { id: "all", label: "TUDO" },
  { id: "new", label: "NOVIDADES" },
  { id: "moletons", label: "MOLETONS" },
  { id: "jaquetas", label: "JAQUETAS" },
  { id: "calcas", label: "CALCAS" },
  { id: "acessorios", label: "ACESSORIOS" },
  { id: "tenis", label: "TENIS" },
];

interface CategoryScrollProps {
  activeCategory?: string;
  onCategoryChange?: (id: string) => void;
}

export function CategoryScroll({ activeCategory = "all", onCategoryChange }: CategoryScrollProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4 px-5 sm:px-8" role="tablist" aria-label="Categorias">
      <div className="flex gap-2 min-w-max">
        {categories.map((cat, i) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.3 }}
              onClick={() => onCategoryChange?.(cat.id)}
              className="px-4 py-[7px] cursor-pointer whitespace-nowrap transition-all duration-200"
              style={{
                background: isActive ? "white" : "transparent",
                border: isActive ? "1px solid white" : "1px solid rgba(255,255,255,0.06)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: isActive ? "#080808" : "rgba(255,255,255,0.22)",
              }}
              role="tab"
              aria-selected={isActive}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
