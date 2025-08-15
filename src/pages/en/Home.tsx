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
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const HomeEn: React.FC = () => {
  const [path, setPath] = useState<"site" | "nosite" | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedFormData, setSubmittedFormData] = useState<{ name: string; email: string } | null>(null);

  return (
    <div className="h-full">
      <Meta path="/en" lang="en" title="Home" alternates={{ en: '/en', es: '/es' }} ogImage="/og/en.svg" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', url: 'https://searchwebservices.tech/en' }])) }} />
      <div className="container mx-auto px-4 py-2 flex justify-end"><LanguageSwitcher /></div>
      <main className="main-container">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
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