<template>
    <div class="quote-container">
      <transition>
        <div class="moto" ref="moto">
          <h2>CONQUER</h2>
          <h3>YOUR</h3>
          <h2>PEAK.</h2>
      </div>
      </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

// Reference the moto container
const moto = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (moto.value) {
    // Select all children of moto (h2, h3)
    const letters = moto.value.querySelectorAll('h2, h3');

    // Animate text fading in from the right
    gsap.fromTo(
      letters,
      { x: '100%', opacity: 0 }, // Start off-screen to the right and invisible
      {
        x: '0%',
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power1.out', // Smooth deceleration effect
      }
    );
  }
});
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