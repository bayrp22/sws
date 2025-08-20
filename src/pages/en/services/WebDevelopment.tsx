import React from 'react';
import Meta from '@/seo/Meta';
import { webDevelopment } from '@/content/en/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/seo/jsonld';

const Page: React.FC = () => {
  const path = webDevelopment.slug;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://searchwebservices.tech/en' },
    { name: 'Services', url: 'https://searchwebservices.tech/en/services' },
    { name: 'Web Development', url: 'https://searchwebservices.tech/en/services/web-development' },
  ]);
  const service = serviceJsonLd({
    name: 'Web Development & Website Development in Los Cabos',
    description: 'Fast, secure, SEO‑ready web development and website development for businesses in Los Cabos and Baja California Sur. Custom builds, best practices, and clean code.',
    url: 'https://searchwebservices.tech/en/services/web-development',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Meta 
        path={path} 
        lang="en" 
        title={webDevelopment.title} 
        description={webDevelopment.metaDescription} 
        alternates={{ en: '/en/services/web-development', es: '/es/servicios/desarrollo-web' }} 
      />

      <h1 className="text-3xl font-bold mb-4">Web Development & Website Development in Los Cabos</h1>
      <p className="text-gray-700 mb-6">{webDevelopment.intro}</p>
      <div className="space-y-4">
        {webDevelopment.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="text-gray-700">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-6">
        <a href="/en/contact" className="underline">{webDevelopment.cta}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </div>
  );
};

export default Page; 