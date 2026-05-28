import { useCallback } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> };
};

/**
 * Wraps a DOM-mutating callback in document.startViewTransition() when the
 * browser supports it (Chrome 111+, Edge 111+, Safari 18.2+, Opera 96+).
 * On unsupported browsers it just runs the callback synchronously — the
 * caller never has to branch.
 *
 * Reads prefers-reduced-motion so users that opted out get the plain
 * synchronous update with no animation.
 */
export const useViewTransition = () => {
  return useCallback((mutate: () => void | Promise<void>) => {
    const doc = document as ViewTransitionDocument;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      void mutate();
      return;
    }

    doc.startViewTransition(() => Promise.resolve(mutate()));
  }, []);
};
