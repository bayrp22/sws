import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Meta from '@/seo/Meta';
import Confirmation from '@/components/Confirmation';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const FormSuccessEn: React.FC = () => {
  const location = useLocation();
  const [path] = useState<"site" | "nosite">(
    (location.state as any)?.path || "site"
  );
  const [submittedFormData] = useState<{ name: string; email: string } | null>(
    (location.state as any)?.formData || null
  );

  return (
    <div className="h-full">
      <Meta
        path="/form/formsuccess"
        lang="en"
        title="Form Submitted Successfully - Search Web Services"
        description="Thank you for your form submission. We'll review your project and deliver your audit within 1 business day."
        alternates={{ en: '/form/formsuccess', es: '/formulario/formsuccess' }}
        ogImage="/og/form.svg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: 'Home', url: 'https://searchwebservices.tech/en' },
        { name: 'Get Started', url: 'https://searchwebservices.tech/form' },
        { name: 'Success', url: 'https://searchwebservices.tech/form/formsuccess' }
      ])) }} />

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Thank You for Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Submission
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Your form has been successfully submitted. We'll be in touch soon!
              </p>
            </div>
          </section>

          {/* Confirmation Component */}
          <Confirmation path={path} initialFormData={submittedFormData} />
        </main>
      </div>
    </div>
  );
};

export default FormSuccessEn;
