import React from 'react';
import Meta from '@/seo/Meta';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import ResourcesSection from '@/components/ResourcesSection';
import PricingSection from '@/components/PricingSection';
import LocalTeamSection from '@/components/LocalTeamSection';
import OfferGate from '@/components/OfferGate';

import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const HomeEn: React.FC = () => {

  return (
    <div className="h-full">
      <Meta 
        path="/en" 
        lang="en" 
        title="Web Design & Website Development in Los Cabos" 
        description="Custom websites, web design, website development, and website SEO for businesses in Los Cabos and Baja California Sur. Fast delivery, clean code, real results."
        alternates={{ en: '/en', es: '/es' }} 
        ogImage="/og/en.svg" 
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: 'https://searchwebservices.tech/en' }])) }} />

      <main className="main-container">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ResourcesSection />
        <PricingSection />
        <LocalTeamSection />
        <OfferGate />
      </main>
    </div>
  );
};

export default HomeEn; 