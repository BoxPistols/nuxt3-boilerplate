<!-- pages/about.vue -->
<template>
  <div class="container mx-auto px-4">
    <h1 class="text-2xl font-bold mb-4">About Us</h1>
    <p>This is the about page of our application.</p>
    <p>Current route: {{ route.path }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
