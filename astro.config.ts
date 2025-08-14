import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import expressiveCode from 'astro-expressive-code';
import pageInsight from 'astro-page-insight';
import { defineConfig, fontProviders } from 'astro/config';
import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import { i18nConfig } from './astro.i18n';
import { pluginCodeCaption } from '@fujocoded/expressive-code-caption';

function rawFonts(ext: string[]) {
  return {
    name: 'vite-plugin-raw-fonts',
    transform(_: unknown, id: string) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [rawFonts(['.otf']), tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        name: 'Inter',
        cssVariable: '--font-inter',
        provider: fontProviders.google(),
        weights: ['100 900'],
        featureSettings: 'opsz',
        subsets: ['latin'],
        fallbacks: ['sans-serif'],
      },
      {
        name: 'Literata',
        cssVariable: '--font-serif-en',
        provider: fontProviders.google(),
        weights: ['200 900'],
        subsets: ['latin'],
        fallbacks: ['serif'],
      },
      {
        name: 'Pretendard Variable',
        cssVariable: '--font-pretendard',
        provider: 'local',
        fallbacks: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Malgun Gothic',
          '맑은 고딕',
          'helvetica',
          'Apple SD Gothic Neo',
          'sans-serif',
        ],
        variants: [
          {
            display: 'swap',
            weight: '45 920',
            src: ['./src/assets/fonts/pretendard-kr/pretendard-subset.woff2'],
          },
        ],
      },
      {
        name: 'Noto Serif KR',
        optimizedFallbacks: false,
        cssVariable: '--font-noto-serif-kr',
        provider: 'local',
        fallbacks: ['AppleMyungjo', 'serif'],
        variants: [
          {
            display: 'swap',
            weight: '45 920',
            src: ['./src/assets/fonts/noto-serif-kr/noto-serif-subset.woff2'],
          },
        ],
      },
      {
        name: 'Commit Mono',
        cssVariable: '--font-commit-mono',
        provider: 'local',
        fallbacks: ['monospace'],
        variants: [
          {
            display: 'swap',
            weight: '400 800',
            src: ['./src/assets/fonts/commit-mono/CommitMonoV143-VF.woff2'],
          },
        ],
      },
    ],
  },
  prefetch: true,
  site: 'https://beomjun.kr',
  i18n: i18nConfig,
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      shiki: {
        langs: [],
      },
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => (theme.name.includes('dark') ? '.dark' : '.light'),
      styleOverrides: {
        borderRadius: '0.5rem',
        borderWidth: '0',
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-mono)',
        frames: {
          editorActiveTabBackground: 'transparent',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabIndicatorBottomColor: 'var(--color-foreground)',
          editorActiveTabIndicatorHeight: '0px',

          editorBackground: 'var(--color-surface)',
          editorTabBarBackground: 'var(--color-surface)',
          editorTabBarBorderBottomColor: 'color-mix(in oklab, var(--color-foreground) 20%, transparent)',

          terminalBackground: 'var(--color-surface)',
          terminalTitlebarBackground: 'var(--color-surface)',
          terminalTitlebarForeground: 'var(--color-foreground)',
          terminalTitlebarBorderBottomColor: 'color-mix(in oklab, var(--color-foreground) 20%, transparent)',

          frameBoxShadowCssValue: 'none',

          editorTabBorderRadius: '0',

          inlineButtonBackground: 'var(--color-background)',
        },
      },
      plugins: [pluginCollapsibleSections(), pluginLineNumbers(), pluginCodeCaption()],
    }),
    mdx(),
    sitemap(),
    pageInsight(),
  ],
});
