export const siteName = 'Strategic Web Solutions (SWS)';
export const contentBrandName = 'Search Web Services (SWS)';
export const canonicalRoot = 'https://searchloscabos.com';
export const defaultTitle = 'Professional Websites in Los Cabos';
export const defaultDescription = 'SWS builds custom, high-quality websites fast and at a fraction of typical costs for Los Cabos businesses. Bilingual support, SEO-first, and performance-driven.';
export const languages = ['en', 'es'] as const;
export type Lang = typeof languages[number];
export const hreflangLocales: Record<Lang, string> = {
  en: 'en-US',
  es: 'es-MX',
};
export const social = {
  instagram: 'https://www.instagram.com/searchwebservices/',
  facebook: 'https://web.facebook.com/people/Search-Web-Services/61575155398184/#',
};
export const contact = {
  name: 'Search Web Services',
  phoneE164: '+526242644012',
  email: 'bay@searchloscabos.com',
  address: {
    streetAddress: 'Cumbre del Tezal, El Tezal',
    addressLocality: 'Cabo San Lucas',
    addressRegion: 'Baja California Sur',
    postalCode: '23454',
    addressCountry: 'MX',
  },
  hours: '24/7',
  whatsapp: 'https://wa.me/526242644012',
};
export const legal = {
  privacyUrl: '',
  termsUrl: '',
};
export const languageDefaults = {
  defaultLang: 'en' as Lang,
  xDefault: '/',
};
export const analytics = {
  ga4MeasurementId: 'G-ZWRYXHZS2Y',
}; 