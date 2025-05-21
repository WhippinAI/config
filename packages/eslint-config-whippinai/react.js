/**
 * @file React ESLint configuration
 *
 * Extends the TypeScript configuration with React-specific rules.
 * This configuration is suitable for React projects using TypeScript.
 */

// this allows us to use es6, es2017, es2018 syntax
/* eslint-env es6, es2017, es2018 */

module.exports = {
  extends: [
    require.resolve('./typescript.js'), // Use typescript.js as base for React+TS projects
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    node: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  ignorePatterns: ['**/__generated__/'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json'],
      },
    },
  },
  rules: {
    // ---------------------------------------------------------------
    // React core rules
    // ---------------------------------------------------------------
    'react/react-in-jsx-scope': 'off', // Not needed in modern React
    'react/display-name': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',

    // ---------------------------------------------------------------
    // JSX formatting and style
    // ---------------------------------------------------------------
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: false,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never', propElementValues: 'always' }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/self-closing-comp': 'error',
    'react/jsx-pascal-case': 'error',

    // ---------------------------------------------------------------
    // React security and best practices
    // ---------------------------------------------------------------
    'react/no-unstable-nested-components': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-unsafe': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],

    // ---------------------------------------------------------------
    // Accessibility rules
    // ---------------------------------------------------------------
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',

    // Override TypeScript rules for React components
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowedNames: ['useEffect', 'useLayoutEffect'],
      },
    ],
  },
  overrides: [
    // ---------------------------------------------------------------
    // TypeScript with JSX (.tsx) files
    // ---------------------------------------------------------------
    {
      files: ['*.tsx'],
      excludedFiles: ['*.test.tsx', '*.spec.tsx', '*.stories.tsx'],
      rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-restricted-imports': 'error',
      },
    },

    // ---------------------------------------------------------------
    // Storybook files
    // ---------------------------------------------------------------
    {
      files: ['*.stories.tsx', '*.story.tsx'],
      rules: {
        'react/jsx-no-constructed-context-values': 'off',
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'import/no-anonymous-default-export': 'off',
      },
    },

    // ---------------------------------------------------------------
    // Test files
    // ---------------------------------------------------------------
    {
      files: ['**/__tests__/**/*.tsx', '**/?(*.)+(spec|test).tsx'],
      env: {
        jest: true,
        'jest/globals': true,
      },
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      rules: {
        // Jest rules - only keeping meaningful overrides
        'jest/valid-title': [
          2,
          {
            // jest expect string titles, but we use function names in the codebase
            ignoreTypeOfDescribeName: true,
          },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/jsx-no-constructed-context-values': 'off',
        'max-nested-callbacks': ['error', 4],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/anchor-has-content': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
