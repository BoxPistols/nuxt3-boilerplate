module.exports = {
  extends: ['plugin:vue/vue3-recommended'],
  // ignore stories files
  ignorePatterns: [
    '**/*.stories.js',
    'stories/**/*.vue',
    '**/*.md',
    '**/.github/**',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'warn',
    'vue/max-attributes-per-line': ['off'],
  },
}
