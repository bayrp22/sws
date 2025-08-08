import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const AboutEn: React.FC = () => {
  const path = '/en/about';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://searchloscabos.com/en' },
    { name: 'About', url: `https://searchloscabos.com${path}` },
  ]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="en" title="About" alternates={{ en: path, es: '/es/nosotros' }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">About SWS</h1>
      <p className="text-gray-700">We build fast, SEO-first websites for businesses across Los Cabos and Baja California Sur.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </div>
  );
};

export default AboutEn; 