import plugin from 'tailwindcss/plugin';
import type { CSSRuleObject } from 'tailwindcss/types/config';

export const typography = {
  headlineLarge: typo({
    font: 'sans',
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.2',
    letterSpacing: '-0.03em',
    textOpacity: '1',
  }),
  headlineMedium: typo({
    font: 'sans',
    fontSize: '2.25rem',
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: '-0.03em',
    textOpacity: '1',
  }),
  headlineSmall: typo({
    font: 'sans',
    fontSize: '1rem',
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: '-0.03em',
    textOpacity: '1',
  }),
  subtitleLarge: typo({
    font: 'serif',
    fontSize: '0.925rem',
    fontWeight: '600',
    lineHeight: '1.4',
    letterSpacing: '-0.04em',
    textOpacity: '1',
  }),
  subtitleSmall: typo({
    font: 'sans',
    fontSize: '1rem',
    fontWeight: '600',
    lineHeight: '1.2',
    letterSpacing: '-0.03em',
    textOpacity: '1',
  }),
  bodyLarge: typo({
    font: 'serif',
    fontSize: '0.925rem',
    fontWeight: '450',
    lineHeight: '1.7',
    letterSpacing: '-0.02em',
    textOpacity: '0.8',
  }),
  bodySmall: typo({
    font: 'serif',
    fontSize: '0.925rem',
    fontWeight: '450',
    lineHeight: '1.7',
    letterSpacing: '-0.02em',
    textOpacity: '0.8',
  }),
  buttonSmall: typo({
    font: 'sans',
    fontSize: '0.925rem',
    fontWeight: '600',
    lineHeight: '1.5',
    letterSpacing: '-0.03em',
    textOpacity: '1',
  }),
  caption: typo({
    font: 'sans',
    fontSize: '0.75rem',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '-0.03em',
    textOpacity: '0.8',
  }),
};
function camelToKebab(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

const colors: Record<
  string,
  {
    light: string;
    dark: string;
  }
> = {
  foreground: {
    light: '#121211',
    dark: '#FCFBF3',
  },
  background: {
    light: '#FCFBF3',
    dark: '#141413',
  },
  accent: {
    light: '#DC2F00',
    dark: '#FF4000',
  },
  surface: {
    light: '#FFFFFF',
    dark: '#000000',
  },
};

function typo(rules: CSSRuleObject & { font: 'sans' | 'serif'; textOpacity: string }) {
  const { font, textOpacity, ...rest } = rules;
  return {
    ...rest,
    fontFamily: `var(--font-${font})`,
    color: `rgba(var(--color-foreground), ${textOpacity})`,
  };
}

function hexToRgb(hex: string) {
  const sanitizedHex = hex.replace('#', '').padEnd(6, '0');

  const r = Number.parseInt(sanitizedHex.slice(0, 2), 16);
  const g = Number.parseInt(sanitizedHex.slice(2, 4), 16);
  const b = Number.parseInt(sanitizedHex.slice(4, 6), 16);

  return [r, g, b].join(', ');
}

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: number | undefined }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export const TailwindThemePlugin = plugin.withOptions(
  () => {
    return (api) => {
      const colorVariables = Object.entries(colors).reduce(
        (acc, [key, value]) => ({
          ...acc,
          ':root': {
            ...acc[':root'],
            [`--color-${key}`]: hexToRgb(value.light),
          },
          '.dark': {
            ...acc['.dark'],
            [`--color-${key}`]: hexToRgb(value.dark),
          },
        }),
        {
          ':root': {},
          '.dark': {},
        },
      );

      api.addBase(colorVariables);

      const fontFamily = api.theme('fontFamily') as { [Key in 'sans' | 'serif' | 'mono' | 'emoji']: string[] };
      api.addBase({
        ':root': {
          '--font-sans': fontFamily.sans.join(', '),
          '--font-serif': fontFamily.serif.join(', '),
          '--font-mono': fontFamily.mono.join(', '),
          '--font-emoji': fontFamily.emoji.join(', '),
        },
      });

      const typographyUtilities = Object.entries(typography).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [`.typo-${camelToKebab(key)}`]: value,
        };
      }, {});
      api.addUtilities(typographyUtilities);
    };
  },
  () => {
    return {
      theme: {
        extend: {
          colors: Object.keys(colors).reduce(
            (acc, key) => ({
              ...acc,
              [key]: withOpacity(`--color-${key}`),
            }),
            {},
          ),
        },
      },
    };
  },
);
