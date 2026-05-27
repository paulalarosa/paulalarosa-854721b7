export const CONTACT = {
  email: 'prenata@gmail.com',
  whatsappNumber: '5521983604870',
  linkedin: 'https://www.linkedin.com/in/paula-la-rosa-228889119/',
  behance: 'https://www.behance.net/paulalarosa',
} as const;

export const whatsappUrl = (message: string): string =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
