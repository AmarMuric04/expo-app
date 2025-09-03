import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-config-prettier/flat';
import { configs as tsconfigs } from 'typescript-eslint';
import boundariesPlugin from 'eslint-plugin-boundaries';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import expoConfig from 'eslint-config-expo/flat.js';
import reactPlugin from 'eslint-plugin-react';
// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from 'eslint/config';
import nimaPlugin from 'eslint-plugin-nima';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import globals from 'globals';
import js from '@eslint/js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  expoConfig,
  perfectionistPlugin.configs['recommended-line-length'],

  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },

  {
    ...reactPlugin.configs.flat.recommended,
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    files: ['**/app/**/*.tsx', '**/components/**/*.tsx'],
  },

  {
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      'import/no-unresolved': 'off',
    },
  },

  ...tsconfigs.strict.map(config => ({
    ...config,
    files: ['**/app/**/*.tsx', '**/components/**/*.tsx'],
  })),

  {
    settings: {
      'boundaries/elements': [
        {
          pattern: 'app/**',
          type: 'app',
        },
        {
          pattern: 'components/**',
          type: 'components',
        },
        {
          pattern: 'utility/**',
          type: 'utility',
        },
        {
          pattern: 'types/**',
          type: 'types',
        },
        {
          pattern: 'misc/**',
          type: 'misc',
        },
      ],
      'boundaries/basePath': 'src',
    },
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    ...nimaPlugin.configs['flat/recommended'],
    rules: {
      ...nimaPlugin.configs['flat/recommended'].rules,
      'nima/prefer-export-under-component': 'off',
      'nima/restrict-console-methods': 'warn',
      'nima/prefer-react-fc': 'off',
    },
  },

  {
    rules: {
      'unused-imports/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
          args: 'after-used',
          vars: 'all',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
    plugins: { 'unused-imports': unusedImportsPlugin },
    files: ['**/*'],
  },

  ...tailwindPlugin.configs['flat/recommended'].map(config => ({
    ...config,
    files: ['**/*.tsx'],
  })),

  {
    rules: {
      ...boundariesPlugin.configs.strict.rules,
      '@typescript-eslint/no-empty-function': 'error',
      'no-secrets/no-pattern-match': 'error',
      'no-secrets/no-secrets': 'error',
    },
    plugins: {
      'no-secrets': noSecretsPlugin,
      boundaries: boundariesPlugin,
    },
    files: ['**/src/**/*.{ts,tsx}'],
  },

  {
    ...prettierPlugin,
    rules: {
      ...prettierPlugin.rules,
      curly: 'error',
    },
  },
]);
