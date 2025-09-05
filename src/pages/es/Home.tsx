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

const HomeEs: React.FC = () => {

  return (
    <div className="h-full">
      <Meta 
        path="/es" 
        lang="es" 
        title="Diseño Web y Desarrollo de Sitios Web en Los Cabos" 
        description="Sitios web a medida, diseño web, desarrollo de sitios web y SEO para empresas en Los Cabos y Baja California Sur. Entrega rápida, código limpio y resultados reales."
        alternates={{ en: '/en', es: '/es' }} 
        ogImage="/og/es.svg" 
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Inicio', url: 'https://searchwebservices.tech/es' }])) }} />

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

export default HomeEs; 