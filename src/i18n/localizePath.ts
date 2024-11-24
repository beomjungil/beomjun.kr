import type { AvailableLanguageTag } from './paraglide/runtime.js';

type AbsolutePathname = `/${string}`;

const overrides: Record<AbsolutePathname, Record<AvailableLanguageTag, AbsolutePathname>> = {
  '/about': {
    ko: '/about',
    en: '/en/about',
    ja: '/ja/about',
  },
};

export function localizePath(pathname: AbsolutePathname, locale: AvailableLanguageTag) {
  if (overrides[pathname]) {
    return overrides[pathname][locale];
  }

  if (locale === 'ko') {
    return pathname;
  }

  return `/${locale}${pathname}`;
}
