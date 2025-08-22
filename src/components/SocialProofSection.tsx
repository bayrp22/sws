import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Client {
  id: number;
  name: string;
  logo: string;
  alt: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  rating: number;
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Wild Cabo',
    logo: '/client-logos/wild-cabo.svg',
    alt: 'Wild Cabo logo'
  },
  {
    id: 2,
    name: 'Ronival',
    logo: '/client-logos/ronival.svg',
    alt: 'Ronival logo'
  },
  {
    id: 3,
    name: 'UCW',
    logo: '/client-logos/ucw.svg',
    alt: 'Unique Cabo Weddings logo'
  },
  {
    id: 4,
    name: 'Blue Ocean',
    logo: '/client-logos/blue-ocean.svg',
    alt: 'Blue Ocean Yachting logo'
  },
  {
    id: 5,
    name: 'Antigua Cafe',
    logo: '/client-logos/antigua-cafe.svg',
    alt: 'Antigua Cafe logo'
  },
  {
    id: 6,
    name: 'BajaExperience',
    logo: '/client-logos/bajaexperience.svg',
    alt: 'BajaExperience logo'
  },
  {
    id: 7,
    name: 'Todos Santos',
    logo: '/client-logos/todos-santos.svg',
    alt: 'Todos Santos Real Estate logo'
  }
];

const SocialProofSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    EN: {
      heading: "Trusted by Los Cabos Businesses",
      subheading: "Join our growing family of successful clients",
      testimonials: [
        {
          id: 1,
          quote: "Search Web Services transformed our online presence completely. Our bookings increased by 300% within the first month of launching our new website.",
          author: "Maria Rodriguez",
          company: "Blue Ocean Yachting",
          rating: 5
        },
        {
          id: 2,
          quote: "The team at SWS delivered exactly what they promised - on time and on budget. Our wedding inquiry rate has never been higher.",
          author: "Carlos Mendez",
          company: "Unique Cabo Weddings",
          rating: 5
        },
        {
          id: 3,
          quote: "Professional, responsive, and results-driven. They understood our vision and brought it to life beautifully.",
          author: "Ana Silva",
          company: "Antigua Cafe",
          rating: 5
        }
      ],
      moreButton: "View All Case Studies"
    },
    ES: {
      heading: "Confianza de Empresas de Los Cabos",
      subheading: "Únete a nuestra creciente familia de clientes exitosos",
      testimonials: [
        {
          id: 1,
          quote: "Search Web Services transformó completamente nuestra presencia en línea. Nuestras reservas aumentaron 300% en el primer mes después del lanzamiento.",
          author: "Maria Rodriguez",
          company: "Blue Ocean Yachting",
          rating: 5
        },
        {
          id: 2,
          quote: "El equipo de SWS entregó exactamente lo que prometieron - a tiempo y dentro del presupuesto. Nunca habíamos tenido tantas consultas de bodas.",
          author: "Carlos Mendez",
          company: "Unique Cabo Weddings",
          rating: 5
        },
        {
          id: 3,
          quote: "Profesionales, receptivos y orientados a resultados. Entendieron nuestra visión y la hicieron realidad de manera hermosa.",
          author: "Ana Silva",
          company: "Antigua Cafe",
          rating: 5
        }
      ],
      moreButton: "Ver Todos los Estudios de Caso"
    }
  };

  const currentContent = content[language];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4 leading-tight">
            {currentContent.heading}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {currentContent.subheading}
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-20">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-8">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/5"
              >
                <img
                  src={client.logo}
                  alt={client.alt}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
            
            {/* "And More" Button */}
            <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer group">
              <div className="text-center">
                <div className="text-2xl mb-1 text-blue-400 group-hover:text-blue-300 transition-colors">+</div>
                <div className="text-xs text-gray-300 group-hover:text-white transition-colors font-medium">
                  {language === 'EN' ? 'more' : 'más'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {currentContent.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-sm border border-gray-600/30 rounded-3xl p-8 hover:border-gray-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Stars */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Quote */}
              <blockquote className="text-gray-300 leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="border-t border-gray-600/30 pt-4">
                <div className="font-semibold text-white text-lg">
                  {testimonial.author}
                </div>
                <div className="text-gray-400 font-medium">
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to scroll down to case studies */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer group">
            <span className="text-lg font-medium">{currentContent.moreButton}</span>
            <svg 
              className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection; 