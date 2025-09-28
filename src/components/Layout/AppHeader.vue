<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-900">
            {{ title }}
          </h1>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a
            v-for="item in navigationItems"
            :key="item.name"
            :href="item.href"
            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {{ item.name }}
          </a>
        </nav>
        <div class="md:hidden">
          <button
            type="button"
            class="text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            @click="toggleMobileMenu"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
        <a
          v-for="item in navigationItems"
          :key="item.name"
          :href="item.href"
          class="text-gray-500 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NavigationItem {
  name: string
  href: string
}

interface Props {
  title?: string
  navigationItems?: NavigationItem[]
}

withDefaults(defineProps<Props>(), {
  title: 'My App',
  navigationItems: () => [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
})

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>
