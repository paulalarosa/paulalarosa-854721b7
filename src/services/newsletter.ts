import { supabase } from "@/integrations/supabase/client";

export type SubscriptionResult =
  | { success: true }
  | { success: false; reason: "duplicate" | "error" };

export async function subscribeToNewsletter(email: string): Promise<SubscriptionResult> {
  const { error } = await supabase.from("newsletter_subscribers").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return { success: false, reason: "duplicate" };
    }
    return { success: false, reason: "error" };
  }

  return { success: true };
}
