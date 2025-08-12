import React from 'react';
import { canonicalRoot, defaultDescription, siteName, hreflangLocales, languageDefaults } from './config';

interface MetaProps {
  path: string;
  lang: 'en' | 'es';
  title?: string;
  description?: string;
  canonicalOverride?: string;
  robots?: string;
  ogImage?: string;
  alternates?: { en?: string; es?: string };
}

const buildCanonical = (path: string, canonicalOverride?: string) => {
  if (canonicalOverride) return canonicalOverride;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${canonicalRoot}${normalized}`;
};

export const Meta: React.FC<MetaProps> = ({ path, lang, title, description, canonicalOverride, robots = 'index, follow', ogImage, alternates }) => {
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonical = buildCanonical(path, canonicalOverride);
  const og = ogImage ? (ogImage.startsWith('http') ? ogImage : `${canonicalRoot}${ogImage}`) : `${canonicalRoot}/img/company-logo.svg`;

  const hrefEn = alternates?.en || '/en';
  const hrefEs = alternates?.es || '/es';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={og} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={og} />
      <meta name="twitter:url" content={canonical} />

      {/* Hreflang alternates */}
      <link rel="alternate" hrefLang={hreflangLocales.en} href={`${canonicalRoot}${hrefEn}`} />
      <link rel="alternate" hrefLang={hreflangLocales.es} href={`${canonicalRoot}${hrefEs}`} />
      <link rel="alternate" hrefLang="x-default" href={`${canonicalRoot}${languageDefaults.xDefault}`} />
    </>
  );
};

export default Meta; 