import React from 'react';
import Meta from '@/seo/Meta';
import { customWebsites } from '@/content/en/services';
import { breadcrumbJsonLd, serviceJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Page: React.FC = () => {
  const path = customWebsites.slug;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://searchloscabos.com/en' },
    { name: 'Services', url: 'https://searchloscabos.com/en/services' },
    { name: 'Custom Websites', url: `https://searchloscabos.com${path}` },
  ]);
  const service = serviceJsonLd({
    name: customWebsites.title,
    description: customWebsites.metaDescription,
    url: `https://searchloscabos.com${path}`,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="en" title={customWebsites.title} description={customWebsites.metaDescription} alternates={{ en: path, es: '/es/servicios/sitios-web-a-medida' }} ogImage={`/og/en-services-custom-websites.svg`} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">{customWebsites.title}</h1>
      <p className="text-gray-700 mb-6">{customWebsites.intro}</p>
      <div className="space-y-4">
        {customWebsites.sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-xl font-semibold">{s.heading}</h2>
            <p className="text-gray-700">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-6">
        <a href="/en/contact" className="underline">{customWebsites.cta}</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
    </div>
  );
};

export default Page; 