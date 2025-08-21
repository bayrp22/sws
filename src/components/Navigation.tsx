import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useLanguageNavigation } from '../hooks/useLanguageNavigation';

interface NavigationProps {
  variant?: 'hero' | 'page';
  animationStage?: number;
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'hero', animationStage = 10 }) => {
  const { language } = useLanguage();
  const { navigateToLanguage, navigateToForm, navigateToFAQ, navigateToCaseStudies, navigateToHome } = useLanguageNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showFullName, setShowFullName] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleCompanyName = () => {
    if (!showFullName) {
      setIsTyping(true);
      setShowFullName(true);
      setTimeout(() => setIsTyping(false), 1000);
    } else {
      setShowFullName(false);
      setIsTyping(false);
    }
  };

  const scrollToOfferGate = () => {
    const offerGateElement = document.querySelector('[data-section="offer-gate"]');
    if (offerGateElement) {
      offerGateElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate to language-aware home with form parameter
      const homeUrl = language === 'ES' ? '/es#offer-gate' : '/en#offer-gate';
      window.location.href = homeUrl;
    }
  };

  const isHomePage = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/es';
  const isDarkBackground = variant === 'hero';

  const navContent = {
    EN: {
      faq: 'FAQ',
      caseStudies: 'Case Studies',
      buildYours: 'Build Yours',
      home: 'Home'
    },
    ES: {
      faq: 'FAQ',
      caseStudies: 'Casos de Éxito',
      buildYours: 'Construye el Tuyo',
      home: 'Inicio'
    }
  };

  const textColor = isDarkBackground ? 'text-white' : 'text-slate-900';
  const hoverColor = isDarkBackground ? 'hover:text-white/80' : 'hover:text-slate-700';
  const bgColor = isDarkBackground ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm shadow-sm';

  return (
    <>
      {/* Company logo in top-left corner */}
      <div
        className={`absolute top-6 left-6 flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 z-50 ${
          variant === 'hero' ? `animate-slide-in-left ${animationStage >= 2 ? 'visible' : ''}` : ''
        }`}
        onClick={toggleCompanyName}
        aria-label="Toggle company name display"
      >
        <Link to={language === 'ES' ? '/es' : '/en'} className="flex items-center">
          <img
            src="/img/company-logo.svg"
            alt="Company Logo"
            width="56"
            height="56"
            decoding="async"
            className="w-14 h-auto"
          />
          <span className={`${textColor} text-xl font-semibold ml-2 company-name-transition ${showFullName ? 'company-name-expanded' : ''} ${isTyping ? 'company-name-typing' : ''}`}>
            {showFullName ? 'Search Web Services' : 'SWS'}
          </span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-50 ${
        variant === 'hero' ? `animate-fade-in ${animationStage >= 3 ? 'visible' : ''}` : ''
      }`}>
        <div className={`${bgColor} rounded-full px-6 py-3 flex items-center space-x-6`}>
          {!isHomePage && (
            <Link
              to={language === 'ES' ? '/es' : '/en'}
              className={`${textColor} ${hoverColor} transition-all duration-200 font-medium text-sm`}
            >
              {navContent[language].home}
            </Link>
          )}
          
          <button
            onClick={navigateToFAQ}
            className={`${textColor} ${hoverColor} transition-all duration-200 font-medium text-sm ${
              (location.pathname.startsWith('/faq') || location.pathname.startsWith('/preguntas')) ? 'font-bold underline' : ''
            }`}
          >
            {navContent[language].faq}
          </button>
          
          <button
            onClick={navigateToCaseStudies}
            className={`${textColor} ${hoverColor} transition-all duration-200 font-medium text-sm ${
              (location.pathname.startsWith('/case-studies') || location.pathname.startsWith('/estudios-de-caso')) ? 'font-bold underline' : ''
            }`}
          >
            {navContent[language].caseStudies}
          </button>
          
          {/* Build Yours CTA - Prominent */}
          <button
            onClick={navigateToForm}
            className="bg-[#A5FF00] text-black font-bold px-4 py-2 rounded-lg text-sm hover:bg-[#94E600] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A5FF00] focus:ring-opacity-50"
          >
            {navContent[language].buildYours}
          </button>
        </div>
      </nav>

      {/* Language Toggle in top-right */}
      <div className={`absolute top-6 right-6 z-50 ${
        variant === 'hero' ? `animate-fade-in ${animationStage >= 8 ? 'visible' : ''}` : ''
      }`}>
        <div className={`${bgColor} rounded-full px-4 py-2 flex items-center space-x-2`}>
          <button
            onClick={() => navigateToLanguage('ES')}
            className={`${textColor} transition-all duration-200 text-sm ${
              language === 'ES' ? 'font-bold underline' : hoverColor
            }`}
          >
            ES
          </button>
          <span className={`${isDarkBackground ? 'text-white/60' : 'text-slate-400'}`}>|</span>
          <button
            onClick={() => navigateToLanguage('EN')}
            className={`${textColor} transition-all duration-200 text-sm ${
              language === 'EN' ? 'font-bold underline' : hoverColor
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* CSS for company name animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .company-name-transition {
            transition: all 0.3s ease-in-out;
            overflow: hidden;
            white-space: nowrap;
          }
          .company-name-expanded {
            max-width: 200px;
          }
          .company-name-typing {
            animation: typing 1s steps(20, end);
          }
          @keyframes typing {
            from { max-width: 0; }
            to { max-width: 200px; }
          }
        `
      }} />
    </>
  );
};

export default Navigation; 