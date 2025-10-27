import { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(1000, { message: "Message must be less than 1000 characters" })
});

// Declare global grecaptcha type
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: string | HTMLElement, parameters: {
        sitekey: string;
        theme?: string;
        size?: string;
        badge?: string;
      }) => number;
    };
  }
}

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // Initialize reCAPTCHA
  useEffect(() => {
    const initRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log('reCAPTCHA ready');
          setRecaptchaReady(true);
          
          // Render invisible badge in bottom-right corner
          const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
          if (siteKey) {
            window.grecaptcha.render('recaptcha-badge', {
              sitekey: siteKey,
              size: 'invisible',
              badge: 'bottomright'
            });
          }
        });
      }
    };

    // Check if script is already loaded
    if (window.grecaptcha) {
      initRecaptcha();
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(checkInterval);
          initRecaptcha();
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Validate with zod schema
    const validation = contactSchema.safeParse(formData);
    
    if (!validation.success) {
      const errors = validation.error.errors.map(err => err.message).join(', ');
      toast({
        title: t('contact.requiredFields'),
        description: errors,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token
      const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
      
      if (!siteKey) {
        throw new Error('reCAPTCHA not configured');
      }

      if (!recaptchaReady || !window.grecaptcha) {
        throw new Error('reCAPTCHA not ready');
      }

      console.log('Executing reCAPTCHA...');
      const token = await window.grecaptcha.execute(siteKey, { action: 'submit' });
      
      // Verify reCAPTCHA token with backend
      console.log('Verifying reCAPTCHA token...');
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      if (verifyError) {
        console.error('reCAPTCHA verification error:', verifyError);
        throw new Error('Failed to verify reCAPTCHA');
      }

      if (!verifyData?.success) {
        console.warn('reCAPTCHA verification failed:', verifyData);
        toast({
          title: 'Verificação de segurança falhou',
          description: 'Por favor, tente novamente. Se o problema persistir, entre em contato diretamente.',
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      console.log('reCAPTCHA verified successfully, score:', verifyData.score);
      
      // Proceed with form submission
      const validatedData = validation.data;
      const message = `Olá Paula! Meu nome é ${validatedData.name}.\n\nEmail: ${validatedData.email}\n\nMensagem: ${validatedData.message}`;
      const whatsappUrl = `https://wa.me/5521983604870?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', email: '', message: '' });
      
      toast({
        title: t('contact.redirecting'),
        description: t('contact.redirectingDesc'),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-primary mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3 bg-background p-8 rounded-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0"
                  placeholder={t('contact.name')}
                />
              </div>

              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0"
                  placeholder={t('contact.email')}
                />
              </div>

              <div>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border-0 border-b border-border rounded-none focus:border-accent px-0 resize-none"
                  placeholder={t('contact.message')}
                />
              </div>

              <div id="recaptcha-badge"></div>
              
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

          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <a
              href="mailto:prenata@gmail.com"
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