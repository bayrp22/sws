import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const useLanguageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, isSpanish } = useLanguage();

  // Route mappings for special routes that don't follow /en or /es prefix pattern
  const routeMappings = {
    // English -> Spanish
    '/form': '/formulario',
    '/faq': '/preguntas',
    '/case-studies': '/estudios-de-caso',
    // Spanish -> English  
    '/formulario': '/form',
    '/preguntas': '/faq',
    '/estudios-de-caso': '/case-studies'
  };

  const switchLanguage = () => {
    const currentPath = location.pathname;
    
    // Handle special route mappings first
    if (routeMappings[currentPath]) {
      navigate(routeMappings[currentPath]);
      return;
    }
    
    // Handle FAQ and case study sub-routes (e.g., /faq/slug, /preguntas/slug)
    if (currentPath.startsWith('/faq/')) {
      const slug = currentPath.replace('/faq/', '');
      navigate(`/preguntas/${slug}`);
      return;
    }
    if (currentPath.startsWith('/preguntas/')) {
      const slug = currentPath.replace('/preguntas/', '');
      navigate(`/faq/${slug}`);
      return;
    }
    
    // Handle standard prefix routes
    if (isSpanish) {
      // Switch from ES to EN
      const newPath = currentPath.replace(/^\/es(\/|$)/, '/en$1');
      navigate(newPath);
    } else {
      // Switch from EN to ES
      const newPath = currentPath.startsWith('/en')
        ? currentPath.replace(/^\/en(\/|$)/, '/es$1')
        : `/es${currentPath}`;
      navigate(newPath);
    }
  };

  const navigateToLanguage = (targetLanguage: 'EN' | 'ES') => {
    if (targetLanguage === language) return; // Already on target language
    switchLanguage();
  };

  const navigateToHome = () => {
    const homePath = isSpanish ? '/es' : '/en';
    navigate(homePath);
  };

  const navigateToFAQ = () => {
    const faqPath = isSpanish ? '/preguntas' : '/faq';
    navigate(faqPath);
  };

  const navigateToCaseStudies = () => {
    const caseStudiesPath = isSpanish ? '/estudios-de-caso' : '/case-studies';
    navigate(caseStudiesPath);
  };

  const navigateToForm = () => {
    const formPath = isSpanish ? '/formulario' : '/form';
    navigate(formPath);
  };

  const getLanguageAwareRoute = (englishRoute: string, spanishRoute: string) => {
    return isSpanish ? spanishRoute : englishRoute;
  };

  return {
    currentLanguage: language,
    isSpanish,
    isEnglish: !isSpanish,
    switchLanguage,
    navigateToLanguage,
    navigateToHome,
    navigateToFAQ,
    navigateToCaseStudies,
    navigateToForm,
    getLanguageAwareRoute,
  };
}; 