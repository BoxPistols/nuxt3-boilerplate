<template>
  <div
    class="layout flex flex-col min-h-screen bg-gray-100 text-gray-800 font-sans"
  >
    <header>
      <h1 class="text-3xl text-blue-400 font-bold">Nuxt 3 template</h1>
    </header>
    <main>
      <slot />
    </main>
    <footer
      class="text-center text-gray-400 text-sm border-t border-gray-200 mt-4"
    >
      <p>&copy; 2021 Nuxt 3 template</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  // Add any necessary component options or logic here
}
</script>

<style scoped>
.layout {
  padding: auto;
}

header {
  padding: 1rem;
}

main {
  padding: 1rem;
  /* Your main content styles */
}

footer {
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
