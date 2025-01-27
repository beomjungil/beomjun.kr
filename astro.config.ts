import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import paraglide from '@inlang/paraglide-astro';
import expressiveCode from 'astro-expressive-code';
import pageInsight from 'astro-page-insight';
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';

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
  experimental: {
    responsiveImages: true,
    svg: true,
  },
  vite: {
    plugins: [rawFonts(['.otf']), tailwindcss()],
  },
  prefetch: true,
  site: 'https://beomjun.kr',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      shiki: {
        langs: [],
      },
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => (theme.name.includes('dark') ? '.dark' : '.light'),
      styleOverrides: {
        borderRadius: '0',
        borderColor: 'rgba(var(--color-foreground), 0.2)',
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-mono)',
        frames: {
          editorActiveTabBackground: 'transparent',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabIndicatorBottomColor: 'rgb(var(--color-foreground))',
          editorActiveTabIndicatorHeight: '2px',
          editorBackground: 'transparent',
          editorTabBarBackground: 'transparent',
          editorTabBarBorderBottomColor: 'rgba(var(--color-foreground), 0.2)',
          terminalBackground: 'transparent',
          terminalTitlebarBackground: 'transparent',
          terminalTitlebarForeground: 'rgb(var(--color-foreground))',
          terminalTitlebarBorderBottomColor: 'rgba(var(--color-foreground), 0.2)',
          frameBoxShadowCssValue: 'none',
          editorTabBorderRadius: '0',
          inlineButtonBackground: 'rgb(var(--color-background))',
        },
      },
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
    }),
    mdx(),
    sitemap(),
    pageInsight(),
    paraglide({
      project: './project.inlang',
      outdir: './src/i18n/paraglide',
    }),
  ],
});
