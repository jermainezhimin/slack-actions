module.exports = {
  extends: [
    'airbnb',
    'eslint:recommended',
    'prettier',
  ],
  env: {
    node: true,
    es6: true,
    jest:true,
  },
  parserOptions: {
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersion: 2020,
    sourceType: 'module',
  },
};
