<template>
  <div class="welcome-container" ref="welcome">
    <h1 class="brand-name">Weight Tracking Made Simple.</h1>
    <h2>
      Dedication and careful planning are the keys to success,
      <span>transcend yourself.</span>
    </h2>
    <div class="buttons-div">
      <button class="start-button" @click="navigate('calculator')">BEGIN YOUR JOURNEY</button>
      <button class="log-button" @click="navigate('dailyweight')">LOG YOUR PROGRESS</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useNavigation } from "@/composables/useNavigation";
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';

  const { navigate } = useNavigation();
  const welcome = ref<HTMLDivElement | null>(null);

  onMounted(() => {
    if (welcome.value) {
      // Select all children of moto (h2, h3)
      const letters = welcome.value.querySelectorAll('*');

      // Animate text fading in from the right
      gsap.fromTo(
        letters,
        { x: '100%', opacity: 0 }, // Start off-screen to the right and invisible
        {
          x: '0%',
          opacity: 1,
          duration: 0.7,
          ease: 'power1.out', // Smooth deceleration effect
        }
      );
    }
  });
</script>

<style scoped>
.welcome-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  gap: 4rem;
  position: relative;
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

span {
  font-style: italic;
  color: #C94079;
}

.buttons-div {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.start-button {
  padding: 1rem;
  font-size: 1em;
  font-weight: bold;
  color: #f0f0f0;
  background: transparent;
  border: 2px solid #C94079;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.log-button {
  padding: 1rem;
  font-size: 1em;
  font-weight: bold;
  color: #f0f0f0;
  background: transparent;
  border: none;
  border: 2px solid #C94079;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.start-button:hover, .log-button:hover {
  transform: translateY(-3px);
  border: 2px solid #FF8C42;
}
</style>
