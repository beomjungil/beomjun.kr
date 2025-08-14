import ko from './messages/ko.json';
import en from './messages/en.json';
import ja from './messages/ja.json';
import type { i18nConfig } from 'astro.i18n';

export const messages: Record<(typeof i18nConfig.locales)[number], typeof ko> = {
  ko,
  en,
  ja,
};
