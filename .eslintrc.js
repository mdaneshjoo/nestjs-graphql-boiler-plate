module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-base/legacy',
    'airbnb',
    'airbnb/hooks',
  ],
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    //<editor-fold desc="handles by prettier no need in eslint(if turn it off it will make conflict wit prettier)">
    indent: 'off',
    'object-curly-newline': 'off',
    'brace-style': 'off',
    'implicit-arrow-linebreak': 'off',
    //</editor-fold>
    'prettier/prettier': 'error',
    'no-console': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'consistent-this': 'off',
    'class-methods-use-this': 'off', // https://eslint.org/docs/latest/rules/class-methods-use-this
    'no-unused-vars': 'off', // I turned this off temporary due to issue for private constructor,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error"
  },
};
