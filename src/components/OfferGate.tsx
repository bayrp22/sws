import React from 'react';
import { CheckCircle, UserPlus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
  variant?: "default" | "hero";
}

const OfferGate: React.FC<OfferGateProps> = ({ variant = "default" }) => {
  const { language } = useLanguage();

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

  const handleChoice = () => {
    // Redirect all leads to the external get-started page
    window.location.href = 'https://searchlabs.netlify.app/get-started';
  };

  // Conditional styling based on variant
  const isHeroVariant = variant === "hero";
  const sectionClasses = isHeroVariant 
    ? "" // No background for hero variant, inherits from parent
    : "bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 py-16 md:py-20 lg:py-24";
  
  const cardClasses = isHeroVariant
    ? "bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-lime-400/20 cursor-pointer transition-all duration-300 md:hover:transform md:hover:scale-105 border-2 border-slate-700 hover:border-[#A5FF00]"
    : "bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 md:hover:transform md:hover:scale-105 border-2 border-transparent hover:border-[#A5FF00]";

  const titleClasses = isHeroVariant ? "text-white" : "text-gray-900";
  const descriptionClasses = isHeroVariant ? "text-slate-300" : "text-gray-600";

  return (
    <Section
      id="quote"
      data-section="offer-gate"
      className={sectionClasses}
      {...sectionProps}
    >
      <div className={isHeroVariant ? "" : "container mx-auto px-4 md:px-8 max-w-6xl"}>
        <Cards
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto"
          {...cardsProps}
        >
          {/* Has Website Card */}
          <div
            onClick={handleChoice}
            className={cardClasses}
          >
            <div className="text-center">
              <div className="bg-green-900 rounded-full border-4 border-[#A5FF00] w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${titleClasses}`}>
                {content[language].hasWebsite.title}
              </h3>
              <p className={`leading-relaxed ${descriptionClasses}`}>
                {content[language].hasWebsite.description}
              </p>
            </div>
          </div>

          {/* Needs Website Card */}
          <div
            onClick={handleChoice}
            className={cardClasses}
          >
            <div className="text-center">
              <div className="bg-pink-900 rounded-full border-4 border-pink-400 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className={`text-xl md:text-2xl font-bold mb-4 ${titleClasses}`}>
                {content[language].needsWebsite.title}
              </h3>
              <p className={`leading-relaxed ${descriptionClasses}`}>
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