import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Meta from '@/seo/Meta';
import Confirmation from '@/components/Confirmation';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const FormSuccessEs: React.FC = () => {
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
        path="/formulario/formsuccess"
        lang="es"
        title="Formulario Enviado con Éxito - Search Web Services"
        description="Gracias por tu envío del formulario. Revisaremos tu proyecto y entregaremos tu auditoría dentro de 1 día hábil."
        alternates={{ en: '/form/formsuccess', es: '/formulario/formsuccess' }}
        ogImage="/og/formulario.svg"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: 'Inicio', url: 'https://searchwebservices.tech/es' },
        { name: 'Comenzar', url: 'https://searchwebservices.tech/formulario' },
        { name: 'Éxito', url: 'https://searchwebservices.tech/formulario/formsuccess' }
      ])) }} />

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Gracias por Tu{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Envío
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Tu formulario ha sido enviado exitosamente. ¡Nos pondremos en contacto pronto!
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

export default FormSuccessEs;
