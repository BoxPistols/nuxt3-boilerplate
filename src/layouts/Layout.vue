<template>
  <div class="flex flex-col min-h-screen">
    <header
      class="fixed top-0 left-0 w-full py-4 bg-opacity-50 bg-techBlue text-center z-50"
    >
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-3xl font-bold">My Tech Site</h1>
        <ul class="flex space-x-6">
          <li>
            <a href="#features" class="hover:text-blue-400">Features</a>
          </li>
          <li>
            <a href="#about" class="hover:text-blue-400">About</a>
          </li>
          <li>
            <a href="#contact" class="hover:text-blue-400">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
    <slot class="flex-grow" />
    <footer class="py-4 text-center text-sm bg-techBlue">
      © 2024 My Tech Site. All rights reserved.
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
header,
footer {
  backdrop-filter: blur(10px);
}
</style>
