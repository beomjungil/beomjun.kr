// @ts-check

import eslint from '@eslint/js';
import tsESLintParser from '@typescript-eslint/parser';
import astroEslint from 'eslint-plugin-astro';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default tseslint.config(
  {
    ignores: [
      'src/env.d.ts',
      '.astro/**',
      'dist/**',
      'src/paraglide/**',
      '.prettierrc.cjs',
      'postcss.config.cjs',
      'worker-configuration.d.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['*.cjs', '*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },
  ...astroEslint.configs['flat/jsx-a11y-recommended'].filter(
    ({ name }) => name !== 'astro/base/typescript',
  ),
  {
    name: 'astro/base/typescript',
    files: ['**/*.astro/*.ts', '*.astro/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsESLintParser ?? undefined,
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
);
