import React, { useState } from 'react';
import Meta from '@/seo/Meta';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import PricingSection from '@/components/PricingSection';
import LocalTeamSection from '@/components/LocalTeamSection';
import OfferGate from '@/components/OfferGate';
import AdaptiveForm from '@/components/AdaptiveForm';
import Confirmation from '@/components/Confirmation';

import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const HomeEs: React.FC = () => {
  const [path, setPath] = useState<"site" | "nosite" | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedFormData, setSubmittedFormData] = useState<{ name: string; email: string } | null>(null);

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
        
        {/* Servicios Web Populares Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Servicios Web Populares</h2>
            <ul className="space-y-3">
              <li><a href="/es/servicios/diseno-web-los-cabos" className="text-blue-600 hover:underline">Diseño Web</a></li>
              <li><a href="/es/servicios/diseno-web-los-cabos" className="text-blue-600 hover:underline">Diseño de Sitios Web</a></li>
              <li><a href="/es/servicios/desarrollo-web" className="text-blue-600 hover:underline">Desarrollo Web</a></li>
              <li><a href="/es/servicios/desarrollo-web" className="text-blue-600 hover:underline">Desarrollo de Sitios Web</a></li>
              <li><a href="/es/servicios/sitios-web-a-medida" className="text-blue-600 hover:underline">Sitios Web a Medida</a></li>
              <li><a href="/es/servicios/seo" className="text-blue-600 hover:underline">SEO para Sitios Web</a></li>
            </ul>
          </div>
        </section>
        
        <PricingSection />
        <LocalTeamSection />
        <OfferGate onPathSelected={setPath} />
        <AdaptiveForm path={path} onStatusChange={setFormStatus} onFormSubmit={setSubmittedFormData as any} />
        {formStatus === 'success' && path && (
          <Confirmation path={path} initialFormData={submittedFormData} />
        )}
      </main>
    </div>
  );
};

export default HomeEs; 