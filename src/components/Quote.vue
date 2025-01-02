<template>
    <div class="quote-container">
      <div class="moto">
        <h2>CONQUER</h2>
        <h3>YOUR</h3>
        <h2>PEAK.</h2>
      </div>
    </div>
</template>

<script lang="ts" defer>

export default {
    name: "Quote",
}
</script>

<style scoped>
.quote-container {
  flex: 1;
  height: 100%;
  background: url('../assets/mountain3.png') no-repeat center center, linear-gradient(to bottom, #191919, #C94079);
  background-size: cover;
  display: flex;
  position: relative; /* Enable positioning for child elements */
}
</style>