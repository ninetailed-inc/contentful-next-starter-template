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
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'arrow-body-style': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'no-console': 'off',

    'react/jsx-props-no-spreading': 'warn',
    'react/destructuring-assignment': 'warn',
    'import/no-cycle': 'warn',
    'react/no-array-index-key': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'max-len': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
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
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/naming-convention': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/no-unresolved': 'error',
        'prettier/prettier': 'error',
      },
    },
  ],
};
