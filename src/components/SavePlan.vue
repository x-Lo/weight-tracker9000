<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation';

const {navigate} = useNavigation();
</script>

<template>
    <div class="saveplan-container">
      <h2>Ready to realize your full potential?</h2>
      <p>Sign up to save your personalized plan and track your progress with daily weight logs.</p>
      <div class="grid">
        <div class="grid-item" @click="navigate('signup')">
          <span class="cta-text">Create Your Account!</span>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.saveplan-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  color: #f0f0f0;
}

h2 {
  font-size: 2.2em;
  margin-bottom: 1rem;
  color: #f0f0f0;
  font-weight: bold;
}

p {
  font-size: 1.2em;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.5;
}

.grid {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.grid-item {
  width: 60vh;
  max-width: 80%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Roboto', Arial, sans-serif;
  color: #f0f0f0;
  font-size: 1.5em;
  cursor: pointer;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.grid-item:hover {
    box-shadow: 0 2px 0 rgba(201, 64, 121, 0.8);
}

.cta-text {
  font-size: 1.5em;
  font-weight: bold;
  color: #f0f0f0;
  text-transform: uppercase;
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