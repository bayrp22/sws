import React from 'react';
import Meta from '@/seo/Meta';
import { breadcrumbJsonLd, websiteJsonLd } from '@/seo/jsonld';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const ContactEn: React.FC = () => {
  const path = '/en/contact';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home', url: 'https://searchwebservices.tech/en' },
    { name: 'Contact', url: `https://searchwebservices.tech${path}` },
  ]);
  return (
    <div className="container mx-auto px-4 py-8">
      <Meta path={path} lang="en" title="Contact" alternates={{ en: path, es: '/es/contacto' }} ogImage="/og/en-contact.svg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <div className="flex justify-end"><LanguageSwitcher /></div>
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-gray-700">Have a question or want a quote? Reach out and we’ll get back fast.</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </div>
  );
};

export default ContactEn; 