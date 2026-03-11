import React, { useState, useEffect } from 'react';
import { CheckCircle, UserPlus } from 'lucide-react';

// Try to import Framer Motion, but don't fail if it's not available
let motion: any;
try {
  motion = require('framer-motion');
} catch (error) {
  // Fallback for motion elements
  motion = {
    section: 'section',
    div: 'div',
    h2: 'h2',
    p: 'p',
  };
}

interface OfferGateProps {
  onPathSelected: (path: "site" | "nosite") => void;
}

const OfferGate: React.FC<OfferGateProps> = ({ onPathSelected }) => {
  const [language, setLanguage] = useState<'EN' | 'ES'>('EN');

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail);
    };
    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
  }, []);

  // Check if Framer Motion is available
  const isFramerAvailable = typeof motion !== 'object' || motion.section !== 'section';

  // Motion props for scroll reveal
  const sectionProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const headerProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  const cardsProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';
  const Header = isFramerAvailable ? motion.h2 : 'h2';
  const Subheader = isFramerAvailable ? motion.p : 'p';
  const Cards = isFramerAvailable ? motion.div : 'div';

  const content = {
    EN: {
      headline: "We Want to Get to Know You — and Help You Grow Online",
      question: "To build the right solution, we first need to understand your starting point. Do you already have a website?",
      hasWebsite: {
        title: "Yes, I have a site",
        description: "I already have a website but need improvements, updates, or want to start fresh with a better design."
      },
      needsWebsite: {
        title: "No, I need a site",
        description: "I'm starting from scratch and need a complete website solution built from the ground up."
      }
    },
    ES: {
      headline: "Queremos Conocerte — Y Ayudarte a Crecer Online",
      question: "Para saber el punto de partida, necesitamos el tuyo: ¿Cuentas con un sitio web?",
      hasWebsite: {
        title: "Sí, tengo un sitio",
        description: "Ya tengo un sitio web pero necesito mejoras, actualizaciones o quiero empezar de nuevo con un mejor diseño."
      },
      needsWebsite: {
        title: "No, necesito un sitio",
        description: "Estoy empezando de cero y necesito una solución web completa construida para mi negocio."
      }
    }
  };

  const handleChoice = (path: "site" | "nosite") => {
    onPathSelected(path);
    // Smooth scroll to lead form
    setTimeout(() => {
      document.getElementById("lead-form")?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <Section
      id="quote"
      className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 py-16 md:py-20 lg:py-24"
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <Header
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8"
            {...headerProps}
          >
            {content[language].headline}
          </Header>
          <Subheader
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            {...headerProps}
          >
            {content[language].question}
          </Subheader>
        </div>

        <Cards
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto"
          {...cardsProps}
        >
          {/* Has Website Card */}
          <div
            onClick={() => handleChoice("site")}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 md:hover:transform md:hover:scale-105 border-2 border-transparent hover:border-[#A5FF00]"
          >
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {content[language].hasWebsite.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content[language].hasWebsite.description}
              </p>
            </div>
          </div>

          {/* Needs Website Card */}
          <div
            onClick={() => handleChoice("nosite")}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 md:hover:transform md:hover:scale-105 border-2 border-transparent hover:border-[#A5FF00]"
          >
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                {content[language].needsWebsite.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {content[language].needsWebsite.description}
              </p>
            </div>
          </div>
        </Cards>
      </div>
    </Section>
  );
};

export default OfferGate; 