import React from 'react';
import Meta from '@/seo/Meta';
import { serviciosSEO } from '@/content/es/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Page: React.FC = () => {
  const path = serviciosSEO.slug;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchloscabos.com/es' },
    { name: 'Servicios', url: 'https://searchloscabos.com/es/servicios' },
    { name: 'Servicios SEO', url: `https://searchloscabos.com${path}` },
  ]);
  const service = serviceJsonLd({
    name: serviciosSEO.title,
    description: serviciosSEO.metaDescription,
    url: `https://searchloscabos.com${path}`,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="es" title={serviciosSEO.title} description={serviciosSEO.metaDescription} alternates={{ en: '/en/services/seo', es: path }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">{serviciosSEO.title}</h1>
      <p className="text-gray-700 mb-6">{serviciosSEO.intro}</p>
      <div className="space-y-4">
        {serviciosSEO.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="text-gray-700">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-6">
        <a href="/es/contacto" className="underline">{serviciosSEO.cta}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </div>
  );
};

export default Page; 