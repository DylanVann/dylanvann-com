module.exports = {
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    browser: true,
    es6: true,
    commonjs: true,
  },
  plugins: ['react'],
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
}
