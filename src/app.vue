<template>
  <Layout>
    <main
      class="flex flex-col items-center justify-center flex-grow bg-cover bg-center relative"
      style="
        background-image: url('https://source.unsplash.com/1600x900/?technology');
      "
    >
      <div class="absolute inset-0 bg-black opacity-50" />
      <div class="relative z-10 text-center animate-fade-in">
        <h1 class="text-6xl font-bold tracking-tight leading-tight">
          Welcome to the Future of Tech
        </h1>
        <p class="mt-6 text-lg opacity-75">
          Explore the cutting-edge technologies driving tomorrow.
        </p>
        <div class="mt-8">
          <button
            class="px-8 py-3 text-lg font-semibold text-white bg-techBlue rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  </Layout>
</template>

<script setup>
import Layout from '~/layouts/Layout.vue'
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
