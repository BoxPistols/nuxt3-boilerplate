<template>
  <main class="flex-1" :class="mainClasses">
    <div
      v-if="container"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      :class="containerClasses"
    >
      <slot></slot>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  container?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'white' | 'gray' | 'transparent'
}

const props = withDefaults(defineProps<Props>(), {
  container: true,
  padding: 'md',
  background: 'white',
})

const mainClasses = computed(() => {
  const classes = []

  // Background
  switch (props.background) {
    case 'white':
      classes.push('bg-white')
      break
    case 'gray':
      classes.push('bg-gray-50')
      break
    case 'transparent':
      classes.push('bg-transparent')
      break
  }

  return classes.join(' ')
})

const containerClasses = computed(() => {
  const classes = []

  // Padding
  switch (props.padding) {
    case 'none':
      break
    case 'sm':
      classes.push('py-4')
      break
    case 'md':
      classes.push('py-8')
      break
    case 'lg':
      classes.push('py-12')
      break
    case 'xl':
      classes.push('py-16')
      break
  }

  return classes.join(' ')
})
</script>
