import { useRef, useState, type ReactNode, type CSSProperties } from "react";

interface SpotlightProps {
  children: ReactNode;
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}

const Spotlight = ({
  children,
  color = "rgba(255,255,255,0.08)",
  size = 360,
  className,
  style,
}: SpotlightProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, visible: false });

  const handleMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const reset = () => setPos((p) => ({ ...p, visible: false }));

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative ${className ?? ""}`}
      style={{ ...style, overflow: "hidden" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: pos.visible ? 1 : 0,
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

export default Spotlight;
