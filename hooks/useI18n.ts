import { useState, useEffect, createContext, useContext } from 'react';
import { translations, getDeviceLanguage } from '@/locales';
import { SupportedLanguage, TranslationKeys } from '@/types/i18n';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationKeys;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export const useI18nState = () => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // Try to get saved language from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitalscan-language') as SupportedLanguage;
      if (saved && Object.keys(translations).includes(saved)) {
        return saved;
      }
    }
    // Fall back to device language
    return getDeviceLanguage();
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('vitalscan-language', lang);
    }
  };

  const t = translations[language];

  return { language, setLanguage, t };
};