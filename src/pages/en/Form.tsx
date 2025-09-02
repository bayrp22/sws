import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Meta from '@/seo/Meta';
import OfferGate from '@/components/OfferGate';
import AdaptiveForm from '@/components/AdaptiveForm';
import Confirmation from '@/components/Confirmation';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';
import { useSequentialAnimation } from '@/hooks/useSequentialAnimation';

const FormEn: React.FC = () => {
  // Sequential animation for page elements
  const { getAnimationClass } = useSequentialAnimation({
    delays: [0, 300, 600, 900, 1200, 1500, 1800]
  });

  const navigate = useNavigate();
  const [path, setPath] = useState<"site" | "nosite" | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedFormData, setSubmittedFormData] = useState<{ name: string; email: string } | null>(null);

  // Handle form status changes and URL updates
  const handleFormStatusChange = (status: "idle" | "loading" | "success" | "error") => {
    setFormStatus(status);
    if (status === 'success' && path) {
      navigate('/form/formsuccess', {
        state: {
          path: path,
          formData: submittedFormData
        }
      });
    }
  };

  return (
    <div className="h-full">
      <Meta 
        path="/form" 
        lang="en" 
        title="Get Started Today - Project Form" 
        description="Ready to start your web project? Fill out our form and let's move forward with your business goals today."
        alternates={{ en: '/form', es: '/formulario' }} 
        ogImage="/og/form.svg" 
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: 'Home', url: 'https://searchwebservices.tech/en' },
        { name: 'Get Started', url: 'https://searchwebservices.tech/form' }
      ])) }} />

      <div className="relative">
        <ResponsiveNavigation variant="page" />
        
        <main className="main-container">
          {/* Hero Section with integrated form */}
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>
            
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <div className={`mb-12 ${getAnimationClass(2, 'animate-fade-in-up')}`}>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 ${getAnimationClass(3, 'animate-fade-in-up')}`}>
                  Let's Move Forward with{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                    Your Project Today
                  </span>
                </h1>
                <p className={`text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto ${getAnimationClass(4, 'animate-fade-in-up')}`}>
                  Ready to transform your business with a professional website? 
                  Tell us about your project and we'll get started right away.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className={`mb-12 flex flex-wrap justify-center items-center gap-8 text-slate-400 ${getAnimationClass(5, 'animate-fade-in-up')}`}>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fast Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Los Cabos Based</span>
                </div>
              </div>

              {/* Form Buttons integrated into hero */}
              <div className={`max-w-4xl mx-auto ${getAnimationClass(6, 'animate-bounce-in')}`}>
                <OfferGate onPathSelected={setPath} variant="hero" />
              </div>
            </div>
          </section>

          {/* Form System - positioned after hero */}
          <AdaptiveForm path={path} onStatusChange={handleFormStatusChange} onFormSubmit={setSubmittedFormData as any} />
          {formStatus === 'success' && path && (
            <Confirmation path={path} initialFormData={submittedFormData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default FormEn; 