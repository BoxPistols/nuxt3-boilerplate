module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint', 'vue'],
  ignorePatterns: [
    '**/*.stories.js',
    'stories/**/*.vue',
    '**/*.md',
    '**/.github/**',
    'node_modules/**',
    '.nuxt/**',
    'dist/**',
    'storybook-static/**',
    '.output/**',
  ],
  env: {
    node: true,
    browser: true,
    es2022: true,
    'vue/setup-compiler-macros': true,
  },
  globals: {
    defineNuxtConfig: 'readonly',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'warn',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/html-indent': ['off', 2],
    'vue/script-indent': ['warn', 2, { baseIndent: 0 }],
    indent: ['error', 2, { SwitchCase: 1 }],
    'vue/no-multiple-template-root': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
}
