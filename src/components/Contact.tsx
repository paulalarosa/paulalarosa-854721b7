import { Mail, Phone, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '@/hooks/useContactForm';
import { trackEvent } from '@/hooks/useAnalytics';

const Contact = () => {
  const { t } = useTranslation();
  const { formData, isSubmitting, handleChange, handleSubmit: originalHandleSubmit } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    trackEvent({
      event_type: 'form_submit',
      page_path: window.location.pathname,
      metadata: { form_name: 'contact_form' }
    });
    await originalHandleSubmit(e);
  };

  const handleExternalLinkClick = (destination: string, label: string) => {
    trackEvent({
      event_type: 'external_link',
      page_path: window.location.pathname,
      metadata: { destination, label }
    });
  };

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-3 bg-background p-8 rounded-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0"
                placeholder={t('contact.name')}
              />

              <Input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0"
                placeholder={t('contact.email')}
              />

              <Textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0 resize-none"
                placeholder={t('contact.message')}
              />

              <div id="recaptcha-badge" />
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base shadow-silver border border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Verificando...' : t('contact.send')}
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Este site é protegido pelo reCAPTCHA e as{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  Políticas de Privacidade
                </a>{' '}
                e{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                  Termos de Serviço
                </a>{' '}
                do Google se aplicam.
              </p>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <a
              href="mailto:prenata@gmail.com"
              onClick={() => handleExternalLinkClick('email', 'Email Contact')}
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-base group hover-lift"
            >
              <div className="w-12 h-12 border-2 border-gray-light rounded-lg flex items-center justify-center group-hover:border-accent/30 transition-base">
                <Mail className="h-5 w-5 text-primary stroke-[1.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</div>
                <div className="font-medium text-foreground text-sm">{t('contact.sendEmail')}</div>
              </div>
            </a>

            <a
              href="https://wa.me/5521983604870"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalLinkClick('whatsapp', 'WhatsApp Contact Section')}
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-base group hover-lift"
            >
              <div className="w-12 h-12 border-2 border-gray-light rounded-lg flex items-center justify-center group-hover:border-accent/30 transition-base">
                <Phone className="h-5 w-5 text-primary stroke-[1.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">WhatsApp</div>
                <div className="font-medium text-foreground text-sm">{t('contact.startChat')}</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/paula-la-rosa-228889119/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleExternalLinkClick('linkedin', 'LinkedIn Profile')}
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-accent/30 transition-base group hover-lift"
            >
              <div className="w-12 h-12 border-2 border-gray-light rounded-lg flex items-center justify-center group-hover:border-accent/30 transition-base">
                <Linkedin className="h-5 w-5 text-primary stroke-[1.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">LinkedIn</div>
                <div className="font-medium text-foreground text-sm">{t('contact.connectLinkedIn')}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
