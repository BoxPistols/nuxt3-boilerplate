module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'prettier',
  ],
  ignorePatterns: [
    '**/*.stories.js',
    'stories/**/*.vue',
    '**/*.md',
    '**/.github/**',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
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
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, { baseIndent: 0 }],
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
