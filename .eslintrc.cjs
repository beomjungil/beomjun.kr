/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:astro/recommended',
    'plugin:astro/jsx-a11y-strict',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  env: {
    browser: true,
    es2021: true,
    'astro/astro': true,
    node: true,
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import',
    'astro',
    'tailwindcss',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    extraFileExtensions: ['.astro'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.astro'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    tailwindcss: {
      config: 'tailwind.config.ts',
      cssFiles: [
        '**/*.css',
        '!**/node_modules',
        '!**/.*',
        '!**/dist',
        '!**/build',
      ],
      removeDuplicates: true,
      skipClassAttribute: false,
      classRegex: '^class|cn$',
    },
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    {
      files: ['*.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],

  rules: {
    'import/prefer-default-export': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'astro/prefer-class-list-directive': 'error',
    'astro/prefer-object-class-list': 'error',
    'astro/prefer-split-class-list': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'sibling',
          'parent',
          'internal',
          'builtin',
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
  },
};
