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
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

// Reference the moto container
const moto = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (moto.value) {
    // Select all children of moto (h2, h3)
    const letters = moto.value.querySelectorAll("h2, h3");

    // Animate text fading in from the right
    gsap.fromTo(
      letters,
      { x: "100%", opacity: 0 }, // Start off-screen to the right and invisible
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power1.out", // Smooth deceleration effect
      }
    );
  }
});
</script>

<style scoped>
/* Base styles */
.quote-container {
  flex: 1;
  height: 100%;
  background: url("../assets/mountain3.png") no-repeat center center,
    linear-gradient(to bottom, #191919, #c94079);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* Ensure content stays within boundaries */
}

.moto {
  position: absolute; /* Position relative to .homepage-left */
  font-family: 'Bebas Neue', sans-serif;
  font-size: 5rem;
  top: 1rem; /* Adjust distance from the top edge */
  left: 2.5rem; /* Adjust distance from the left edge */
  font-weight: bold;
  color: #fff !important;
  letter-spacing: 2px;
  line-height: 0.8;
}

/* Extra small devices (phones, 600px and down) */
@media (max-width: 600px) {
  .quote-container {
    padding: 1rem; /* Reduce padding for smaller devices */
    height: 100%; /* Flexible height for small screens */
  }

  .moto {
    position: absolute; /* Position relative to .homepage-left */
    top: 1rem; /* Adjust distance from the top edge */
    left: 0.3rem; /* Adjust distance from the left edge */
    font-size: 2.3rem;
    letter-spacing: 2px;
    line-height: 0.8;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media (min-width: 600px) and (max-width: 767px) {
  .moto {
    position: absolute; /* Position relative to .homepage-left */
    top: 1rem; /* Adjust distance from the top edge */
    left: 0.5rem; /* Adjust distance from the left edge */
    font-size: 3rem;
  } 
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .moto {
    position: absolute; /* Position relative to .homepage-left */
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4rem;
    top: 1rem; /* Adjust distance from the top edge */
    left: 1.5rem; /* Adjust distance from the left edge */
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1279px) {
  .quote-container {
    height: 100%;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .moto {
    position: absolute; /* Position relative to .homepage-left */
    font-family: 'Bebas Neue', sans-serif;
    font-size: 4.5rem;
    top: 1rem; /* Adjust distance from the top edge */
    left: 1rem; /* Adjust distance from the left edge */
  }
}
</style>
