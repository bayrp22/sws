import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { faqData } from '../data/faq';
import { faqDataEs } from '../data/faq-es';

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

  // Create FAQ slug mappings based on matching IDs
  const createFAQSlugMappings = () => {
    const enToEs: Record<string, string> = {};
    const esToEn: Record<string, string> = {};
    
    faqData.forEach(enItem => {
      const esItem = faqDataEs.find(es => es.id === enItem.id);
      if (esItem) {
        enToEs[enItem.slug] = esItem.slug;
        esToEn[esItem.slug] = enItem.slug;
      }
    });
    
    return { enToEs, esToEn };
  };

  const { enToEs, esToEn } = createFAQSlugMappings();

  const switchLanguage = () => {
    const currentPath = location.pathname;
    
    // Handle special route mappings first
    if (routeMappings[currentPath]) {
      navigate(routeMappings[currentPath]);
      return;
    }
    
    // Handle FAQ sub-routes with proper slug mapping
    if (currentPath.startsWith('/faq/')) {
      const englishSlug = currentPath.replace('/faq/', '');
      const spanishSlug = enToEs[englishSlug];
      if (spanishSlug) {
        navigate(`/preguntas/${spanishSlug}`);
      } else {
        // Fall back to Spanish FAQ main page if no equivalent exists
        navigate('/preguntas');
      }
      return;
    }
    if (currentPath.startsWith('/preguntas/')) {
      const spanishSlug = currentPath.replace('/preguntas/', '');
      const englishSlug = esToEn[spanishSlug];
      if (englishSlug) {
        navigate(`/faq/${englishSlug}`);
      } else {
        // Fall back to English FAQ main page if no equivalent exists
        navigate('/faq');
      }
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