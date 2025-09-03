import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-config-prettier/flat';
import { configs as tsconfigs } from 'typescript-eslint';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import expoConfig from 'eslint-config-expo/flat.js';
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
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      'import/no-unresolved': 'off',
    },
  },

  ...tsconfigs.strictTypeChecked.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
      globals: { ...globals.browser, ...globals.node },
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
      '@typescript-eslint/no-empty-function': 'error',
    },
    files: ['**/app/**/*.{ts,tsx}'],
  },

  {
    ignores: ['dist/*'],
  },

  {
    ...prettierPlugin,
    rules: {
      ...prettierPlugin.rules,
      curly: 'error',
    },
  },
]);
