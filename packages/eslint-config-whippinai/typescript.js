/**
 * @file TypeScript ESLint configuration
 *
 * Extends the base configuration with TypeScript-specific rules.
 * This configuration is recommended for all TypeScript projects.
 */

module.exports = {
  extends: [require.resolve('./base.js'), 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    // ---------------------------------------------------------------
    // TypeScript-specific rules
    // ---------------------------------------------------------------
    // Disable JS rule in favor of the TS version
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],

    // Allow require statements in certain contexts
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-require-imports': 'off',

    // Prevent unhandled promises which can lead to subtle bugs
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],

    // Allow certain expressions
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],

    // Naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'enumMember',
        format: ['PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
    ],

    // Type safety
    '@typescript-eslint/explicit-function-return-type': [
      'warn', // Downgraded to warn for better DX
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowedNames: ['useEffect'],
      },
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' },
    ],

    // ---------------------------------------------------------------
    // Custom restrictions for type safety
    // ---------------------------------------------------------------
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='z'][callee.property.name='any']",
        message: 'Avoid using z.any() in favor of more precise custom types, unless absolutely necessary.',
      },
    ],
  },
  overrides: [
    // ---------------------------------------------------------------
    // TypeScript files (.ts, .mts, .cts)
    // ---------------------------------------------------------------
    {
      files: ['*.ts', '*.mts', '*.cts'],
      excludedFiles: ['*.test.ts', '*.spec.ts', '*.d.ts'],
      rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        curly: 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-restricted-imports': 'error',
      },
    },

    // ---------------------------------------------------------------
    // Declaration files (.d.ts)
    // ---------------------------------------------------------------
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },

    // ---------------------------------------------------------------
    // Test files
    // ---------------------------------------------------------------
    {
      files: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
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
        'max-nested-callbacks': ['error', 4],
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
