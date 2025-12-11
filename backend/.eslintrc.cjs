module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    'indent': 'off', // Disable strict indentation checks
    'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': 'off', // Allow console in backend
    'curly': 'off', // Allow single-line if statements
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'no-irregular-whitespace': 'off' // Allow emojis in comments
  },
  overrides: [
    {
      files: ['scripts/**/*.js'],
      rules: {
        'no-console': 'off' // Allow console.log in scripts
      }
    }
  ]
};
