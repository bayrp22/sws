import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useLanguageNavigation } from '../hooks/useLanguageNavigation';

interface MobileNavigationProps {
  variant?: 'hero' | 'page';
  animationStage?: number;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ variant = 'hero', animationStage = 10 }) => {
  const { language } = useLanguage();
  const { navigateToLanguage, navigateToForm, navigateToFAQ, navigateToCaseStudies, navigateToHome } = useLanguageNavigation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isHomePage = location.pathname === '/' || location.pathname === '/en' || location.pathname === '/es';
  const isDarkBackground = variant === 'hero';

  const navContent = {
    EN: {
      faq: 'FAQ',
      caseStudies: 'Case Studies',
      buildYours: 'Build Yours',
      home: 'Home',
      menu: 'Menu'
    },
    ES: {
      faq: 'FAQ',
      caseStudies: 'Casos de Éxito',
      buildYours: 'Construye el Tuyo',
      home: 'Inicio',
      menu: 'Menú'
    }
  };

  const textColor = isDarkBackground ? 'text-white' : 'text-slate-900';
  const hoverColor = isDarkBackground ? 'hover:text-white/80' : 'hover:text-slate-700';
  const bgColor = isDarkBackground ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm shadow-sm';

  const handleNavigation = (action: () => void) => {
    action();
    closeMenu();
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 lg:hidden ${
        variant === 'hero' ? `animate-fade-in ${animationStage >= 2 ? 'visible' : ''}` : ''
      }`}>
        <div className={`${bgColor} px-4 py-3 flex items-center justify-between`}>
          {/* Company Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={toggleCompanyName}
            aria-label="Toggle company name display"
          >
            <Link to={language === 'ES' ? '/es' : '/en'} className="flex items-center" onClick={closeMenu}>
              <img
                src="/img/company-logo.svg"
                alt="Company Logo"
                width="40"
                height="40"
                decoding="async"
                className="w-10 h-auto"
              />
              <span className={`${textColor} text-lg font-semibold ml-2 company-name-transition ${showFullName ? 'company-name-expanded' : ''} ${isTyping ? 'company-name-typing' : ''}`}>
                {showFullName ? 'Search Web Services' : 'SWS'}
              </span>
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className={`${textColor} p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#A5FF00] focus:ring-opacity-50`}
            aria-label={navContent[language].menu}
            aria-expanded={isMenuOpen}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`} />
              <span className={`block w-6 h-0.5 bg-current mt-1 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block w-6 h-0.5 bg-current mt-1 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] ${
            isDarkBackground ? 'bg-slate-900' : 'bg-white'
          } shadow-2xl transform transition-transform duration-300 ease-in-out`}>
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className={`text-xl font-semibold ${textColor}`}>
                  {navContent[language].menu}
                </h2>
                <button
                  onClick={closeMenu}
                  className={`${textColor} p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200`}
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6">
                <nav className="space-y-2 px-6">
                  {!isHomePage && (
                    <button
                      onClick={() => handleNavigation(navigateToHome)}
                      className={`w-full text-left py-3 px-4 rounded-lg ${textColor} ${hoverColor} transition-all duration-200 font-medium text-lg flex items-center space-x-3 hover:bg-slate-100 dark:hover:bg-slate-800`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>{navContent[language].home}</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleNavigation(navigateToFAQ)}
                    className={`w-full text-left py-3 px-4 rounded-lg ${textColor} ${hoverColor} transition-all duration-200 font-medium text-lg flex items-center space-x-3 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      (location.pathname.startsWith('/faq') || location.pathname.startsWith('/preguntas')) ? 'bg-slate-100 dark:bg-slate-800 font-bold' : ''
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{navContent[language].faq}</span>
                  </button>
                  
                  <button
                    onClick={() => handleNavigation(navigateToCaseStudies)}
                    className={`w-full text-left py-3 px-4 rounded-lg ${textColor} ${hoverColor} transition-all duration-200 font-medium text-lg flex items-center space-x-3 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                      (location.pathname.startsWith('/case-studies') || location.pathname.startsWith('/estudios-de-caso')) ? 'bg-slate-100 dark:bg-slate-800 font-bold' : ''
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{navContent[language].caseStudies}</span>
                  </button>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleNavigation(navigateToForm)}
                    className="w-full mt-6 bg-[#A5FF00] text-black font-bold py-4 px-6 rounded-lg text-lg hover:bg-[#94E600] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#A5FF00] focus:ring-opacity-50 flex items-center justify-center space-x-3"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{navContent[language].buildYours}</span>
                  </button>
                </nav>
              </div>

              {/* Language Toggle */}
              <div className="px-6 py-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center space-x-4">
                  <span className={`${textColor} text-sm font-medium`}>Language:</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        navigateToLanguage('ES');
                        closeMenu();
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        language === 'ES' 
                          ? 'bg-[#A5FF00] text-black font-bold' 
                          : `${textColor} ${hoverColor} hover:bg-slate-100 dark:hover:bg-slate-800`
                      }`}
                    >
                      ES
                    </button>
                    <button
                      onClick={() => {
                        navigateToLanguage('EN');
                        closeMenu();
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        language === 'EN' 
                          ? 'bg-[#A5FF00] text-black font-bold' 
                          : `${textColor} ${hoverColor} hover:bg-slate-100 dark:hover:bg-slate-800`
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default MobileNavigation; 