module.exports = {
  extends: 'airbnb-typescript/base',
  env: {
    es6: true,
    browser: false
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    'no-unused-vars': ['warn', { args: 'after-used' }],
    'no-var': ['off'],
    'one-var': ['off'],
    camelcase: ['off'],
    'quote-props': ['off'],
    'no-underscore-dangle': ['off'],
    quotes: [
      'error',
      'double',
      {
        allowTemplateLiterals: true
      }
    ],
    '@typescript-eslint/quotes': [
      'error',
      'double',
      {
        allowTemplateLiterals: true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'variableLike', format: ['camelCase', 'UPPER_CASE'] }
    ]
  }
};
