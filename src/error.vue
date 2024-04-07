<template>
  <div class="error">
    <h1>Error Page</h1>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: 'An error occurred.',
    }
  },
}
</script>

<style scoped>
.error {
  text-align: center;
  margin-top: 100px;
}

h1 {
  font-size: 24px;
  color: red;
}

p {
  font-size: 16px;
  color: gray;
}
</style>
