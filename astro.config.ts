import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import a11yEmoji from '@fec/remark-a11y-emoji';
import paraglide from '@inlang/paraglide-js-adapter-astro';
import {
  transformerCompactLineOptions,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMinify from 'rehype-preset-minify';
import rehypePrettyCode, {
  type LineElement,
  type Options,
} from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBehead from 'remark-behead';
import joinCJKLines from 'remark-join-cjk-lines';

const options: Options = {
  theme: {
    dark: 'github-dark-dimmed',
    light: 'github-light',
  },
  onVisitHighlightedLine(element: LineElement) {
    element.properties.className?.push('line');
  },
  transformers: [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerNotationErrorLevel(),
    transformerCompactLineOptions(),
  ],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://beomjun.kr',
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja'],
  },
  integrations: [
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide',
    }),
    tailwind(),
    mdx({
      syntaxHighlight: false,
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: 'append',
          },
        ],
        [rehypePrettyCode, options],
        rehypeMinify,
      ],
      remarkPlugins: [
        a11yEmoji,
        [
          remarkBehead,
          {
            minDepth: 2,
          },
        ],
        joinCJKLines,
      ],
      gfm: true,
      optimize: {
        customComponentNames: [
          'YouTube',
          'blockquote',
          'details',
          'summary',
          'Callout',
        ],
      },
    }),
    sitemap({
      filter: (page) => {
        return (
          !page.endsWith('/dashboard/') &&
          !page.endsWith('/login/') &&
          !page.endsWith('/register/')
        );
      },
      i18n: {
        defaultLocale: 'ko',
        locales: {
          ko: 'ko-KR',
          en: 'en-US',
          ja: 'ja-JP',
        },
      },
    }),
  ],
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'cloudflare',
    runtime: {
      mode: 'local',
      type: 'pages',
      bindings: {
        DB: {
          type: 'd1',
        },
      },
    },
    functionPerRoute: true,
  }),
  vite: {
    optimizeDeps: {
      exclude: ['oslo'],
    },
  },
});
