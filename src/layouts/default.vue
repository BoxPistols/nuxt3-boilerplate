<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <header
      class="fixed top-0 left-0 w-full py-4 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 text-center z-50"
    >
      <nav class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-3xl font-bold text-gray-900">My Tech Site</h1>
        <ul class="flex space-x-6">
          <li>
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >Home</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/features"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >Features</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >About</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </header>
    <!-- 共通レイアウトです -->
    <main class="flex-grow mt-20 pt-4">
      <slot></slot>
    </main>
    <footer class="py-8 text-center text-sm bg-white border-t border-gray-200">
      <div class="container mx-auto px-4">
        <p class="text-gray-600">© 2024 My Tech Site. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
header,
footer {
  backdrop-filter: blur(10px);
}
</style>
