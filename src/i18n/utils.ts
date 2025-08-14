import { i18nConfig, showDefaultLang } from 'astro.i18n';
import { messages } from './messages';

const defaultLocale = i18nConfig.defaultLocale;
export type AvailableLanguages = (typeof i18nConfig.locales)[number];

export function getLanguageFromURL(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in messages) return lang as keyof typeof messages;
  return defaultLocale;
}

export function getTranslations(lang: keyof typeof messages) {
  return function t(key: keyof (typeof messages)[typeof defaultLocale]) {
    return messages[lang]?.[key] || messages[defaultLocale]?.[key] || '';
  };
}

export function getTranslatedPath(lang: keyof typeof messages) {
  return function translatePath(path: string, l: string = lang) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return !showDefaultLang && l === defaultLocale ? normalizedPath : `/${l}${normalizedPath}`;
  };
}

export function i18n(url: URL) {
  const language = getLanguageFromURL(url);
  const t = getTranslations(language);
  const tPath = getTranslatedPath(language);

  return {
    language,
    t,
    tPath,
  };
}
