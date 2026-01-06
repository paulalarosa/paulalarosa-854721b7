import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

// Email validation schema matching database constraints
const emailSchema = z.string()
  .trim()
  .email({ message: 'Invalid email address' })
  .min(6, { message: 'Email must be at least 6 characters' })
  .max(254, { message: 'Email must be less than 255 characters' })
  .refine(email => email.includes('@') && email.includes('.'), {
    message: 'Email must contain @ and .'
  });

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim().toLowerCase();
    
    // Validate with zod schema
    const validation = emailSchema.safeParse(trimmedEmail);
    
    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message;
      if (!trimmedEmail) {
        toast.error(t('newsletter.errorEmpty'));
      } else {
        toast.error(t('newsletter.errorInvalid'));
      }
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: validation.data });

      if (error) {
        if (error.code === '23505') {
          // Email already exists
          toast.info(t('newsletter.alreadySubscribed'));
        } else {
          // Log only in development
          if (import.meta.env.DEV) {
            console.error('Newsletter subscription error:', error);
          }
          toast.error(t('newsletter.errorGeneric'));
        }
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      toast.success(t('newsletter.success'));
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      // Log only in development
      if (import.meta.env.DEV) {
        console.error('Newsletter subscription error:', err);
      }
      toast.error(t('newsletter.errorGeneric'));
    } finally {
      setIsLoading(false);
    }
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
