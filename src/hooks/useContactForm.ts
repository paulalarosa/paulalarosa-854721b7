import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { ContactFormSchema, type ContactFormData } from '@/types';
import { executeRecaptcha, verifyRecaptchaToken } from '@/services/recaptcha';
import { useRecaptcha } from '@/hooks/useRecaptcha';

const WHATSAPP_NUMBER = '5521983604870';

function buildWhatsAppUrl(data: ContactFormData): string {
  const message = `Olá Paula! Meu nome é ${data.name}.\n\nEmail: ${data.email}\n\nMensagem: ${data.message}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function useContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { isReady: recaptchaReady } = useRecaptcha();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = ContactFormSchema.safeParse(formData);
    
    if (!validation.success) {
      const errors = validation.error.errors.map(err => err.message).join(', ');
      toast({ title: t('contact.requiredFields'), description: errors, variant: 'destructive' });
      return;
    }

    if (!recaptchaReady) {
      toast({ title: 'Erro', description: 'reCAPTCHA não está pronto', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    const token = await executeRecaptcha();
    if (!token) {
      toast({ title: 'Erro', description: 'Falha na verificação de segurança', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    const verifyResult = await verifyRecaptchaToken(token);
    if (!verifyResult.success) {
      toast({ 
        title: 'Verificação de segurança falhou', 
        description: 'Por favor, tente novamente.', 
        variant: 'destructive' 
      });
      setIsSubmitting(false);
      return;
    }

    window.open(buildWhatsAppUrl(validation.data), '_blank');
    setFormData({ name: '', email: '', message: '' });
    toast({ title: t('contact.redirecting'), description: t('contact.redirectingDesc') });
    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}
