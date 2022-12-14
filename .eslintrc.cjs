module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['**/packages/*/lib/*.js'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-useless-return': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'prettier/prettier': 'warn',
    'max-len': ['warn', { code: 80, ignoreUrls: true }],
    '@typescript-eslint/lines-between-class-members': 'warn',
  },
};
