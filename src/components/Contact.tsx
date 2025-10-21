import { useState } from 'react';
import { Mail, Phone, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: t('contact.requiredFields'),
        description: t('contact.fillAllFields'),
        variant: "destructive"
      });
      return;
    }
    
    const message = `Olá Paula! Meu nome é ${formData.name}.\n\nEmail: ${formData.email}\n\nMensagem: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5521983604870?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', email: '', message: '' });
    
    toast({
      title: t('contact.redirecting'),
      description: t('contact.redirectingDesc'),
    });
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

              <Button
                type="submit"
                size="lg"
                className="bg-accent hover:bg-primary text-accent-foreground hover:text-primary-foreground transition-base shadow-silver border border-accent/30"
              >
                <Send className="mr-2 h-5 w-5" />
                {t('contact.send')}
              </Button>
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