# eslint-config-whippinai

[![npm version](https://img.shields.io/npm/v/eslint-config-whippinai.svg)](https://www.npmjs.com/package/eslint-config-whippinai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive ESLint configuration with specialized support for JavaScript, TypeScript, and React projects. This configuration includes best practices for code quality, security, accessibility, and consistency.

## Features

- **Base JavaScript** configuration with best practices
- **TypeScript** support with strict type checking
- **React** specific rules and best practices
- **Security** rules to prevent common vulnerabilities
- **Accessibility** rules (jsx-a11y) for better web accessibility
- **Promise handling** to prevent common async/await bugs
- **Code organization** rules for imports and file structure
- **Jest** testing configuration
- **Code style** enforcement with Prettier integration

## Installation

```bash
npm install --save-dev eslint-config-whippinai eslint@^8.0.0
```

### Additional Dependencies

Depending on your project type, you might need to install additional peer dependencies:

- For TypeScript projects:
  ```bash
  npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
  ```

- For React projects:
  ```bash
  npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
  ```

## Usage

### JavaScript Projects

```json
// .eslintrc.json
{
  "extends": ["whippinai"]
}
```

### TypeScript Projects

```json
// .eslintrc.json
{
  "extends": ["whippinai/typescript"]
}
```

### React + TypeScript Projects

```json
// .eslintrc.json
{
  "extends": ["whippinai/react"]
}
```

## Configuration Details

### Base Configuration

The base configuration includes:

- Best practices for JavaScript
- Security rules to prevent vulnerabilities
- Promise handling rules to prevent common async/await bugs
- Import organization and structure
- Common code quality rules
- Jest testing configuration

Key features:
- Enforces proper error handling in promises
- Prevents usage of dangerous functions
- Organizes imports alphabetically and by type
- Limits code complexity for better maintainability

### TypeScript Configuration

Extends the base configuration and adds:

- TypeScript-specific rules
- Type checking with consistent patterns
- Type import/export organization
- Naming conventions for interfaces, types, and enums
- Explicit function return types

Key features:
- Enforces proper promise handling with TypeScript-specific checks
- Requires consistent type assertion style
- Automatically organizes imports with type imports separated
- Provides special rules for declaration files (`.d.ts`)

### React Configuration

Extends the TypeScript configuration and adds:

- React best practices and performance rules
- React Hooks rules to prevent common bugs
- JSX accessibility (a11y) for better web accessibility
- JSX style and organization rules

Key features:
- Enforces exhaustive dependencies in useEffect
- Ensures proper JSX structure and patterns
- Requires accessibility attributes on interactive elements
- Special configuration for Storybook files

## Special File Types

This configuration includes special handling for:

- **Test files**: Relaxed rules for testing scenarios (`.test.ts`, `.spec.ts`)
- **TypeScript declaration files**: Specialized rules for `.d.ts` files
- **Storybook files**: Relaxed accessibility requirements (`.stories.tsx`)
- **JSON files**: Spell checking for strings

## Customization

You can customize the configuration by overriding rules in your own ESLint configuration:

```json
{
  "extends": ["whippinai"],
  "rules": {
    "max-lines": ["error", 600],
    "complexity": ["error", 15]
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
