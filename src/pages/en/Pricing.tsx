import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const PricingEn: React.FC = () => {
  const path = '/en/pricing';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://searchloscabos.com/en' },
    { name: 'Pricing', url: `https://searchloscabos.com${path}` },
  ]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="en" title="Pricing" alternates={{ en: path, es: '/es/precios' }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">Pricing</h1>
      <p className="text-gray-700">Transparent packages tailored to Los Cabos businesses. Contact us for a custom quote.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </div>
  );
};

export default PricingEn; 