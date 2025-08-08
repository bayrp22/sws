import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ContactEs: React.FC = () => {
  const path = '/es/contacto';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchloscabos.com/es' },
    { name: 'Contacto', url: `https://searchloscabos.com${path}` },
  ]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="es" title="Contacto" alternates={{ en: '/en/contact', es: path }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="text-gray-700">¿Tienes dudas o quieres una cotización? Escríbenos y te responderemos pronto.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </div>
  );
};

export default ContactEs; 