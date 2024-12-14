<template>
  <div class="flex flex-col">
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Welcome to My Tech Site</h1>
    </div>
    <!-- Main content -->
    <div class="container mx-auto px-4 grid gap-4">
      <div>
        <!-- メッセージの表示 -->
        <p class="text-lg">{{ message }}</p>
        <!-- メッセージの変更 -->
        <button
          class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4 text-white cursor-pointer"
          @click="changeMessage"
        >
          Change message
        </button>
      </div>
      <!-- Component Alert -->
      <div>
        <AppAlert> This is an alert! </AppAlert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// リアクティブな状態管理
const message = ref('Hello from Nuxt 3!')

// 関数で値を更新 Toggle message
const changeMessage = () => {
  message.value =
    message.value === 'Hello from Nuxt 3!'
      ? 'Hello from Nuxt 3! (changed)'
      : 'Hello from Nuxt 3!'
}
</script>

<style scoped>
header,
footer {
  backdrop-filter: blur(10px);
}
</style>
