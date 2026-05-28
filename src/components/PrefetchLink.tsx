import { useCallback, useRef, type ComponentProps } from "react";
import { Link } from "react-router-dom";

type Prefetcher = () => Promise<unknown>;

const prefetchers: Record<string, Prefetcher | undefined> = {
  "case-study": () => import("@/pages/CaseStudy"),
  projeto: () => import("@/pages/ProjetoPage"),
};

const resolvePrefetcher = (to: string): Prefetcher | undefined => {
  const [, segment] = to.split("/");
  return prefetchers[segment];
};

interface PrefetchLinkProps extends ComponentProps<typeof Link> {
  to: string;
}

const PrefetchLink = ({ to, onMouseEnter, onFocus, ...rest }: PrefetchLinkProps) => {
  const prefetchedRef = useRef(false);

  const prefetch = useCallback(() => {
    if (prefetchedRef.current) return;
    const fn = typeof to === "string" ? resolvePrefetcher(to) : undefined;
    if (fn) {
      prefetchedRef.current = true;
      fn().catch(() => {
        prefetchedRef.current = false;
      });
    }
  }, [to]);

  return (
    <Link
      {...rest}
      to={to}
      onMouseEnter={(e) => {
        prefetch();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        prefetch();
        onFocus?.(e);
      }}
    />
  );
};

export default PrefetchLink;
