import { fontFamily } from "tailwindcss/defaultTheme";
import { createThemes } from "tw-colors";
import TailwindAnimate from "tailwindcss-animate";
import TailwindTypography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem',
        },
        screens: {
          '2xl': '1200px',
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: '712px',
            '--tw-prose-invert-pre-bg': '#000',
            '--tw-prose-pre-bg': '#fff',
            '--tw-prose-quote-borders': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-quote-borders': 'hsl(var(--twc-foreground))',
            '--tw-prose-bullets': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-bullets': 'hsl(var(--twc-foreground))',
            '--tw-prose-hr': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-hr': 'hsl(var(--twc-foreground))',
            '--tw-prose-counters': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-counters': 'hsl(var(--twc-foreground))',
            '--tw-prose-td-borders': 'hsla(60, 2.9%,6.9%,0.1)',
            '--tw-prose-invert-td-borders': 'hsla(54, 38.5%, 94.9%, 0.1)',
            '--tw-prose-th-borders': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-th-borders': 'hsl(var(--twc-foreground))',
            '--tw-prose-body': 'hsla(60, 2.9%,6.9%,0.8)',
            '--tw-prose-invert-body': 'hsl(54, 38.5%, 94.9%, 0.8)',
            '--tw-prose-headings': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-headings': 'hsl(var(--twc-foreground))',
            '--tw-prose-bold': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-bold': 'hsl(var(--twc-foreground))',
            '--tw-prose-link': 'hsl(var(--twc-foreground))',
            '--tw-prose-invert-link': 'hsl(var(--twc-foreground))',
          },
        },
      }),
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        'text-block-in': {
          '0%': {
            background:
              'linear-gradient(90deg, transparent 50%, hsl(var(--twc-foreground)) 50%)',
            backgroundSize: '200%',
            backgroundPosition: '100% 0%',
          },
          '100%': {
            background:
              'linear-gradient(90deg, transparent 50%, hsl(var(--twc-foreground)) 50%)',
            backgroundSize: '200%',
            backgroundPosition: '0% 0%',
          },
        },
        'gradient-move': {
          '0%': {
            backgroundImage:
              'linear-gradient(90deg, hsl(var(--twc-foreground)), hsl(var(--twc-primary)), hsl(var(--twc-foreground)))',
            color: 'transparent',
            backgroundSize: '200%',
            backgroundPosition: '200% 0%',
          },
          '100%': {
            backgroundImage:
              'linear-gradient(90deg, hsl(var(--twc-foreground)), hsl(var(--twc-primary)), hsl(var(--twc-foreground)))',
            color: 'transparent',
            backgroundSize: '200%',
            backgroundPosition: '0% 0%',
          },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 5s linear infinite',
      },
      fontFamily: {
        sans: [
          'Satoshi Variable',
          'SUIT Variable',
          'Murecho Variable',
          'Noto Emoji Variable',
          ...fontFamily.sans,
        ],
        mono: ['Monaspace Variable', fontFamily.mono],
      },
      boxShadow: {
        card: 'hsl(var(--twc-primary) / 10%) 0 12px 28px 0, rgba(0, 0, 0, 0.1) 0 2px 4px 0',
        'card-dark':
          'hsl(var(--twc-primary) / 7%) 0 12px 28px 0, rgba(255, 255, 255, 0.05) 0 2px 4px 0',
      },
      fontSize: {
        '4xl': ['4.827rem', '6.25rem'],
        '3xl': ['3.713rem', '5rem'],
        '2xl': ['2.856rem', '3.75rem'],
        xl: ['2.197rem', '2.5rem'],
        lg: ['1.69rem', '2.5rem'],
        md: ['1.3rem', '2.5rem'],
        base: ['1rem', '2.5rem'],
        sm: ['0.769rem', '1.25rem'],
        xs: ['0.592rem', '1.25rem'],
      },
    },
  },
  plugins: [
    TailwindTypography,
    TailwindAnimate,
    createThemes({
      light: {
        foreground: '#1a1a19',
        background: '#F7F6ED',
        primary: {
          50: '#FDF7F8',
          100: '#FBE9EC',
          200: '#FAD1D7',
          300: '#F9B3BB',
          400: '#FA8F9A',
          500: '#FF4E5D',
          600: '#F53246',
          700: '#DF1129',
          800: '#B2152A',
          900: '#6E1220',
          DEFAULT: '#FF4E5D',
        },
        surface: '#ffffff',
      },
      dark: {
        foreground: '#F7F6ED',
        background: '#1a1a19',
        primary: {
          50: '#320B12',
          100: '#6E1220',
          200: '#B2152A',
          300: '#DF1129',
          400: '#F53246',
          500: '#FF4E5D',
          600: '#FA8F9A',
          700: '#F9B3BB',
          800: '#FAD1D7',
          900: '#FBE9EC',
          DEFAULT: '#FF4E5D',
        },
        surface: '#000000',
      },
    }),
  ],
};
