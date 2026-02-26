import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { EmailSchema } from "@/types";
import { subscribeToNewsletter } from "@/services/newsletter";

export function useNewsletterSubscription() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const validation = EmailSchema.safeParse(normalizedEmail);

    if (!validation.success) {
      toast.error(normalizedEmail ? t("newsletter.errorInvalid") : t("newsletter.errorEmpty"));
      return;
    }

    setIsLoading(true);

    const result = await subscribeToNewsletter(validation.data);

    if (result.success === false) {
      toast[result.reason === "duplicate" ? "info" : "error"](
        t(
          result.reason === "duplicate"
            ? "newsletter.alreadySubscribed"
            : "newsletter.errorGeneric",
        ),
      );
      setIsLoading(false);
      return;
    }

    setIsSubmitted(true);
    toast.success(t("newsletter.success"));
    setEmail("");

    setTimeout(() => setIsSubmitted(false), 5000);
    setIsLoading(false);
  };

  return {
    email,
    setEmail,
    isSubmitted,
    isLoading,
    handleSubmit,
  };
}
