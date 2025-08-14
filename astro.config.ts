import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import expressiveCode from 'astro-expressive-code';
import pageInsight from 'astro-page-insight';
import { defineConfig } from 'astro/config';
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
