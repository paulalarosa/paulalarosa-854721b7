import { supabase } from "@/integrations/supabase/client";

export type SubscriptionResult =
  | { success: true }
  | { success: false; reason: "duplicate" | "error" };

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const fireWelcomeEmail = async (email: string) => {
  if (!SUPABASE_URL) return;
  try {
    // Fire-and-forget; we don't block the subscribe flow on it. The edge
    // function itself responds 200 even when RESEND_API_KEY is unset, so
    // failures here only matter in real production with a misconfigured key.
    await fetch(`${SUPABASE_URL}/functions/v1/newsletter-welcome`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  } catch {
    // Intentionally silent — welcome email is a nice-to-have, not the source of truth.
  }
};

export async function subscribeToNewsletter(email: string): Promise<SubscriptionResult> {
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { success: false, reason: "duplicate" };
    }
    return { success: false, reason: "error" };
  }

  fireWelcomeEmail(email);
  return { success: true };
}
