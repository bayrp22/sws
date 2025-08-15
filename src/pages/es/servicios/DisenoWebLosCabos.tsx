import React from 'react';
import Meta from '@/seo/Meta';
import { disenoWeb } from '@/content/es/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Page: React.FC = () => {
  const path = disenoWeb.slug;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchwebservices.tech/es' },
    { name: 'Servicios', url: 'https://searchwebservices.tech/es/servicios' },
    { name: 'Diseño Web Los Cabos', url: `https://searchwebservices.tech${path}` },
  ]);
  const service = serviceJsonLd({
    name: disenoWeb.title,
    description: disenoWeb.metaDescription,
    url: `https://searchwebservices.tech${path}`,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="es" title={disenoWeb.title} description={disenoWeb.metaDescription} alternates={{ en: '/en/services/web-design-los-cabos', es: path }} ogImage={`/og/es-servicios-diseno-web-los-cabos.svg`} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">{disenoWeb.title}</h1>
      <p className="text-gray-700 mb-6">{disenoWeb.intro}</p>
      <div className="space-y-4">
        {disenoWeb.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="text-gray-700">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-6">
        <a href="/es/contacto" className="underline">{disenoWeb.cta}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </div>
  );
};

export default Page; 