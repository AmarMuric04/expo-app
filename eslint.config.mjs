import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-config-prettier/flat';
import { configs as tsconfigs } from 'typescript-eslint';
import expoConfig from 'eslint-config-expo/flat.js';
// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from 'eslint/config';
import nimaPlugin from 'eslint-plugin-nima';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
  expoConfig,
  perfectionistPlugin.configs['recommended-line-length'],
  js.configs.recommended,

  ...tsconfigs.recommended.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    ...nimaPlugin.configs['flat/recommended'],
    rules: {
      ...nimaPlugin.configs['flat/recommended'].rules,
      'nima/prefer-export-under-component': 'off',
      'nima/restrict-console-methods': 'off',
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
