/**
 * @file Base ESLint configuration for JavaScript projects
 *
 * This configuration provides sensible defaults for JavaScript projects.
 * It includes rules for code quality, security, and best practices.
 */

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  plugins: [
    // Core plugins
    'import',
    'unused-imports',
    'promise',

    // File structure and organization
    'check-file',
    'no-relative-import-paths',

    // Testing
    'jest',

    // Security
    'no-unsanitized',
    'security',

    // Code quality
    'spellcheck',

    // Code formatting
    'prettier',
  ],
  extends: ['eslint:recommended', 'plugin:promise/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // ---------------------------------------------------------------
    // Prettier integration
    // ---------------------------------------------------------------
    'prettier/prettier': 'error',
    // Disable rules that conflict with Prettier
    semi: 0,
    quotes: 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,

    // ---------------------------------------------------------------
    // Complexity limits
    // ---------------------------------------------------------------
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'max-lines': ['error', 500],
    complexity: ['error', 20],

    // ---------------------------------------------------------------
    // File structure and imports
    // ---------------------------------------------------------------
    // Allow index files in certain cases (component libraries often use them)
    'check-file/no-index': ['error', { ignoreMiddleExtensions: true }],

    // Avoid conflicts between unused imports plugins
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/no-unused-modules': ['warn', { unusedExports: true }],

    // Import organization - tuned for better auto-fixing
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],

    // Make relative paths rule less aggressive for better compatibility
    'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: true, rootDir: 'src' }],

    // ---------------------------------------------------------------
    // Promise handling
    // ---------------------------------------------------------------
    'promise/catch-or-return': 'error',
    'promise/always-return': 'error',
    'promise/no-callback-in-promise': 'warn',

    // ---------------------------------------------------------------
    // Code style and best practices
    // ---------------------------------------------------------------
    'object-shorthand': ['error', 'always'],
    'consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
    'guard-for-in': 'error',
    'no-eval': 'error',
    'no-extra-boolean-cast': 'error',
    'no-ex-assign': 'error',
    curly: 'error',
    'no-shadow': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-use-before-define': ['error', { functions: false, classes: true }],
    'no-duplicate-imports': 'off', // Turned off because import/order handles this better

    // ---------------------------------------------------------------
    // Security rules
    // ---------------------------------------------------------------
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-pseudoRandomBytes': 'error',
    'security/detect-new-buffer': 'error',
  },
  overrides: [
    // ---------------------------------------------------------------
    // Test files
    // ---------------------------------------------------------------
    {
      files: ['./**/*.test.js', './**/*.spec.js'],
      rules: {
        'max-nested-callbacks': ['error', 4],
      },
    },
    {
      files: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
      env: {
        jest: true,
        'jest/globals': true,
      },
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      rules: {
        'jest/expect-expect': ['off', { assertFunctionNames: ['expect', 'expectSaga'] }],
        'jest/no-conditional-expect': 'off',
        'promise/always-return': 'off', // Turn off in test files where we often don't need to return from assertions
      },
    },

    // ---------------------------------------------------------------
    // JSON files
    // ---------------------------------------------------------------
    {
      files: ['*.json'],
      rules: {
        'spellcheck/spell-checker': [
          'error',
          {
            comments: false,
            strings: true,
            identifiers: false,
            lang: 'en_US',
          },
        ],
        'max-lines': ['off'],
      },
    },

    // ---------------------------------------------------------------
    // End-to-end test files
    // ---------------------------------------------------------------
    {
      files: ['*.e2e.js'],
      env: {
        jest: true,
        'jest/globals': true,
      },
    },
  ],
  globals: {
    Address: 'readonly',
    AddressTo: 'readonly',
    Nullable: 'readonly',
  },
}
