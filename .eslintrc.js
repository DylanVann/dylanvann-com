module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  plugins: ['react', 'react-hooks'],
  globals: {
    graphql: false,
    process: true,
    __PATH_PREFIX__: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
}
