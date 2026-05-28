import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";
import { trackEvent } from "@/hooks/useAnalytics";

const ratingScore: Record<Metric["rating"], number> = { good: 1, "needs-improvement": 2, poor: 3 };

const report = (metric: Metric) => {
  trackEvent({
    event_type: "click",
    page_path: window.location.pathname,
    metadata: {
      web_vital: metric.name,
      value: Math.round(metric.value * 1000) / 1000,
      rating: metric.rating,
      rating_score: ratingScore[metric.rating],
      delta: metric.delta,
      navigation_type: metric.navigationType,
    },
  });
};

export const useWebVitals = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    onCLS(report);
    onFCP(report);
    onINP(report);
    onLCP(report);
    onTTFB(report);
  }, []);
};
