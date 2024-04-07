<!-- app.vue -->
<template>
  <Layout>
    <main class="flex flex-col items-center justify-center">
      <div class="mx-auto">
        <ul class="flex flex-col gap-y-3 mt-6 text-lg">
          <li class="text-blue-600">
            <a href="https://www.typescriptlang.org/">Typescript</a>
          </li>
          <li class="text-red-600">
            <a href="https://eslint.org/">Eslint</a>
          </li>
          <li class="text-purple-600">
            <a href="https://tailwindcss.com/">TailwindCSS</a>
          </li>
        </ul>
      </div>
    </main>
  </Layout>
</template>

<script setup>
import Layout from '~/layouts/Layout.vue'
</script>

<style scoped>
/* .text-blue-400 {
  color: #2b6cb0;
} */
</style>
