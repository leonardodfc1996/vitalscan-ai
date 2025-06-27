import { en } from './en';
import { es } from './es';
import { pt } from './pt';
import { fr } from './fr';
import { SupportedLanguage, LanguageOption } from '@/types/i18n';

export const translations = {
  en,
  es,
  pt,
  fr,
};

export const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

export const getDeviceLanguage = (): SupportedLanguage => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    return Object.keys(translations).includes(browserLang) ? browserLang : 'en';
  }
  return 'en';
};