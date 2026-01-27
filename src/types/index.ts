import { z } from 'zod';

export const EmailSchema = z.string()
  .trim()
  .email()
  .min(6)
  .max(254)
  .refine(email => email.includes('@') && email.includes('.'));

export const ContactFormSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000)
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export interface RecaptchaWindow extends Window {
  grecaptcha: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    render: (container: string | HTMLElement, parameters: RecaptchaRenderParams) => number;
  };
}

export interface RecaptchaRenderParams {
  sitekey: string;
  theme?: string;
  size?: string;
  badge?: string;
}

export interface RecaptchaVerifyResponse {
  success: boolean;
  score?: number;
  error?: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface ProjectData {
  key: string;
  title: string;
  subtitle: string;
  tags: string[];
  challenge: string;
  solution: string;
  stack: TechStackItem[];
  results: string[];
  liveUrl: string;
  role: string;
  timeline: string;
  process: ProcessStep[];
  image: string;
}
