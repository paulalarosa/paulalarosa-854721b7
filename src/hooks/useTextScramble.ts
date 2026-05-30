import { useState, useEffect, useRef, RefObject } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const DURATION_MS = 800;

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export function useTextScramble(
  text: string,
  trigger = true,
): { displayText: string; ref: RefObject<HTMLElement | null> } {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayText(text);
      return;
    }

    const chars = text.split("");
    const resolvedAt = chars.map((_, i) =>
      chars[i] === " " ? 0 : Math.floor((i / chars.length) * DURATION_MS)
    );
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const next = chars.map((char, i) => {
        if (char === " ") return " ";
        if (elapsed >= resolvedAt[i]) return char;
        return randomChar();
      });
      setDisplayText(next.join(""));
      if (elapsed < DURATION_MS) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, trigger]);

  return { displayText, ref };
}
