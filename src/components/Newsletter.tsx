import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error(t('newsletter.errorEmpty'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t('newsletter.errorInvalid'));
      return;
    }

    setIsLoading(true);
    
    // Simula envio (pode ser integrado com Supabase/API depois)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    toast.success(t('newsletter.success'));
    setEmail('');
    
    // Reset após 5 segundos
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="py-16 bg-accent/5 border-y border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-6">
            <Mail className="w-7 h-7 text-accent" />
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-primary mb-4">
            {t('newsletter.title')}
          </h2>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t('newsletter.subtitle')}
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-3 text-accent"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">{t('newsletter.thankyou')}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 bg-background border-border focus:border-accent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                  />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t('newsletter.button')}
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground mt-4">
            {t('newsletter.privacy')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
