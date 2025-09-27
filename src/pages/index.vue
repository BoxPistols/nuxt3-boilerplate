<!-- pages/index.vue -->
<template>
  <div class="flex flex-col">
    <div class="container mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Welcome to My Tech Site</h1>

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
