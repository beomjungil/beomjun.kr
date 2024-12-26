import type { Config } from 'tailwindcss';
import TailwindViewTransitions from 'tailwindcss-view-transitions';
import defaultTheme from 'tailwindcss/defaultTheme';
import { TailwindProsePlugin } from './tailwind.prose';
import { TailwindThemePlugin } from './tailwind.theme';

export default {
  darkMode: 'selector',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '608px',
          md: '608px',
          lg: '608px',
          xl: '608px',
        },
      },
      fontFamily: {
        sans: ['Pretendard JP Variable', ...defaultTheme.fontFamily.sans],
        serif: ['Noto Serif KR', 'Noto Serif JP', ...defaultTheme.fontFamily.serif],
        emoji: ['Noto Emoji'],
        mono: ['Commit Mono', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [TailwindViewTransitions, TailwindThemePlugin, TailwindProsePlugin],
} satisfies Config;
