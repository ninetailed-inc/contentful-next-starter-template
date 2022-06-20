/**
 * Typescript-eslint: https://typescript-eslint.io/docs/linting/type-linting/
 * Airbnb: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb#eslint-config-airbnbhooks
 * Airbnb Typescript: https://github.com/iamturns/eslint-config-airbnb-typescript
 *
 * TODO
 * Revise rules to remove certain error
 * */
module.exports = {
  root: true,
  extends: ['eslint:recommended', 'next/core-web-vitals', 'airbnb', 'prettier'],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unsafe-optional-chaining': 'warn',
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'arrow-body-style': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'react/destructuring-assignment': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/no-array-index-key': 'warn',
    'prettier/prettier': ['error'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript',
        'prettier',
      ],
      parserOptions: {
        tsconfigRootDir: '.',
        project: ['tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        'import/no-unresolved': 'error',
        'prettier/prettier': 'error',
      },
    },
  ],
};
