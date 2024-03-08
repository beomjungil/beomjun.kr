// @ts-check

import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: undefined,
  allConfig: undefined,
});

export default tseslint.config(
  {
    ignores: ['src/env.d.ts', '.astro/**', 'dist/**', 'src/paraglide/**'],
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
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
    },
  },

  ...compat.config({
    overrides: [
      {
        files: ['*.astro'],
        extends: [
          'plugin:astro/recommended',
          'plugin:astro/jsx-a11y-recommended',
        ],
        parser: 'astro-eslint-parser',
        processor: 'astro/client-side-ts',
        rules: {
          '@typescript-eslint/no-unused-vars': [
            'error',
            {
              args: 'all',
              argsIgnorePattern: '^_',
              caughtErrors: 'all',
              caughtErrorsIgnorePattern: '^_',
              destructuredArrayIgnorePattern: '^_',
              varsIgnorePattern: '^Props',
              ignoreRestSiblings: true,
            },
          ],
        },
      },
    ],
  }),
  eslintPluginPrettierRecommended,
);
