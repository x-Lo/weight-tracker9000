<template>
  <div class="welcome-container">
    <h1 class="brand-name">Weight Tracking Made Simple.</h1>
    <h2>
      Dedication and careful planning are the keys to success,
      <span>transcend yourself.</span>
    </h2>
    <div class="buttons-div">
      <button class="start-button" @click="triggerAnimation('calculator')">BEGIN YOUR JOURNEY</button>
      <button class="log-button" @click="navigate('dailyweight')">LOG YOUR PROGRESS</button>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 4rem;
  padding: 0;
  position: relative;
  margin-bottom: 5rem;
}

h1 {
  margin-top: 10rem;
  font-size: 2em;
  font-weight: bold;
  z-index: 2;
  color: #ffffff;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  z-index: 2;
  color: #f0f0f0;
}

span {
  font-style: italic;
  color: #C94079;
}

.buttons-div {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  z-index: 2;
}

.start-button {
  padding: 1rem;
  font-size: 1em;
  font-weight: bold;
  color: #f0f0f0;
  background: linear-gradient(to right, #C94079 35%, #FF8C42);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.log-button {
  padding: 1rem;
  font-size: 1em;
  font-weight: bold;
  color: #f0f0f0;
  background: linear-gradient(to right, #FF8C42 35%, #C94079);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.start-button:hover, .log-button:hover {
  transform: translateY(-3px);
}
</style>
