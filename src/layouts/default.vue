<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="fixed top-0 left-0 w-full py-4 bg-opacity-50 bg-techBlue text-center z-50"
    >
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-bold">My Tech Site</h1>
        <ul class="flex space-x-6">
          <li>
            <NuxtLink to="/" class="hover:text-blue-400">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/features" class="hover:text-blue-400"
              >Features</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/about" class="hover:text-blue-400">About</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <!-- 共通レイアウトです -->
    <main class="flex-grow mt-16 pt-4">
      <slot></slot>
    </main>
    <footer class="py-4 text-center text-sm bg-techBlue">
      © 2024 My Tech Site. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
header,
footer {
  backdrop-filter: blur(10px);
}
</style>
