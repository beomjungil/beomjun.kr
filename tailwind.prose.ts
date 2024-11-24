import plugin from 'tailwindcss/plugin';
import { typography } from './tailwind.theme';

export const TailwindProsePlugin = plugin.withOptions(
  () => {
    return (api) => {
      api.addBase({
        '.prose > h1:not(.no-prose)': {
          ...typography.headlineLarge,
          margin: '2em 0 1em',
        },
        '.prose > h2:not(.no-prose)': {
          ...typography.headlineSmall,
          margin: '2em 0 1em',
        },
        '.prose > h3:not(.no-prose)': {
          ...typography.bodyLarge,
          fontWeight: '700',
          margin: '2em 0 1em',
        },
        '.prose > h4:not(.no-prose)': {
          ...typography.bodyLarge,
          fontWeight: '700',
          margin: '2em 0 1em',
        },
        '.prose > h5:not(.no-prose)': {
          ...typography.bodyLarge,
          fontWeight: '700',
          margin: '2em 0 1em',
        },
        '.prose > h6:not(.no-prose)': {
          ...typography.bodyLarge,
          fontWeight: '700',
          margin: '2em 0 1em',
        },
        '.prose > p:not(.no-prose)': {
          ...typography.bodyLarge,
          margin: '1em 0 1em',
          textUnderlineOffset: '0.2em',
        },
        '.prose:not(.no-initial) > p:first-of-type::first-letter': {
          color: 'rgba(var(--color-accent), 1)',
          fontWeight: '700',
          float: 'left',
          fontSize: '3rem',
          lineHeight: '1',
          marginRight: '0.5rem',
        },
        '.prose a:not(.no-prose), .link': {
          color: 'rgb(var(--color-foreground))',
          fontWeight: '600',
          textDecoration: 'underline',
          textDecorationColor: 'rgba(var(--color-foreground), 0.2)',
          textDecorationThickness: '1px',
          textUnderlineOffset: '0.2em',
          transition: 'text-decoration-color 0.2s ease-in-out, color 0.2s ease-in-out',
        },
        '.prose a:not(.no-prose):hover, .link:hover': {
          textDecorationColor: 'rgba(var(--color-accent), 1)',
          color: 'rgba(var(--color-accent), 1)',
        },
        '.prose > ol': {
          listStyle: 'decimal',
          margin: '1em 0 1em 1.5em',
        },
        '.prose > ul': {
          listStyle: 'disc',
          margin: '1em 0 1em 1.25em',
        },
        '.prose > ul ::marker': {
          fontSize: '0.8em',
        },
        '.prose > ol li, .prose > ul li': {
          ...typography.bodyLarge,
          margin: '0.3em 0',
          textUnderlineOffset: '0.2em',
        },
        '.prose  div.expressive-code': {
          margin: '2em 0',
          fontFeatureSettings: "'ss01', 'ss02', 'ss03', 'ss04', 'ss05', 'cv02', 'cv03', 'cv05', 'cv10'",
        },
        '.prose > div.expressive-code .title': {
          color: 'rgba(var(--color-foreground), 0.7)',
        },
        '.prose > .footnotes': {
          ...typography.caption,
          margin: '0.3em 0',
          opacity: '0.5',
          borderTop: '1px solid currentColor',
          paddingTop: '1em',
        },
        '.prose > .footnotes .data-footnote-backref': {
          fontFamily: 'Pretendard JP Variable',
        },
        '.prose em': {
          color: 'rgb(var(--color-accent))',
          fontWeight: '700',
          fontStyle: 'normal',
        },
        '.prose > .footnotes ol': {
          listStyle: 'decimal',
          margin: '1em 0 1em 1.5em',
        },
        '.prose > p kbd': {
          backgroundColor: 'rgba(var(--color-foreground), 0.1)',
          borderRadius: '0.25em',
          color: 'rgba(var(--color-foreground), 0.7)',
          padding: '0.1em 0.3em',
          fontSize: '0.9em',
        },
        '.prose > blockquote': {
          ...typography.subtitleLarge,
          fontWeight: '900',
          textAlign: 'center',
          fontSize: '1.75em',
          textWrap: 'balance',
          margin: '1em 0',
        },
        '.prose > blockquote cite': {
          ...typography.caption,
          fontSize: '1rem',
          display: 'block',
          textAlign: 'center',
          fontStyle: 'normal',
          margin: '1em 0 0',
        },
        '.prose > p code': {
          fontSize: '0.9em',
        },
      });
    };
  },
  () => {
    return {};
  },
);
