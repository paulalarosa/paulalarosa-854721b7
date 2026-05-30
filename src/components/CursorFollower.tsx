import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "view" | "link" | "drag" | "text";

const CursorFollower = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");

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

      // data-cursor attribute takes priority
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorEl?.dataset.cursor) {
        const state = cursorEl.dataset.cursor as CursorState;
        setCursorState(state);
        setActive(state !== "default");
        return;
      }

      // fallback: standard interactive elements
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-magnetic]",
      );
      if (interactive) {
        const tag = (interactive as HTMLElement).tagName.toLowerCase();
        if (tag === "input" || tag === "textarea") {
          setCursorState("text");
        } else if ((interactive as HTMLElement).closest("a")) {
          setCursorState("link");
        } else {
          setCursorState("default");
        }
        setActive(true);
      } else {
        setCursorState("default");
        setActive(false);
      }
    };

    const onOut = () => {
      setCursorState("default");
      setActive(false);
    };

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

  // Ring size per state
  const ringSize = {
    default: active ? 56 : 32,
    view: 56,
    link: 40,
    drag: 48,
    text: 32,
  }[cursorState];

  const ringOpacity = {
    default: active ? 0.7 : 0.4,
    view: 0.85,
    link: 0.75,
    drag: 0.8,
    text: 0,
  }[cursorState];

  const showDot = cursorState !== "text";

  // Label shown inside ring for some states
  const label: Record<CursorState, string | null> = {
    default: null,
    view: "VER",
    link: null,
    drag: "↔",
    text: null,
  };

  return (
    <>
      {/* Dot */}
      {showDot && (
        <motion.div
          aria-hidden="true"
          className="fixed left-0 top-0 pointer-events-none z-[9998] mix-blend-difference"
          style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        >
          <motion.span
            className="block rounded-full bg-white"
            animate={{ width: active ? 8 : 6, height: active ? 8 : 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          />
        </motion.div>
      )}

      {/* Ring */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 pointer-events-none z-[9997] mix-blend-difference flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          className="block rounded-full border border-white flex items-center justify-center relative"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: ringOpacity,
            rotate: cursorState === "link" ? 360 : 0,
          }}
          transition={{
            width: { type: "spring", stiffness: 240, damping: 22 },
            height: { type: "spring", stiffness: 240, damping: 22 },
            opacity: { duration: 0.2 },
            rotate: cursorState === "link"
              ? { duration: 2, repeat: Infinity, ease: "linear" }
              : { duration: 0.2 },
          }}
        >
          {label[cursorState] && (
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-white font-semibold tracking-wider">
              {label[cursorState]}
            </span>
          )}
        </motion.span>
      </motion.div>

      {/* I-beam for text state */}
      {cursorState === "text" && (
        <motion.div
          aria-hidden="true"
          className="fixed left-0 top-0 pointer-events-none z-[9998] mix-blend-difference"
          style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-0.5 h-5 bg-white rounded-full" />
        </motion.div>
      )}
    </>
  );
};

export default CursorFollower;
