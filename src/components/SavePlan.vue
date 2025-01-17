<template>
    <div class="saveplan-container" ref="savePlan">
      <h1>Ready to realize your full potential?</h1>
      <h2>Sign up to save your personalized plan and track your progress with daily weight logs.</h2>
      <button class="button" @click="navigate('signup')">Create Your Account!</button>
    </div>
</template>

<script setup lang="ts">
  import { useNavigation } from '@/composables/useNavigation';
  import gsap from 'gsap';
  import { ref, onMounted } from 'vue';

  const {navigate} = useNavigation();
  const savePlan = ref<HTMLElement | null>(null);

  onMounted(async() => {
    // animation code
    if (savePlan.value) {
      gsap.fromTo(
        savePlan.value.querySelectorAll("*"),
        { x: '100%', opacity: 0 },
        { 
          x: '0%',
          opacity: 1, 
          duration: 0.7,
          ease: "power1.out" 
        }
      );
    }
  });
</script>

<style scoped>
.saveplan-container {
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