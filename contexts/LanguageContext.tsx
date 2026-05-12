import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { locales } from '../i18n/locales';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => console.warn('setLanguage function is not available'),
  t: (key: string) => key,
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLang = window.localStorage.getItem('appLanguage');
      return savedLang ? (savedLang as Language) : 'fr';
    } catch (error) {
      console.error("Could not read language from localStorage", error);
      return 'fr';
    }
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    try {
        window.localStorage.setItem('appLanguage', lang);
        setLanguage(lang);
    } catch (error) {
        console.error("Could not save language to localStorage", error);
        // Still update state even if localStorage fails
        setLanguage(lang);
    }
  }, []);

  const t = useCallback((key: string, options?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result = locales[language] as any;
    try {
      for (const k of keys) {
        result = result[k];
        if (result === undefined) {
          // Fallback to English if key not found in current language
          let fallbackResult = locales['en'] as any;
          for (const fk of keys) {
              fallbackResult = fallbackResult[fk];
              if(fallbackResult === undefined) throw new Error("Fallback key not found");
          }
          result = fallbackResult;
          break;
        }
      }
    } catch (error) {
        return key; // Return key if not found in current language or fallback
    }
    

    if (typeof result === 'string' && options) {
      Object.entries(options).forEach(([optKey, optValue]) => {
        result = result.replace(new RegExp(`{{${optKey}}}`, 'g'), String(optValue));
      });
    }

    return result || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};