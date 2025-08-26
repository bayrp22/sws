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
    logo: '/wild cabo white logo.png',
    alt: 'Wild Cabo logo'
  },
  {
    id: 2,
    name: 'Ronival',
    logo: '/ronival white fill logo.png',
    alt: 'Ronival logo'
  },
  {
    id: 3,
    name: 'UCW',
    logo: '/ucw logo white fill.png',
    alt: 'Unique Cabo Weddings logo'
  },
  {
    id: 4,
    name: 'Cabo Pirates',
    logo: '/Cabo Pirates all white logo.png',
    alt: 'Cabo Pirates logo'
  },
  {
    id: 5,
    name: 'Antigua Cafe',
    logo: '/antigua cafe logo.png',
    alt: 'Antigua Cafe logo'
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
    <section className="min-h-screen px-4 relative flex items-center">
      
      <div className="max-w-6xl mx-auto relative z-10 w-full py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3 md:mb-4 leading-tight">
            {currentContent.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {currentContent.subheading}
          </p>
        </div>

        {/* Client Logos */}
        <div className="mb-0">
          {/* Logo Container */}
          <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-6 items-center justify-items-center max-w-4xl mx-auto mb-4 md:mb-6">
            {clients.map((client) => {
              // Individual styling for each logo to ensure visual consistency
              const getLogoStyles = (logoName: string) => {
                switch (logoName) {
                  case 'Wild Cabo':
                    return "w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28"; // Square logo, slightly smaller
                  case 'Ronival':
                    return "w-14 h-14 md:w-18 md:h-18 lg:w-24 lg:h-24"; // Circular logo, even smaller
                  case 'UCW':
                    return "w-20 h-12 md:w-28 md:h-16 lg:w-36 lg:h-20"; // Wide clover logo, width priority
                  case 'Cabo Pirates':
                    return "w-24 h-18 md:w-32 md:h-24 lg:w-40 lg:h-32"; // Detailed logo, slightly larger for better visibility
                  case 'Antigua Cafe':
                    return "w-28 h-16 md:w-40 md:h-24 lg:w-48 lg:h-28"; // Text-heavy logo, larger for better readability
                  default:
                    return "w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32"; // Fallback
                }
              };

              return (
                <div key={client.id} className="flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className={`${getLogoStyles(client.name)} object-contain opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              );
            })}
          </div>
          
          {/* Names Container */}
          <div className="grid grid-cols-5 gap-2 md:gap-4 lg:gap-6 justify-items-center max-w-4xl mx-auto">
            {clients.map((client) => (
              <div key={`name-${client.id}`} className="text-center">
                <h3 className="text-gray-300 text-xs md:text-sm lg:text-base font-medium hover:text-white transition-colors duration-300">
                  {client.name}
                </h3>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default SocialProofSection; 