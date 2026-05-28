import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis intercepts wheel/touch; window.scrollTo alone leaves Lenis's
    // internal target out of sync, causing GSAP ScrollTriggers to compute
    // offsets against a stale position after route changes.
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
