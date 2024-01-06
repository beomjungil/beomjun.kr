/** @type {import("prettier").Config} */
module.exports = {
  ...require('prettier-config-standard'),
  trailingComma: 'all',
  semi: true,
  pluginSearchDirs: [__dirname],
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}