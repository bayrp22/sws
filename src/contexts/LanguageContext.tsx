import React, { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'EN' | 'ES';

interface LanguageContextType {
  language: Language;
  isSpanish: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const location = useLocation();
  
  // Determine language from URL route
  const isSpanish = location.pathname.startsWith('/es');
  const language: Language = isSpanish ? 'ES' : 'EN';
  
  const value: LanguageContextType = {
    language,
    isSpanish,
    isEnglish: !isSpanish,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 