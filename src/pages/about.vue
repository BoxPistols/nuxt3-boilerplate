<!-- pages/about.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8 text-gray-900 text-center">
        About Us
      </h1>

      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8"
      >
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
        <p class="text-gray-600 leading-relaxed mb-6">
          We are dedicated to providing exceptional technology solutions that
          empower businesses and individuals to achieve their goals. Our
          platform connects talented professionals with innovative projects.
        </p>

        <h2 class="text-2xl font-semibold mb-4 text-gray-800">What We Do</h2>
        <p class="text-gray-600 leading-relaxed mb-6">
          Our platform specializes in matching skilled engineers, developers,
          and project managers with exciting opportunities in cutting-edge
          technology projects. We focus on cloud technologies, infrastructure,
          and modern development practices.
        </p>

        <div class="grid md:grid-cols-3 gap-6 mt-8">
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-blue-600 mb-2">91+</div>
            <div class="text-gray-600">Satisfied Clients</div>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-blue-600 mb-2">4.1★</div>
            <div class="text-gray-600">Average Rating</div>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-3xl font-bold text-blue-600 mb-2">5+</div>
            <div class="text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>

      <div class="text-center text-gray-500 text-sm">
        Current route: {{ route.path }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
