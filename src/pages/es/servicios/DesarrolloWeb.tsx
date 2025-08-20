import React from 'react';
import Meta from '@/seo/Meta';
import { desarrolloWeb } from '@/content/es/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/seo/jsonld';

const Page: React.FC = () => {
  const path = desarrolloWeb.slug;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://searchwebservices.tech/es' },
    { name: 'Servicios', url: 'https://searchwebservices.tech/es/servicios' },
    { name: 'Desarrollo Web', url: 'https://searchwebservices.tech/es/servicios/desarrollo-web' },
  ]);
  const service = serviceJsonLd({
    name: 'Desarrollo Web y Desarrollo de Sitios Web en Los Cabos',
    description: 'Desarrollo web y de sitios web rápido, seguro y optimizado para SEO para negocios en Los Cabos y Baja California Sur. Proyectos a medida, buenas prácticas y código limpio.',
    url: 'https://searchwebservices.tech/es/servicios/desarrollo-web',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Meta 
        path={path} 
        lang="es" 
        title={desarrolloWeb.title} 
        description={desarrolloWeb.metaDescription} 
        alternates={{ en: '/en/services/web-development', es: '/es/servicios/desarrollo-web' }} 
      />

      <h1 className="text-3xl font-bold mb-4">Desarrollo Web y Desarrollo de Sitios Web en Los Cabos</h1>
      <p className="text-gray-700 mb-6">{desarrolloWeb.intro}</p>
      <div className="space-y-4">
        {desarrolloWeb.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="text-gray-700">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-6">
        <a href="/es/contacto" className="underline">{desarrolloWeb.cta}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </div>
  );
};

export default Page; 