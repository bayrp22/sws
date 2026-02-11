import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd, websiteJsonLd } from '@/seo/jsonld';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import DirectContactCta from '@/components/DirectContactCta';

const ContactEn: React.FC = () => {
  const path = '/en/contact';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://searchwebservices.tech/en' },
    { name: 'Contact', url: `https://searchwebservices.tech${path}` },
  ]);

  return (
    <div className="min-h-screen relative">
      <Meta path={path} lang="en" title="Contact" alternates={{ en: path, es: '/es/contacto' }} ogImage="/og/en-contact.svg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <ResponsiveNavigation variant="page" />

      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl w-full">
          <DirectContactCta language="EN" />
        </div>
      </section>
    </div>
  );
};

export default ContactEn;
