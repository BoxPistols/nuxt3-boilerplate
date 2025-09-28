<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-gray-900 text-center">
        Welcome to My Tech Site
      </h1>

      <!-- Google口コミコンポーネント -->
      <GoogleReviews
        :place-id="$config.public.googlePlaceId"
        :api-key="$config.public.googlePlacesApiKey"
        :cors-proxy="$config.public.corsProxy"
        :min-rating="4"
        language="ja"
      />
    </div>
  </div>
</template>

<style scoped>
header,
footer {
  backdrop-filter: blur(10px);
}
</style>
