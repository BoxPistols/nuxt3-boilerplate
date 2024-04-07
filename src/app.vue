<!-- app.vue -->
<template>
  <main class="flex flex-col w-full h-screen items-center justify-center p-4">
    <div class="mx-auto">
      <h1 class="text-3xl text-blue-400 font-bold underline">
        Nuxt 3 template
      </h1>
      <ul class="text-white flex flex-col gap-y-3 mt-6">
        <li class="hover:text-blue-950">
          <a href="https://www.typescriptlang.org/">Typescript</a>
        </li>
        <li class="hover:text-blue-950">
          <a href="https://eslint.org/">Eslint</a>
        </li>
        <li class="hover:text-blue-950">
          <a href="https://tailwindcss.com/">TailwindCSS</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
@import './assets/css/main.css';

.bg-zinc-950 {
  background-color: #1a202c;
}
.text-blue-950 {
  color: #2b6cb0;
}
</style>
