<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation';

const {navigate} = useNavigation();
</script>

<template>
    <div class="saveplan-container">
      <h1>Ready to realize your full potential?</h1>
      <h2>Sign up to save your personalized plan and track your progress with daily weight logs.</h2>
      <button class="button" @click="navigate('signup')">Create Your Account!</button>
    </div>
  </template>

<style scoped>
.saveplan-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 4rem;
  position: relative;
  margin-bottom: 5rem;
}

h1 {
  margin-top: 10rem;
  font-size: 2em;
  font-weight: bold;
  color: #f0f0f0;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  color: #f0f0f0;
}

@media (max-width: 768px) {
  .saveplan-container {
    padding: 1rem;
  }

  .grid-item {
    width: 80%;
    height: auto;
    padding: 1rem 2rem;
  }

  h2 {
    font-size: 1.8em;
  }

  p {
    font-size: 1em;
  }

  .cta-text {
    font-size: 1.2em;
  }
}
</style>