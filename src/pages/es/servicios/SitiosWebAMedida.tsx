import React from 'react';
import Meta from '@/seo/Meta';
import { sitiosWebAMedida } from '@/content/es/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/seo/jsonld';


const Page: React.FC = () => {
  const path = sitiosWebAMedida.slug;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchwebservices.tech/es' },
    { name: 'Servicios', url: 'https://searchwebservices.tech/es/servicios' },
    { name: 'Sitios Web a Medida', url: 'https://searchwebservices.tech/es/servicios/sitios-web-a-medida' },
  ]);
  const service = serviceJsonLd({
    name: sitiosWebAMedida.title,
    description: sitiosWebAMedida.metaDescription,
    url: `https://searchwebservices.tech${path}`,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="es" title={sitiosWebAMedida.title} description={sitiosWebAMedida.metaDescription} alternates={{ en: '/en/services/custom-websites', es: path }} ogImage={`/og/es-servicios-sitios-web-a-medida.svg`} />

      <h1 className="text-3xl font-bold mb-4">{sitiosWebAMedida.title}</h1>
      <p className="text-gray-700 mb-6">{sitiosWebAMedida.intro}</p>
      <div className="space-y-4">
        {sitiosWebAMedida.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="text-gray-700">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-6">
        <a href="/es/contacto" className="underline">{sitiosWebAMedida.cta}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </div>
  );
};

export default Page; 