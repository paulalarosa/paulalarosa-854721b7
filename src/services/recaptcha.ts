import { supabase } from '@/integrations/supabase/client';
import type { RecaptchaWindow, RecaptchaVerifyResponse } from '@/types';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

export function getRecaptchaWindow(): RecaptchaWindow | null {
  if (typeof window !== 'undefined' && 'grecaptcha' in window) {
    return window as unknown as RecaptchaWindow;
  }
  return null;
}

export function initRecaptcha(onReady: () => void): void {
  const recaptchaWindow = getRecaptchaWindow();
  if (!recaptchaWindow?.grecaptcha) return;

  recaptchaWindow.grecaptcha.ready(() => {
    onReady();
    if (RECAPTCHA_SITE_KEY) {
      recaptchaWindow.grecaptcha.render('recaptcha-badge', {
        sitekey: RECAPTCHA_SITE_KEY,
        size: 'invisible',
        badge: 'bottomright'
      });
    }
  });
}

export async function executeRecaptcha(): Promise<string | null> {
  const recaptchaWindow = getRecaptchaWindow();
  if (!recaptchaWindow?.grecaptcha || !RECAPTCHA_SITE_KEY) return null;

  return recaptchaWindow.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
}

export async function verifyRecaptchaToken(token: string): Promise<RecaptchaVerifyResponse> {
  const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
    body: { token }
  });

  if (error) {
    return { success: false, error: 'Verification failed' };
  }

  return data as RecaptchaVerifyResponse;
}
