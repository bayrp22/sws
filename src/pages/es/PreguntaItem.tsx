import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { faqDataEs } from '../../data/faq-es';
import { faqPageJsonLd, breadcrumbJsonLd } from '../../seo/jsonld';
import Meta from '../../seo/Meta';
import Navigation from '../../components/Navigation';
import FAQContent from '../../components/FAQContent';

const PreguntaItem: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const faqItem = faqDataEs.find(item => item.slug === slug);
  
  if (!faqItem) {
    return <Navigate to="/404" replace />;
  }

  const jsonLd = faqPageJsonLd([faqItem]);
  const breadcrumbItems = [
    { name: 'Inicio', url: '/es' },
    { name: 'Preguntas Frecuentes', url: '/preguntas' },
    { name: faqItem.question, url: `/preguntas/${faqItem.slug}` }
  ];
  const breadcrumbStructuredData = breadcrumbJsonLd(breadcrumbItems);

  return (
    <>
      <Meta 
        path={`/preguntas/${faqItem.slug}`}
        lang="es"
        title={faqItem.question}
        description={faqItem.metaDescription}
        alternates={{ 
          en: `/faq/${faqItem.slug}`, 
          es: `/preguntas/${faqItem.slug}` 
        }}
      />
      
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        
        <Navigation variant="page" />
        
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-12">
            <ol className="flex items-center space-x-3 text-sm">
              <li>
                <Link to="/es" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 15V9a2 2 0 012-2h4a2 2 0 012 2v6" />
                  </svg>
                  Inicio
                </Link>
              </li>
              <li className="text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <Link to="/preguntas" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li className="text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="text-gray-300 font-medium truncate max-w-xs">
                {faqItem.question}
              </li>
            </ol>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Single FAQ Section */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-8 hover:border-gray-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {faqItem.id}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {faqItem.question}
                  </h1>
                </div>
              </div>
              
              <div className="mb-8">
              {faqItem.id === 1 ? (
                // Custom pricing table for FAQ #1
                <div className="prose prose-invert prose-xl max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Publicamos precios fijos para que conozcas la inversión por adelantado.
                  </p>
                  
                  {/* Beautiful Pricing Table */}
                  <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-2xl">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
                      <div className="grid grid-cols-3 gap-px">
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Paquete
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Precio (MXN)
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Ideal para
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-600/30">
                      {/* Starter Row */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Inicial</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          $25,000
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Empresas locales que necesitan un sitio brochure de 4‑6 páginas.
                        </div>
                      </div>
                      
                      {/* Business Row */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Negocio</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          $40,000
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          E‑commerce, motores de reserva o contenido multiidioma.
                        </div>
                      </div>
                      
                      {/* Premium Row */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Premium</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Cotización personalizada
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Grupos de 5+ sitios o funcionalidad a nivel de aplicación.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Todos los niveles incluyen diseño mobile‑first, SEO básico, CI/CD y un mes de hosting.
                  </p>
                </div>
              ) : faqItem.id === 4 ? (
                // Custom timeline table for FAQ #4
                <div className="prose prose-invert prose-xl max-w-none">
                  {/* Beautiful Timeline Table */}
                  <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-2xl">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
                      <div className="grid grid-cols-3 gap-px">
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Fase
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Días
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Entregable
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-600/30">
                      {/* Receive Assets */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Recibir Activos</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          1–5
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Ingresamos tu marca y contenido.
                        </div>
                      </div>
                      
                      {/* Build Concept */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Construir Concepto</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          6–10
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Primera versión en vivo en URL de prueba.
                        </div>
                      </div>
                      
                      {/* Polish Details */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Pulir Detalles</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          11–12
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Ajustes perfectos y micro‑animaciones.
                        </div>
                      </div>
                      
                      {/* Test Integrations */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Probar Integraciones</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          13–14
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Formularios, APIs, revisión SEO, auditoría de seguridad.
                        </div>
                      </div>
                      
                      {/* Deploy & Go Live */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Desplegar y Lanzar</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          15
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Cambio de DNS + fiesta de lanzamiento 🎉
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Los proyectos complejos pueden extenderse, pero 2 semanas es el estándar.
                  </p>
                </div>
              ) : faqItem.id === 8 ? (
                // Custom maintenance table for FAQ #8
                <div className="prose prose-invert prose-xl max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                    Sí—nuestro <strong className="text-white font-semibold">Plan de Servicio SWS</strong> (MXN $2,200/mes) cubre:
                  </p>
                  
                  {/* Beautiful Maintenance Table */}
                  <div className="my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-sm border border-gray-600/40 shadow-2xl">
                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-gray-700/60 to-gray-800/60 backdrop-blur-sm border-b border-gray-600/40">
                      <div className="grid grid-cols-3 gap-px">
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Pilar
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          Qué se incluye
                        </div>
                        <div className="px-6 py-4 text-left font-semibold text-gray-100 text-sm uppercase tracking-wide">
                          SLA
                        </div>
                      </div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-600/30">
                      {/* Security Management */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Gestión de Seguridad</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Renovaciones HTTPS, monitoreo 24/7
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Continuo
                        </div>
                      </div>
                      
                      {/* Routine Content Updates */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Actualizaciones de Contenido</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Un cambio masivo de texto/medios
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Mensual
                        </div>
                      </div>
                      
                      {/* Continuous Improvement */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Mejora Continua</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Actualizaciones de rendimiento y SEO
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          A nuestra discreción
                        </div>
                      </div>
                      
                      {/* Emergency Response */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Respuesta de Emergencia</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Diagnóstico &lt; 48 h, solución &lt; 72 h
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Según sea necesario
                        </div>
                      </div>
                      
                      {/* Reporting */}
                      <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                        <div className="px-6 py-4 text-gray-300 leading-relaxed">
                          <strong className="text-white font-semibold text-base">Reportes</strong>
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Resumen de acciones y recomendaciones
                        </div>
                        <div className="px-6 py-4 text-gray-300 leading-relaxed text-base">
                          Mensual
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Los rediseños principales o nuevas funciones se cotizan por separado.
                  </p>
                </div>
              ) : (
                <FAQContent 
                  content={faqItem.answer}
                  className="prose-xl [&_p]:text-lg [&_li]:text-lg"
                />
              )}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-600/30">
                <Link 
                  to="/preguntas"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2 transition-colors duration-200"
                >
                  ← Volver a todas las preguntas
                </Link>
                <Link 
                  to={faqItem.ctaUrl}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {faqItem.ctaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreguntaItem; 