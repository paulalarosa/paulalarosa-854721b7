import { Mail, Phone, Linkedin, Send, Loader2, CheckCircle, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { useContactForm } from "@/hooks/useContactForm";
import { trackEvent } from "@/hooks/useAnalytics";
import { CONTACT, whatsappUrl } from "@/lib/constants";

interface ContactLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  ariaLabel: string;
  onTrack: () => void;
  external?: boolean;
}

const ContactLink = ({ href, icon: Icon, label, value, ariaLabel, onTrack, external }: ContactLinkProps) => {
  const handleClick = () => {
    onTrack();
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className="w-full text-left flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-base group hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="w-12 h-12 border-2 border-gray-light rounded-lg flex items-center justify-center group-hover:border-accent/30 transition-base">
        <Icon className="h-5 w-5 text-primary stroke-[1.5]" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
        <div className="font-medium text-foreground text-sm">{value}</div>
      </div>
    </button>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const { formData, isSubmitting, isSubmitted, handleChange, handleSubmit: originalHandleSubmit } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    trackEvent({
      event_type: "form_submit",
      page_path: window.location.pathname,
      metadata: { form_name: "contact_form" },
    });
    await originalHandleSubmit(e);
  };

  const trackLink = (destination: string, label: string) => () =>
    trackEvent({
      event_type: "external_link",
      page_path: window.location.pathname,
      metadata: { destination, label },
    });

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t("contact.title")}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-3 bg-background p-8 rounded-lg border border-border relative">
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-sm rounded-lg p-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    className="text-accent"
                  >
                    <CheckCircle className="h-12 w-12" />
                  </motion.span>
                  <h3 className="font-serif text-2xl text-primary">{t("contact.redirecting")}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {t("contact.redirectingDesc")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  {t("contact.name")}
                </label>
                <Input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0"
                  placeholder={`${t("contact.name")} *`}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="sr-only">
                  {t("contact.email")}
                </label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0"
                  placeholder={`${t("contact.email")} *`}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">
                  {t("contact.message")}
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0 resize-none"
                  placeholder={`${t("contact.message")} *`}
                />
              </div>

              <div id="recaptcha-badge" />

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base shadow-silver border border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                )}
                {isSubmitting ? t("contact.verifying") : t("contact.send")}
              </Button>

              <p className="text-xs text-muted-foreground mt-4">
                {t("contact.recaptchaNotice")}{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-reveal hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {t("contact.recaptchaPrivacy")}
                </a>{" "}
                {t("contact.recaptchaAnd")}{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-reveal hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {t("contact.recaptchaTerms")}
                </a>{" "}
                {t("contact.recaptchaApply")}
              </p>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <ContactLink
              href={`mailto:${CONTACT.email}?subject=Contato via Portfolio - Desenvolvimento Frontend`}
              icon={Mail}
              label="Email"
              value={t("contact.sendEmail")}
              ariaLabel={`${t("contact.sendEmail")} — ${CONTACT.email}`}
              onTrack={trackLink("email", "Email Contact")}
            />
            <ContactLink
              href={whatsappUrl("Olá Paula!")}
              icon={Phone}
              label="WhatsApp"
              value={t("contact.startChat")}
              ariaLabel={`${t("contact.startChat")} — WhatsApp`}
              onTrack={trackLink("whatsapp", "WhatsApp Contact Section")}
              external
            />
            <ContactLink
              href={CONTACT.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              value={t("contact.connectLinkedIn")}
              ariaLabel={`${t("contact.connectLinkedIn")} — LinkedIn de Paula La Rosa`}
              onTrack={trackLink("linkedin", "LinkedIn Profile")}
              external
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
