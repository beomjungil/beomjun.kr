import { defineAstroI18nConfig } from 'astro-i18n';

export default defineAstroI18nConfig({
  primaryLocale: 'ko',
  secondaryLocales: ['en', 'ja'],
  fallbackLocale: 'en',
  trailingSlash: 'never',
  run: 'server',
  showPrimaryLocale: false,
  translationLoadingRules: [],
  translationDirectory: {},
  translations: {
    common: {
      ko: {
        name: 'ko.name',
      },
      en: {
        name: 'en.name',
      },
      ja: {
        name: 'ja.name',
      },
    },
  },
  routes: {},
});
