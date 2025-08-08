import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const PricingEs: React.FC = () => {
  const path = '/es/precios';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchloscabos.com/es' },
    { name: 'Precios', url: `https://searchloscabos.com${path}` },
  ]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="es" title="Precios" alternates={{ en: '/en/pricing', es: path }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">Precios</h1>
      <p className="text-gray-700">Paquetes transparentes para negocios en Los Cabos. Contáctanos para una cotización personalizada.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </div>
  );
};

export default PricingEs; 