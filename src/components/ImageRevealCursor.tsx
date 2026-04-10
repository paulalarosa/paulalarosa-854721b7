import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageRevealItem {
  id: string;
  label: string;
  sublabel?: string;
  imageSrc: string;
  href?: string;
}

interface ImageRevealCursorProps {
  items: ImageRevealItem[];
  onItemClick?: (item: ImageRevealItem) => void;
  className?: string;
}

const ImageRevealCursor = ({
  items,
  onItemClick,
  className = "",
}: ImageRevealCursorProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x - 160,
              y: mousePos.y - 100,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              x: { type: "spring", stiffness: 200, damping: 25 },
              y: { type: "spring", stiffness: 200, damping: 25 },
            }}
            className="absolute z-50 pointer-events-none hidden lg:block"
            style={{ top: 0, left: 0 }}
          >
            <div
              className="w-[320px] h-[200px] rounded-lg overflow-hidden shadow-lg"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={activeItem.imageSrc}
                alt={activeItem.label}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divide-y divide-border">
        {items.map((item) => (
          <motion.div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            onClick={() => onItemClick?.(item)}
            className="group flex items-center justify-between py-6 px-4 cursor-pointer transition-colors duration-200 hover:bg-accent/5"
          >
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                {item.label}
              </h3>
              {item.sublabel && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item.sublabel}
                </p>
              )}
            </div>
            <motion.div
              className="text-muted-foreground group-hover:text-accent transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageRevealCursor;
