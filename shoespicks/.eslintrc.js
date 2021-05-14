module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['vue', 'prettier', 'import'],
  // add your custom rules here
  rules: {
    'no-console': 'off'
  }
};
