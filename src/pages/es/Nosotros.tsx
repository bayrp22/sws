import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd, websiteJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const AboutEs: React.FC = () => {
  const path = '/es/nosotros';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchwebservices.tech/es' },
    { name: 'Nosotros', url: `https://searchwebservices.tech${path}` },
  ]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="es" title="Nosotros" alternates={{ en: '/en/about', es: path }} ogImage="/og/es-nosotros.svg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">Nosotros</h1>
      <p className="text-gray-700">Creamos sitios rápidos y optimizados para SEO para negocios en Los Cabos y Baja California Sur.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </div>
  );
};

export default AboutEs; 