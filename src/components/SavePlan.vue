<script setup lang="ts">
import { useNavigation } from '@/composables/useNavigation';

const {navigate} = useNavigation();
</script>

<template>
    <div class="saveplan-container">
        <h2>Save your plan by creating an account!</h2>
        <div class="grid">
            <div class="grid-item" @click="navigate('signup')">Create Account</div>
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
}

h2 {
    font-size: 2em;
}

.grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.grid-item {
  width: 60vh;
  height: 20vh;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-family: 'Roboto', Arial, sans-serif;
  color: #f0f0f0;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
  font-size: 2em;
}

.grid-item:hover {
    outline-color: #C94079; /* Solid color for active state */
    box-shadow: 0 0 0 2px #C94079, 0 0 6px rgba(201, 64, 121, 0.8); /* Subtle glowing effect */
    cursor: pointer;
}
</style>