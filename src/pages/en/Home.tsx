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

const HomeEn: React.FC = () => {
  const [path, setPath] = useState<"site" | "nosite" | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedFormData, setSubmittedFormData] = useState<{ name: string; email: string } | null>(null);

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
        
        {/* Popular Web Services Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Popular Web Services</h2>
            <ul className="space-y-3">
              <li><a href="/en/services/web-design-los-cabos" className="text-blue-600 hover:underline">Web Design</a></li>
              <li><a href="/en/services/web-design-los-cabos" className="text-blue-600 hover:underline">Website Design</a></li>
              <li><a href="/en/services/web-development" className="text-blue-600 hover:underline">Web Development</a></li>
              <li><a href="/en/services/web-development" className="text-blue-600 hover:underline">Website Development</a></li>
              <li><a href="/en/services/custom-websites" className="text-blue-600 hover:underline">Custom Websites</a></li>
              <li><a href="/en/services/seo" className="text-blue-600 hover:underline">Website SEO</a></li>
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

export default HomeEn; 