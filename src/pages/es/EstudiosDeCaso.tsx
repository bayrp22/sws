import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Meta from '../../seo/Meta';
import Navigation from '../../components/Navigation';
import SocialProofSection from '../../components/SocialProofSection';

interface CaseStudy {
  id: number;
  title: string;
  company: string;
  url: string;
  displayUrl: string;
  budget: string;
  timeline: string;
  description: string;
  image: string;
  imageAlt: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "BajaExperience",
    company: "Scott Purcell",
    url: "https://bajaexperience.life",
    displayUrl: "bajaexperience.life",
    budget: "$25,000 MXN",
    timeline: "14 días",
    description: "Blog personal y serie de podcast que documenta el camino transformador de Scott Purcell hacia la salud y el bienestar, con historias inspiradoras y consejos prácticos.",
    image: "/case-studies/bajaexperience.jpg",
    imageAlt: "Captura de pantalla del sitio web BajaExperience mostrando blog personal y interfaz de podcast"
  },
  {
    id: 2,
    title: "Blue Ocean",
    company: "Blue Ocean Yachting",
    url: "https://wildcabocorporate.framer.website",
    displayUrl: "wildcabocorporate.framer.website",
    budget: "$40,000 MXN",
    timeline: "18 días",
    description: "Agencia de yates de lujo en Baja California Sur que ofrece servicios de charter premium, gestión de yates y experiencias marítimas exclusivas.",
    image: "/case-studies/blue-ocean.jpg",
    imageAlt: "Sitio web de Blue Ocean Yachting mostrando servicios de charter de yates de lujo en Cabo"
  },
  {
    id: 3,
    title: "UCW",
    company: "Unique Cabo Weddings",
    url: "https://caboweddingplanner.love",
    displayUrl: "caboweddingplanner.love",
    budget: "$40,000 MXN",
    timeline: "21 días",
    description: "Servicio de planificación de bodas de destino de alta gama especializado en ceremonias y recepciones de lujo en Los Cabos y áreas circundantes.",
    image: "/case-studies/ucw.jpg",
    imageAlt: "Sitio web de Unique Cabo Weddings mostrando servicios de planificación de bodas de destino de lujo"
  },
  {
    id: 4,
    title: "AntiguaCafe",
    company: "Antigua Cafe",
    url: "https://antiguacafe.com",
    displayUrl: "antiguacafe.com",
    budget: "$25,000 MXN",
    timeline: "12 días",
    description: "Encantador café local ubicado en el corazón del centro de San José del Cabo, sirviendo café mexicano auténtico y pasteles tradicionales.",
    image: "/case-studies/antigua-cafe.jpg",
    imageAlt: "Sitio web de Antigua Cafe mostrando cafetería mexicana auténtica y pasteles tradicionales"
  },
  {
    id: 5,
    title: "TodosSantos",
    company: "Todos Santos Real Estate",
    url: "https://todossantos.homes",
    displayUrl: "todossantos.homes",
    budget: "$40,000 MXN",
    timeline: "19 días",
    description: "Plataforma inmobiliaria premium especializada en propiedades de lujo y casas vacacionales en el pueblo artístico de Todos Santos.",
    image: "/case-studies/todos-santos.jpg",
    imageAlt: "Sitio web de Todos Santos Real Estate con propiedades de lujo y casas vacacionales"
  }
];

const EstudiosDeCaso: React.FC = () => {
  // Memoize the case study cards to prevent re-rendering during scroll
  const caseStudyCards = useMemo(() => 
    caseStudies.map((study, index) => (
      <div key={study.id} className="group bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-8 hover:border-gray-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Project Info */}
          <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {study.id}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {study.title}
                </h2>
                <p className="text-lg text-gray-400 font-medium">
                  {study.company}
                </p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              {study.description}
            </p>

            {/* Project Details */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Presupuesto
                </p>
                <p className="text-lg font-bold text-white">
                  {study.budget}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30">
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
                  Cronograma
                </p>
                <p className="text-lg font-bold text-white">
                  {study.timeline}
                </p>
              </div>
            </div>

            {/* Visit Site Button */}
            <a 
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Visitar {study.displayUrl}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Right Side - Thumbnail */}
          <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
            <div className="aspect-video bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-2xl border border-gray-600/30 overflow-visible group-hover:border-gray-500/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <img
                src={study.image}
                alt={study.imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 rounded-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    )), []);

  return (
    <>
      <Meta 
        path="/estudios-de-caso"
        lang="es"
        title="Estudios de Caso - Search Web Services"
        description="Explora nuestro portafolio de proyectos exitosos de desarrollo web en Los Cabos. Ve ejemplos reales de sitios web personalizados, plataformas de e-commerce y soluciones digitales que hemos construido para empresas locales."
        alternates={{ en: '/case-studies', es: '/estudios-de-caso' }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        
        <Navigation variant="page" />
        
        {/* Social Proof Hero Section */}
        <SocialProofSection />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Case Studies Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl mb-8">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
              Estudios de Caso
            </h1>
          </div>

          {/* Case Studies Grid */}
          <div className="max-w-6xl mx-auto grid gap-8 md:gap-12">
            {caseStudyCards}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-12 text-white relative overflow-hidden max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-3xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  ¿Listo para unirte a nuestro portafolio?
                </h3>
                <p className="text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
                  Creemos algo increíble juntos. Obtén tu cotización personalizada y cronograma hoy.
                </p>
                <Link 
                  to="/formulario?source=case-studies"
                  className="inline-block bg-gradient-to-r from-white to-gray-100 text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 hover:from-gray-50 hover:to-white"
                >
                  Iniciar Tu Proyecto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstudiosDeCaso; 