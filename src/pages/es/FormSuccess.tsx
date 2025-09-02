import React from 'react';
import Meta from '@/seo/Meta';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const FormSuccessEs: React.FC = () => {
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

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Gracias por Tu{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
                  Envío
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-8">
                Tu formulario ha sido enviado exitosamente.
              </p>

              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-8">
                <div className="text-center">
                  <div className="bg-[#A5FF00]/20 rounded-full border-4 border-[#A5FF00] w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    ¡Estamos en Ello!
                  </h2>

                  <p className="text-lg text-gray-600 mb-8">
                    ¡Gracias! Revisaremos tu proyecto y entregaremos tu auditoría dentro de 1 día hábil.
                  </p>

                  {/* What's Next */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Qué sigue:
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="bg-[#A5FF00] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <span className="text-black font-bold text-lg">1</span>
                        </div>
                        <p className="text-gray-700 font-medium">Análisis integral del sitio</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-[#A5FF00] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <span className="text-black font-bold text-lg">2</span>
                        </div>
                        <p className="text-gray-700 font-medium">Auditoría de rendimiento y SEO</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-[#A5FF00] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <span className="text-black font-bold text-lg">3</span>
                        </div>
                        <p className="text-gray-700 font-medium">Recomendaciones personalizadas</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a
                      href="/es"
                      className="inline-block bg-[#A5FF00] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200"
                    >
                      Volver al Inicio
                    </a>

                    <br />

                    <a
                      href="/formulario"
                      className="inline-block text-gray-600 hover:text-[#A5FF00] transition-colors duration-200"
                    >
                      Enviar Otro Formulario
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-slate-300">
                <p className="mb-2">¿Preguntas? Contáctanos en cualquier momento:</p>
                <p className="font-semibold">+52 624 264 4012 | bay@searchwebservices.tech</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FormSuccessEs;
