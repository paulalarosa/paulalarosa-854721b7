import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const getVisitorId = (): string => {
  let visitorId = localStorage.getItem("visitor_id");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitor_id", visitorId);
  }
  return visitorId;
};

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("session_id", sessionId);
  }
  return sessionId;
};

type EventType = "page_view" | "click" | "scroll" | "form_submit" | "external_link";

interface TrackEventOptions {
  event_type: EventType;
  page_path: string;
  page_title?: string;
  metadata?: Record<string, unknown>;
}

export const trackEvent = async (options: TrackEventOptions): Promise<void> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/track-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...options,
        session_id: getSessionId(),
        visitor_id: getVisitorId(),
        referrer: document.referrer,
      }),
    });

    if (!response.ok) {
      console.warn("[Analytics] Failed to track event:", await response.text());
    }
  } catch (error) {
    console.warn("[Analytics] Error tracking event:", error);
  }
};

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent({
      event_type: "page_view",
      page_path: location.pathname + location.hash,
      page_title: document.title,
    });
  }, [location.pathname, location.hash]);

  const trackExternalLink = useCallback(
    (url: string, label?: string) => {
      trackEvent({
        event_type: "external_link",
        page_path: location.pathname,
        metadata: { url, label },
      });
    },
    [location.pathname],
  );

  const trackFormSubmit = useCallback(
    (formName: string) => {
      trackEvent({
        event_type: "form_submit",
        page_path: location.pathname,
        metadata: { form_name: formName },
      });
    },
    [location.pathname],
  );

  const trackClick = useCallback(
    (elementId: string, label?: string) => {
      trackEvent({
        event_type: "click",
        page_path: location.pathname,
        metadata: { element_id: elementId, label },
      });
    },
    [location.pathname],
  );

  return {
    trackExternalLink,
    trackFormSubmit,
    trackClick,
  };
};
