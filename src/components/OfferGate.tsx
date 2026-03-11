import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
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

  const actionsProps = isFramerAvailable ? {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.4, ease: "easeOut" },
    viewport: { once: true, margin: "-100px" }
  } : {};

  // Component selection based on availability
  const Section = isFramerAvailable ? motion.section : 'section';
  const Header = isFramerAvailable ? motion.h2 : 'h2';
  const Subheader = isFramerAvailable ? motion.p : 'p';
  const Actions = isFramerAvailable ? motion.div : 'div';

  const content = {
    EN: {
      headline: "START BUILDING YOUR WEBSITE TODAY",
      subline1: "Talk directly with our team in Los Cabos.",
      subline2: "Fast responses. Clear next steps.",
      whatsapp: "WhatsApp Us",
      email: "Email Us"
    },
    ES: {
      headline: "EMPIEZA TU SITIO WEB HOY",
      subline1: "Habla directo con nuestro equipo en Los Cabos.",
      subline2: "Respuesta rapida. Siguientes pasos claros.",
      whatsapp: "Escribenos por WhatsApp",
      email: "Escribenos por Correo"
    }
  };

  const whatsappNumber = "+52 624 264 4012";
  const whatsappLink = "https://wa.me/526242644012";
  const email = "hola@searchvisionary.tech";

  // Conditional styling based on variant
  const isHeroVariant = variant === "hero";
  const sectionClasses = isHeroVariant 
    ? "py-16 md:py-20 lg:py-24"
    : "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 md:py-20 lg:py-24";

  return (
    <Section
      id="offer-gate"
      data-section="offer-gate"
      className={sectionClasses}
      {...sectionProps}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="max-w-4xl mx-auto text-center">
          <Header
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6"
            {...headerProps}
          >
            {content[language].headline}
          </Header>

          <Subheader className="text-lg md:text-2xl text-white/90 leading-relaxed mb-2" {...headerProps}>
            {content[language].subline1}
          </Subheader>
          <Subheader className="text-lg md:text-2xl text-white/90 leading-relaxed mb-10 md:mb-12" {...headerProps}>
            {content[language].subline2}
          </Subheader>

          <Actions
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
            {...actionsProps}
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#A5FF00] text-black font-bold px-8 py-4 rounded-xl hover:bg-[#94E600] transition-colors duration-200 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{content[language].whatsapp}</span>
              <span className="opacity-80">{whatsappNumber}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors duration-200 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>{content[language].email}</span>
              <span className="opacity-80">{email}</span>
            </a>
          </Actions>
        </div>
      </div>
    </Section>
  );
};

export default OfferGate; 
