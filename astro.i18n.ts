import type { AstroUserConfig } from "astro";

export const i18nConfig = {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja'],
    routing: {
      prefixDefaultLocale: false,
    },
    fallback: {
      en: 'ko',
      ja: 'en',
    },
} as const satisfies AstroUserConfig['i18n'];

export const showDefaultLang = false;
