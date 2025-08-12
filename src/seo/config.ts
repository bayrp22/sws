export const siteName = 'Search Web Services (SWS)';
export const contentBrandName = 'Search Web Services (SWS)';
export const canonicalRoot = 'https://searchwebservices.tech';
export const defaultTitle = 'Web Services in Los Cabos & Mexico';
export const defaultDescription = 'Search Web Services builds fast, SEO-first websites and web services for businesses in Los Cabos and across Mexico.';
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