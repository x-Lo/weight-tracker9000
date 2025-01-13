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
      <div class="sepperator">

      </div>
      <div
        class="grid-item"
        @click="navigate('dailyweight')"
      >
        LOG YOUR PROGRESS
      </div>
    </div>
  </div>
</template>

<script lang="ts" defer>
import { useAnimationStore } from "@/stores/animationStore";
import { useNavigation } from "@/composables/useNavigation";

export default {
  name: "Welcome",
  setup() {
    const animationStore = useAnimationStore();
    const { navigate } = useNavigation();

    const triggerAnimation = (route: string) => {
      animationStore.triggerAnimation(route);
    };

    return { triggerAnimation, navigate };
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
}

.grid-item {
  width: 100%;
  height: 10rem;
  background: rgba(39, 39, 39, 0.1);
    display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #f0f0f0;
  text-align: center;
  transition: transform 0.2s, background-color 0.2s;
  backdrop-filter: blur(60px);
  -webkit-backdrop-filter: blur(60px);
}

.sepperator{
  background-color: #C94079;
  width: 1vh;
  height: 95%;
}

.grid-item:hover {
  transform: translateY(-5px);
  cursor: pointer;
}
</style>
