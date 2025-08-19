import React, { useState } from 'react';
import Meta from '@/seo/Meta';
import AdaptiveForm from '@/components/AdaptiveForm';
import Confirmation from '@/components/Confirmation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const FormularioEs: React.FC = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [submittedFormData, setSubmittedFormData] = useState<{ name: string; email: string } | null>(null);

  // Default to "nosite" path to simplify the user experience
  const path = "nosite";

  return (
    <div className="h-full">
      <Meta 
        path="/formulario" 
        lang="es" 
        title="Comienza Hoy - Formulario de Proyecto" 
        description="¿Listo para iniciar tu proyecto web? Completa nuestro formulario y avancemos con tus objetivos comerciales hoy mismo."
        alternates={{ en: '/form', es: '/formulario' }} 
        ogImage="/og/es-formulario.svg" 
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: 'Inicio', url: 'https://searchwebservices.tech/es' },
        { name: 'Comenzar', url: 'https://searchwebservices.tech/formulario' }
      ])) }} />

      <main className="main-container">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Avancemos con{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Tu Proyecto Hoy
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                ¿Listo para transformar tu negocio con un sitio web profesional? 
                Cuéntanos sobre tu proyecto y comenzaremos de inmediato.
              </p>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <AdaptiveForm 
                  path={path} 
                  onStatusChange={setFormStatus} 
                  onFormSubmit={setSubmittedFormData as any} 
                />
                {formStatus === 'success' && (
                  <Confirmation path={path} initialFormData={submittedFormData} />
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Respuesta Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Consulta Gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Basados en Los Cabos</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FormularioEs; 