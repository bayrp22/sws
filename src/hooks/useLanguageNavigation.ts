import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const useLanguageNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, isSpanish } = useLanguage();

  const switchLanguage = () => {
    const currentPath = location.pathname;
    
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

  return {
    currentLanguage: language,
    isSpanish,
    isEnglish: !isSpanish,
    switchLanguage,
    navigateToLanguage,
  };
}; 