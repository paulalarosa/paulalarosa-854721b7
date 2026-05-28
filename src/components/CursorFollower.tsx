import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const dotX = useSpring(rawX, { stiffness: 500, damping: 30, mass: 0.4 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 30, mass: 0.4 });
  const ringX = useSpring(rawX, { stiffness: 120, damping: 16, mass: 0.6 });
  const ringY = useSpring(rawY, { stiffness: 120, damping: 16, mass: 0.6 });

  useEffect(() => {
    const hoverOk = window.matchMedia("(hover: hover)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(hoverOk && finePointer && !reducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-magnetic]",
      );
      setActive(!!interactive);
    };

    const onOut = () => setActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onOut);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 pointer-events-none z-[58] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          className="block rounded-full bg-white"
          animate={{
            width: active ? 8 : 6,
            height: active ? 8 : 6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 pointer-events-none z-[57] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          className="block rounded-full border border-white"
          animate={{
            width: active ? 56 : 32,
            height: active ? 56 : 32,
            opacity: active ? 0.7 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
