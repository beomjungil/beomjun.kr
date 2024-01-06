import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import a11yEmoji from '@fec/remark-a11y-emoji';
import icon from 'astro-icon';
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
import {
  transformerCompactLineOptions,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
} from 'shikiji-transformers';

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
  integrations: [
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
        customComponentNames: ['YouTube', 'details', 'summary', 'Callout'],
      },
    }),
    icon(),
  ],
});
