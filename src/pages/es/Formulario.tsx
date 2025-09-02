import React from 'react';
import Meta from '@/seo/Meta';
import ResponsiveNavigation from '@/components/ResponsiveNavigation';
import { websiteJsonLd, breadcrumbJsonLd } from '@/seo/jsonld';

const FormularioEs: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  // Populate UTM fields when component mounts
  React.useEffect(() => {
    if (formRef.current) {
      const params = new URLSearchParams(window.location.search);
      const setValue = (name: string, value: string | null) => {
        const input = formRef.current?.querySelector(`input[name="${name}"]`) as HTMLInputElement;
        if (input) input.value = value || '';
      };

      setValue('utm_source', params.get('utm_source'));
      setValue('utm_medium', params.get('utm_medium'));
      setValue('utm_campaign', params.get('utm_campaign'));
      setValue('utm_term', params.get('utm_term'));
      setValue('utm_content', params.get('utm_content'));
      setValue('gclid', params.get('gclid'));
      setValue('fbclid', params.get('fbclid'));
      setValue('referrer_path', document.referrer || '');
    }
  }, []);

  return (
    <div className="h-full">
      <Meta
        path="/formulario"
        lang="es"
        title="Comienza Hoy - Formulario de Proyecto"
        description="¿Listo para iniciar tu proyecto web? Completa nuestro formulario y avancemos con tus objetivos comerciales hoy mismo."
        alternates={{ en: '/form', es: '/formulario' }}
        ogImage="/og/formulario.svg"
      />

      <div className="relative">
        <ResponsiveNavigation variant="page" />

        <main className="main-container">
          {/* Hero Section with integrated form */}
          <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
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

              {/* Trust Indicators */}
              <div className="mb-12 flex flex-wrap justify-center items-center gap-8 text-slate-400">
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

              {/* Form */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
                  <form
                    ref={formRef}
                    name="adaptive-form"
                    method="POST"
                    action="/formulario/formsuccess"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="space-y-6"
                  >
                    {/* Hidden form name for Netlify */}
                    <input type="hidden" name="form-name" value="adaptive-form" />

                    {/* Honeypot field */}
                    <div style={{ display: 'none' }}>
                      <label>Don't fill this out: <input name="bot-field" /></label>
                    </div>

                    {/* Additional hidden fields */}
                    <input type="hidden" name="path" />
                    <input type="hidden" name="language" value="ES" />
                    <input type="hidden" name="timestamp" />

                    {/* UTM Attribution Fields */}
                    <input type="hidden" name="utm_source" />
                    <input type="hidden" name="utm_medium" />
                    <input type="hidden" name="utm_campaign" />
                    <input type="hidden" name="utm_term" />
                    <input type="hidden" name="utm_content" />
                    <input type="hidden" name="gclid" />
                    <input type="hidden" name="fbclid" />
                    <input type="hidden" name="referrer_path" />

                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tu Nombre *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                        placeholder="Nombre Completo"
                      />
                    </div>

                    {/* Business Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Negocio *
                      </label>
                      <input
                        type="text"
                        name="bizName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                        placeholder="Nombre de tu Negocio"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>

                    {/* Website URL Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL del Sitio Web Actual
                      </label>
                      <input
                        type="text"
                        name="url"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors"
                        placeholder="https://tusitio.com"
                      />
                    </div>

                    {/* Business Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción del Negocio
                      </label>
                      <textarea
                        name="bizDesc"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A5FF00] focus:border-transparent transition-colors resize-vertical"
                        placeholder="Cuéntenos a qué se dedica su negocio y por qué busca crear un sitio web"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#A5FF00] text-black font-semibold py-4 px-6 rounded-lg hover:bg-[#94E600] transition-colors duration-200"
                    >
                      Obtener Mi Cotización Gratis
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default FormularioEs;
