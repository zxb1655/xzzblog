module.exports = {
  root: false,
  env: {
    browser: true,
    node: true,
    es6: true
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off'
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier']
}
