<template>
  <div class="welcome-container">
    <h1>Welcome to <span class="brand-name">Weight Tracker 9000</span></h1>
    <h2>Your ultimate companion for achieving your weight goals.</h2>
    <p class="tagline">Track, plan, and crush your fitness journey with ease!</p>
    <div class="homepage-grid">
      <div
        class="grid-item"
        @click="triggerAnimation('calculator')"
      >
        CREATE YOUR PLAN
      </div>
      <div
        class="grid-item"
        @click="triggerAnimation('dailyweight')"
      >
        LOG YOUR PROGRESS
      </div>
    </div>
  </div>
</template>

<script lang="ts" defer>
import { useAnimationStore } from "@/stores/animationStore";

export default {
  name: "Welcome",
  setup() {
    const animationStore = useAnimationStore();

    const triggerAnimation = (route: string) => {
      animationStore.triggerAnimation(route);
    };

    return { triggerAnimation };
  },
};
</script>

<style scoped>
.welcome-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  gap: 5rem;
  padding: 1rem;
}

.brand-name {
  color: #C94079;
  font-weight: bold;
}

.tagline {
  margin-top: 0.5rem;
  font-style: italic;
  color: #C94079;
}

.homepage-grid {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2rem;
  padding: 1rem;
  margin-bottom: 3rem;
  margin-top: 3rem;
}

.grid-item {
  width: 100%;
  height: 5rem;
  padding: 3rem;
  background: rgba(39, 39, 39, 0.1);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px transparent, 0 4px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1rem;
  font-weight: bold;
  color: #f0f0f0;
  text-align: center;
  transition: transform 0.2s, background-color 0.2s;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
}

.grid-item:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
</style>
