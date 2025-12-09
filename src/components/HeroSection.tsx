import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ResponsiveNavigation from './ResponsiveNavigation';

// Try to import Framer Motion, but don't fail if it's not available
let motion: any;
try {
  motion = require('framer-motion');
} catch (error) {
  // Fallback for motion elements
  motion = {
    h1: 'h1',
    p: 'p',
    div: 'div',
  };
}

const HeroSection: React.FC = () => {
  const { language } = useLanguage();
  const [animationStage, setAnimationStage] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Animation sequence timing
  const animationDelays = [
    0,    // Background and texture
    300,  // Top left logo
    600,  // Center logo
    900,  // Main headline
    1200, // Subheading
    1500, // Trust badges
    1800, // CTA button
    2100, // Language toggle
    2400  // Scroll arrow
  ];

  useEffect(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];

    // Set up animation sequence
    animationDelays.forEach((delay, index) => {
      const timeout = setTimeout(() => setAnimationStage(index + 1), delay);
      timeoutsRef.current.push(timeout);
    });

    // Cleanup function
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  const scrollToNextSection = (e: React.MouseEvent) => {
    e.preventDefault();

    const offerGateSection = document.getElementById('quote');
    if (offerGateSection) {
      offerGateSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToOfferGate = (e: React.MouseEvent) => {
    e.preventDefault();
    // Redirect all leads to the external get-started page
    window.location.href = 'https://searchlabs.netlify.app/get-started';
  };

  // Use regular React components if Framer Motion isn't available
  const isFramerAvailable = typeof motion !== 'object' || motion.h1 !== 'h1';

  // Motion props, only applied if Framer is available
  const headlineProps = isFramerAvailable ? {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 }
  } : {};

  const sublineProps = isFramerAvailable ? {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.35 }
  } : {};

  const trustBadgeProps = isFramerAvailable ? {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5 }
  } : {};

  const ctaProps = isFramerAvailable ? {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.65 }
  } : {};

  // Component selection based on availability
  const Headline = isFramerAvailable ? motion.h1 : 'h1';
  const Paragraph = isFramerAvailable ? motion.p : 'p';
  const TrustBadges = isFramerAvailable ? motion.div : 'div';
  const CTAContainer = isFramerAvailable ? motion.div : 'div';

  // Content based on language
  const content = {
    EN: {
      headline: "Launch a Professional Website in Weeks – Without Breaking the Bank",
      subhead: "At SWS, we create custom websites with quality design, delivered quickly. Perfect for businesses in Los Cabos that want to get online fast and look professional, no fluff.",
      primaryCTA: "Get My Free Quote ↓",
      arrowText: "See How It Works"
    },
    ES: {
      headline: "Lanza tu Página Profesional en Cuestión de Semanas — Sin Vaciar la Cartera",
      subhead: "En SWS creamos sitios web a la medida, con diseño de calidad y listos en poco tiempo. Ideal para negocios de Los Cabos que quieren estar en línea rápido, con buena imagen y sin gastar de más.",
      primaryCTA: "Obtener Mi Cotización Gratis ↓",
      arrowText: "Ver Cómo Funciona"
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative py-16 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 animate-bg-fade-in ${animationStage >= 1 ? 'visible' : ''}`}
    >
      {/* Grain overlay */}
      <div className={`absolute inset-0 hero--grain animate-bg-fade-in ${animationStage >= 1 ? 'visible' : ''}`}></div>

      {/* Pink flowing lines background - bottom right */}
      <div 
        className={`absolute bottom-0 right-0 w-2/3 h-2/3 md:w-4/5 md:h-4/5 lg:w-3/4 lg:h-3/4 bg-no-repeat opacity-80 pointer-events-none z-10 animate-bg-fade-in ${animationStage >= 1 ? 'visible' : ''}`}
        style={{
          backgroundImage: 'url(/images/pink-lines-new.png)',
          backgroundPosition: 'bottom right',
          backgroundSize: 'contain'
        }}
      ></div>

      {/* Navigation */}
              <ResponsiveNavigation variant="hero" animationStage={animationStage} />

      <div className="text-center px-4 md:px-8 max-w-4xl flex flex-col items-center relative z-20 pt-8 md:pt-0">
        {/* Magnifying glass logo - centered at top */}
        <img
          src="/img/company-logo.svg"
          alt="SWS Logo"
          width="96"
          height="96"
          decoding="async"
          className={`w-24 h-auto mb-8 animate-scale-in hidden md:block ${animationStage >= 3 ? 'visible' : ''}`}
        />

        <Headline
          className={`text-3xl md:text-6xl font-bold text-white mb-8 whitespace-pre-line animate-fade-in-up ${animationStage >= 4 ? 'visible' : ''}`}
          {...headlineProps}
        >
          {content[language].headline}
        </Headline>

        <Paragraph
          className={`text-lg md:text-2xl text-white/90 mb-8 animate-fade-in-up ${animationStage >= 5 ? 'visible' : ''}`}
          {...sublineProps}
        >
          {content[language].subhead}
        </Paragraph>

        {/* Trust Badges Row */}
        <TrustBadges
          className={`flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-10 animate-fade-in-up ${animationStage >= 6 ? 'visible' : ''}`}
          {...trustBadgeProps}
        >
          <div className="flex items-center space-x-2 text-white">
            <span className="text-xl md:text-2xl">📍</span>
            <span className="text-base md:text-lg font-medium">{language === 'EN' ? 'Based in Cabo San Lucas' : 'Con base en Cabo San Lucas'}</span>
          </div>
          <div className="flex items-center space-x-2 text-white">
            <span className="text-xl md:text-2xl">🗣️</span>
            <span className="text-base md:text-lg font-medium">{language === 'EN' ? 'Hablamos Español' : 'Entregables en una semana'}</span>
          </div>
          <div className="flex items-center space-x-2 text-white">
            <span className="text-xl md:text-2xl">🤝</span>
            <span className="text-base md:text-lg font-medium">{language === 'EN' ? 'Deliverables in a Week' : 'Atención Personal, de Frente'}</span>
          </div>
        </TrustBadges>

        {/* Primary CTA */}
        <CTAContainer
          className={`flex justify-center mb-12 animate-bounce-in ${animationStage >= 7 ? 'visible' : ''}`}
          {...ctaProps}
        >
          <button
            onClick={scrollToOfferGate}
            className="bg-[#A5FF00] text-black font-semibold px-8 py-4 rounded-lg text-lg hover:bg-[#94E600] transition-colors duration-200 shadow-lg"
          >
            {content[language].primaryCTA}
          </button>
        </CTAContainer>
      </div>

      {/* Enhanced Arrow Animation */}
      <div className={`absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in-up ${animationStage >= 9 ? 'visible' : ''}`}>
        <button
          onClick={scrollToNextSection}
          className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
        >
          <p className="text-white mb-3 text-sm">{content[language].arrowText}</p>
          <ArrowDown className="w-6 h-6 text-white animate-pulse-custom" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse-custom {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .animate-pulse-custom {
            animation: pulse-custom 1.5s ease-in-out infinite;
          }
        `
      }} />
    </section>
  );
};

export default HeroSection;
