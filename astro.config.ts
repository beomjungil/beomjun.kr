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
        borderColor: 'color-mix(in oklab, var(--color-foreground) 20%, transparent)',
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-mono)',
        frames: {
          editorActiveTabBackground: 'transparent',
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabIndicatorBottomColor: 'var(--color-foreground)',
          editorActiveTabIndicatorHeight: '2px',
          editorBackground: 'transparent',
          editorTabBarBackground: 'transparent',
          editorTabBarBorderBottomColor: 'color-mix(in oklab, var(--color-foreground) 20%, transparent)',
          terminalBackground: 'transparent',
          terminalTitlebarBackground: 'transparent',
          terminalTitlebarForeground: 'var(--color-foreground)',
          terminalTitlebarBorderBottomColor: 'color-mix(in oklab, var(--color-foreground) 20%, transparent)',
          frameBoxShadowCssValue: 'none',
          editorTabBorderRadius: '0',
          inlineButtonBackground: 'var(--color-background)',
        },
      },
      // @ts-expect-error wrong type
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
