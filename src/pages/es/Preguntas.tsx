import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { faqDataEs, faqPageDataEs } from '../../data/faq-es';
import { faqPageJsonLd } from '../../seo/jsonld';
import Meta from '../../seo/Meta';
import ResponsiveNavigation from '../../components/ResponsiveNavigation';
import FAQContent from '../../components/FAQContent';
import { useSequentialAnimation } from '../../hooks/useSequentialAnimation';

const PreguntasEs: React.FC = () => {
  // Sequential animation for page elements
  const { getAnimationClass } = useSequentialAnimation({
    delays: [0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800]
  });

  // Memoize the JSON-LD data to prevent recalculation
  const jsonLd = useMemo(() => faqPageJsonLd(faqDataEs), []);

  // Memoize the scroll handler to prevent recreation on each render
  const handleScrollToFAQ = useCallback((itemId: number) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      const targetElement = document.getElementById(`faq-${itemId}`);
      if (mainContent && targetElement) {
        // Calculate offset relative to the scrollable container with padding for nav
        const containerRect = mainContent.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const scrollTop = mainContent.scrollTop;
        const offsetTop = targetRect.top - containerRect.top + scrollTop - 24; // 24px padding from top
        
        mainContent.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    };
  }, []);

  // Memoize the scroll handler for CTA
  const handleScrollToCTA = useCallback(() => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const mainContent = document.getElementById('main-content');
      const targetElement = document.getElementById('faq-cta');
      if (mainContent && targetElement) {
        const containerRect = mainContent.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        const scrollTop = mainContent.scrollTop;
        const offsetTop = targetRect.top - containerRect.top + scrollTop - 24;
        
        mainContent.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    };
  }, []);

  // Create CTA FAQ item
  const ctaFaqItem = useMemo(() => (
    <div id="faq-cta" key="cta" className="group bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-12 hover:border-blue-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
          ¿Listo para comenzar?
        </h2>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Obtén una cotización personalizada y cronograma para tu proyecto.
        </p>
        <Link 
          to="/es/contacto?source=faq-cta"
          className="inline-block bg-gradient-to-r from-white to-gray-100 text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 hover:from-gray-50 hover:to-white"
        >
          Contactar Nuestro Equipo
        </Link>
      </div>
    </div>
  ), []);

  // Memoize the FAQ items to prevent re-rendering
  const faqItems = useMemo(() => 
    faqDataEs.map((item) => (
      <div id={`faq-${item.id}`} key={item.id} className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-8 hover:border-gray-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 scroll-mt-24">
        <div className="flex items-start gap-6 mb-6">
          <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {item.id}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {item.question}
            </h2>
          </div>
        </div>
        
        <div className="mb-8">
          {item.id === 1 ? (
            // Custom pricing table for FAQ #1
            <div className="text-gray-300">
              <p className="text-gray-300 leading-relaxed mb-6">
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
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Inicial</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      $25,000
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Empresas locales que necesitan un sitio brochure de 4‑6 páginas.
                    </div>
                  </div>
                  
                  {/* Business Row */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Negocio</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      $40,000
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      E‑commerce, motores de reserva o contenido multiidioma.
                    </div>
                  </div>
                  
                  {/* Premium Row */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Premium</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Cotización personalizada
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Grupos de 5+ sitios o funcionalidad a nivel de aplicación.
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Todos los niveles incluyen diseño mobile‑first, SEO básico, CI/CD y un mes de hosting.
              </p>
            </div>
          ) : item.id === 4 ? (
            // Custom timeline table for FAQ #4
            <div className="text-gray-300">
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
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Recibir Activos</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      1–5
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Ingresamos tu marca y contenido.
                    </div>
                  </div>
                  
                  {/* Build Concept */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Construir Concepto</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      6–10
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Primera versión en vivo en URL de prueba.
                    </div>
                  </div>
                  
                  {/* Polish Details */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Pulir Detalles</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      11–12
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Ajustes perfectos y micro‑animaciones.
                    </div>
                  </div>
                  
                  {/* Test Integrations */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Probar Integraciones</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      13–14
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Formularios, APIs, revisión SEO, auditoría de seguridad.
                    </div>
                  </div>
                  
                  {/* Deploy & Go Live */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Desplegar y Lanzar</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      15
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Cambio de DNS + fiesta de lanzamiento 🎉
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Los proyectos complejos pueden extenderse, pero 2 semanas es el estándar.
              </p>
            </div>
          ) : item.id === 8 ? (
            // Custom maintenance table for FAQ #8
            <div className="text-gray-300">
              <p className="text-gray-300 leading-relaxed mb-6">
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
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Gestión de Seguridad</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Renovaciones HTTPS, monitoreo 24/7
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Continuo
                    </div>
                  </div>
                  
                  {/* Routine Content Updates */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Actualizaciones de Contenido</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Un cambio masivo de texto/medios
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Mensual
                    </div>
                  </div>
                  
                  {/* Continuous Improvement */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Mejora Continua</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Actualizaciones de rendimiento y SEO
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      A nuestra discreción
                    </div>
                  </div>
                  
                  {/* Emergency Response */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Respuesta de Emergencia</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Diagnóstico &lt; 48 h, solución &lt; 72 h
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Según sea necesario
                    </div>
                  </div>
                  
                  {/* Reporting */}
                  <div className="grid grid-cols-3 gap-px hover:bg-gray-700/20 transition-colors duration-200">
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      <strong className="text-white font-semibold">Reportes</strong>
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Resumen de acciones y recomendaciones
                    </div>
                    <div className="px-6 py-4 text-gray-300 text-sm leading-relaxed">
                      Mensual
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Los rediseños principales o nuevas funciones se cotizan por separado.
              </p>
            </div>
          ) : (
            <FAQContent 
              content={item.answer}
              className="text-gray-300"
            />
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-600/30">
          <Link 
            to={`/preguntas/${item.slug}`}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2 transition-colors duration-200"
          >
            Ver página detallada
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link 
            to={item.ctaUrl}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {item.ctaText}
          </Link>
        </div>
      </div>
    )), []);

  // Memoize the navigation items to prevent re-rendering
  const navigationItems = useMemo(() => [
    ...faqDataEs.map((item) => (
      <a
        key={item.id}
        href={`#faq-${item.id}`}
        className="group block p-3 rounded-xl hover:bg-gray-700/30 transition-all duration-200"
        onClick={handleScrollToFAQ(item.id)}
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center text-blue-400 font-bold text-sm">
            {item.id}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200 leading-tight">
              {item.question}
            </p>
          </div>
        </div>
      </a>
    )),
    // Add CTA navigation item
    <a
      key="cta"
      href="#faq-cta"
      className="group block p-3 rounded-xl hover:bg-blue-600/20 transition-all duration-200 border border-blue-500/20"
      onClick={handleScrollToCTA()}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-blue-300 group-hover:text-white transition-colors duration-200 leading-tight">
            ¿Listo para comenzar?
          </p>
        </div>
      </div>
    </a>
  ], [handleScrollToFAQ, handleScrollToCTA]);

  return (
    <>
      <Meta 
        path="/preguntas"
        lang="es"
        title={faqPageDataEs.title}
        description={faqPageDataEs.description}
        alternates={{ en: '/faq', es: '/preguntas' }}
      />
      
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        
        <ResponsiveNavigation variant="page" />
        
        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {/* Main Content Layout */}
          <div className="max-w-7xl mx-auto flex gap-8 lg:gap-12 h-[calc(100vh-8rem)]">
            {/* Left Sidebar - Index */}
            <div className={`w-1/4 hidden lg:block ${getAnimationClass(2, 'animate-slide-in-left')}`}>
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-2xl h-full flex flex-col">
                <div className="p-6 border-b border-gray-600/30">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="text-lg">📌</span> Índice Rápido
                  </h2>
                </div>
                <nav className="flex-1 overflow-y-auto p-6 pt-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent">
                  {navigationItems}
                </nav>
              </div>
            </div>

            {/* Right Content - FAQ Items */}
            <div id="main-content" className={`w-full lg:w-3/4 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent ${getAnimationClass(3, 'animate-fade-in-up')}`}>
              {/* Header - Now scrolls with content */}
              <div className="text-center mb-16 pt-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl mb-8 ${getAnimationClass(4, 'animate-scale-in')}`}>
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 leading-tight ${getAnimationClass(5, 'animate-fade-in-up')}`}>
                  Preguntas Frecuentes
                </h1>
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {faqPageDataEs.description}
                  </p>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="space-y-8 pb-8">
                {faqItems}
                {ctaFaqItem}
              </div>
            </div>
          </div>

          {/* Mobile Index - Only visible on mobile */}
          <div className="lg:hidden mb-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-lg">📌</span> Índice Rápido
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {navigationItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreguntasEs; 